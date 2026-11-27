import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import pdfMake from 'pdfmake';
import vfs from 'pdfmake/build/vfs_fonts.js';

const source = ts.transpileModule(readFileSync(new URL('../src/components/utils/orderPdf.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const context = { exports: {}, Intl, Date };
vm.runInNewContext(source, context);
const { createOrderPdfDefinition } = context.exports;
for (const [name, bytes] of Object.entries(vfs)) pdfMake.virtualfs.writeFileSync(name, Buffer.from(bytes, 'base64'));
pdfMake.addFonts({
  Roboto: { normal: 'Roboto-Regular.ttf', bold: 'Roboto-Medium.ttf', italics: 'Roboto-Italic.ttf', bolditalics: 'Roboto-MediumItalic.ttf' },
});

const data = {
  receipt: {
    id: 'NT-20261127-A1B2C3D4E5F6',
    createdAt: '2026-11-27T07:00:00Z',
    totalMinor: 3900000,
    lines: [
      {
        title: 'Устройство для регулирования перепада давления УРПД-1.1 НТ.511.000.000.0',
        count: 2,
        priceMinor: 1950000,
        totalMinor: 3900000,
      },
    ],
  },
  contact: {
    name: 'Александр Иванов',
    company: 'ООО Пример',
    position: 'Главный инженер',
    email: 'buyer@example.test',
    phone: '+7 (999) 123-45-67',
    comment: 'Уточнить сроки поставки.',
  },
  attachmentName: 'Спецификация.pdf',
};

test('an accepted order renders as a real PDF with embedded Cyrillic fonts', async () => {
  const definition = createOrderPdfDefinition(data);
  const buffer = await pdfMake.createPdf(definition).getBuffer();
  assert.ok(buffer.subarray(0, 5).equals(Buffer.from('%PDF-')));
  assert.ok(buffer.length > 15000);
  assert.equal(definition.info.title, 'Заявка ' + data.receipt.id);
  const plain = JSON.stringify(definition);
  assert.ok(plain.includes('39 000 ₽') || plain.includes('39 000 ₽'));
  assert.ok(plain.includes(data.attachmentName));
  assert.ok(plain.includes('Главный инженер'));
});

test('a 100-line order and long optional text render across pages without losing rows', async () => {
  const long = structuredClone(data);
  long.receipt.lines = Array.from({ length: 100 }, (_, index) => ({
    ...data.receipt.lines[0],
    title: `Товар ${index + 1}: ${data.receipt.lines[0].title}`,
  }));
  long.receipt.totalMinor = long.receipt.lines.reduce((total, line) => total + line.totalMinor, 0);
  long.contact.email = 'a'.repeat(180) + '@example.test';
  long.contact.comment = 'Длинный комментарий к комплектации и условиям поставки. '.repeat(80);
  const definition = createOrderPdfDefinition(long);
  const table = definition.content.find((item) => item.table);
  assert.equal(table.table.body.length, 101);
  assert.equal(table.table.headerRows, 1);
  const buffer = await pdfMake.createPdf(definition).getBuffer();
  assert.ok(buffer.length > 30000);
  assert.ok((buffer.toString('latin1').match(/\/Type \/Page\b/g) || []).length > 3);
});
