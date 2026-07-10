import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Styles from "./procurement.module.scss";
import { Title } from "../../ui/title/Title";
import { BackToTop } from "../../ui/back-to-top/BackToTop";
import { OfferModal } from "./OfferModal";
import { GroupCard } from "./GroupCard";

type Item = {
  id: number;
  name: string | null;
  quantity: number | string;
  unit: string;
  note: string | null;
};

type Group = {
  note: string;
  items: Item[];
};

export const Procurement = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  // модалка
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  // пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [isMobile, setIsMobile] = useState(false);

  // Определяем количество карточек в зависимости от ширины экрана
  useEffect(() => {
    const updateLayout = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(16);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, []);

  useEffect(() => {
    loadExcel();
  }, []);

  // сброс страницы при поиске
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // плавный скролл вверх при смене страницы
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [currentPage]);

  const loadExcel = async () => {
    const response = await fetch("/procurement.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const parsed: Item[] = json
      .slice(1)
      .map((row: any, i) => ({
        id: i + 1,
        name: row[2],
        quantity: row[3],
        unit: row[4],
        note: row[5] || null
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
      item.name?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);

  const paginatedGroups = filteredGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleGroup = (note: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [note]: !prev[note]
    }));
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch("/send-offer.php", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        alert("Предложение успешно отправлено!");
        setShowModal(false);
      } else {
        alert("Ошибка при отправке");
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка сети");
    }
  };

  const isSearching = search.trim().length > 0;

  // Функция для перехода на страницу
  const goToPage = (page: number) => {
    setCurrentPage(page);
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
        {paginatedGroups.map(group => {
          const isExpanded = isSearching
            ? true
            : expandedGroups[group.note] || false;

          return (
            <GroupCard
              key={group.note}
              group={group}
              isExpanded={isExpanded}
              isSearching={isSearching}
              onToggle={toggleGroup}
              onAddOffer={() => {
                setSelectedGroup(group);
                setShowModal(true);
              }}
            />
          );
        })}
      </div>

      {/* пагинация */}
      {totalPages > 1 && (
        <div className={Styles.pagination}>
          <button
            className={`${Styles.navButton} ${!isMobile ? Styles.navButtonDesktop : ''}`}
            onClick={() => goToPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Назад
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={currentPage === page ? Styles.activePage : ""}
            >
              {page}
            </button>
          ))}

          <button
            className={`${Styles.navButton} ${!isMobile ? Styles.navButtonDesktop : ''}`}
            onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Вперёд
          </button>
        </div>
      )}

      {showModal && selectedGroup && (
        <OfferModal
          group={selectedGroup}
          onClose={() => setShowModal(false)}
          // onSubmit={handleSubmit}
        />
      )}

      <BackToTop />
    </div>
  );
};