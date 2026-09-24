import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Styles from './cart-button.module.scss';
import { getCart } from '../../utils/cartStorage';
import type { CartItem } from '../../utils/cartStorage';

type CartButtonProps = {
  goToBasket: () => void;
};

export const CartButton = ({
  goToBasket,
}: CartButtonProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bounce, setBounce] = useState(false);

  const prevCount = useRef(0);
  const bounceTimer =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  /* =========================================================
     CART STATE
     ========================================================= */

  useEffect(() => {
    const updateCart = () => {
      const newCart = getCart();

      const newCount = newCart.reduce(
        (sum, item) => sum + item.count,
        0,
      );

      /*
       * Анимация только когда количество товаров
       * увеличилось.
       */
      if (newCount > prevCount.current) {
        setBounce(true);

        if (bounceTimer.current) {
          clearTimeout(bounceTimer.current);
        }

        bounceTimer.current = setTimeout(() => {
          setBounce(false);
        }, 500);
      }

      prevCount.current = newCount;
      setCart(newCart);
    };

    updateCart();

    window.addEventListener(
      'cartUpdated',
      updateCart,
    );

    return () => {
      window.removeEventListener(
        'cartUpdated',
        updateCart,
      );

      if (bounceTimer.current) {
        clearTimeout(
          bounceTimer.current,
        );
      }
    };
  }, []);

  /* =========================================================
     TOTAL ITEMS
     ========================================================= */

  const totalItems = cart.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  /* =========================================================
     BUTTON
     ========================================================= */

  return (
    <motion.button
      type="button"
      className={Styles.cartButton}
      onClick={goToBasket}
      aria-label={
        totalItems > 0
          ? `Открыть корзину. Товаров: ${totalItems}`
          : 'Открыть корзину'
      }
      whileTap={{
        scale: 0.94,
      }}
      animate={
        bounce
          ? {
            scale: [1, 1.14, 0.97, 1],
          }
          : {
            scale: 1,
          }
      }
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* =====================================================
          ICON
          ===================================================== */}

      <span
        className={Styles.iconWrapper}
        aria-hidden="true"
      >
        <svg
          className={Styles.cartIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 4H5L7.4 15.2C7.58 16.04 8.32 16.64 9.18 16.64H17.72C18.5 16.64 19.2 16.12 19.44 15.38L21 10H6.3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx="9.5"
            cy="20"
            r="1.3"
            fill="currentColor"
          />

          <circle
            cx="17.5"
            cy="20"
            r="1.3"
            fill="currentColor"
          />
        </svg>
      </span>

      {/* =====================================================
          BADGE
          ===================================================== */}

      <AnimatePresence mode="popLayout">
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            className={Styles.badge}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 25,
            }}
            aria-hidden="true"
          >
            {totalItems > 99
              ? '99+'
              : totalItems}
          </motion.span>
        )}
      </AnimatePresence>

      {/* =====================================================
          SUBTLE GLOW
          ===================================================== */}

      <span
        className={Styles.buttonGlow}
        aria-hidden="true"
      />
    </motion.button>
  );
};