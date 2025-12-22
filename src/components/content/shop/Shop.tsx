import { useState } from 'react';
import styles from './shop.module.scss';
import { LayoutBack } from '../../layout/LayoutBack';
import { ProductCard } from '../../ui/product-card/ProductCard';
import { products } from './products';
import type { Product } from './products';
import { Title } from '../../ui/title/Title';

export const Shop = () => {
  const [openedProduct, setOpenedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];

  const openProduct = (product: Product) => {
    setOpenedProduct(product);
    window.history.pushState({}, '', `${window.location.pathname}?product=${product.id}`);
  };

  const onBack = () => {
    setOpenedProduct(null);
    window.history.pushState({}, '', window.location.pathname);
  };

  /* фильтрация и поиск */
  const filteredProducts = products
    .filter(p => selectedCategory === 'Все' || p.category === selectedCategory)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      {!openedProduct && (
        <> 
          <Title text="Магазин" />
          {/* Фильтры и поиск над карточками */}
          <div className={styles.filters}>
            <div className={styles.categories}>
              {categories.map(cat => {
                const count = cat === 'Все'
                  ? products.length
                  : products.filter(p => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    className={`${styles.filter} ${cat === selectedCategory ? styles['filter--active'] : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat} <sup className={styles.filterSup}>{count}</sup>
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
          {/* Сетка карточек */}
          <div className={styles.products}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onClick={() => openProduct(product)} />
            ))}
          </div>
        </>
      )}

      {openedProduct && (
        <LayoutBack onBack={onBack} title={openedProduct.title}>
          <div className={styles.productPage}>
            <p>{openedProduct.description}</p>
            <p><strong>Категория:</strong> {openedProduct.category}</p>
            <p><strong>Цена:</strong> {openedProduct.price}</p>
          </div>
        </LayoutBack>
      )}
    </>
  );
};
