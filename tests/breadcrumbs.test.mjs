import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const require = createRequire(import.meta.url);
const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const file = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(file) : [file];
});

test('every built content page has one consistent breadcrumb trail with working parent links', () => {
  const directory = fileURLToPath(new URL('src/pages/', root));
  let checked = 0;
  let sharedClass;
  for (const file of walk(directory).filter((file) => file.endsWith('.astro'))) {
    if (!readFileSync(file, 'utf8').includes('<Layout')) continue;
    const route = path.relative(directory, file)
      .replaceAll('\\', '/').replace(/(?:\/index)?\.astro$/, '');
    const html = readFileSync(new URL(`dist/${route}/index.html`, root), 'utf8');
    const trails = [...html.matchAll(/<nav\b[^>]*aria-label="Хлебные крошки"[^>]*>[\s\S]*?<\/nav>/g)];
    assert.equal(trails.length, route === 'home' ? 0 : 1, route);
    if (route === 'home') continue;
    const trail = trails[0][0];
    const className = trail.match(/class="([^" ]+)/)[1];
    sharedClass ??= className;
    assert.equal(className, sharedClass, route);
    assert.ok(trail.includes('<ol'), route);
    assert.equal((trail.match(/aria-current="page"/g) || []).length, 1, route);
    const links = [...trail.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)];
    assert.equal(links[0]?.[1], '/home/', route);
    assert.ok(trail.includes('aria-label="Главная"'), route);
    for (const [, href] of links) {
      assert.notEqual(href, `/${route}/`, route);
      assert.ok(existsSync(new URL(`dist${href}index.html`, root)), `${route}: ${href}`);
    }
    checked++;
  }
  assert.ok(checked >= 36, 'All current content routes must be checked.');
});

test('nested products and shop product views keep their hierarchy and escape product names', () => {
  const context = {
    exports: {},
    require: (name) => name.endsWith('.scss') ? { default: {} } : require(name),
  };
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL('src/components/ui/breadcrumbs/Breadcrumbs.tsx', root), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, context);
  const render = (props) => renderToStaticMarkup(React.createElement(context.exports.Breadcrumbs, props));
  const nested = render({ path: '/products/accounting-system/calculator/' });
  assert.deepEqual([...nested.matchAll(/href="([^"]+)"/g)].map((match) => match[1]), [
    '/home/', '/products/', '/products/accounting-system/',
  ]);
  const product = render({ path: '/shop/', current: 'Товар <пример> & комплект', tone: 'light' });
  assert.ok(product.includes('href="/shop/"'));
  assert.ok(product.includes('aria-current="page">Товар &lt;пример&gt; &amp; комплект'));
  assert.equal(render({ path: '/home/' }), '');
});
