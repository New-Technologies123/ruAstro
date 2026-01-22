import { useState, useEffect } from 'react';
import Styles from './cart-button.module.scss';
import { getCart } from '../../utils/cartStorage';
import type { CartItem } from '../../utils/cartStorage';

type CartButtonProps = {
  goToBasket: () => void;
};

export const CartButton = ({ goToBasket }: CartButtonProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCart(getCart());
    const onStorage = () => setCart(getCart());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const parsePrice = (price: string): number =>
    Number(price.replace(/\s/g, ''));
  // Считаем итоговую сумму
  const totalPrice = cart.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.count;
  }, 0);

  return (
    <div
      className={Styles.cartWrapper}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button type="button" className={Styles.cartButton} onClick={goToBasket}>
        🛒
        {cart.length > 0 && <span className={Styles.badge}>{cart.length}</span>}
      </button>

      {isOpen && (
        <div className={Styles.dropdown}>
          {cart.length === 0 ? (
            <p className={Styles.empty}>Корзина пуста</p>
          ) : (
            <>
              <ul className={Styles.items}>
                {cart.map(item => (
                  <li key={item.id} className={Styles.item}>
                    <span>{item.title}</span>
                    <span>{item.count} × {item.price} ₽</span>
                  </li>
                ))}
              </ul>
              <div className={Styles.total}>
                <strong>Итого: {totalPrice} ₽</strong>
              </div>
            </>
          )}
          {/* <button className={Styles.viewBasket} onClick={goToBasket}>
            Перейти в корзину
          </button> */}
        </div>
      )}
    </div>
  );
};
