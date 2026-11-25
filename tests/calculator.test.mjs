import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);
const load = (file, imports = {}) => {
  const context = { exports: {}, require: (name) => imports[name] ?? (name.endsWith('.scss') ? { default: {} } : require(name)) };
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL('../' + file, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, context);
  return context.exports;
};
const steps = load('src/components/content/calculator/configurationSteps.ts');
const { installations } = load('src/components/content/calculator/installationsData.ts');
const { InstallationCard } = load('src/components/content/calculator/InstallationCard.tsx', { './configurationSteps': steps });
const selection = {
  quantity: 4, volume: ['400'], heating: ['40'], density: ['Одностороннее'],
  max_gas: ['Не требуется'], max_gas_1: ['До 500 000'], vagometer: ['Не требуется'],
  vagometer1: ['Многофазный расходомер'], vagometer2: ['Не требуется'],
  pollution: ['Без влагомера'], closet: ['Шкаф управления'], fittings: ['Задвижки клиновые'],
};
const render = (sel) => renderToStaticMarkup(React.createElement(InstallationCard, {
  inst: installations[0], sel, errors: {}, validationAttempt: 0, onChange() {}, onValidate: () => true, onAdd: () => true,
}));

test('non-separation locks the three required meter choices; separation leaves them editable', () => {
  const locked = render(selection);
  const editable = render({ ...selection, max_gas: ['До 40 000'], max_gas_1: ['Не требуется'], vagometer1: ['Не требуется'] });
  for (const field of ['vagometer', 'vagometer1', 'vagometer2']) {
    const pattern = new RegExp('<input[^>]*name="' + field + '-1"[^>]*>', 'g');
    const inputs = locked.match(pattern);
    assert.ok(inputs?.length);
    assert.ok(inputs.every((input) => input.includes('disabled=""')));
    assert.equal(inputs.filter((input) => input.includes('checked=""')).length, 1);
    assert.ok(editable.match(pattern).every((input) => !input.includes('disabled=""')));
  }
});

test('final and step validation reject contradictory non-separation configurations', () => {
  assert.equal(steps.getIncompleteFields(selection).length, 0);
  for (const field of ['max_gas', 'vagometer', 'vagometer1', 'vagometer2']) {
    const invalid = { ...selection, [field]: ['Не требуется', 'Несовместимый вариант'] };
    assert.ok(steps.getIncompleteFields(invalid).includes(field));
    assert.ok(steps.getIncompleteFields(invalid, steps.configurationSteps[1].fields).includes(field));
    assert.equal(steps.getIncompleteFields(invalid, steps.configurationSteps[0].fields).length, 0);
  }
});
