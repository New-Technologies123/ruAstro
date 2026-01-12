import type { Product } from '../content/shop/products';

const CART_KEY = 'cart';

export type CartItem = Product & { count: number };

export const getCart = (): CartItem[] => {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
};

export const addToCart = (product: Product) => {
    const cart = getCart();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.count += 1;
    } else {
        cart.push({ ...product, count: 1 });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const removeFromCart = (id: number) => {
    const cart = getCart().filter(item => item.id !== id);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
};
