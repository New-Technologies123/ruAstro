import { useEffect, useState } from 'react';
import styles from './product-page.module.scss';
import type { Product } from '../../products/types';
import { addToCart, getCart } from '../../utils/cartStorage';

interface Props {
  product: Product;
}

export const ProductPage = ({ product }: Props) => {
  const [cartCount, setCartCount] = useState(0);
  const [qty, setQty] = useState(1);

  const updateCartCount = () => {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.count, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();

    const onUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', onUpdate);

    return () => window.removeEventListener('cartUpdated', onUpdate);
  }, []);

  const inc = () => setQty(q => q + 1);
  const dec = () => setQty(q => (q > 1 ? q - 1 : 1));

  return (
    <div className={styles.page}>
      
      {/* ЛЕВО */}
      <div className={styles.image}>
        <img src={product.image} alt={product.title} />
      </div>

      {/* ПРАВО */}
      <div className={styles.order}>

        <div>🚚 <b>{product.deliveryTime}</b></div>

        <div className={styles.price}>
          <h1>{product.price} ₽</h1>
          <p>{product.nds}</p>
        </div>

        {/* ✅ выбор количества */}
        <div className={styles.qty}>
          <button onClick={dec}>−</button>
          <span>{qty}</span>
          <button onClick={inc}>+</button>
        </div>

        <button
          className={styles.button}
          onClick={() => {
            addToCart(product, qty);
            setQty(1);
          }}
        >
          В ЗАКАЗ
        </button>

      </div>
    </div>
  );
};
