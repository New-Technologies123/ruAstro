import { useEffect, useState } from 'react';
import styles from '../../shop.module.scss';
import { LayoutBack } from '../../../../layout/LayoutBack';
import { ProductCard } from '../../ProductCard';
import { products } from '../../products';
import type { Product } from '../../products';
import { ProductPage } from '../../../../ui/product-page/ProductPage';

type TProps = {
  onBackShop: VoidFunction;
  title: string;
};

export const Shop_3 = ({ onBackShop, title }: TProps) => {
  const [openedProduct, setOpenedProduct] = useState<Product | null>(null);

  // синхронизация состояния с URL (оставляем, если нужна)
  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const productId = params.get('product');

      if (productId) {
        const product = products.find(p => p.id === Number(productId));
        setOpenedProduct(product ?? null);
      } else {
        setOpenedProduct(null);
      }
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);

    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  const onBackProduct = () => {
    setOpenedProduct(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('product');
    window.history.pushState({}, '', url.toString());
  };

  return (
    <LayoutBack onBack={onBackShop} title={title}>
      {!openedProduct && (
        <div className={styles.products}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

      {/* {openedProduct && (
        <LayoutBack onBack={onBackProduct} title={openedProduct.title}>
          <ProductPage product={openedProduct} />
        </LayoutBack>
      )} */}
    </LayoutBack>
  );
};
