import type { Product } from '../products/types';

const CART_KEY = 'cart';

export type CartItem = Product & { count: number };

export const getCart = (): CartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const addToCart = (product: Product, qty: number = 1) => {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.count += qty;
  } else {
    cart.push({ ...product, count: qty });
  }

  saveCart(cart);
};

export const removeFromCart = (id: number) => {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
};

export const changeItemCount = (id: number, delta: number) => {
  const updated = getCart()
    .map(item =>
      item.id === id
        ? { ...item, count: item.count + delta }
        : item
    )
    .filter(item => item.count > 0);

  saveCart(updated);
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event('cartUpdated'));
};
