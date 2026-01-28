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

export const Shop_1 = ({ onBackShop, title }: TProps) => {
  const [openedProduct, setOpenedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]); // состояние корзины

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');

    if (productId) {
      const product = products.find((p) => p.id === Number(productId));
      setOpenedProduct(product ?? null);
    } else {
      setOpenedProduct(null);
    }
  }, []);

  const onBackProduct = () => {
    setOpenedProduct(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('product');
    window.history.pushState({}, '', url.toString());
  };

  // Функция добавления в корзину
  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    console.log('Добавили в корзину:', product.title);
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

