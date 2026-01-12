import { useEffect, useState } from 'react';
import styles from './product-page.module.scss';
import type { Product } from '../../content/shop/products';
import { addToCart, getCart } from '../../utils/cartStorage';

interface Props {
  product: Product;
}

export const ProductPage = ({ product }: Props) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.count, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();

    const onStorage = () => updateCartCount();
    window.addEventListener('storage', onStorage);

    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <>
      {/* ВЕРХНЯЯ ПАНЕЛЬ */}
      <div className={styles.topBar}>
        <button className={styles.cartButton}>
          🛒 Корзина
          {cartCount > 0 && (
            <span className={styles.badge}> {cartCount}</span>
          )}
        </button>
      </div>

      <div className={styles.page}>
        {/* ЛЕВО */}
        <div className={styles.image}>
          <img src={product.image} alt={product.title} />
        </div>


        {/* ПРАВО */}
        <div className={styles.order}>
          <div className={styles.status}>
            {product.inStock ? '✔ В наличии' : '✖ Нет в наличии'}
          </div>

          <div>⏳ <b>{product.shipmentTime}</b></div>
          <div>🚚 <b>{product.deliveryTime}</b></div>

          <div className={styles.price}>
            <h1>{product.price} ₽</h1>
            <p>{product.nds}</p>
          </div>

          <button
            className={styles.button}
            disabled={!product.inStock}
            onClick={() => {
              addToCart(product);
              updateCartCount();
            }}
          >
            В ЗАКАЗ
          </button>
        </div>
      </div>
    </>
  );
};
