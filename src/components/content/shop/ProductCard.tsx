import { useState } from 'react';
import styles from './product-card.module.scss';
import type { Product } from '../../products/types';
import { addToCart } from '../../utils/cartStorage';

interface ProductCardProps {
  product: Product;
  onClick: VoidFunction;
}

/**
 * Marketplace-style placeholder
 * (иконка детали + No image)
 */
const MarketplacePlaceholder = () => (
  <div className={styles.foto}>
    <svg viewBox="0 0 24 24" width="48" height="48">
      <path
        fill="currentColor"
        d="M19.14 12.94c.04-.31.06-.63.06-.94
        s-.02-.63-.06-.94l2.03-1.58a.5.5 0 00.12-.64
        l-1.92-3.32a.5.5 0 00-.6-.22l-2.39.96
        a7.028 7.028 0 00-1.63-.94l-.36-2.54
        A.5.5 0 0013.89 2h-3.78a.5.5 0 00-.49.41
        l-.36 2.54c-.58.22-1.12.52-1.63.94
        l-2.39-.96a.5.5 0 00-.6.22L2.72 8.47
        a.5.5 0 00.12.64l2.03 1.58
        c-.04.31-.07.63-.07.94s.03.63.07.94
        l-2.03 1.58a.5.5 0 00-.12.64l1.92 3.32
        c.13.22.39.31.6.22l2.39-.96
        c.51.42 1.05.76 1.63.98l.36 2.52
        c.05.24.25.41.49.41h3.78
        c.24 0 .44-.17.49-.41l.36-2.52
        c.58-.22 1.12-.56 1.63-.98l2.39.96
        c.22.09.47 0 .6-.22l1.92-3.32
        a.5.5 0 00-.12-.64l-2.03-1.58zM12 15.5
        A3.5 3.5 0 1112 8a3.5 3.5 0 010 7.5z"
      />
    </svg>

    {/* <span>No image</span> */}
  </div>
);

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('product', String(product.id));
    window.history.pushState({}, '', url.toString());

    onClick();
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <article className={styles.card} onClick={handleCardClick}>
      {/* MEDIA */}
      <div className={styles.cardMedia}>
        {!product.image || imageError ? (
          <MarketplacePlaceholder />
        ) : (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* BODY */}
      <div className={styles.cardBody}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.price}>
          {product.price} ₽
        </div>

        <button
          className={styles.addToCartButton}
          onClick={handleAddToCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9
              2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99
              2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.82
              12l.94-2h7.45l1.24 2H7.82zm12.58-6H5.21l-.94-2H1v2h2l3.6
              7.59-1.35 2.44C5.16 14.37 5 14.68 5 15c0
              1.1.9 2 2 2h12v-2H7.42c-.14
              0-.25-.11-.25-.25l.03-.12L7.9 12h8.45c.75
              0 1.41-.41 1.75-1.03l3.58-6.49-.01-.02z" />
          </svg>

          В корзину
        </button>
      </div>
    </article>
  );
};