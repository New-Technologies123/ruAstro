import { useEffect, useRef, useState } from 'react';
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
  const bounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const updateCart = () => {
      const newCart = getCart();

      const newCount = newCart.reduce(
        (sum, item) => sum + item.count,
        0
      );

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

    window.addEventListener('cartUpdated', updateCart);

    return () => {
      window.removeEventListener('cartUpdated', updateCart);

      if (bounceTimer.current) {
        clearTimeout(bounceTimer.current);
      }
    };
  }, []);

  const parsePrice = (price: string) => {
    const normalizedPrice = price
      .replace(/\s/g, '')
      .replace(',', '.');

    return Number(normalizedPrice) || 0;
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.count,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const formattedTotal = new Intl.NumberFormat('ru-RU').format(
    totalPrice
  );

  return (
    <div
      className={Styles.cartWrapper}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* =====================================================
          CART BUTTON
          ===================================================== */}

      <motion.button
        type="button"
        className={Styles.cartButton}
        onClick={goToBasket}
        aria-label={
          totalItems > 0
            ? `Открыть корзину. Товаров: ${totalItems}`
            : 'Открыть корзину'
        }
        whileTap={{ scale: 0.94 }}
        animate={
          bounce
            ? {
                scale: [1, 1.15, 0.97, 1],
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
        <span className={Styles.iconWrapper}>
          <svg
            className={Styles.cartIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
              {totalItems > 99 ? '99+' : totalItems}
            </motion.span>
          )}
        </AnimatePresence>

        <span className={Styles.buttonGlow} />
      </motion.button>

      {/* =====================================================
          DESKTOP CART PREVIEW
          ===================================================== */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={Styles.dropdown}
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.97,
            }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* =================================================
                DROPDOWN HEADER
                ================================================= */}

            <div className={Styles.dropdownHeader}>
              <div>
                <span className={Styles.dropdownEyebrow}>
                  Покупки
                </span>

                <h3 className={Styles.dropdownTitle}>
                  Ваша корзина
                </h3>
              </div>

              {totalItems > 0 && (
                <span className={Styles.itemCount}>
                  {totalItems}{' '}
                  {totalItems === 1
                    ? 'товар'
                    : totalItems >= 2 && totalItems <= 4
                      ? 'товара'
                      : 'товаров'}
                </span>
              )}
            </div>

            {/* =================================================
                EMPTY CART
                ================================================= */}

            {cart.length === 0 ? (
              <div className={Styles.empty}>
                <div className={Styles.emptyIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 4H5L7.4 15.2C7.58 16.04 8.32 16.64 9.18 16.64H17.72C18.5 16.64 19.2 16.12 19.44 15.38L21 10H6.3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx="9.5"
                      cy="20"
                      r="1.2"
                      fill="currentColor"
                    />

                    <circle
                      cx="17.5"
                      cy="20"
                      r="1.2"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <p className={Styles.emptyTitle}>
                  Корзина пока пуста
                </p>

                <p className={Styles.emptyText}>
                  Добавьте товары из{' '}
                  <a
                    href="/shop"
                    className={Styles.shopLink}
                  >
                    онлайн-магазина
                  </a>{' '}
                  чтобы оформить заказ
                </p>
              </div>
            ) : (
              <>
                {/* =================================================
                    ITEMS
                    ================================================= */}

                <ul className={Styles.items}>
                  {cart.map((item, index) => (
                    <motion.li
                      key={item.id}
                      className={Styles.item}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.03,
                      }}
                    >
                      <div className={Styles.itemInfo}>
                        <span className={Styles.itemTitle}>
                          {item.title}
                        </span>

                        <span className={Styles.itemQuantity}>
                          {item.count}{' '}
                          {item.count === 1
                            ? 'шт.'
                            : 'шт.'}
                        </span>
                      </div>

                      <span className={Styles.itemPrice}>
                        {new Intl.NumberFormat('ru-RU').format(
                          parsePrice(item.price) * item.count
                        )}{' '}
                        ₽
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* =================================================
                    TOTAL
                    ================================================= */}

                <div className={Styles.total}>
                  <span className={Styles.totalLabel}>
                    Итого
                  </span>

                  <strong className={Styles.totalPrice}>
                    {formattedTotal} ₽
                  </strong>
                </div>

                {/* =================================================
                    ACTION
                    ================================================= */}

                <button
                  type="button"
                  className={Styles.openBasketButton}
                  onClick={goToBasket}
                >
                  <span>Перейти в корзину</span>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};