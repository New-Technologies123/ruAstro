import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Basket } from '../../ui/basket/Basket';
import { Order } from '../../ui/order/Order';
import { CartButton } from '../../ui/cart-button/CartButton';

import Styles from './global-cart.module.scss';


type CartMode = 'cart' | 'order';


export const GlobalCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<CartMode>('cart');


  /* =========================================================
     GLOBAL CART EVENT
     ========================================================= */

  useEffect(() => {
    const handler = () => {
      setMode('cart');
      setIsOpen(prev => !prev);
    };

    window.addEventListener(
      'toggleGlobalCart',
      handler
    );

    return () => {
      window.removeEventListener(
        'toggleGlobalCart',
        handler
      );
    };
  }, []);


  /* =========================================================
     OPEN / CLOSE
     ========================================================= */

  const openCart = () => {
    setMode('cart');
    setIsOpen(true);
  };


  const closeCart = () => {
    setIsOpen(false);
  };


  /* =========================================================
     ESC
     ========================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCart();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [isOpen]);


  /* =========================================================
     BODY SCROLL LOCK
     ========================================================= */

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      return;
    }

    const scrollBarWidth =
      window.innerWidth -
      document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';

    if (scrollBarWidth > 0) {
      document.body.style.paddingRight =
        `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);


  return (
    <>
      {/* =====================================================
          GLOBAL CART BUTTON
          ===================================================== */}

      <CartButton
        goToBasket={openCart}
      />


      <AnimatePresence mode="wait">

        {isOpen && (
          <>

            {/* =================================================
                BACKDROP
                ================================================= */}

            <motion.div
              className={Styles.backdrop}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
                ease: 'easeOut',
              }}
              onClick={closeCart}
              aria-hidden="true"
            />


            {/* =================================================
                PANEL
                ================================================= */}

            <motion.aside
              className={Styles.panel}
              initial={{
                x: '100%',
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: '100%',
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 32,
                mass: 0.8,
              }}
              role="dialog"
              aria-modal="true"
              aria-label={
                mode === 'cart'
                  ? 'Корзина'
                  : 'Оформление заказа'
              }
            >

              {/* ===============================================
                  CONTENT
                  =============================================== */}

              <div className={Styles.panelContent}>

                {mode === 'cart' && (
                  <Basket
                    onBack={closeCart}
                    goToOrder={() =>
                      setMode('order')
                    }
                  />
                )}

                {mode === 'order' && (
                  <Order
                    onBack={() =>
                      setMode('cart')
                    }
                  />
                )}

              </div>

            </motion.aside>

          </>
        )}

      </AnimatePresence>
    </>
  );
};