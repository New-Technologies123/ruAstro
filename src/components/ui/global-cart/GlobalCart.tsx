import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Basket } from '../../ui/basket/Basket';
import { Order } from '../../ui/order/Order';
import { CartButton } from '../../ui/cart-button/CartButton';
import Styles from './global-cart.module.scss';

export const GlobalCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'cart' | 'order'>('cart');

  // 🔹 слушаем глобальное событие toggleGlobalCart
  useEffect(() => {
    const handler = () => {
      setMode('cart'); // всегда открываем на корзине
      setIsOpen(prev => !prev);
    };
    window.addEventListener('toggleGlobalCart', handler);
    return () => window.removeEventListener('toggleGlobalCart', handler);
  }, []);

  const openCart = () => {
    setMode('cart');
    setIsOpen(true);
  };
  const closeCart = () => setIsOpen(false);

  // 🔹 блокировка скролла при открытой корзине
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [isOpen]);

  return (
    <>
      {/* Кнопка глобальной корзины */}
      <CartButton goToBasket={openCart} />

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={Styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
            />

            {/* Панель корзины / заказа */}
            <motion.div
              className={Styles.panel}
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            >
              {mode === 'cart' && (
                <Basket onBack={closeCart} goToOrder={() => setMode('order')} />
              )}
              {mode === 'order' && <Order onBack={() => setMode('cart')} />}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};