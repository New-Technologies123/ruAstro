import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Styles from "./procurement.module.scss";
import { Title } from "../../ui/title/Title";
import { BackToTop } from "../../ui/back-to-top/BackToTop";
import { OfferModal } from "./OfferModal";
import { GroupCard } from "./GroupCard";
import { OfferCard } from "./OfferCard";
import { SubmitModal } from "./SubmitModal";

type Item = {
  id: number;
  name: string;
  quantity: number | string;
  unit: string;
  note: string | null;
};

type Group = {
  note: string;
  items: Item[];
};

type Proposed = {
  proposedName: string;
  quantity: string | number;
  note: string;
};

type Offer = {
  groupNote: string;
  proposed: Proposed[];
  file: File;
};

export const Procurement = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [itemModal, setItemModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [offerForms, setOfferForms] = useState<Proposed[]>([
    { proposedName: "", quantity: "", note: "" }
  ]);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const [editGroupNote, setEditGroupNote] = useState<string | null>(null);
  const [expandedOffers, setExpandedOffers] = useState<Record<string, boolean>>({});

  const [submitModal, setSubmitModal] = useState(false);
  const [submitForm, setSubmitForm] = useState({ fullName: "", company: "", email: "" });
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    loadExcel();
  }, []);

  const loadExcel = async () => {
    const response = await fetch("/procurement.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const parsed: Item[] = json
      .slice(9)
      .map((row: any, i) => ({
        id: i + 1,
        name: row[4],
        quantity: row[6],
        unit: row[7],
        note: row[8] || null
      }))
      .filter((i: Item) => i.name);

    setItems(parsed);
  };

  const groupedItems: Group[] = Object.values(
    items.reduce<Record<string, Group>>((acc, item) => {
      const key = item.note || "Без примечания";
      if (!acc[key]) acc[key] = { note: key, items: [] };
      acc[key].items.push(item);
      return acc;
    }, {})
  );

  const filteredGroups: Group[] = groupedItems.filter(group =>
    group.items.some(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  const toggleGroup = (note: string) => {
    setExpandedGroups(prev => ({ ...prev, [note]: !prev[note] }));
  };

  const openOfferFormForGroup = (group: Group, groupNoteForEdit?: string) => {
    setSelectedGroup(group);
    setFileError("");

    if (groupNoteForEdit) {
      const groupOffers = offers.find(o => o.groupNote === groupNoteForEdit);
      setOfferForms(groupOffers ? groupOffers.proposed : [{ proposedName: "", quantity: "", note: "" }]);
      setAttachedFile(groupOffers?.file || null);
      setEditGroupNote(groupNoteForEdit);
    } else {
      setOfferForms([{ proposedName: "", quantity: "", note: "" }]);
      setAttachedFile(null);
      setEditGroupNote(null);
    }

    setItemModal(true);
  };

  const saveOffer = (e: React.FormEvent) => {
    e.preventDefault();

    if (!attachedFile) {
      setFileError("Файл обязателен для прикрепления!");
      return;
    }

    if (!selectedGroup) return;

    const newOffer: Offer = {
      groupNote: selectedGroup.note,
      proposed: offerForms,
      file: attachedFile!
    };

    if (editGroupNote) {
      setOffers(prev => [
        ...prev.filter(o => o.groupNote !== editGroupNote),
        newOffer
      ]);
    } else {
      setOffers(prev => [...prev, newOffer]);
    }

    setItemModal(false);
    setEditGroupNote(null);
  };

  const addOfferForm = () => {
    setOfferForms(prev => [...prev, { proposedName: "", quantity: "", note: "" }]);
  };

  const removeOfferForm = (index: number) => {
    setOfferForms(prev => prev.filter((_, i) => i !== index));
  };

  const updateOfferForm = (index: number, field: keyof Proposed, value: any) => {
    setOfferForms(prev => {
      const newForms = [...prev];
      newForms[index][field] = value;
      return newForms;
    });
  };

  const isSearching = search.trim().length > 0;

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, company, email } = submitForm;

    if (!fullName || !company || !email) {
      setSubmitError("Все поля обязательны для заполнения!");
      return;
    }

    if (offers.length === 0) {
      setSubmitError("Нет предложений для отправки!");
      return;
    }

    try {
      const formData = new FormData();

      // данные поставщика
      formData.append("supplier", JSON.stringify({
        name: fullName,
        company,
        email
      }));

      // предложения
      const offersData = offers.flatMap(offer =>
        offer.proposed.map(p => ({
          requested: {
            name: offer.groupNote,
            quantity: "",
            note: ""
          },
          proposed: p
        }))
      );

      formData.append("offers", JSON.stringify(offersData));

      // 📎 файлы (каждый оффер = файл)
      offers.forEach((offer, index) => {
        if (offer.file) {
          formData.append(`file_${index}`, offer.file);
        }
      });

      const response = await fetch("/send-offers.php", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        alert("Предложения успешно отправлены!");
        setSubmitForm({ fullName: "", company: "", email: "" });
        setOffers([]);
        setSubmitModal(false);
      } else {
        alert("Ошибка при отправке");
      }

    } catch (err) {
      console.error(err);
      alert("Ошибка сети");
    }
  };

  return (
    <div className={Styles.container}>
      <Title text="Закупки" />

      <input
        className={Styles.search}
        placeholder="Поиск товара..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className={Styles.itemsGrid}>
        {filteredGroups.map(group => {
          const isExpanded = isSearching ? true : expandedGroups[group.note] || false;

          return (
            <GroupCard
              key={group.note}
              group={group}
              isExpanded={isExpanded}
              isSearching={isSearching}
              onToggle={toggleGroup}
              onAddOffer={openOfferFormForGroup}
            />
          );
        })}
      </div>

      {itemModal && selectedGroup && (
        <OfferModal
          selectedGroup={selectedGroup}
          offerForms={offerForms}
          editGroupNote={editGroupNote}
          attachedFile={attachedFile}
          fileError={fileError}

          onClose={() => {
            setItemModal(false);
            setEditGroupNote(null);
          }}

          onSubmit={saveOffer}
          onAddForm={addOfferForm}
          onRemoveForm={removeOfferForm}
          onChangeForm={updateOfferForm}
          onFileChange={(file) => {
            setAttachedFile(file);
            setFileError("");
          }}
        />
      )}

      {offers.length > 0 && (
        <div className={Styles.offersBlock}>
          <h2>Ваши предложения</h2>
          {offers.map((offer, index) => {
            const isOpen = expandedOffers[offer.groupNote] || false;

            return (
              <OfferCard
                key={index}
                offer={offer}
                isOpen={isOpen}
                onToggle={() =>
                  setExpandedOffers(prev => ({
                    ...prev,
                    [offer.groupNote]: !prev[offer.groupNote]
                  }))
                }
                onEdit={() =>
                  openOfferFormForGroup(
                    { note: offer.groupNote, items: [] },
                    offer.groupNote
                  )
                }
                onDelete={() => {
                  setOffers(prev =>
                    prev.filter(o => o.groupNote !== offer.groupNote)
                  );
                  setExpandedOffers(prev => {
                    const copy = { ...prev };
                    delete copy[offer.groupNote];
                    return copy;
                  });
                }}
              />
            );
          })}

          <div className={Styles.submitOffers}>
            <button className={Styles.button} onClick={() => setSubmitModal(true)}>Отправить предложения</button>
          </div>
        </div>
      )}

      {submitModal && (
        <SubmitModal
          form={submitForm}
          error={submitError}
          onChange={(field, value) =>
            setSubmitForm(prev => ({ ...prev, [field]: value }))
          }
          onSubmit={handleSubmitForm}
          onClose={() => setSubmitModal(false)}
        />
      )}

      <BackToTop />
    </div>
  );
};