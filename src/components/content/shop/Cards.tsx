import { useEffect, useState } from 'react';
import Styles from './cards.module.scss';

type TProps = {
  title: string;
  price: number;
  image?: string;
  onClick?: () => void;
  onAddToCart?: (quantity: number) => void;
};

export const Cards = ({
  title,
  price,
  image,
  onClick,
  onAddToCart,
}: TProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    onAddToCart?.(quantity);

    // Показываем сообщение
    setShowAddedMessage(true);

    // После добавления возвращаем количество к 1
    setQuantity(1);
  };

  // Автоматически скрываем сообщение
  useEffect(() => {
    if (!showAddedMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowAddedMessage(false);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [showAddedMessage]);

  return (
    <article className={Styles.card}>
      <div
        className={Styles.cardInner}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={(e) => {
          if (
            (e.key === 'Enter' || e.key === ' ') &&
            onClick
          ) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {/* =====================================================
            IMAGE
            ===================================================== */}

        <div className={Styles.imageWrapper}>
          {image ? (
            <img
              src={image}
              alt={title}
              className={Styles.productImage}
              loading="lazy"
            />
          ) : (
            <div className={Styles.imagePlaceholder}>
              <span>NT</span>
            </div>
          )}

          <div className={Styles.imageOverlay} />

          <div className={Styles.imageHint}>
            <span>Открыть</span>
            <span className={Styles.imageHintArrow}>↗</span>
          </div>
        </div>

        {/* =====================================================
            PRODUCT CONTENT
            ===================================================== */}

        <div className={Styles.productContent}>
          <h3 className={Styles.title}>
            {title}
          </h3>
        </div>

        {/* =====================================================
            PURCHASE
            ===================================================== */}

        <div
          className={Styles.purchase}          
        >
          <div className={Styles.priceBlock}>
            <span className={Styles.priceLabel}>
              Стоимость
            </span>

            <div className={Styles.price}>
              {price.toLocaleString('ru-RU')}
              <span className={Styles.currency}>
                ₽
              </span>
            </div>

            <span className={Styles.nds}>
              без НДС
            </span>
          </div>

          <div className={Styles.purchaseRow}>
            {/* =================================================
                QUANTITY
                ================================================= */}

            <div
              className={Styles.quantityControls}
              aria-label="Количество товара"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                type="button"
                className={Styles.quantityButton}
                aria-label="Уменьшить количество"
                onClick={(e) => {
                  e.stopPropagation();
                  decrement();
                }}
              >
                −
              </button>

              <span
                className={Styles.quantityValue}
                aria-live="polite"
              >
                {quantity}
              </span>

              <button
                type="button"
                className={Styles.quantityButton}
                aria-label="Увеличить количество"
                onClick={(e) => {
                  e.stopPropagation();
                  increment();
                }}
              >
                +
              </button>
            </div>

            {/* =================================================
                ADD TO CART
                ================================================= */}

            <button
              type="button"
              className={Styles.addToCartButton}
              onClick={handleAddToCart}
            >
              <span>В корзину</span>

              <span
                className={Styles.cartArrow}
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </div>
        </div>

        {/* =====================================================
            ADDED MESSAGE
            ===================================================== */}

        {showAddedMessage && (
          <div
            className={Styles.addedMessage}
            role="status"
            aria-live="polite"
          >
            <span className={Styles.addedIcon}>
              ✓
            </span>

            <span className={Styles.addedText}>
              <strong>Товар добавлен</strong>
              <small>Добавлено в корзину</small>
            </span>
          </div>
        )}

        <div className={Styles.cardGlow} />
      </div>
    </article>
  );
};