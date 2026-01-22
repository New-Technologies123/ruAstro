import { useEffect, useState } from 'react';
import Styles from './basket.module.scss';
import { Title } from '../../ui/title/Title';
import { getCart, removeFromCart } from '../../utils/cartStorage';
import type { CartItem } from '../../utils/cartStorage';

type BasketProps = {
  onBack: () => void; // добавляем пропс
};

export const Basket = ({ onBack }: BasketProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const parsePrice = (price: string): number =>
    Number(price.replace(/\s/g, ''));

  const totalPrice = cart.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.count;
  }, 0);

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
      <Title text="Корзина" />
      <button className={Styles.back} onClick={onBack}>
        ← Назад в магазин
      </button>

      <div className={Styles.items}>
        {cart.map(item => (
          <div key={item.id} className={Styles.item}>
            <div className={Styles.info}>
              <h3>{item.title}</h3>
              <p>Количество: {item.count}</p>
              <h1>{item.price} ₽</h1>
            </div>

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
        ))}
      </div>

      <div className={Styles.right}>
        <div className={Styles.total}>
          <p>Итого:</p>
          <h4>{totalPrice} ₽</h4>
        </div>

        <a href="/order" className={Styles.order}>
          Оформить заказ
        </a>
      </div>
    </>
  );
};
