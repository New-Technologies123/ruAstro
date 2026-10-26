import Styles from './ProductCategoryCard.module.scss';

export type ProductId =
  | 'accounting-system'
  | 'accessories'
  | 'measuring-system'
  | 'preparation-systems'
  | 'pumping-stations';

export interface ProductCategory {
  id: ProductId;
  number: string;
  label: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

interface ProductCategoryCardProps {
  product: ProductCategory;
  index: number;
  onSelect: (index: number) => void;
}

export const ProductCategoryCard = ({
  product,
  index,
  onSelect,
}: ProductCategoryCardProps) => (
  <article className={Styles.productCard} data-product-card={index}>
    <a
      className={Styles.cardLink}
      href={`/products/${product.id}/`}
      onClick={(event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        onSelect(index);
      }}
    >
      <div className={Styles.cardImage}>
        <img src={product.image} alt={product.title} loading="lazy" />

        <div className={Styles.cardImageTop}>
          <span>{product.number}</span>
          <span>{product.tag}</span>
        </div>
      </div>

      <div className={Styles.cardBody}>
        <span className={Styles.cardCategory}>{product.label}</span>
        <h3>{product.title}</h3>
        <p>{product.description}</p>

        <div className={Styles.cardAction}>
          <span>Смотреть оборудование</span>

          <span className={Styles.cardArrow} aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              focusable="false"
              style={{ display: 'block' }}
            >
              <path d="M5 15 15 5M6 5h9v9" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  </article>
);