import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import { webcrypto } from 'node:crypto';

const source = ts.transpileModule(readFileSync(new URL('../src/components/utils/cartStorage.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const product = { id: 1, title: 'Тестовый товар', price: '1 500', description: '', nds: 'без НДС', deliveryTime: '', image: '' };

function session(storage = new Map(), blocked = false) {
  let events = 0;
  const alerts = [];
  const context = {
    exports: {}, Event: class {}, crypto: webcrypto,
    window: { dispatchEvent() { events++; }, alert(message) { alerts.push(message); } },
    localStorage: {
      getItem(key) { if (blocked) throw new Error('SecurityError'); return storage.get(key) ?? null; },
      setItem(key, value) { if (blocked) throw new Error('QuotaExceededError'); storage.set(key, value); },
    },
  };
  vm.runInNewContext(source, context);
  return { cart: context.exports, events: () => events, alerts };
}

test('cart survives a new tab and clearing is explicit', () => {
  const storage = new Map();
  const first = session(storage);
  first.cart.addToCart(product, 2);
  const second = session(storage);
  assert.equal(second.cart.getCart()[0].count, 2);
  second.cart.changeItemCount(second.cart.getCart()[0].cartKey, 1);
  assert.equal(first.cart.getCart()[0].count, 3);
  first.cart.clearCart();
  assert.equal(second.cart.getCart().length, 0);
});

test('blocked storage keeps a working in-memory cart', () => {
  const { cart, events } = session(new Map(), true);
  assert.equal(cart.getCart().length, 0);
  cart.addToCart(product, 2);
  assert.equal(cart.getCart()[0].count, 2);
  cart.changeItemCount(cart.getCart()[0].cartKey, -1);
  assert.equal(cart.getCart()[0].count, 1);
  cart.clearCart();
  assert.equal(cart.getCart().length, 0);
  assert.equal(events(), 3);
});

test('corrupt cart entries and invalid quantities are rejected', () => {
  const { cart } = session(new Map([['cart', JSON.stringify([null, {}, { ...product, count: -1 }, { ...product, count: '2' }, { ...product, description: {}, count: 2 }])]]));
  assert.equal(cart.getCart().length, 1);
  assert.equal(cart.getCart()[0].description, '');
  cart.addToCart(product, NaN);
  assert.equal(cart.getCart()[0].count, 2);
  cart.addToCart(product, 10000);
  assert.equal(cart.getCart()[0].count, 999);
});

test('order completion preserves new products and added quantities from another tab', () => {
  const storage = new Map();
  const first = session(storage);
  first.cart.addToCart(product, 2);
  const ordered = first.cart.getCart();
  const other = session(storage);
  other.cart.addToCart(product, 3);
  other.cart.addToCart({ ...product, id: 2, title: 'Другой товар' }, 1);
  first.cart.removeOrderedItems(ordered, 'completed-request');
  assert.equal(first.cart.getCart()[0].count, 3);
  assert.equal(first.cart.getCart()[1].count, 1);
  // A cached success response must not subtract the same order again, even after a reload.
  session(storage).cart.removeOrderedItems(ordered, 'completed-request');
  assert.equal(first.cart.getCart()[0].count, 3);
});

test('order completion tolerates products removed while the request was pending', () => {
  const { cart } = session();
  cart.addToCart(product, 2);
  const ordered = cart.getCart();
  cart.clearCart();
  cart.addToCart({ ...product, id: 2, title: 'Новый товар' }, 1);
  cart.removeOrderedItems(ordered, 'other-request');
  assert.equal(cart.getCart().length, 1);
  assert.equal(cart.getCart()[0].id, 2);
});

test('a removed and re-added product survives the response to the old order', () => {
  const storage = new Map();
  const first = session(storage);
  first.cart.addToCart(product, 2);
  const ordered = first.cart.getCart();
  const other = session(storage);
  other.cart.removeFromCart(ordered[0].cartKey);
  other.cart.addToCart(product, 1);
  assert.notEqual(other.cart.getCart()[0].lineId, ordered[0].lineId);
  first.cart.removeOrderedItems(ordered, 'old-order');
  assert.equal(first.cart.getCart()[0].count, 1);
});

test('legacy cart positions have a stable identity across tabs', () => {
  const storage = new Map([['cart', JSON.stringify([{ ...product, count: 2 }])]]);
  const first = session(storage);
  const ordered = first.cart.getCart();
  const other = session(storage);
  assert.equal(other.cart.getCart()[0].lineId, ordered[0].lineId);
  other.cart.addToCart(product, 1);
  first.cart.removeOrderedItems(ordered, 'legacy-order');
  assert.equal(first.cart.getCart()[0].count, 1);
});

test('cart accepts 100 positions, blocks the 101st, and still permits quantity changes', () => {
  const { cart, alerts } = session();
  for (let id = 1; id <= 100; id++) cart.addToCart({ ...product, id });
  cart.addToCart({ ...product, id: 101 });
  assert.equal(cart.getCart().length, 100);
  assert.equal(alerts.length, 1);
  assert.ok(alerts[0].includes('100'));
  cart.addToCart(product, 1);
  assert.equal(cart.getCart()[0].count, 2);
  cart.removeFromCart(cart.getCart()[0].cartKey);
  cart.addToCart({ ...product, id: 101 });
  assert.equal(cart.getCart().length, 100);
  assert.equal(cart.getCart().at(-1).id, 101);
});
