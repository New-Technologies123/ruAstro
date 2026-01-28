import styles from './product-card.module.scss';
import type { Product } from '../../content/shop/products';
import { addToCart } from '../../utils/cartStorage';

interface ProductCardProps {
  product: Product;
  onClick: VoidFunction;
}

// placeholder SVG
const placeholderSVG = () => {
  const svg = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
      <rect width='120' height='120' fill='#e5e7eb'/>
      <circle cx='60' cy='45' r='18' fill='#fff'/>
      <path d='M20 110c0-25 20-45 40-45s40 20 40 45'
        fill='none' stroke='#fff' stroke-width='3'/>
    </svg>
  `);
  return `data:image/svg+xml;utf8,${svg}`;
};

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const handleCardClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('product', String(product.id));
    window.history.pushState({}, '', url.toString());

    onClick();
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // чтобы не открывалась карточка
    addToCart(product);   // просто передаём Product, count добавится внутри addToCart
  };

  return (
    <article className={styles.card} onClick={handleCardClick}>
      <div className={styles.cardMedia}>
        <img src={product.image || placeholderSVG()} alt={product.title} loading="lazy" />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.price}>{product.price} ₽</div>
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 
              0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.82 
              12l.94-2h7.45l1.24 2H7.82zm12.58-6H5.21l-.94-2H1v2h2l3.6 
              7.59-1.35 2.44C5.16 14.37 5 14.68 5 15c0 1.1.9 2 2 2h12v-2H7.42c-.14 
              0-.25-.11-.25-.25l.03-.12L7.9 12h8.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49-.01-.02z"/>
          </svg>
          В корзину
        </button>

      </div>
    </article>
  );
};
