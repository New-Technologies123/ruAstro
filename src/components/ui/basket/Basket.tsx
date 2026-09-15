import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Styles from './basket.module.scss';

import {
  getCart,
  removeFromCart,
  changeItemCount,
  clearCart,
  type CartItem,
} from '../../utils/cartStorage';

type BasketProps = {
  onBack: () => void;
  goToOrder: () => void;
};

/* =========================
   Иконки
========================= */

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M19 12H5M11 18l-6-6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6L6 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MinusIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6 12h12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 6v12M6 12h12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path
      d="M12 17h24l3 24H9l3-24Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path
      d="M17 18v-4a7 7 0 0 1 14 0v4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M3 6h11v10H3zM14 10h4l3 3v3h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 0 0 4Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="m5 12 4 4L19 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================
   Вспомогательные функции
========================= */

const parsePrice = (price: string): number => {
  const normalized = price
    .replace(/\s/g, '')
    .replace(/[^\d.,-]/g, '')
    .replace(',', '.');

  const result = Number(normalized);

  return Number.isFinite(result) ? result : 0;
};

const formatPrice = (price: number): string => {
  return price.toLocaleString('ru-RU');
};

const getProductWord = (count: number): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return 'товар';
  }

  if (
    mod10 >= 2 &&
    mod10 <= 4 &&
    (mod100 < 10 || mod100 >= 20)
  ) {
    return 'товара';
  }

  return 'товаров';
};

/* =========================
   Basket
========================= */

