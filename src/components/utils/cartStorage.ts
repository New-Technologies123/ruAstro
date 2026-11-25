import type { Product } from '../products/types';

const CART_KEY = 'cart';
export const MAX_CART_ITEMS = 100;
export const CART_LIMIT_MESSAGE = `В корзине может быть не больше ${MAX_CART_ITEMS} разных товаров. Оформите текущий заказ или удалите лишние позиции.`;
let memoryCart: CartItem[] = [];
let useMemoryStorage = false;
const settledOrders = new Set<string>();

export type CartItem = Product & { count: number; cartKey: string; lineId: string };

// IDs in different equipment lists can overlap, so the cart also uses the item name and price.
export const getCartKey = (product: Product): string =>
  `${product.id}:${product.title.trim().replace(/\s+/g, ' ')}:${product.price.replace(/\s/g, '').replace(',', '.')}`;

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  if (useMemoryStorage) return memoryCart.map((item) => ({ ...item }));
  try {
    const data = localStorage.getItem(CART_KEY);
    const items: unknown = data ? JSON.parse(data) : [];
    memoryCart = Array.isArray(items) ? items.filter((item): item is CartItem =>
      item && typeof item === 'object' && Number.isSafeInteger(item.id) && item.id > 0 &&
      typeof item.title === 'string' && item.title.trim() !== '' && typeof item.price === 'string' &&
      /^\d+(?:[.,]\d{1,2})?$/.test(item.price.replace(/\s/g, '')) &&
      Number.isSafeInteger(item.count) && item.count > 0 && item.count <= 999,
    ).map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: typeof item.description === 'string' ? item.description : '',
      nds: typeof item.nds === 'string' ? item.nds : 'без НДС',
      deliveryTime: typeof item.deliveryTime === 'string' ? item.deliveryTime : 'по запросу',
      image: typeof item.image === 'string' ? item.image : '',
      count: item.count,
      cartKey: getCartKey(item),
      // Older saved carts retain a stable identity until the position is removed.
      lineId: typeof item.lineId === 'string' && item.lineId ? item.lineId : `legacy:${getCartKey(item)}`,
    })) : [];
    return memoryCart.map((item) => ({ ...item }));
  } catch {
    useMemoryStorage = true;
    return memoryCart.map((item) => ({ ...item }));
  }
};

const saveCart = (cart: CartItem[]) => {
  memoryCart = cart.map((item) => ({ ...item }));
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    useMemoryStorage = true;
  }
  window.dispatchEvent(new Event('cartUpdated'));
};

export const addToCart = (product: Product, qty: number = 1) => {
  if (!Number.isSafeInteger(qty) || qty < 1) return;
  const cart = getCart();
  const cartKey = getCartKey(product);
  const existing = cart.find((item) => item.cartKey === cartKey);

  if (existing) {
    existing.count = Math.min(999, existing.count + qty);
  } else {
    if (cart.length >= MAX_CART_ITEMS) {
      window.alert(CART_LIMIT_MESSAGE);
      return;
    }
    cart.push({ ...product, cartKey, lineId: crypto.randomUUID(), count: Math.min(999, qty) });
  }

  saveCart(cart);
};

export const removeFromCart = (cartKey: string) => {
  const cart = getCart().filter((item) => item.cartKey !== cartKey);
  saveCart(cart);
};

export const changeItemCount = (cartKey: string, delta: number) => {
  if (!Number.isSafeInteger(delta)) return;
  const updated = getCart()
    .map((item) => (item.cartKey === cartKey ? { ...item, count: Math.min(999, item.count + delta) } : item))
    .filter((item) => item.count > 0);

  saveCart(updated);
};

export const clearCart = () => {
  saveCart([]);
};

// Read the latest cart after the response, including changes from other tabs.
export const removeOrderedItems = (ordered: Pick<CartItem, 'cartKey' | 'count' | 'lineId'>[], requestId: string) => {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem('settledCartOrders') || '[]');
    if (Array.isArray(stored)) stored.filter((value): value is string => typeof value === 'string').forEach((value) => settledOrders.add(value));
  } catch { /* In-memory fallback. */ }
  if (settledOrders.has(requestId)) return;
  const counts = new Map<string, number>();
  ordered.forEach(({ lineId, count }) => counts.set(lineId, (counts.get(lineId) ?? 0) + count));
  saveCart(getCart().map((item) => ({
    ...item,
    count: Math.max(0, item.count - (counts.get(item.lineId) ?? 0)),
  })).filter((item) => item.count > 0));
  settledOrders.add(requestId);
  try { localStorage.setItem('settledCartOrders', JSON.stringify([...settledOrders].slice(-1000))); } catch { /* In-memory fallback. */ }
};
