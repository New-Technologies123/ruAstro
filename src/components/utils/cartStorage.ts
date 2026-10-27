import type { Product } from '../products/types';

const CART_KEY = 'cart';

export type CartItem = Product & { count: number; cartKey: string };

// IDs in different equipment lists can overlap, so the cart also uses the item name and price.
export const getCartKey = (product: Product): string =>
  `${product.id}:${product.title.trim().replace(/\s+/g, ' ')}:${product.price.replace(/\s/g, '').replace(',', '.')}`;

export const getCart = (): CartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  if (!data) return [];
  try {
    const items: Product[] = JSON.parse(data);
    return Array.isArray(items) ? (items.map((item) => ({ ...item, cartKey: getCartKey(item) })) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
};

export const addToCart = (product: Product, qty: number = 1) => {
  const cart = getCart();
  const cartKey = getCartKey(product);
  const existing = cart.find((item) => item.cartKey === cartKey);

  if (existing) {
    existing.count += qty;
  } else {
    cart.push({ ...product, cartKey, count: qty });
  }

  saveCart(cart);
};

export const removeFromCart = (cartKey: string) => {
  const cart = getCart().filter((item) => item.cartKey !== cartKey);
  saveCart(cart);
};

export const changeItemCount = (cartKey: string, delta: number) => {
  const updated = getCart()
    .map((item) => (item.cartKey === cartKey ? { ...item, count: item.count + delta } : item))
    .filter((item) => item.count > 0);

  saveCart(updated);
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event('cartUpdated'));
};