export const Basket = ({ onBack, goToOrder }: BasketProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = () => {
      setCart(getCart());
    };

    loadCart();

    window.addEventListener('cartUpdated', loadCart);

    return () => {
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  const totalCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.count, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => {
      return sum + parsePrice(item.price) * item.count;
    }, 0);
  }, [cart]);

  const uniqueProducts = cart.length;

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  const handleDecrease = (id: number) => {
    changeItemCount(id, -1);
  };

  const handleIncrease = (id: number) => {
    changeItemCount(id, 1);
  };

  const handleClear = () => {
    if (cart.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      'Вы действительно хотите очистить корзину?'
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={Styles.basketContainer}>
      {/* =========================
          HEADER
      ========================= */}

      <header className={Styles.header}>
        <div className={Styles.headerInner}>
          <button
            type="button"
            className={Styles.backButton}
            onClick={onBack}
            aria-label="Вернуться назад"
          >
            <span className={Styles.backIcon}>
              <ArrowLeftIcon />
            </span>

            <span className={Styles.backText}>
              Назад
            </span>
          </button>

          <div className={Styles.headerTitle}>
            <h1>Корзина</h1>

            {cart.length > 0 && (
              <span className={Styles.headerCount}>
                {totalCount} {getProductWord(totalCount)}
              </span>
            )}
          </div>

          {cart.length > 0 ? (
            <button
              type="button"
              className={Styles.clearButton}
              onClick={handleClear}
              aria-label="Очистить корзину"
            >
              <TrashIcon />
              <span>Очистить</span>
            </button>
          ) : (
            <div className={Styles.headerSpacer} />
          )}
        </div>
      </header>

      {/* =========================
          MAIN
      ========================= */}

      <main className={Styles.main}>
        <AnimatePresence mode="wait">
          {cart.length === 0 ? (
            <motion.section
              key="empty"
              className={Styles.emptyState}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <div className={Styles.emptyIcon}>
                <ShoppingBagIcon />
              </div>

              <h2>В корзине пока пусто</h2>

              <p>
                Добавьте оборудование и комплектующие
                из онлайн-магазина, чтобы оформить заказ.
              </p>

              <a
                href="/shop"
                className={Styles.emptyButton}
              >
                <span>Перейти в онлайн-магазин</span>
                <ArrowRightIcon />
              </a>
            </motion.section>
          ) : (
            <motion.div
              key="content"
              className={Styles.page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* =========================
                  PROGRESS
              ========================= */}

              <div className={Styles.progress}>
                <div className={`${Styles.progressStep} ${Styles.progressStepActive}`}>
                  <span className={Styles.progressNumber}>
                    <CheckIcon />
                  </span>

                  <div>
                    <strong>Корзина</strong>
                    <span>Проверка товаров</span>
                  </div>
                </div>

                <div className={Styles.progressLine} />

                <div className={Styles.progressStep}>
                  <span className={Styles.progressNumber}>
                    2
                  </span>

                  <div>
                    <strong>Оформление</strong>
                    <span>Контактные данные</span>
                  </div>
                </div>
              </div>

              {/* =========================
                  GRID
              ========================= */}

              <div className={Styles.contentGrid}>
                {/* =========================
                    PRODUCTS
                ========================= */}

                <section className={Styles.productsCard}>
                  <div className={Styles.productsHeader}>
                    <div>
                      <span className={Styles.sectionLabel}>
                        Ваш заказ
                      </span>

                      <h2>Товары</h2>

                      <p>
                        {uniqueProducts}{' '}
                        {getProductWord(uniqueProducts)}
                        {totalCount !== uniqueProducts &&
                          ` · ${totalCount} шт.`}
                      </p>
                    </div>

                    <a
                      href="/shop"
                      className={Styles.continueLink}
                    >
                      <span>Продолжить покупки</span>
                      <ArrowRightIcon />
                    </a>
                  </div>

                  <div className={Styles.itemsList}>
                    <AnimatePresence initial={false}>
                      {cart.map((item) => {
                        const unitPrice = parsePrice(item.price);
                        const itemTotal = unitPrice * item.count;

                        return (
                          <motion.article
                            key={item.id}
                            className={Styles.productItem}
                            layout
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              x: -20,
                              height: 0,
                              marginBottom: 0,
                            }}
                            transition={{
                              duration: 0.22,
                            }}
                          >
                            {/* IMAGE */}

                            <div className={Styles.productImage}>
                              <img
                                src={
                                  item.image ||
                                  '/images/default-product.png'
                                }
                                alt={item.title}
                                loading="lazy"
                              />
                            </div>

                            {/* INFO */}

                            <div className={Styles.productInfo}>
                              <div className={Styles.productTop}>
                                <div className={Styles.productText}>
                                  <h3>{item.title}</h3>

                                  <span className={Styles.productType}>
                                    Оборудование
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  className={Styles.removeButton}
                                  onClick={() =>
                                    handleRemove(item.id)
                                  }
                                  aria-label={`Удалить ${item.title}`}
                                  title="Удалить товар"
                                >
                                  <CloseIcon />
                                </button>
                              </div>

                              <div className={Styles.productBottom}>
                                {/* QUANTITY */}

                                <div className={Styles.quantity}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDecrease(item.id)
                                    }
                                    aria-label="Уменьшить количество"
                                  >
                                    <MinusIcon />
                                  </button>

                                  <span>{item.count}</span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleIncrease(item.id)
                                    }
                                    aria-label="Увеличить количество"
                                  >
                                    <PlusIcon />
                                  </button>
                                </div>

                                {/* PRICE */}

                                <div className={Styles.price}>
                                  <span className={Styles.unitPrice}>
                                    {formatPrice(unitPrice)} ₽ / шт.
                                  </span>

                                  <strong>
                                    {formatPrice(itemTotal)} ₽
                                  </strong>
                                </div>
                              </div>
                            </div>
                          </motion.article>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* DELIVERY INFO */}

                  <div className={Styles.deliveryInfo}>
                    <div className={Styles.deliveryIcon}>
                      <TruckIcon />
                    </div>

                    <div>
                      <strong>
                        Условия поставки согласуем после заказа
                      </strong>

                      <span>
                        После оформления менеджер свяжется с вами
                        для подтверждения заказа и условий поставки.
                      </span>
                    </div>
                  </div>
                </section>

                {/* =========================
                    SUMMARY
                ========================= */}

                <aside className={Styles.sidebar}>
                  <motion.div
                    className={Styles.summaryCard}
                    initial={{
                      opacity: 0,
                      y: 14,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.05,
                    }}
                  >
                    <div className={Styles.summaryHeader}>
                      <h2>Итого</h2>
                    </div>

                    <div className={Styles.summaryRows}>
                      <div className={Styles.summaryRow}>
                        <span>
                          {totalCount}{' '}
                          {getProductWord(totalCount)}
                        </span>

                        <strong>
                          {formatPrice(totalPrice)} ₽
                        </strong>
                      </div>

                      <div className={Styles.summaryRow}>
                        <span>НДС</span>
                        <span>Без НДС</span>
                      </div>
                    </div>

                    <div className={Styles.summaryDivider} />

                    <div className={Styles.totalRow}>
                      <span>К оплате</span>

                      <strong>
                        {formatPrice(totalPrice)} ₽
                      </strong>
                    </div>

                    <motion.button
                      type="button"
                      className={Styles.checkoutButton}
                      onClick={goToOrder}
                      whileHover={{
                        y: -1,
                      }}
                      whileTap={{
                        scale: 0.985,
                      }}
                    >
                      <span>Перейти к оформлению</span>
                      {/* <ArrowRightIcon /> */}
                    </motion.button>

                    <p className={Styles.summaryNote}>
                      Нажимая кнопку, вы перейдёте к заполнению
                      контактных данных для оформления заказа.
                    </p>
                  </motion.div>

                  {/* BENEFITS */}

                  <div className={Styles.benefitsCard}>
                    <div className={Styles.benefit}>
                      <div className={Styles.benefitIcon}>
                        <CheckIcon />
                      </div>

                      <div>
                        <strong>Без онлайн-оплаты</strong>
                        <span>
                          Условия расчёта согласуются с менеджером
                        </span>
                      </div>
                    </div>

                    <div className={Styles.benefit}>
                      <div className={Styles.benefitIcon}>
                        <CheckIcon />
                      </div>

                      <div>
                        <strong>Персональный менеджер</strong>
                        <span>
                          Поможем уточнить комплектацию и поставку
                        </span>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};