import { useState } from 'react';
import Styles from './cards.module.scss';

type TProps = {
  title: string;
  price: number;
  onClick?: () => void;
  onAddToCart?: (quantity: number) => void;
};

export const Cards = ({ title, price, onClick, onAddToCart }: TProps) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className={Styles.certificatesList}>
      <div className={Styles.actionTitle} onClick={onClick}>
        <p>{title}</p>

        {/* Блок с ценой, количеством и кнопкой */}
        <div className={Styles.cardInfo}>
          <div className={Styles.price}>Цена: {price.toLocaleString('ru-RU')} ₽</div>

          <div className={Styles.quantityControls}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                decrement();
              }}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                increment();
              }}
            >
              +
            </button>
          </div>

          <button
            className={Styles.addToCartButton}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(quantity);
            }}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};
