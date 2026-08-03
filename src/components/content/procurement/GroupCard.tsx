import React from "react";
import Styles from "./group-card.module.scss";

type Item = {
  id: number;
  name: string | null;
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
  const isSingleItem = group.items.length === 1;

  const getVisibleItems = () => {
    if (isSearching) return group.items;
    if (!isExpanded) return group.items.slice(0, 1);
    return group.items;
  };

  const visibleItems = getVisibleItems();
  const hasMoreItems = group.items.length > 1 && !isExpanded;
  const remainingCount = group.items.length - 1;

  const handleToggle = () => {
    if (!isSearching && showMultiple) {
      onToggle(group.note);
    }
  };

  const getItemsText = (count: number) => {
    if (count === 1) return 'товар';
    if (count >= 2 && count <= 4) return 'товара';
    return 'товаров';
  };

  return (
    <div 
      className={`${Styles.card} ${isExpanded ? Styles.expanded : ''} ${isSingleItem ? Styles.singleItem : ''}`} 
      onClick={handleToggle}
    >
      <div className={Styles.cardContent}>
        <div className={Styles.cardHeader}>
          <h3 className={Styles.lotTitle}>Лот: {group.note}</h3>
          <span className={Styles.totalCount}>
            {group.items.length} {getItemsText(group.items.length)}
          </span>
          {showMultiple && !isSearching && (
            <button 
              className={`${Styles.toggleButton} ${isExpanded ? Styles.expanded : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleToggle();
              }}
              title={isExpanded ? 'Свернуть' : 'Развернуть'}
            >
              <svg 
                className={Styles.icon} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          )}
        </div>

        <div className={`${Styles.groupItems} ${isExpanded ? Styles.expanded : ''}`}>
          {visibleItems.map((item) => (
            <div key={item.id} className={Styles.groupItem}>
              <span className={Styles.itemName}>{item.name}</span>
              <span className={Styles.itemQuantity}>
                {item.quantity} {item.unit}
              </span>
            </div>
          ))}
        </div>

        {hasMoreItems && !isSearching && (
          <div 
            className={Styles.showMore}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          >
            Еще {remainingCount} {getItemsText(remainingCount)}
          </div>
        )}
      </div>

      <div className={Styles.buttonWrapper}>
        <button
          className={Styles.button}
          onClick={(e) => {
            e.stopPropagation();
            onAddOffer(group);
          }}
        >
          Добавить предложение
        </button>
      </div>
    </div>
  );
};