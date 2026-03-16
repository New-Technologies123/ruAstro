import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Styles from "./procurement.module.scss";
import { Title } from "../../ui/title/Title";
import { BackToTop } from "../../ui/back-to-top/BackToTop";

export const Procurement = () => {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);
  const [itemModal, setItemModal] = useState(false);
  const [supplierModal, setSupplierModal] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const [offers, setOffers] = useState([]);

  const [offerForm, setOfferForm] = useState({
    proposedName: "",
    quantity: "",
    note: ""
  });

  const [supplierForm, setSupplierForm] = useState({
    name: "",
    company: "",
    email: ""
  });

  useEffect(() => {
    loadExcel();
  }, []);

  const loadExcel = async () => {

    const response = await fetch("/procurement.xlsx");
    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const parsed = json
      .slice(1)
      .map((row, i) => ({
        id: i + 1,
        name: row[4],
        quantity: row[6],
        unit: row[7],
        note: row[8]
      }))
      .filter(i => i.name);

    setItems(parsed);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const openOfferForm = (item, index = null) => {

    setSelectedItem(item);

    if (index !== null) {
      setOfferForm(offers[index].proposed);
      setEditIndex(index);
    } else {
      setOfferForm({
        proposedName: "",
        quantity: "",
        note: ""
      });
      setEditIndex(null);
    }

    setItemModal(true);
  };

  const saveOffer = (e) => {

    e.preventDefault();

    const offer = {
      requested: selectedItem,
      proposed: offerForm
    };

    if (editIndex !== null) {

      const updated = [...offers];
      updated[editIndex] = offer;
      setOffers(updated);

    } else {

      setOffers(prev => [...prev, offer]);

    }

    setItemModal(false);
  };

  const removeOffer = (index) => {
    setOffers(prev => prev.filter((_, i) => i !== index));
  };

  const sendAll = async (e) => {

    e.preventDefault();

    const data = {
      supplier: supplierForm,
      offers
    };

    const res = await fetch("/send-offers.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      alert("Предложения отправлены!");
      setOffers([]);
      setSupplierModal(false);
    } else {
      alert("Ошибка отправки");
    }

  };

  const isAdded = (id) => offers.some(o => o.requested.id === id);

  return (

    <div className={Styles.container}>

      <Title text="Закупки" />

      <input
        className={Styles.search}
        placeholder="Поиск товара..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      <div className={Styles.itemsGrid}>

        {filteredItems.map(item => (

          <div key={item.id} className={Styles.card}>

            {isAdded(item.id) && (
              <div className={Styles.added}>✓ Добавлено</div>
            )}

            <h3>{item.name}</h3>

            <p>
              <b>Количество:</b> {item.quantity} {item.unit}
            </p>

            <button
              className={Styles.button}
              onClick={()=>openOfferForm(item)}
            >
              Добавить предложение
            </button>

          </div>

        ))}

      </div>


      {offers.length > 0 && (

        <div className={Styles.offersBlock}>

          <h2>Ваши предложения</h2>

          {offers.map((offer, index)=> (

            <div key={index} className={Styles.offerCard}>

              <div>

                <b>{offer.requested.name}</b>

                <p>Ваш товар: {offer.proposed.proposedName}</p>

                <p>Количество: {offer.proposed.quantity}</p>

                <p>{offer.proposed.note}</p>

              </div>

              <div className={Styles.actions}>

                <button
                  onClick={()=>openOfferForm(offer.requested,index)}
                >
                  Редактировать
                </button>

                <button
                  className={Styles.delete}
                  onClick={()=>removeOffer(index)}
                >
                  Удалить
                </button>

              </div>

            </div>

          ))}

          <button
            className={Styles.sendAll}
            onClick={()=>setSupplierModal(true)}
          >
            Отправить все предложения
          </button>

        </div>

      )}

      {itemModal && (

        <div className={Styles.modalBg}>

          <div className={Styles.modal}>

            <h3>{selectedItem.name}</h3>

            <form onSubmit={saveOffer} className={Styles.form}>

              <input
                placeholder="Наименование предложенного товара"
                value={offerForm.proposedName}
                onChange={(e)=>setOfferForm(prev=>({
                  ...prev,
                  proposedName:e.target.value
                }))}
                required
              />

              <input
                type="number"
                placeholder="Количество"
                value={offerForm.quantity}
                onChange={(e)=>setOfferForm(prev=>({
                  ...prev,
                  quantity:e.target.value
                }))}
                required
              />

              <textarea
                placeholder="Примечание"
                value={offerForm.note}
                onChange={(e)=>setOfferForm(prev=>({
                  ...prev,
                  note:e.target.value
                }))}
              />

              <div className={Styles.buttons}>

                <button type="submit">
                  {editIndex !== null ? "Сохранить" : "Добавить"}
                </button>

                <button
                  type="button"
                  onClick={()=>setItemModal(false)}
                >
                  Отмена
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {supplierModal && (

        <div className={Styles.modalBg}>

          <div className={Styles.modal}>

            <h3>Контактные данные</h3>

            <form onSubmit={sendAll} className={Styles.form}>

              <input
                placeholder="ФИО"
                value={supplierForm.name}
                onChange={(e)=>setSupplierForm(prev=>({
                  ...prev,
                  name:e.target.value
                }))}
                required
              />

              <input
                placeholder="Компания"
                value={supplierForm.company}
                onChange={(e)=>setSupplierForm(prev=>({
                  ...prev,
                  company:e.target.value
                }))}
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={supplierForm.email}
                onChange={(e)=>setSupplierForm(prev=>({
                  ...prev,
                  email:e.target.value
                }))}
                required
              />

              <button type="submit">
                Отправить предложения
              </button>

            </form>
          </div>
        </div>
      )}
      <BackToTop />
    </div>
  );
};