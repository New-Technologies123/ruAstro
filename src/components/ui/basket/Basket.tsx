import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Styles from './basket.module.scss';
import { Title } from '../../ui/title/Title';

import {
  getCart,
  removeFromCart,
  changeItemCount,
  type CartItem
} from '../../utils/cartStorage';

type BasketProps = {
  onBack: () => void;
  goToOrder: () => void;
};

export const Basket = ({ onBack, goToOrder }: BasketProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const update = () => setCart(getCart());
    update();
    window.addEventListener('cartUpdated', update);
    return () => window.removeEventListener('cartUpdated', update);
  }, []);

  const parsePrice = (price: string): number =>
    Number(price.replace(/\s/g, ''));

  const totalPrice = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.count,
    0
  );

  if (!cart.length) {
    return (
      <div className={Styles.headerRow}>
        <button className={Styles.back} onClick={onBack}>
          ←
        </button>
        <Title text="Корзина пуста" />
      </div>
    );
  }

  return (
    <>
      <div className={Styles.headerRow}>
        <button className={Styles.back} onClick={onBack}>
          ←
        </button>
        <Title text="Корзина" />
      </div>

      <ul className={Styles.items}>
        <AnimatePresence>
          {cart.map((item, index) => (
            <motion.li
              key={item.id}
              className={Styles.item}
              layout
              initial={{
                opacity: 0,
                y: 60,
                rotateX: -15,
                scale: 0.96
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1
              }}
              exit={{
                opacity: 0,
                y: -30,
                rotateX: 10,
                scale: 0.95
              }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 16,
                delay: index * 0.06
              }}
              style={{ transformPerspective: 1000 }}
            >
              <span className={Styles.title}>{item.title}</span>

              <div className={Styles.rightSide}>
                <div className={Styles.counter}>
                  <button onClick={() => changeItemCount(item.id, -1)}>−</button>
                  <span>{item.count}</span>
                  <button onClick={() => changeItemCount(item.id, 1)}>+</button>
                </div>

                <span className={Styles.countPrice}>
                  {item.price} ₽
                  <p>без НДС</p>
                </span>

                <button
                  className={Styles.delete}
                  onClick={() => removeFromCart(item.id)}
                >
                  Удалить
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className={Styles.right}>
        <div className={Styles.total}>
          <p>Итого:</p>
          <h4>{totalPrice} ₽</h4>
          <p>без НДС</p>
        </div>

        <button className={Styles.order} onClick={goToOrder}>
          Оформить заказ
        </button>
      </div>
    </>
  );
};
