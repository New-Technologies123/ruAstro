import React from "react";
import Styles from "./procurement.module.scss";

type Item = {
  id: number;
  name: string;
  quantity: number | string;
  unit: string;
};

type Group = {
  note: string;
  items: Item[];
};

type Props = {
  group: Group;
  isExpanded: boolean;
  isSearching: boolean;
  onToggle: (note: string) => void;
  onAddOffer: (group: Group) => void;
};

export const GroupCard: React.FC<Props> = ({
  group,
  isExpanded,
  isSearching,
  onToggle,
  onAddOffer
}) => {
  const showMultiple = group.items.length > 1;

  return (
    <div className={Styles.card}>
      <div
        className={Styles.cardHeader}
        onClick={() =>
          !isSearching && showMultiple && onToggle(group.note)
        }
        style={{
          cursor: !isSearching && showMultiple ? "pointer" : "default"
        }}
      >
        <h3>Примечание: {group.note}</h3>
        {showMultiple && !isSearching && (
          <span>{isExpanded ? "▲" : "▼"}</span>
        )}
      </div>

      <div className={Styles.groupItems}>
        {group.items.map((item, index) => {
          if (!isExpanded && showMultiple && index > 0) return null;

          return (
            <div key={item.id} className={Styles.groupItem}>
              <p><b>{item.name}</b></p>
              <p>{item.quantity} {item.unit}</p>
            </div>
          );
        })}
      </div>

      <button
        className={Styles.button}
        onClick={() => onAddOffer(group)}
      >
        Добавить предложение
      </button>
    </div>
  );
};