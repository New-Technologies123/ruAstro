import { useEffect, useState } from 'react';
import Styles from './basket.module.scss';
import { Title } from '../../ui/title/Title';
import { getCart, removeFromCart } from '../../utils/cartStorage';
import type { CartItem } from '../../utils/cartStorage';

export const Basket = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        setCart(getCart());
    }, []);

    const parsePrice = (price: string): number =>
        Number(price.replace(/\s/g, ''));

    const totalPrice = cart.reduce((sum, item) => {
        return sum + parsePrice(item.price) * item.count;
    }, 0);

    if (!cart.length) {
        return <Title text="Корзина пуста" />;
    }

    return (
        <>
            <Title text="Корзина" />

            <div className={Styles.items}>
                {cart.map(item => (
                    <div key={item.id} className={Styles.item}>
                        <div className={Styles.info}>
                            <h3>{item.title}</h3>
                            <p>Количество: {item.count}</p>
                            <h1>{item.price} ₽</h1>
                        </div>

                        <button
                            className={Styles.delete}
                            onClick={() => {
                                removeFromCart(item.id);
                                setCart(getCart());
                            }}
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            <div className={Styles.right}>
                <div className={Styles.total}>
                    <p>Итого:</p>
                    <h4>{totalPrice} ₽</h4>
                </div>

                <button className={Styles.order}>
                    <p>Оформить заказ</p>
                </button>
            </div>
        </>
    );
};
