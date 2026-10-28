import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import Styles from "./procurement.module.scss";
import { BackToTop } from "../../ui/back-to-top/BackToTop";
import { OfferModal } from "./OfferModal";
import { GroupCard } from "./GroupCard";
import { LotDetail } from "./LotDetail";
import { LotSheet } from "./LotSheet";

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

const PAGE_SIZE = 9;
const MOBILE_PAGE_SIZE = 4;

export const Procurement = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [offerGroup, setOfferGroup] = useState<Group | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 800px)");
    const updatePageSize = () => {
      setPageSize(media.matches ? MOBILE_PAGE_SIZE : PAGE_SIZE);
      setCurrentPage(1);
      setSelectedNote(null);
    };
    updatePageSize();
    media.addEventListener("change", updatePageSize);
    return () => media.removeEventListener("change", updatePageSize);
  }, []);

  useEffect(() => {
    let active = true;

    const loadExcel = async () => {
      try {
        const response = await fetch("/procurement.xlsx");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const workbook = XLSX.read(await response.arrayBuffer());
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1 });
        const parsed = rows.slice(1).map((row, index) => ({
          id: index + 1,
          name: String(row[2] ?? "").trim() || null,
          quantity: (row[3] ?? "") as number | string,
          unit: String(row[4] ?? ""),
          note: String(row[5] ?? "").trim() || null
        })).filter((item) => item.name);
        if (active) setItems(parsed);
      } catch (error) {
        console.error("Ошибка загрузки закупок:", error);
        if (active) setLoadError(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadExcel();
    return () => { active = false; };
  }, []);

  const groupedItems = Object.values(items.reduce<Record<string, Group>>((groups, item) => {
    const note = item.note || "Без примечания";
    if (!groups[note]) groups[note] = { note, items: [] };
    groups[note].items.push(item);
    return groups;
  }, {}));

  const query = search.trim().toLocaleLowerCase("ru");
  const filteredGroups = groupedItems.filter((group) =>
    group.note.toLocaleLowerCase("ru").includes(query) ||
    group.items.some((item) => item.name?.toLocaleLowerCase("ru").includes(query))
  );
  const totalPages = Math.ceil(filteredGroups.length / pageSize);
  const page = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedGroups = filteredGroups.slice((page - 1) * pageSize, page * pageSize);
  const selectedIndex = filteredGroups.findIndex((group) => group.note === selectedNote);
  const selectedGroup = selectedIndex >= 0 ? filteredGroups[selectedIndex] : null;
  const isMobile = pageSize === MOBILE_PAGE_SIZE;

  const selectGroup = (note: string, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedNote(note);
  };

  const closeDetail = () => {
    setSelectedNote(null);
    if (!isMobile) requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  };

  const changePage = (nextPage: number) => {
    setCurrentPage(nextPage);
    setSelectedNote(null);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.inner}>
        <header className={Styles.hero}>
          <div className={Styles.heroContent}>
            <span className={Styles.eyebrow}><span aria-hidden="true" /> ПЛОЩАДКА ДЛЯ ПОСТАВЩИКОВ</span>
            <h1>Актуальные <em>закупки</em></h1>
            <p>Изучайте состав лотов и предлагайте свои условия поставки. Выберите интересующую закупку, чтобы посмотреть подробности.</p>
          </div>
          <div className={Styles.heroAside} aria-label="Статистика закупок">
            <span>Открыто сейчас</span>
            <strong>{loading ? "—" : groupedItems.length}</strong>
            <span>лотов · {loading ? "—" : items.length} позиций</span>
            <div className={Styles.heroAsideArrow} aria-hidden="true">↗</div>
          </div>
        </header>

        <div className={Styles.toolbar}>
          <label className={Styles.searchWrap}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg>
            <span className={Styles.visuallyHidden}>Поиск по лотам и товарам</span>
            <input
              type="search"
              placeholder="Найти лот или товар"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
                setSelectedNote(null);
              }}
            />
          </label>
          <span className={Styles.resultCount}>{loading ? "Загрузка…" : `${filteredGroups.length} лотов`}</span>
        </div>

        {loadError ? (
          <div className={Styles.message} role="alert">Не удалось загрузить закупки. Обновите страницу и попробуйте снова.</div>
        ) : loading ? (
          <div className={`${Styles.layout} ${Styles.catalogMode}`} aria-label="Загрузка закупок">
            <div className={Styles.skeletonList}>{Array.from({ length: 6 }, (_, i) => <div className={Styles.skeletonCard} key={i} />)}</div>
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className={Styles.message}>По вашему запросу лоты не найдены. Попробуйте другое название или номер.</div>
        ) : (
          <div className={`${Styles.layout} ${!selectedGroup || isMobile ? Styles.catalogMode : ""}`}>
            <aside className={Styles.sidebar} aria-label="Список лотов">
              <div className={Styles.sectionHeading}>
                <div><span className={Styles.sectionKicker}>КАТАЛОГ</span><h2>Лоты</h2></div>
                <span className={Styles.sectionCount}>{filteredGroups.length}</span>
              </div>
              <div className={Styles.cardList}>
                {paginatedGroups.map((group) => (
                  <GroupCard
                    key={group.note}
                    group={group}
                    isSelected={group.note === selectedNote}
                    onSelect={(trigger) => selectGroup(group.note, trigger)}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <nav className={Styles.pagination} aria-label="Страницы лотов">
                  <button type="button" onClick={() => changePage(page - 1)} disabled={page === 1} aria-label="Предыдущая страница">←</button>
                  <span>{page} / {totalPages}</span>
                  <button type="button" onClick={() => changePage(page + 1)} disabled={page === totalPages} aria-label="Следующая страница">→</button>
                </nav>
              )}
            </aside>

            {selectedGroup && !isMobile && (
              <LotDetail group={selectedGroup} searchTerm={query} onClose={closeDetail} onAddOffer={() => setOfferGroup(selectedGroup)} />
            )}
          </div>
        )}
      </div>
      {offerGroup && <OfferModal group={offerGroup} onClose={() => setOfferGroup(null)} />}
      <BackToTop />
      {selectedGroup && isMobile && (
        <LotSheet
          group={selectedGroup}
          searchTerm={query}
          onClose={closeDetail}
          onAddOffer={() => setOfferGroup(selectedGroup)}
          returnFocusTo={triggerRef.current}
        />
      )}
    </div>
  );
};
