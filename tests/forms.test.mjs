import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { createServer } from 'node:net';
import { mkdtemp, readFile, rm, readdir, mkdir, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { after, before, beforeEach, test } from 'node:test';
import { randomUUID } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const php = process.env.PHP_BINARY || 'php';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
let privateDir, capture, base, server, sku, product, lot, lotItem, lastError = '';
const person = { name: 'Тестовый пользователь', email: 'forms@example.test', phone: '+7 (999) 123-45-67' };
const order = () => ({ ...person, company: 'Тестовая компания', position: 'Инженер', consent: true, offerAgreement: true, cart: [{ sku, count: 2 }], requestId: randomUUID() });
const question = () => ({ ...person, message: 'Тестовый вопрос', agreement: true, privacyAgreement: true });

before(async () => {
  const available = spawnSync(php, ['-v'], { encoding: 'utf8' });
  assert.equal(available.status, 0, 'Установите PHP 8.1+ и задайте PHP_BINARY при необходимости.');
  privateDir = await mkdtemp(path.join(tmpdir(), 'ruastro-form-tests-'));
  capture = path.join(privateDir, 'mail.jsonl');
  const catalog = JSON.parse(await readFile(path.join(root, 'dist/server-data/order-catalog.json'), 'utf8'));
  [sku, product] = Object.entries(catalog)[0];
  const procurement = XLSX.read(await readFile(path.join(root, 'dist/procurement.xlsx')));
  lotItem = XLSX.utils.sheet_to_json(procurement.Sheets[procurement.SheetNames[0]], { header: 1 }).slice(1).find(row => row[2] && row[5] && Number(row[3]) > 0);
  lot = String(lotItem[5]).trim();
  ({ server, base } = await startPhp(path.join(root, 'dist')));
});

async function startPhp(documentRoot) {
  const portServer = createServer();
  await new Promise(resolve => portServer.listen(0, '127.0.0.1', resolve));
  const port = portServer.address().port;
  await new Promise(resolve => portServer.close(resolve));
  const base = `http://127.0.0.1:${port}`;
  const args = process.env.PHP_CONFIG ? ['-c', process.env.PHP_CONFIG] : [];
  args.push('-d', `auto_prepend_file=${path.join(root, 'tests/forms/mail-stub.php')}`, '-d', 'upload_max_filesize=3M', '-d', 'post_max_size=13M', '-d', 'max_file_uploads=6', '-S', `127.0.0.1:${port}`, '-t', documentRoot);
  const server = spawn(php, args, { cwd: root, env: { ...process.env, FORM_PRIVATE_DIR: privateDir, TEST_MAIL_CAPTURE: capture }, windowsHide: true });
  server.stderr.on('data', data => { lastError = (lastError + data).slice(-5000); });
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error(lastError);
    try { await fetch(base); return { server, base }; } catch { await new Promise(resolve => setTimeout(resolve, 50)); }
  }
  throw new Error('PHP server did not start: ' + lastError);
}

beforeEach(async () => {
  if (privateDir) await rm(path.join(privateDir, 'rate-limits.json'), { force: true });
});
after(async () => {
  if (server && server.exitCode === null) {
    const exited = new Promise(resolve => server.once('exit', resolve));
    server.kill();
    await exited;
  }
  if (privateDir) {
    assert.ok(path.resolve(privateDir).startsWith(path.resolve(tmpdir()) + path.sep + 'ruastro-form-tests-'));
    await rm(privateDir, { recursive: true, force: true });
  }
});

