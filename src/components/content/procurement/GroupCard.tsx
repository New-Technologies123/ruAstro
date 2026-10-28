import React from "react";
import Styles from "./group-card.module.scss";

type Group = {
  note: string;
  items: { id: number; name: string | null }[];
};

type Props = {
  group: Group;
  isSelected: boolean;
  onSelect: (trigger: HTMLButtonElement) => void;
};

export const GroupCard: React.FC<Props> = ({ group, isSelected, onSelect }) => (
  <button
    type="button"
    className={`${Styles.card} ${isSelected ? Styles.selected : ""}`}
    onClick={(event) => onSelect(event.currentTarget)}
    aria-pressed={isSelected}
  >
    <span className={Styles.cardTop}>
      <span className={Styles.lotLabel}>ЛОТ</span>
      <span className={Styles.itemCount}>{group.items.length} поз.</span>
    </span>
    <span className={Styles.lotTitle}>{group.note}</span>
    <span className={Styles.preview}>{group.items[0]?.name || "Состав лота"}</span>
    <span className={Styles.cardBottom}>
      <span>Посмотреть состав</span>
      <span className={Styles.arrow} aria-hidden="true">→</span>
    </span>
  </button>
);
