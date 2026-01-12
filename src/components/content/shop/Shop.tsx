import { useEffect, useState } from 'react';
import styles from './shop.module.scss';
import { LayoutBack } from '../../layout/LayoutBack';
import { ProductCard } from './ProductCard';
import { products } from './products';
import type { Product } from './products';
import { Title } from '../../ui/title/Title';
import { ProductPage } from '../../ui/product-page/ProductPage';
import { useShopFilters } from './useShopFilters';

export const Shop = () => {
  const [openedProduct, setOpenedProduct] = useState<Product | null>(null);

  // 👉 читаем /shop/1
  useEffect(() => {
    const match = window.location.pathname.match(/\/shop\/(\d+)/);
    if (match) {
      const productId = Number(match[1]);
      const product = products.find(p => p.id === productId);
      if (product) setOpenedProduct(product);
    }
  }, []);

  const {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredProducts,
  } = useShopFilters(products);

  const openProduct = (product: Product) => {
    setOpenedProduct(product);
    window.history.pushState({}, '', `/shop/${product.id}`);
  };

  const onBack = () => {
    setOpenedProduct(null);
    window.history.pushState({}, '', '/shop');
  };

  return (
    <>
      {!openedProduct && (
        <>
          <Title text="Магазин" />

          {/* ФИЛЬТРЫ */}
          <div className={styles.filters}>
            <div className={styles.categories}>
              {categories.map(cat => {
                const count =
                  cat === 'Все'
                    ? products.length
                    : products.filter(p => p.category === cat).length;

                return (
                  <button
                    key={cat}
                    className={`${styles.filter} ${cat === selectedCategory ? styles['filter--active'] : ''
                      }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat} <sup>{count}</sup>
                  </button>
                );
              })}
            </div>

            <div className={styles.search}>
              <input
                type="text"
                placeholder="Поиск по названию"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* КАРТОЧКИ */}
          <div className={styles.products}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => openProduct(product)}
              />
            ))}
          </div>
        </>
      )}

      {openedProduct && (
        <LayoutBack onBack={onBack} title={openedProduct.title}>
          <ProductPage product={openedProduct} />
        </LayoutBack>
      )}
    </>
  );
};