async function json(endpoint, payload, headers = {}) {
  const response = await fetch(base + endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: typeof payload === 'string' ? payload : JSON.stringify(payload) });
  return { response, data: await response.json() };
}
async function messages() { return (await readFile(capture, 'utf8')).trim().split('\n').map(line => JSON.parse(line)); }
const offerHeaders = ['Полное наименование изделия Поставщика', 'Полное наименование изделия по заявке', 'Количество', 'Единицы измерения', 'Примечание', 'Цена с НДС', 'Сумма с НДС', 'Срок поставки (календарный день)', 'Условие оплаты'];
const offerRow = () => ['Тестовый товар', lotItem[2], lotItem[3], lotItem[4], lot, 100, Number(lotItem[3]) * 100, 30, 'Предоплата'];
function excel(bookType = 'xlsx', rows = [offerHeaders, offerRow()]) {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(rows), 'Предложение');
  return XLSX.write(wb, { type: 'buffer', bookType });
}
function offer(options = {}) {
  const form = new FormData();
  for (const [key, value] of Object.entries({ fullName: person.name, email: person.email, phone: person.phone, company: 'Тестовая компания', inn: '7707083893', lot, consent: 'true', privacyAgreement: 'true', ...options.fields })) form.append(key, value);
  const pdf = '%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF\n';
  for (const field of ['egrul', 'charter', 'partnerCard', 'directorDecision', 'invoicePDF']) {
    const data = options[field] ?? pdf;
    form.append(field, new Blob([data], { type: 'application/pdf' }), `${field}.pdf`);
  }
  form.append('offerFile', new Blob([options.excel ?? excel()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), options.excelName ?? 'offer.xlsx');
  return form;
}

test('method, content type, JSON and foreign Origin are rejected', async () => {
  assert.equal((await fetch(base + '/sendOrder.php')).status, 405);
  assert.equal((await fetch(base + '/sendOrder.php', { method: 'POST', body: 'text' })).status, 415);
  assert.equal((await json('/sendOrder.php', '{')).response.status, 400);
  assert.equal((await json('/sendOrder.php', order(), { Origin: 'https://untrusted.example' })).response.status, 403);
});

test('all forms reject missing consents, wrong types and header injection', async () => {
  for (const invalid of [
    { ...order(), consent: false }, { ...order(), offerAgreement: 'false' }, { ...order(), name: [] },
    { ...order(), email: 'a@example.test\r\nBcc: stolen@example.test' }, { ...order(), position: '' },
    { ...order(), phone: '123' }, { ...order(), company: 'a'.repeat(301) },
  ]) assert.equal((await json('/sendOrder.php', invalid)).response.status, 422);
  assert.equal((await json('/send-question.php', { ...question(), agreement: false })).response.status, 422);
  assert.equal((await json('/send-question.php', { ...question(), message: '' })).response.status, 422);
  assert.equal((await json('/send-question.php', { ...question(), privacyAgreement: false })).response.status, 422);
});

test('prices and titles come from the server catalog, not the payload', async () => {
  const before = (await messages().catch(() => [])).length;
  const result = await json('/sendOrder.php', { ...order(), cart: [{ sku, count: 2, price: '-1', title: 'Подменённый товар' }] });
  assert.equal(result.response.status, 200);
  assert.equal(result.data.totalMinor, product.priceMinor * 2);
  const sent = (await messages()).slice(before);
  assert.equal(sent.length, 2);
  const mail = sent[0];
  assert.equal(mail.to, 'tendernt@tech-new.ru');
  assert.ok(mail.message.includes(product.title));
  assert.ok(!mail.message.includes('Подменённый товар'));
  const confirmation = sent[1];
  assert.equal(result.data.confirmationSent, true);
  assert.equal(confirmation.to, person.email);
  assert.ok(confirmation.message.includes(product.title));
  assert.ok(confirmation.message.includes('Количество: 2 шт.'));
  assert.ok(!confirmation.message.includes('Подменённый товар'));
  assert.ok(confirmation.headers.includes('Reply-To: tendernt@tech-new.ru'));
  for (const message of sent) {
    assert.ok(message.message.includes(result.data.orderId));
    const subject = Buffer.from(message.subject.match(/\?B\?(.+)\?=/)[1], 'base64').toString('utf8');
    assert.ok(subject.includes(result.data.orderId));
  }
});

test('a failed customer confirmation does not reject an accepted order', async () => {
  const before = (await messages()).length;
  const result = await json('/sendOrder.php', { ...order(), email: 'confirmation-failed@example.test' });
  assert.equal(result.response.status, 200);
  assert.equal(result.data.success, true);
  assert.equal(result.data.confirmationSent, false);
  assert.match(result.data.orderId, /^NT-\d{8}-[0-9A-F]{12}$/);
  const sent = (await messages()).slice(before);
  assert.deepEqual(sent.map(mail => mail.to), ['tendernt@tech-new.ru', 'confirmation-failed@example.test']);
});

test('a rejected manager email does not generate a customer confirmation', async () => {
  const before = (await messages()).length;
  const result = await json('/sendOrder.php', { ...order(), email: 'mail-failure@example.test' });
  assert.equal(result.response.status, 502);
  const sent = (await messages()).slice(before);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'tendernt@tech-new.ru');
});

