import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Minus, Package, Plus, ShoppingCart, Truck } from 'lucide-react';
import styles from './product-page.module.scss';
import type { Product } from '../../products/types';
import { addToCart, changeItemCount, getCart, getCartKey } from '../../utils/cartStorage';

interface Props {
  product: Product;
  kind?: 'part' | 'equipment';
  onBack?: VoidFunction;
  backLabel?: string;
}

export const ProductPage = ({ product, kind = 'part', onBack, backLabel = 'Назад ко всем товарам' }: Props) => {
  const [cartCount, setCartCount] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const sync = () => setCartCount(getCart().find((item) => item.cartKey === getCartKey(product))?.count ?? 0);
    sync();
    window.addEventListener('cartUpdated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('cartUpdated', sync);
      window.removeEventListener('storage', sync);
    };
  }, [product]);

  const openCart = () => window.dispatchEvent(new Event('toggleGlobalCart'));

  return (
    <div className={styles.page}>
      {onBack && (
        <button type="button" className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={17} aria-hidden="true" /> {backLabel}
        </button>
      )}
      <div className={styles.image}>
        {product.image && !imageError ? (
          <img src={product.image} alt={product.title} onError={() => setImageError(true)} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <Package size={58} strokeWidth={1.2} />
            <span>Изображение отсутствует</span>
          </div>
        )}
      </div>
      <div className={styles.order}>
        <span className={styles.label}>{kind === 'equipment' ? 'Оборудование' : 'Комплектующая'}</span>
        <h2>{product.title}</h2>
        {product.description && (
          <div className={styles.description}>
            <h3>{kind === 'equipment' ? 'Для чего используется' : 'Описание'}</h3>
            <p>{product.description}</p>
          </div>
        )}
        <div className={styles.delivery}>
          <Truck size={19} aria-hidden="true" />
          <span>Срок поставки: {product.deliveryTime}</span>
        </div>
        <div className={styles.price}>
          <strong>{product.price} ₽</strong>
          <span>{product.nds}</span>
        </div>

        {cartCount > 0 ? (
          <div className={styles.cartActions}>
            <button type="button" className={styles.inCart} onClick={openCart} aria-label={`Открыть корзину: ${product.title}`}>
              <Check size={18} aria-hidden="true" /> В корзине
            </button>
            <div className={styles.qty} aria-label={`Количество в корзине: ${cartCount}`}>
              <button type="button" onClick={() => changeItemCount(getCartKey(product), -1)} aria-label="Уменьшить количество">
                <Minus size={20} />
              </button>
              <span aria-live="polite">{cartCount}</span>
              <button type="button" onClick={() => addToCart(product, 1)} aria-label="Увеличить количество">
                <Plus size={20} />
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className={styles.button} onClick={() => addToCart(product, 1)}>
            <ShoppingCart size={19} /> В корзину
          </button>
        )}
      </div>
    </div>
  );
};
