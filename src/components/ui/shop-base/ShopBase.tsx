import { useEffect, useMemo, useState } from 'react';
import styles from './shop-base.module.scss';

import { LayoutBack } from '../../../components/layout/LayoutBack';
import { ProductCard } from '../../content/shop/ProductCard';
import { ProductPage } from '../product-page/ProductPage';

import type { Product } from '../../products/types';

type Props = {
  products: Product[];
  title: string;
  onBackShop: VoidFunction;
};

export const ShopBase = ({
  products,
  title,
  onBackShop,
}: Props) => {
  const [openedProduct, setOpenedProduct] =
    useState<Product | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  // =========================================================
  // ОТКРЫТИЕ ТОВАРА ИЗ URL
  // =========================================================

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');

    if (productId) {
      const product = products.find(
        (p) => p.id === Number(productId)
      );

      setOpenedProduct(product ?? null);
    }
  }, [products]);

  // =========================================================
  // ПОИСК
  // =========================================================

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      const title = product.title.toLowerCase();
      const description =
        product.description?.toLowerCase() || '';

      return (
        title.includes(query) ||
        description.includes(query)
      );
    });
  }, [products, searchQuery]);

  // =========================================================
  // ОТКРЫТЬ ТОВАР
  // =========================================================

  const openProduct = (product: Product) => {
    setOpenedProduct(product);

    const url = new URL(window.location.href);
    url.searchParams.set('product', String(product.id));

    window.history.pushState({}, '', url.toString());
  };

  // =========================================================
  // НАЗАД ИЗ ТОВАРА
  // =========================================================

  const onBackProduct = () => {
    setOpenedProduct(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('product');

    window.history.pushState({}, '', url.toString());
  };

  // =========================================================
  // СТРАНИЦА ТОВАРА
  // =========================================================

  if (openedProduct) {
    return (
      <LayoutBack
        onBack={onBackProduct}
        title={openedProduct.title}
      >
        <ProductPage product={openedProduct} />
      </LayoutBack>
    );
  }

  // =========================================================
  // СПИСОК ТОВАРОВ
  // =========================================================

  return (
    <LayoutBack
      onBack={onBackShop}
      title={title}
    >
      <div className={styles.shopBase}>

        {/* =====================================================
            ПОИСК
            ===================================================== */}

        <div className={styles.searchBlock}>
          <div className={styles.searchBox}>

            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M21 21l-4.35-4.35"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Поиск по товарам и артикулам"
              aria-label="Поиск по товарам и артикулам"
            />

            {searchQuery && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setSearchQuery('')}
                aria-label="Очистить поиск"
              >
                ×
              </button>
            )}
          </div>

          {searchQuery && (
            <div className={styles.searchResult}>
              Найдено:{' '}
              <strong>
                {filteredProducts.length}
              </strong>{' '}
              {getProductWord(filteredProducts.length)}
            </div>
          )}
        </div>

        {/* =====================================================
            ТОВАРЫ
            ===================================================== */}

        {filteredProducts.length > 0 ? (
          <div className={styles.products}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => openProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>

            <div className={styles.noResultsIcon}>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M16 16l5 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3>Товар не найден</h3>

            <p>
              По запросу «{searchQuery}» ничего не найдено.
            </p>

            <button
              type="button"
              className={styles.resetSearch}
              onClick={() => setSearchQuery('')}
            >
              Показать все товары
            </button>

          </div>
        )}

      </div>
    </LayoutBack>
  );
};


// =========================================================
// СКЛОНЕНИЕ СЛОВА «ТОВАР»
// =========================================================

function getProductWord(count: number): string {
  const lastTwo = count % 100;
  const lastOne = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return 'товаров';
  }

  if (lastOne === 1) {
    return 'товар';
  }

  if (
    lastOne >= 2 &&
    lastOne <= 4
  ) {
    return 'товара';
  }

  return 'товаров';
}