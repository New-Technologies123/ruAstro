import { useEffect, useState } from 'react';
import Styles from './order.module.scss';
import { getCart } from '../../utils/cartStorage';
import type { CartItem } from '../../utils/cartStorage';

export const Order = () => {
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

  return (
    <div className={Styles.orderPage}>
      <h1>Оформление заказа</h1>

      <div className={Styles.content}>
        {/* ФОРМА */}
        <form className={Styles.form}>
          <h2>Контактные данные</h2>

          <input type="text" placeholder="ФИО" />
          <input type="text" placeholder="Название компании" />
          <input type="email" placeholder="Email" />
          <input type="tel" placeholder="Телефон" />

          <textarea placeholder="Текст обращения / комментарий" rows={4} />

          <button type="submit">Отправить заказ</button>
        </form>

        {/* ЗАКАЗ */}
        <div className={Styles.summary}>
          <h2>Ваш заказ</h2>

          {cart.map(item => (
            <div key={item.id} className={Styles.product}>
              <div className={Styles.title}>{item.title}</div>
              <div className={Styles.count}>× {item.count}</div>
              <div className={Styles.price}>
                {parsePrice(item.price) * item.count} ₽
              </div>
            </div>
          ))}

          <div className={Styles.total}>
            <span>Итого:</span>
            <strong>{totalPrice} ₽</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
