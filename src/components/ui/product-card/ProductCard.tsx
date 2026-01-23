import styles from './product-card.module.scss';
import type { Product } from '../../content/shop/products';

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
  const handleClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('product', String(product.id));
    window.history.pushState({}, '', url.toString());

    onClick();
  };

  return (
    <article className={styles.card} onClick={handleClick}>
      <div className={styles.cardMedia}>
        <img src={product.image || placeholderSVG()} alt={product.title} loading="lazy" />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.price}>{product.price}</div>
      </div>
    </article>
  );
};
