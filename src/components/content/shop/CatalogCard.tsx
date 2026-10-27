import { useState, type MouseEvent } from 'react';
import { Check, Minus, Package, Plus, ShoppingCart } from 'lucide-react';
import type { CatalogItem } from './catalog';
import { categoryShortTitles, equipmentCatalog, parseCatalogPrice } from './catalog';
import styles from './catalog.module.scss';

type Props = {
  item: CatalogItem;
  isPart: boolean;
  count: number;
  href: string;
  onOpen: VoidFunction;
  onAdd: VoidFunction;
  onIncrease: VoidFunction;
  onDecrease: VoidFunction;
  onOpenCart: VoidFunction;
};

export const CatalogCard = ({ item, isPart, count, href, onOpen, onAdd, onIncrease, onDecrease, onOpenCart }: Props) => {
  const [imageError, setImageError] = useState(false);
  const { product } = item;
  const handleOpen = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onOpen();
  };
  const price = parseCatalogPrice(product.price);
  const compatibleModels = item.compatibleModels ?? [];
  const compatibleKeys = new Set(compatibleModels.map((model) => `${model.category}:${model.tem}`));
  const compatibleCategories = new Set(compatibleModels.map((model) => model.category));
  const equipmentWithParts = equipmentCatalog.filter((model) => model.tem);
  const categoryModels = equipmentWithParts.filter((model) => model.category === item.category);
  const appliesToAll = equipmentCatalog.every((model) => Boolean(model.tem && compatibleKeys.has(`${model.category}:${model.tem}`)));
  const appliesToCategory =
    categoryModels.length > 1 && categoryModels.every((model) => compatibleKeys.has(`${model.category}:${model.tem}`));
  const compatibilityLabel = appliesToAll
    ? 'Для всего оборудования'
    : appliesToCategory
      ? `Для всех моделей ${categoryShortTitles[item.category]}`
      : compatibleKeys.size === 1
        ? `Для модели: ${compatibleModels[0].parentTitle}`
        : compatibleCategories.size > 1
          ? `Для ${compatibleKeys.size} моделей оборудования`
          : `Для ${compatibleKeys.size} моделей ${categoryShortTitles[item.category]}`;

  return (
    <article className={styles.productCard}>
      <a className={styles.productMedia} href={href} onClick={handleOpen} aria-label={`Открыть ${product.title}`}>
        <span className={styles.productBadge}>{isPart ? 'Комплектующая' : 'Оборудование'}</span>
        {product.image && !imageError ? (
          <img src={product.image} alt={product.title} loading="lazy" onError={() => setImageError(true)} />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <Package size={44} strokeWidth={1.3} />
          </div>
        )}
      </a>

      <div className={styles.productBody}>
        <span className={styles.productFamily}>
          {compatibleCategories.size > 1 ? 'Несколько категорий' : categoryShortTitles[item.category]}
        </span>
        <a className={styles.productTitle} href={href} title={product.title} onClick={handleOpen}>
          {product.title}
        </a>
        {isPart && (
          <p className={styles.productModel} title={compatibleModels.map((model) => model.parentTitle).join('\n')}>
            {compatibilityLabel}
          </p>
        )}

        <div className={styles.productBottom}>
          <p className={styles.delivery}>Срок поставки: {product.deliveryTime}</p>
          <div className={styles.priceRow}>
            <strong>{price.toLocaleString('ru-RU')} ₽</strong>
            <span>{product.nds}</span>
          </div>

          {count > 0 ? (
            <div className={styles.cartState}>
              <button type="button" className={styles.inCartButton} onClick={onOpenCart} aria-label={`Открыть корзину: ${product.title}`}>
                <Check size={16} aria-hidden="true" /> В корзине
              </button>
              <div className={styles.quantity} aria-label={`Количество в корзине: ${count}`}>
                <button type="button" onClick={onDecrease} aria-label={`Уменьшить количество: ${product.title}`}>
                  <Minus size={18} />
                </button>
                <span aria-live="polite">{count}</span>
                <button type="button" onClick={onIncrease} aria-label={`Увеличить количество: ${product.title}`}>
                  <Plus size={18} />
                </button>
              </div>
            </div>
          ) : (
            <button type="button" className={styles.addButton} onClick={onAdd}>
              <ShoppingCart size={18} aria-hidden="true" /> В корзину
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
