import { useEffect, useState } from 'react';
import Styles from './basket.module.scss';
import { Title } from '../../ui/title/Title';
import { getCart, removeFromCart } from '../../utils/cartStorage';
import type { CartItem } from '../../utils/cartStorage';

type BasketProps = {
  onBack: () => void;
};

export const Basket = ({ onBack }: BasketProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const parsePrice = (price: string): number =>
    Number(price.replace(/\s/g, ''));

  const totalPrice = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.count,
    0
  );

  if (!cart.length) {
    return (
      <>
        <Title text="Корзина пуста" />
        <button className={Styles.back} onClick={onBack}>
          ← Назад в магазин
        </button>
      </>
    );
  }

  return (
    <>
      <div className={Styles.headerRow}>
        <button className={Styles.back} onClick={onBack}></button>
        <Title text="Корзина"/>
      </div>
      {/* <Title text="Корзина" />
      <button className={Styles.back} onClick={onBack}>
        
      </button> */}

      <ul className={Styles.items}>
        {cart.map(item => (
          <li key={item.id} className={Styles.item}>
            <span className={Styles.title}>{item.title}</span>
            <div className={Styles.rightSide}>
              <span className={Styles.countPrice}>
                {item.count} × {item.price} ₽
              </span>
              <button
                className={Styles.delete}
                onClick={() => {
                  removeFromCart(item.id);
                  setCart(getCart());
                }}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={Styles.right}>
        <div className={Styles.total}>
          <p>Итого:</p>
          <h4>{totalPrice} ₽</h4>
          <p>без НДС</p>
        </div>

        <a href="/order" className={Styles.order}>
          Оформить заказ
        </a>
      </div>
    </>
  );
};