test('empty carts, unknown SKUs, fractional and duplicate excessive counts are rejected', async () => {
  for (const cart of [[], [{ sku: 'unknown', count: 1 }], [{ sku, count: -1 }], [{ sku, count: 1.5 }], [{ sku, count: '2' }], [{ sku, count: 600 }, { sku, count: 600 }]]) {
    assert.equal((await json('/sendOrder.php', { ...order(), cart })).response.status, 422);
  }
});

test('repeated and concurrent order requests return one order number and send only two emails', async () => {
  const before = (await messages()).length;
  const payload = order();
  const results = await Promise.all([json('/sendOrder.php', payload), json('/sendOrder.php', payload)]);
  const repeated = await json('/sendOrder.php', payload);
  for (const result of [...results, repeated]) {
    assert.equal(result.response.status, 200);
    assert.deepEqual(result.data, results[0].data);
  }
  assert.equal((await messages()).length - before, 2);
  assert.equal((await json('/sendOrder.php', { ...payload, company: 'Другая компания' })).response.status, 409);
});

test('catalog recovery permits retry, and completed orders replay even while the catalog is unavailable', async () => {
  const site = path.join(privateDir, 'catalog-retry-site');
  await mkdir(path.join(site, '_forms'), { recursive: true });
  await mkdir(path.join(site, 'server-data'));
  for (const file of ['sendOrder.php', '_forms/bootstrap.php', '_forms/orders.php']) {
    await copyFile(path.join(root, 'dist', file), path.join(site, file));
  }
  const isolated = await startPhp(site);
  try {
    const payload = order();
    const before = (await messages()).length;
    const send = async () => {
      const response = await fetch(isolated.base + '/sendOrder.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      return { response, data: await response.json() };
    };
    assert.equal((await send()).response.status, 503);
    assert.equal((await messages()).length, before);
    const catalog = path.join(site, 'server-data/order-catalog.json');
    await copyFile(path.join(root, 'dist/server-data/order-catalog.json'), catalog);
    const accepted = await send();
    assert.equal(accepted.response.status, 200);
    assert.equal((await messages()).length, before + 2);
    await rm(catalog);
    const repeated = await send();
    assert.equal(repeated.response.status, 200);
    assert.deepEqual(repeated.data, accepted.data);
    assert.equal((await messages()).length, before + 2);
  } finally {
    const exited = new Promise(resolve => isolated.server.once('exit', resolve));
    isolated.server.kill();
    await exited;
  }
});

test('unfinished mail delivery is not repeated after an interrupted worker', async () => {
  const payload = order();
  const first = await json('/sendOrder.php', payload);
  const { createHash } = await import('node:crypto');
  const { writeFile } = await import('node:fs/promises');
  const recordPath = path.join(privateDir, 'orders', createHash('sha256').update(payload.requestId).digest('hex') + '.json');
  const record = JSON.parse(await readFile(recordPath, 'utf8'));
  record.state = 'pending';
  await writeFile(recordPath, JSON.stringify(record));
  const before = (await messages()).length;
  const retry = await json('/sendOrder.php', payload);
  assert.equal(retry.response.status, 409);
  assert.ok(retry.data.error.includes(first.data.orderId));
  assert.equal((await messages()).length, before);
});

test('an explicit manager mail rejection can be retried without duplicating an accepted order', async () => {
  const before = (await messages()).length;
  const payload = { ...order(), email: 'retry-once@example.test' };
  assert.equal((await json('/sendOrder.php', payload)).response.status, 502);
  const accepted = await json('/sendOrder.php', payload);
  assert.equal(accepted.response.status, 200);
  const repeated = await json('/sendOrder.php', payload);
  assert.deepEqual(repeated.data, accepted.data);
  assert.equal((await messages()).length - before, 3);
});

test('question succeeds and delivery failure returns a non-success status', async () => {
  assert.equal((await json('/send-question.php', question())).response.status, 200);
  assert.equal((await messages()).at(-1).to, 'nt@tech-new.ru');
  assert.equal((await json('/send-question.php', { ...question(), email: 'mail-failure@example.test' })).response.status, 502);
});

test('rate limiting returns 429 and Retry-After', async () => {
  for (let i = 0; i < 10; i++) assert.equal((await json('/send-question.php', question())).response.status, 200);
  const result = await json('/send-question.php', question());
  assert.equal(result.response.status, 429);
  assert.equal(result.response.headers.get('Retry-After'), '900');
});

test('procurement requires a lot and validates file formats and per-file size', async () => {
  const before = (await messages()).length;
  for (const body of [
    offer({ fields: { lot: '' } }), offer({ invoicePDF: 'not a PDF' }), offer({ excel: 'not an Excel file' }),
    offer({ excelName: 'offer.csv' }), offer({ excelName: 'offer.xls' }),
  ]) {
    assert.equal((await fetch(base + '/submit.php', { method: 'POST', body })).status, 422);
  }
  assert.equal((await fetch(base + '/submit.php', { method: 'POST', body: offer({ invoicePDF: Buffer.alloc(3 * 1024 * 1024 + 1, 65) }) })).status, 413);
  assert.equal((await messages()).length, before);
});

test('valid procurement sends all attachments and the selected lot', async () => {
  const before = (await messages()).length;
  const response = await fetch(base + '/submit.php', { method: 'POST', body: offer() });
  const data = await response.json();
  assert.equal(response.status, 200, JSON.stringify(data) + lastError);
  const mail = (await messages()).at(-1);
  const recipients = (await messages()).slice(before).map(mail => mail.to);
  assert.equal(recipients.length, 6);
  assert.ok(!recipients.includes(person.email));
  const textPart = mail.message.split('\r\n\r\n')[1].split('\r\n--')[0];
  assert.ok(Buffer.from(textPart.replace(/\s/g, ''), 'base64').toString('utf8').includes(lot));
  assert.equal((mail.message.match(/Content-Disposition: attachment/g) || []).length, 6);
});

test('legacy XLS proposals are checked and accepted', async () => {
  const response = await fetch(base + '/submit.php', { method: 'POST', body: offer({ excel: excel('biff8'), excelName: 'offer.xls' }) });
  assert.equal(response.status, 200, await response.text());
});

test('procurement accepts valid XLSX without checking proposal columns or prices', async () => {
  const before = (await messages()).length;
  const incomplete = offerRow(); incomplete[8] = '';
  const wrongPrice = offerRow(); wrongPrice[5] = -100;
  for (const rows of [[['Тест'], ['Товар']], [offerHeaders], [offerHeaders, incomplete], [offerHeaders, wrongPrice]]) {
    const response = await fetch(base + '/submit.php', { method: 'POST', body: offer({ excel: excel('xlsx', rows) }) });
    assert.equal(response.status, 200, await response.text());
  }
  assert.equal((await messages()).length - before, 24);
});

test('a filled template with untouched rows and a calculated total is accepted', async () => {
  const blank = offerRow(); for (const index of [0, 5, 7, 8]) blank[index] = ''; blank[6] = 0;
  const total = ['', '', '', '', 'Итого', 100, Number(lotItem[3]) * 100, '', ''];
  const response = await fetch(base + '/submit.php', { method: 'POST', body: offer({ excel: excel('xlsx', [offerHeaders, offerRow(), blank, total]) }) });
  assert.equal(response.status, 200, await response.text());
});

test('combined attachment size is limited even when each PDF is allowed', async () => {
  const largePdf = Buffer.alloc(2.5 * 1024 * 1024, 32);
  largePdf.write('%PDF-1.4\n');
  const body = offer({ egrul: largePdf, charter: largePdf, partnerCard: largePdf, directorDecision: largePdf, invoicePDF: largePdf });
  assert.equal((await fetch(base + '/submit.php', { method: 'POST', body })).status, 413);
});

test('audit logs are private and contain no contacts or message text', async () => {
  await json('/send-question.php', question());
  const auditFiles = (await readdir(privateDir)).filter(name => name.startsWith('submissions-'));
  assert.ok(auditFiles.length > 0);
  const logs = await readFile(path.join(privateDir, auditFiles[0]), 'utf8');
  for (const secret of [person.name, person.email, person.phone, question().message]) assert.ok(!logs.includes(secret));
  for (const file of (await readdir(path.join(privateDir, 'orders'))).filter(name => name.endsWith('.json'))) {
    const record = await readFile(path.join(privateDir, 'orders', file), 'utf8');
    for (const secret of [person.name, person.email, person.phone, sku]) assert.ok(!record.includes(secret));
  }
  for (const file of ['form-submissions.log', 'order-submissions.log']) {
    await assert.rejects(readFile(path.join(root, 'dist', file)), { code: 'ENOENT' });
    const body = await (await fetch(base + '/' + file)).text();
    assert.ok(!body.includes(person.email));
  }
});
