import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock3, LockKeyhole, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CheckoutHeader } from '../checkout-header/CheckoutHeader';
import { getCart, removeFromCart, changeItemCount, clearCart, type CartItem } from '../../utils/cartStorage';
import { formatCartPrice, getProductWord } from '../../utils/cartPresentation';
import Styles from './basket.module.scss';

type BasketProps = { onBack: () => void; goToOrder: () => void };

export const Basket = ({ onBack, goToOrder }: BasketProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    const loadCart = () => setCart(getCart());
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  const totalCount = useMemo(() => cart.reduce((sum, item) => sum + item.count, 0), [cart]);
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price.replace(/\s/g, '').replace(',', '.')) * item.count, 0),
    [cart],
  );
  const continueShopping = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname.replace(/\/$/, '') === '/shop' && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      onBack();
    }
  };
  const handleClear = () => {
    if (cart.length && window.confirm('Удалить все товары из корзины?')) clearCart();
  };

  return (
    <div className={Styles.basketContainer}>
      <CheckoutHeader
        title="Корзина"
        count={totalCount}
        backAction={
          <a href="/shop/" onClick={continueShopping} aria-label="Назад в магазин" title="Назад в магазин">
            <ArrowLeft size={18} aria-hidden="true" />
            <span>Назад в магазин</span>
          </a>
        }
      />

      <div className={Styles.main}>
        {cart.length === 0 ? (
          <section className={Styles.emptyState}>
            <ShoppingBag size={48} strokeWidth={1.5} aria-hidden="true" />
            <h2>В корзине пока пусто</h2>
            <p>Выберите оборудование и комплектующие в магазине.</p>
            <a href="/shop/" onClick={continueShopping} className={Styles.checkoutButton}>
              Перейти в магазин <ArrowRight size={18} />
            </a>
          </section>
        ) : (
          <div className={Styles.contentGrid}>
            <section className={Styles.productsCard} aria-label="Товары в корзине">
              <div className={Styles.productsHeader}>
                <h2>Выбранные товары</h2>
                {cart.length > 1 && (
                  <button type="button" className={Styles.clearButton} onClick={handleClear}>
                    <Trash2 size={16} aria-hidden="true" /> Очистить всё
                  </button>
                )}
              </div>
              <div className={Styles.itemsList}>
                <AnimatePresence initial={false}>
                  {cart.map((item) => {
                    const unitPrice = Number(item.price.replace(/\s/g, '').replace(',', '.'));
                    return (
                      <motion.article
                        key={item.cartKey}
                        className={Styles.productItem}
                        layout
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className={Styles.productImage}>
                          {item.image ? <img src={item.image} alt="" /> : <ShoppingBag size={32} aria-hidden="true" />}
                        </div>
                        <div className={Styles.productInfo}>
                          <div className={Styles.productTop}>
                            <h3>{item.title}</h3>
                            <button
                              type="button"
                              className={Styles.removeButton}
                              onClick={() => removeFromCart(item.cartKey)}
                              aria-label={`Удалить ${item.title}`}
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                          <p className={Styles.deliveryTime}>
                            <Clock3 size={14} aria-hidden="true" /> Поставка: {item.deliveryTime || 'по запросу'}
                          </p>
                          <div className={Styles.productBottom}>
                            <div className={Styles.quantity} role="group" aria-label={`Количество: ${item.title}`}>
                              <button
                                type="button"
                                onClick={() => changeItemCount(item.cartKey, -1)}
                                disabled={item.count <= 1}
                                aria-label={`Уменьшить количество: ${item.title}`}
                              >
                                <Minus size={17} />
                              </button>
                              <span aria-live="polite" aria-atomic="true">
                                {item.count}
                              </span>
                              <button
                                type="button"
                                onClick={() => changeItemCount(item.cartKey, 1)}
                                disabled={item.count >= 999}
                                aria-label={`Увеличить количество: ${item.title}`}
                              >
                                <Plus size={17} />
                              </button>
                            </div>
                            <div className={Styles.price}>
                              <strong>{formatCartPrice(unitPrice * item.count)} ₽</strong>
                              <span>{formatCartPrice(unitPrice)} ₽ / шт.</span>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            </section>

            <aside className={Styles.summaryCard} aria-label="Стоимость заявки">
              <h2>Сумма заявки</h2>
              <div className={Styles.totalRow}>
                <strong>{formatCartPrice(totalPrice)} ₽</strong>
              </div>
              <p className={Styles.vat}>
                {totalCount} {getProductWord(totalCount)} · без НДС
              </p>
              <button type="button" className={Styles.checkoutButton} onClick={goToOrder}>
                Перейти к оформлению <ArrowRight size={18} />
              </button>
              <p className={Styles.summaryNote}>
                <LockKeyhole size={15} aria-hidden="true" /> Без онлайн-оплаты
              </p>
              <p className={Styles.deliveryNote}>Комплектацию, сроки и доставку уточнит менеджер.</p>
            </aside>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <footer className={Styles.mobileCheckout}>
          <div>
            <span>Стоимость без НДС</span>
            <strong>{formatCartPrice(totalPrice)} ₽</strong>
          </div>
          <button type="button" className={Styles.checkoutButton} onClick={goToOrder}>
            Перейти к оформлению <ArrowRight size={18} />
          </button>
        </footer>
      )}
    </div>
  );
};
