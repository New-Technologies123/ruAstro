import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Styles from './cart-button.module.scss';
import { getCart } from '../../utils/cartStorage';
import type { CartItem } from '../../utils/cartStorage';

type CartButtonProps = {
  goToBasket: () => void;
};

export const CartButton = ({ goToBasket }: CartButtonProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [bounce, setBounce] = useState(false);
  const prevCount = useRef(0);

  useEffect(() => {
    const update = () => {
      const newCart = getCart();
      const newCount = newCart.reduce((s, i) => s + i.count, 0);

      if (newCount > prevCount.current) {
        setBounce(true);
        setTimeout(() => setBounce(false), 500);
      }

      prevCount.current = newCount;
      setCart(newCart);
    };

    update();
    window.addEventListener('cartUpdated', update);
    return () => window.removeEventListener('cartUpdated', update);
  }, []);

  const parsePrice = (price: string) =>
    Number(price.replace(/\s/g, ''));

  const totalPrice = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.count,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div
      className={Styles.cartWrapper}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        type="button"
        className={Styles.cartButton}
        onClick={goToBasket}
        animate={
          bounce
            ? { scale: [1, 1.2, 0.95, 1], rotate: [0, -8, 8, 0] }
            : {}
        }
        transition={{ duration: 0.5 }}
      >
        🛒

        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              className={Styles.badge}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1.4, 1], opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={Styles.dropdown}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {cart.length === 0 ? (
              <p className={Styles.empty}>Корзина пуста</p>
            ) : (
              <>
                <ul className={Styles.items}>
                  {cart.map(item => (
                    <motion.li
                      key={item.id}
                      className={Styles.item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>{item.title}</span>
                      <span>
                        {item.count} × {item.price} ₽
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <div className={Styles.total}>
                  <strong>Итого: {totalPrice} ₽</strong>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
