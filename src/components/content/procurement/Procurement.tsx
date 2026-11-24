import { ArrowUpRightIcon } from "../../ui/icon/ArrowUpRightIcon";
import { useEffect, useRef, useState } from "react";
import type { ProcurementItem } from "./parseProcurement";
import Styles from "./procurement.module.scss";
import { BackToTop } from "../../ui/back-to-top/BackToTop";
import { OfferModal } from "./OfferModal";
import { GroupCard } from "./GroupCard";
import { LotDetail } from "./LotDetail";
import { LotSheet } from "./LotSheet";

type Item = ProcurementItem;

type Group = {
  note: string;
  items: Item[];
};

const PAGE_SIZE = 12;
const MOBILE_PAGE_SIZE = 6;

export const Procurement = ({ initialItems }: { initialItems: Item[] }) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(initialItems.length === 0);
  const [loadError, setLoadError] = useState(false);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [offerGroup, setOfferGroup] = useState<Group | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [pageEntranceReady, setPageEntranceReady] = useState(true);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const cardListRef = useRef<HTMLDivElement | null>(null);
  const scrollToFirstLotRef = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 800px)");
    const updatePageSize = () => {
      setPageSize(media.matches ? MOBILE_PAGE_SIZE : PAGE_SIZE);
      setCurrentPage(1);
      setPageEntranceReady(true);
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
        const { parseProcurementWorkbook } = await import("./parseProcurement");
        const parsed = parseProcurementWorkbook(await response.arrayBuffer());
        if (active) {
          setItems(parsed);
          setLoadError(false);
        }
      } catch (error) {
        console.error("Ошибка загрузки закупок:", error);
        if (active && initialItems.length === 0) setLoadError(true);
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

  useEffect(() => {
    if (!scrollToFirstLotRef.current) return;

    let revealTimer: number | undefined;
    const frame = window.requestAnimationFrame(() => {
      scrollToFirstLotRef.current = false;
      const list = cardListRef.current;
      if (!list) {
        setPageEntranceReady(true);
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      list.scrollTop = 0;
      const catalog = list.closest("aside") ?? list;
      catalog.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });

      if (reduceMotion) setPageEntranceReady(true);
      else revealTimer = window.setTimeout(() => setPageEntranceReady(true), 380);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (revealTimer !== undefined) window.clearTimeout(revealTimer);
    };
  }, [page]);

  const selectGroup = (note: string, trigger: HTMLButtonElement, keyboardActivated: boolean) => {
    triggerRef.current = trigger;
    restoreFocusRef.current = keyboardActivated;
    if (!isMobile && !selectedNote && cardListRef.current) {
      const sidebarTop = cardListRef.current.closest("aside")?.getBoundingClientRect().top ?? 0;
      if (sidebarTop < 90) {
        window.scrollTo({ top: window.scrollY + sidebarTop - 90, behavior: "auto" });
      }
    }
    setSelectedNote(note);
  };

  const closeDetail = () => {
    setSelectedNote(null);
    if (!isMobile && restoreFocusRef.current) requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  };

  const updateSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
    setPageEntranceReady(true);
    setSelectedNote(null);
  };

  const changePage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    scrollToFirstLotRef.current = true;
    setPageEntranceReady(false);
    setCurrentPage(nextPage);
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
            <div className={Styles.heroAsideArrow} aria-hidden="true"><ArrowUpRightIcon /></div>
          </div>
        </header>

        <div className={Styles.toolbar}>
          <div className={Styles.searchWrap}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg>
            <label htmlFor="procurement-search" className={Styles.visuallyHidden}>Поиск по лотам и товарам</label>
            <input
              ref={searchInputRef}
              id="procurement-search"
              type="search"
              placeholder="Найти лот или товар"
              value={search}
              onChange={(event) => updateSearch(event.target.value)}
            />
            {search && (
              <button type="button" className={Styles.clearSearch} onClick={() => { updateSearch(""); searchInputRef.current?.focus(); }} aria-label="Очистить поиск">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" /></svg>
              </button>
            )}
          </div>
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
              <div className={`${Styles.cardList} ${pageEntranceReady ? Styles.cardListPage : Styles.cardListPending}`} key={page} ref={cardListRef}>
                {paginatedGroups.map((group) => (
                  <GroupCard
                    key={group.note}
                    group={group}
                    isSelected={group.note === selectedNote}
                    onSelect={(trigger, keyboardActivated) => selectGroup(group.note, trigger, keyboardActivated)}
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
          restoreFocus={restoreFocusRef.current}
        />
      )}
    </div>
  );
};
