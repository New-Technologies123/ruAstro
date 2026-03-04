import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Styles from './basket.module.scss';
import { Title } from '../../ui/title/Title';

import {
  getCart,
  removeFromCart,
  changeItemCount,
  clearCart,
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

  const parsePrice = (price: string) => Number(price.replace(/\s/g, ''));
  const totalPrice = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.count, 0);

  const handleClearCart = () => {
    if (confirm('Вы точно хотите очистить корзину?')) {
      setCart([]);
      clearCart();
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  // Apple Store–стиль анимации с эффектом схлопывания
  const itemVariants = {
    initial: { opacity: 0, y: 40, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: {
      opacity: 0,
      scale: 0.85,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] }
    }
  };

  return (
    <div className={Styles.basketContainer}>
      {/* Header */}
      <div className={Styles.headerRow}>
        <button className={Styles.back} onClick={onBack}>←</button>
        <Title text="Корзина" />
        {cart.length > 0 && (
          <motion.button
            className={Styles.clearCartIcon}
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearCart}
          >
            🗑️
          </motion.button>
        )}
      </div>

      {/* Items / Empty */}
      <div className={Styles.contentWrapper}>
        {cart.length === 0 ? (
          <motion.div
            className={Styles.emptyContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <h3>Корзина пуста</h3>
            <p>Добавьте товары, чтобы оформить заказ</p>
          </motion.div>
        ) : (
          <ul className={Styles.items}>
            <AnimatePresence>
              {cart.map((item) => (
                <motion.li
                  key={item.id}
                  className={Styles.item}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.85,
                    height: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] } as any // 👈 типизация
                  }}
                  transition={{
                    layout: { type: 'spring', stiffness: 140, damping: 20 },
                    default: { duration: 0.35 }
                  }}
                >
                  <div className={Styles.itemCard}>
                    <img src={item.image || '/images/default-product.png'} alt={item.title} />
                    <div className={Styles.itemInfo}>
                      <h4>{item.title}</h4>
                      <p className={Styles.price}>{item.price} ₽ <span>без НДС</span></p>
                      <div className={Styles.counter}>
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => changeItemCount(item.id, -1)}
                        >−</motion.button>
                        <span>{item.count}</span>
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => changeItemCount(item.id, 1)}
                        >+</motion.button>
                      </div>
                    </div>
                    <motion.button
                      className={Styles.delete}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      ✕
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      {/* Bottom Panel */}
      {cart.length > 0 && (
        <motion.div
          className={Styles.bottomPanel}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
          <div className={Styles.total}>
            <p>Итого:</p>
            <h4>{totalPrice.toLocaleString('ru-RU')} ₽</h4>
            <p>без НДС</p>
          </div>
          <motion.button
            className={Styles.order}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.97 }}
            onClick={goToOrder}
          >
            Оформить заказ
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};