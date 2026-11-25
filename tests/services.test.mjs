import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = ts.createSourceFile('Services.tsx', readFileSync(new URL('../src/components/content/services/Services.tsx', import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const names = ['serviceStorage', 'goToService', 'SELECTED_CARD_KEY', 'FROM_SERVICE_KEY', 'SCROLL_POSITION_KEY'];
const declarations = [];
const visit = (node) => {
  if (ts.isVariableDeclaration(node) && names.includes(node.name.getText(source))) declarations.push('const ' + node.getText(source) + ';');
  ts.forEachChild(node, visit);
};
visit(source);
const code = ts.transpileModule(declarations.join('\n') + '\nexports.go = goToService; exports.storage = serviceStorage;', {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText;

test('blocked browser storage cannot prevent service navigation or crash carousel storage', () => {
  const context = {
    exports: {}, trackRef: { current: { scrollLeft: 200 } }, window: { location: { href: '/services/' } },
    sessionStorage: { getItem() { throw Error('SecurityError'); }, setItem() { throw Error('SecurityError'); }, removeItem() { throw Error('SecurityError'); } },
  };
  vm.runInNewContext(code, context);
  context.exports.go('repair', 0);
  assert.equal(context.window.location.href, '/services/repair/');
  assert.equal(context.exports.storage.getItem('position'), null);
  assert.doesNotThrow(() => context.exports.storage.setItem('position', '200'));
  assert.doesNotThrow(() => context.exports.storage.removeItem('position'));
});
