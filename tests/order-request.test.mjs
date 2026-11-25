import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { webcrypto } from 'node:crypto';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = ts.transpileModule(readFileSync(new URL('../src/components/utils/orderRequest.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const payload = { email: 'buyer@example.test', cart: [{ sku: 'product', count: 2 }] };
const session = (storage = new Map(), blocked = false) => {
  const context = {
    exports: {}, crypto: webcrypto, TextEncoder,
    sessionStorage: {
      getItem(key) { if (blocked) throw Error('blocked'); return storage.get(key) ?? null; },
      setItem(key, value) { if (blocked) throw Error('blocked'); storage.set(key, value); },
      removeItem(key) { storage.delete(key); },
    },
  };
  vm.runInNewContext(source, context);
  return context.exports;
};

test('a network retry and page reload retain the request ID without storing contacts', async () => {
  const storage = new Map();
  const first = session(storage);
  const id = await first.getOrderRequestId(payload);
  assert.equal(await first.getOrderRequestId(payload), id);
  const reloaded = session(storage);
  assert.equal(await reloaded.getOrderRequestId(payload), id);
  assert.ok(![...storage.values()].join('').includes(payload.email));
  reloaded.finishOrderRequest(id);
  assert.notEqual(await reloaded.getOrderRequestId(payload), id);
});

test('changed order data creates a new request and blocked storage permits retries', async () => {
  const api = session(new Map(), true);
  const id = await api.getOrderRequestId(payload);
  assert.equal(await api.getOrderRequestId(payload), id);
  assert.notEqual(await api.getOrderRequestId({ ...payload, email: 'different@example.test' }), id);
});
