import styles from './product-card.module.scss';
import type { Product } from '../../content/shop/products';

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

const badgeColor = (category: string) => {
    switch (category) {
        case 'Газовое оборудование':
            return { bg: '#03cea4', color: '#fff' };
        case 'Сепарация':
            return { bg: '#5a87fc', color: '#fff' };
        case 'Автоматика':
            return { bg: '#f89828', color: '#fff' };
        case 'Подготовка':
            return { bg: '#f52f6e', color: '#fff' };
        case 'Насосное оборудование':
            return { bg: '#7772f1', color: '#fff' };
        default:
            return { bg: '#1fa65a', color: '#fff' };
    }
};

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
    const badge = badgeColor(product.category);

    return (
        <article className={styles.card} onClick={onClick}>
            <div className={styles.cardMedia}>
                <img
                    src={product.image || placeholderSVG()}
                    alt={product.title}
                    loading="lazy"
                />
            </div>

            <div className={styles.cardBody}>
                <span
                    className={styles.tag}
                    style={{ background: badge.bg, color: badge.color }}
                >
                    {product.category}
                </span>

                <h3 className={styles.title}>{product.title}</h3>

                <div className={styles.price}>{product.price}</div>
            </div>
        </article>
    );
};
