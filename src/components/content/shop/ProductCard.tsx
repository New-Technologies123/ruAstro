import { useState } from 'react';
import styles from './product-card.module.scss';
import type { Product } from '../../products/types';
import { addToCart } from '../../utils/cartStorage';

interface ProductCardProps {
  product: Product;
  onClick: VoidFunction;
}

/**
 * Заглушка, если у товара нет изображения
 */
const MarketplacePlaceholder = () => (
  <div className={styles.foto}>
    <div className={styles.placeholderIcon}>
      <svg
        viewBox="0 0 24 24"
        width="48"
        height="48"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="
            M19.14 12.94c.04-.31.06-.63.06-.94
            s-.02-.63-.06-.94l2.03-1.58
            a.5.5 0 00.12-.64l-1.92-3.32
            a.5.5 0 00-.6-.22l-2.39.96
            a7.028 7.028 0 00-1.63-.94
            l-.36-2.54A.5.5 0 0013.89 2h-3.78
            a.5.5 0 00-.49.41l-.36 2.54
            c-.58.22-1.12.52-1.63.94
            l-2.39-.96a.5.5 0 00-.6.22L2.72 8.47
            a.5.5 0 00.12.64l2.03 1.58
            c-.04.31-.07.63-.07.94
            s.03.63.07.94l-2.03 1.58
            a.5.5 0 00-.12.64l1.92 3.32
            c.13.22.39.31.6.22l2.39-.96
            c.51.42 1.05.76 1.63.98l.36 2.52
            c.05.24.25.41.49.41h3.78
            c.24 0 .44-.17.49-.41l.36-2.52
            c.58-.22 1.12-.56 1.63-.98
            l2.39.96c.22.09.47 0 .6-.22l1.92-3.32
            a.5.5 0 00-.12-.64l-2.03-1.58z

            M12 15.5
            A3.5 3.5 0 1112 8
            a3.5 3.5 0 010 7.5z
          "
        />
      </svg>
    </div>

    <span>Изображение отсутствует</span>
  </div>
);

export const ProductCard = ({
  product,
  onClick,
}: ProductCardProps) => {
  /**
   * Количество товара, которое пользователь
   * сейчас собирается добавить.
   */
  const [quantity, setQuantity] = useState(1);

  /**
   * Ошибка загрузки изображения.
   */
  const [imageError, setImageError] = useState(false);

  /**
   * Показывать сообщение "Товар добавлен".
   */
  const [showAddedMessage, setShowAddedMessage] =
    useState(false);

  /**
   * Таймер для сообщения.
   */
  const [messageTimer, setMessageTimer] =
    useState<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Открытие страницы товара.
   */
  const handleCardClick = () => {
    const url = new URL(
      window.location.href
    );

    url.searchParams.set(
      'product',
      String(product.id)
    );

    window.history.pushState(
      {},
      '',
      url.toString()
    );

    onClick();
  };

  /**
   * Увеличить количество.
   */
  const increment = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    setQuantity((prev) => prev + 1);
  };

  /**
   * Уменьшить количество.
   */
  const decrement = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );
  };

  /**
   * Добавить товар в корзину.
   *
   * ВАЖНО:
   * выбранное количество добавляется в корзину,
   * после чего количество на карточке
   * возвращается к 1.
   *
   * Кнопка при этом НЕ изменяется.
   */
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    // Запоминаем выбранное количество
    const selectedQuantity = quantity;

    // Добавляем выбранное количество
    addToCart(
      product,
      selectedQuantity
    );

    // Сбрасываем количество именно на карточке
    setQuantity(1);

    // Показываем сообщение
    setShowAddedMessage(true);

    // Очищаем предыдущий таймер,
    // если пользователь нажал кнопку несколько раз
    if (messageTimer) {
      clearTimeout(messageTimer);
    }

    // Скрываем сообщение через 2.5 секунды
    const timer = setTimeout(() => {
      setShowAddedMessage(false);
    }, 2500);

    setMessageTimer(timer);
  };

  return (
    <article
      className={styles.card}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (
          e.key === 'Enter' ||
          e.key === ' '
        ) {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* =================================================
          ФОТО
      ================================================= */}

      <div className={styles.cardMedia}>
        {/* <div className={styles.imageBadge}>
          УРПД
        </div> */}

        {!product.image || imageError ? (
          <MarketplacePlaceholder />
        ) : (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            onError={() =>
              setImageError(true)
            }
          />
        )}

        <div className={styles.mediaOverlay}>
          <span>Подробнее</span>

          <span className={styles.overlayArrow}>
            ↗
          </span>
        </div>
      </div>

      {/* =================================================
          ИНФОРМАЦИЯ
      ================================================= */}

      <div className={styles.cardBody}>
        <div className={styles.productMeta}>
          <span className={styles.productType}>
            Комплектующая
          </span>
        </div>

        <h3 className={styles.title}>
          {product.title}
        </h3>

        {/* =================================================
            НИЖНЯЯ ЧАСТЬ
        ================================================= */}

        <div className={styles.cardBottom}>
          {/* =========================
              ЦЕНА
          ========================= */}

          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>
              Цена
            </span>

            <div className={styles.price}>
              {product.price}
              <span> ₽</span>
            </div>

            <span className={styles.nds}>
              {product.nds}
            </span>
          </div>

          {/* =========================
              КОЛИЧЕСТВО + КНОПКА
          ========================= */}

          <div
            className={styles.purchaseBlock}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* КОЛИЧЕСТВО */}

            <div className={styles.quantityControls}>
              <button
                type="button"
                onClick={decrement}
                aria-label="Уменьшить количество"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increment}
                aria-label="Увеличить количество"
              >
                +
              </button>
            </div>

            {/* КНОПКА */}

            <button
              type="button"
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              <span className={styles.buttonIcon}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="
                      M7 18c-1.1 0-1.99.9-1.99 2
                      S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0
                      c-1.1 0-1.99.9-1.99 2
                      S15.9 22 17 22s2-.9 2-2-.9-2-2-2z

                      M7.82 12l.94-2h7.45l1.24 2H7.82zm12.58-6
                      H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44

                      C5.16 14.37 5 14.68 5 15
                      c0 1.1.9 2 2 2h12v-2H7.42
                      c-.14 0-.25-.11-.25-.25l.03-.12
                      L7.9 12h8.45c.75 0 1.41-.41
                      1.75-1.03l3.58-6.49-.01-.02z
                    "
                  />
                </svg>
              </span>

              <span className={styles.buttonText}>
                В корзину
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          СООБЩЕНИЕ
      ================================================= */}

      {showAddedMessage && (
        <div
          className={styles.addedMessage}
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          <div className={styles.addedIcon}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M20 6L9 17l-5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className={styles.addedContent}>
            <strong>
              Товар добавлен
            </strong>

            <span>
              в корзину
            </span>
          </div>
        </div>
      )}

      <div className={styles.cardGlow} />
    </article>
  );
};