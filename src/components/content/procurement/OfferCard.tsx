// OfferCard.tsx
import React from "react";
import Styles from "./procurement.module.scss";

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

type Props = {
  offer: Offer;
  isOpen: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const OfferCard: React.FC<Props> = ({
  offer,
  isOpen,
  onToggle,
  onEdit,
  onDelete
}) => {
  return (
    <div
      className={Styles.offerCard}
      onClick={onToggle}
      style={{ cursor: "pointer" }}
    >
      <div className={Styles.offerHeader}>
        <b>Группа: {offer.groupNote}</b>

        <div
          className={Styles.offerActions}
          onClick={e => e.stopPropagation()}
        >
          <button className={Styles.editButton} onClick={onEdit}>
            Редактировать
          </button>
          <button className={Styles.deleteButton} onClick={onDelete}>
            Удалить
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={Styles.offerContent}>
          {offer.proposed.map((p, i) => (
            <div key={i} className={Styles.proposedItem}>
              <p>Товар: {p.proposedName}</p>
              <p>Количество: {p.quantity}</p>
              <p>Примечание: {p.note}</p>
            </div>
          ))}

          <p>Файл: {offer.file.name}</p>
        </div>
      )}
    </div>
  );
};