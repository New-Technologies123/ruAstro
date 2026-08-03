import { useState, useEffect, useRef } from "react";
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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  
  const gridRef = useRef<HTMLDivElement>(null);

  // Определяем количество карточек и мобильное устройство
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      const mobile = width <= 768;
      setIsMobile(mobile);
      
      if (mobile) {
        setItemsPerPage(6);
      } else if (width <= 1250) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(12);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [currentPage]);

  useEffect(() => {
    if (items.length > 0) {
      setIsDataLoaded(true);
    }
  }, [items]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Закрываем все карточки при смене страницы или поиске
  useEffect(() => {
    setExpandedGroups({});
  }, [currentPage]);

  // Закрываем все карточки при поиске
  useEffect(() => {
    setExpandedGroups({});
  }, [search]);

  const loadExcel = async () => {
    try {
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
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
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

  // 🆕 Анимация появления карточек при смене страницы - ПЕРЕМЕЩЕНА СЮДА
  useEffect(() => {
    if (isDataLoaded && paginatedGroups.length > 0) {
      setIsAnimating(true);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [currentPage, isDataLoaded, paginatedGroups.length]);

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

      {!isDataLoaded && (
        <div className={Styles.skeletonGrid}>
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index} className={Styles.skeletonCard}>
              <div className={Styles.skeletonHeader}></div>
              <div className={Styles.skeletonTitle}></div>
              <div className={Styles.skeletonText}></div>
              <div className={Styles.skeletonText}></div>
              <div className={Styles.skeletonButton}></div>
            </div>
          ))}
        </div>
      )}

      {isDataLoaded && (
        <div 
          className={`${Styles.itemsGrid} ${isAnimating ? Styles.animating : ''}`}
          ref={gridRef}
        >
          {paginatedGroups.map((group, index) => (
            <div 
              key={`${group.note}-${currentPage}`}
              className={Styles.cardWrapper}
              style={{ 
                animationDelay: `${Math.min(index * 50, 500)}ms`,
                opacity: 0
              }}
              onAnimationEnd={(e) => {
                const target = e.target as HTMLDivElement;
                target.style.opacity = '1';
              }}
            >
              <GroupCard
                group={group}
                isExpanded={isSearching ? true : expandedGroups[group.note] || false}
                isSearching={isSearching}
                onToggle={toggleGroup}
                onAddOffer={() => {
                  setSelectedGroup(group);
                  setShowModal(true);
                }}
              />
            </div>
          ))}
        </div>
      )}

      {isDataLoaded && totalPages > 1 && (
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
        />
      )}

      <BackToTop />
    </div>
  );
};