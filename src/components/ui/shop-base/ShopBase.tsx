import { useEffect, useState } from 'react';
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

export const ShopBase = ({ products, title, onBackShop }: Props) => {
  const [openedProduct, setOpenedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');

    if (productId) {
      const product = products.find((p) => p.id === Number(productId));
      setOpenedProduct(product ?? null);
    }
  }, [products]);

  const onBackProduct = () => {
    setOpenedProduct(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('product');
    window.history.pushState({}, '', url.toString());
  };

  if (!openedProduct) {
    return (
      <LayoutBack onBack={onBackShop} title={title}>
        <div className={styles.products}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setOpenedProduct(product)}
            />
          ))}
        </div>
      </LayoutBack>
    );
  }

  return (
    <LayoutBack onBack={onBackProduct} title={openedProduct.title}>
      <ProductPage product={openedProduct} />
    </LayoutBack>
  );
};
