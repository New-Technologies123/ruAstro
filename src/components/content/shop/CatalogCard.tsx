
import { useState, type MouseEvent } from 'react';

import {
  Check,
  Minus,
  Package,
  Plus,
  ShoppingCart,
} from 'lucide-react';

import type { CatalogItem } from './catalog';

import {
  categoryShortTitles,
  equipmentCatalog,
  parseCatalogPrice,
} from './catalog';

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

export const CatalogCard = ({
  item,
  isPart,
  count,
  href,
  onOpen,
  onAdd,
  onIncrease,
  onDecrease,
  onOpenCart,
}: Props) => {
  const [imageError, setImageError] =
    useState(false);

  const { product } = item;

  // ---------------------------------------------------------
  // PRODUCT LINK
  // ---------------------------------------------------------

  const handleOpen = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    // Сохраняем стандартное поведение браузера:
    // Ctrl + click, Cmd + click, Shift + click,
    // открытие ссылки в новой вкладке.

    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    onOpen();
  };

  // ---------------------------------------------------------
  // PRICE
  // ---------------------------------------------------------

  const price = parseCatalogPrice(
    product.price
  );

  // ---------------------------------------------------------
  // COMPATIBILITY
  // ---------------------------------------------------------

  const compatibleModels =
    item.compatibleModels ?? [];

  const compatibleKeys = new Set(
    compatibleModels.map(
      (model) =>
        `${model.category}:${model.tem}`
    )
  );

  const compatibleCategories = new Set(
    compatibleModels.map(
      (model) => model.category
    )
  );

  // В список входят только модели,
  // у которых есть идентификатор tem.

  const equipmentWithParts =
    equipmentCatalog.filter(
      (model) => Boolean(model.tem)
    );

  // Проверяем, совместима ли комплектующая
  // со всеми моделями, поддерживающими комплектующие.

  const appliesToAll =
    equipmentWithParts.length > 0 &&
    equipmentWithParts.every(
      (model) =>
        compatibleKeys.has(
          `${model.category}:${model.tem}`
        )
    );

  // Если комплектующая относится к одной категории,
  // проверяем все модели этой категории.

  const singleCompatibleCategory =
    compatibleCategories.size === 1
      ? [...compatibleCategories][0]
      : null;

  const categoryModels =
    singleCompatibleCategory
      ? equipmentWithParts.filter(
          (model) =>
            model.category ===
            singleCompatibleCategory
        )
      : [];

  const appliesToCategory =
    !appliesToAll &&
    Boolean(singleCompatibleCategory) &&
    categoryModels.length > 0 &&
    categoryModels.every(
      (model) =>
        compatibleKeys.has(
          `${model.category}:${model.tem}`
        )
    );

  // ---------------------------------------------------------
  // COMPATIBILITY LABEL
  // ---------------------------------------------------------

  const compatibilityLabel = !isPart
    ? ''
    : compatibleKeys.size === 0
      ? 'Совместимость уточняйте у менеджера'
      : appliesToAll
        ? 'Для всего оборудования'
        : appliesToCategory &&
            singleCompatibleCategory
          ? `Для всех моделей ${
              categoryShortTitles[
                singleCompatibleCategory
              ]
            }`
          : compatibleKeys.size === 1
            ? `Для модели: ${
                compatibleModels[0]?.parentTitle ??
                'оборудования'
              }`
            : compatibleCategories.size > 1
              ? `Для ${compatibleKeys.size} моделей оборудования`
              : `Для ${compatibleKeys.size} моделей ${
                  categoryShortTitles[item.category]
                }`;

  // ---------------------------------------------------------
  // CATEGORY LABEL
  // ---------------------------------------------------------

  const categoryLabel =
    compatibleCategories.size > 1
      ? 'Несколько категорий'
      : categoryShortTitles[item.category];

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------

  return (
    <article className={styles.productCard} data-motion-card>
      {/* IMAGE */}

      <a
        className={styles.productMedia}
        data-motion-image
        href={href}
        onClick={handleOpen}
        aria-label={`Открыть ${product.title}`}
      >
        <span className={styles.productBadge}>
          {isPart
            ? 'Комплектующая'
            : 'Оборудование'}
        </span>

        {product.image && !imageError ? (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            onError={() =>
              setImageError(true)
            }
          />
        ) : (
          <div
            className={styles.imagePlaceholder}
            aria-hidden="true"
          >
            <Package
              size={44}
              strokeWidth={1.3}
            />
          </div>
        )}
      </a>

      {/* PRODUCT INFORMATION */}

      <div className={styles.productBody}>
        <span className={styles.productFamily}>
          {categoryLabel}
        </span>

        <a
          className={styles.productTitle}
          href={href}
          title={product.title}
          onClick={handleOpen}
        >
          {product.title}
        </a>

        {isPart && (
          <p
            className={styles.productModel}
            title={compatibleModels
              .map((model) => model.parentTitle)
              .join('\n')}
          >
            {compatibilityLabel}
          </p>
        )}

        {/* PRICE AND CART */}

        <div className={styles.productBottom}>
          <p className={styles.delivery}>
            Срок поставки: {product.deliveryTime}
          </p>

          <div className={styles.priceRow}>
            <strong>
              {price.toLocaleString('ru-RU')} ₽
            </strong>

            <span>{product.nds}</span>
          </div>

          {count > 0 ? (
            <div className={styles.cartState}>
              <button
                type="button"
                className={styles.inCartButton}
                onClick={onOpenCart}
                aria-label={`Открыть корзину: ${product.title}`}
              >
                <Check
                  size={16}
                  aria-hidden="true"
                />

                В корзине
              </button>

              <div
                className={styles.quantity}
                aria-label={`Количество в корзине: ${count}`}
              >
                <button
                  type="button"
                  onClick={onDecrease}
                  aria-label={`Уменьшить количество: ${product.title}`}
                >
                  <Minus
                    size={18}
                    aria-hidden="true"
                  />
                </button>

                <span aria-live="polite">
                  {count}
                </span>

                <button
                  type="button"
                  onClick={onIncrease}
                  aria-label={`Увеличить количество: ${product.title}`}
                >
                  <Plus
                    size={18}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className={styles.addButton}
              onClick={onAdd}
            >
              <ShoppingCart
                size={18}
                aria-hidden="true"
              />

              В корзину
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
