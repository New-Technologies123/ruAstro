import { useEffect, useRef, useState } from "react";
import Styles from "./procurement.module.scss";

export type LotGroup = {
  note: string;
  items: {
    id: number;
    name: string | null;
    quantity: number | string;
    unit: string;
    note: string | null;
  }[];
};

type Props = {
  group: LotGroup;
  searchTerm: string;
  onClose: () => void;
  onAddOffer: () => void;
  inSheet?: boolean;
};

export const LotDetail = ({ group, searchTerm, onClose, onAddOffer, inSheet = false }: Props) => {
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);
  const matchedRowRef = useRef<HTMLTableRowElement>(null);
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase("ru");
  const matchesItem = (name: string | null) =>
    Boolean(normalizedSearch && name?.toLocaleLowerCase("ru").includes(normalizedSearch));
  const firstMatchIndex = group.items.findIndex((item) => matchesItem(item.name));

  useEffect(() => {
    if (firstMatchIndex < 0) return;
    const frame = window.requestAnimationFrame(() => {
      const row = matchedRowRef.current;
      const scrollArea = row?.closest<HTMLElement>(inSheet ? `.${Styles.lotScroll}` : `.${Styles.tableWrap}`);
      if (!row || !scrollArea) return;
      const offset = row.getBoundingClientRect().top - scrollArea.getBoundingClientRect().top;
      scrollArea.scrollTo({ top: scrollArea.scrollTop + offset - 24, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [group.note, normalizedSearch, inSheet, firstMatchIndex]);

  const renderItemName = (name: string | null) => {
    if (!name || !normalizedSearch) return name;
    const matchStart = name.toLocaleLowerCase("ru").indexOf(normalizedSearch);
    if (matchStart < 0) return name;

    const matchEnd = matchStart + normalizedSearch.length;
    return <>{name.slice(0, matchStart)}<mark className={Styles.searchMatch}>{name.slice(matchStart, matchEnd)}</mark>{name.slice(matchEnd)}</>;
  };
  const units = [...new Set(group.items.map((item) => item.unit.trim()).filter(Boolean))];
  const itemForm = new Intl.PluralRules("ru").select(group.items.length);
  const itemWord = itemForm === "one" ? "товар" : itemForm === "few" ? "товара" : "товаров";

  return (
  <section className={Styles.detail} aria-label={`Информация о лоте ${group.note}`}>
    <div className={Styles.detailHero}>
      <div className={Styles.detailTop}>
        <span className={Styles.detailKicker}>ЗАКУПКА / ЛОТ</span>
        <div className={Styles.detailActions}>
          <span className={Styles.detailBadge}>Состав заявки</span>
          {!inSheet && (
            <button type="button" className={Styles.closeDetail} onClick={onClose} aria-label="Закрыть информацию о лоте">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
            </button>
          )}
        </div>
      </div>
      <div className={Styles.detailTitleRow}>
        <div>
          <p className={Styles.detailCaption}>Номер лота</p>
          <h2>{group.note}</h2>
          <p className={Styles.detailLead}>Перечень товаров и объём поставки по выбранной закупке.</p>
        </div>
        <div className={Styles.detailSymbol} aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none"><path d="M24 5 41 14.5v19L24 43 7 33.5v-19L24 5Z" stroke="currentColor" strokeWidth="2"/><path d="m7 14.5 17 10 17-10M24 24.5V43" stroke="currentColor" strokeWidth="2"/></svg>
        </div>
      </div>
    </div>
    <div className={Styles.summary}>
      <div><span>ПОЗИЦИИ ЛОТА</span><p><strong>{group.items.length}</strong><small>{itemWord} в заявке</small></p></div>
      <div><span>ЕДИНИЦЫ ИЗМЕРЕНИЯ</span><p><strong>{units.length}</strong><small title={units.join(" · ") || "Не указаны"}>{units.join(" · ") || "не указаны"}</small></p></div>
    </div>
    <div className={Styles.itemsHeading}>
      <div><span className={Styles.sectionKicker}>СОСТАВ ЗАЯВКИ</span><h3>Перечень товаров</h3></div>
      <span>{group.items.length} поз.</span>
    </div>
    <div className={Styles.tableWrap}>
      <table className={Styles.itemsTable}>
        <thead><tr><th scope="col">№</th><th scope="col">Наименование</th><th scope="col">Количество</th></tr></thead>
        <tbody>
          {group.items.map((item, index) => (
            <tr
              key={item.id}
              ref={index === firstMatchIndex ? matchedRowRef : undefined}
              className={matchesItem(item.name) ? Styles.matchedItem : undefined}
            >
              <td>{String(index + 1).padStart(2, "0")}</td>
              <td>
                <span className={Styles.desktopItemName}>{renderItemName(item.name)}</span>
                <button
                  type="button"
                  className={`${Styles.mobileItemName} ${expandedItemId === item.id ? Styles.itemNameExpanded : ""}`}
                  onClick={() => setExpandedItemId(expandedItemId === item.id ? null : item.id)}
                  aria-expanded={expandedItemId === item.id}
                  aria-label={`${item.name}. ${expandedItemId === item.id ? "Свернуть название" : "Показать полное название"}`}
                >{renderItemName(item.name)}</button>
              </td>
              <td><span className={Styles.quantityValue}><strong>{item.quantity === "" ? "—" : item.quantity}</strong><small>{item.unit}</small></span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className={Styles.detailFooter}>
      <div><strong>Готовы предложить поставку?</strong><span>Заполните форму и приложите ваше предложение.</span></div>
      <button type="button" onClick={onAddOffer}>Добавить предложение <span aria-hidden="true">↗</span></button>
    </div>
  </section>
  );
};
