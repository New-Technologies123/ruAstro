import type { Content, TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';

export type OrderReceipt = {
  id: string;
  createdAt: string;
  totalMinor: number;
  lines: { title: string; count: number; priceMinor: number; totalMinor: number }[];
};

export type OrderPdfData = {
  receipt: OrderReceipt;
  contact: { name: string; company: string; position: string; email: string; phone: string; comment: string };
  attachmentName?: string;
};

const amount = (minor: number) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(minor / 100) + ' ₽';
const wrap = (text: string) => text.replace(/\S{36,}/gu, (word) => word.match(/.{1,36}/gu)!.join('\u200b'));
const ink = '#102b40';
const muted = '#526b82';
const blue = '#155eef';
const pale = '#eaf4ff';

export const createOrderPdfDefinition = ({ receipt, contact, attachmentName }: OrderPdfData): TDocumentDefinitions => {
  const contactCell = (label: string, value: string): Content => ({
    stack: [
      { text: label, color: muted, fontSize: 9, margin: [0, 0, 0, 4] },
      { text: wrap(value), bold: true },
    ],
    margin: [0, 0, 0, 12],
  });
  const body: TableCell[][] = [
    ['№', 'Наименование товара', 'Кол-во', 'Цена', 'Сумма'].map((text, index) => ({
      text,
      bold: true,
      color: ink,
      fillColor: pale,
      alignment: index > 1 ? 'right' : 'left',
    })),
    ...receipt.lines.map((line, index): TableCell[] => [
      String(index + 1),
      wrap(line.title),
      { text: String(line.count), alignment: 'right' },
      { text: amount(line.priceMinor), alignment: 'right' },
      { text: amount(line.totalMinor), alignment: 'right', bold: true },
    ]),
  ];
  const extra: Content[] = [];
  if (contact.comment) extra.push({ text: 'Комментарий к заявке', style: 'section' }, { text: wrap(contact.comment), lineHeight: 1.3 });
  if (attachmentName) extra.push({ text: [{ text: 'Приложенный файл: ', bold: true }, wrap(attachmentName)], margin: [0, 16, 0, 0] });

  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 48],
    info: { title: `Заявка ${receipt.id}`, author: 'ООО ИПП «Новые Технологии»', subject: 'Принятая заявка на оборудование' },
    defaultStyle: { font: 'Roboto', fontSize: 10, color: ink },
    styles: { section: { fontSize: 13, bold: true, margin: [0, 20, 0, 10] } },
    footer: (page, pages) => ({
      columns: [{ text: 'Новые Технологии · tech-new.ru' }, { text: `${page} / ${pages}`, alignment: 'right' }],
      margin: [40, 14, 40, 0],
      fontSize: 8,
      color: muted,
    }),
    content: [
      { text: 'НОВЫЕ ТЕХНОЛОГИИ', color: blue, bold: true, fontSize: 12, characterSpacing: 1.2 },
      { text: 'Заявка на оборудование', fontSize: 24, bold: true, margin: [0, 16, 0, 10] },
      { text: `Номер: ${receipt.id}`, bold: true },
      {
        text: `Принята: ${new Date(receipt.createdAt).toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' })} (Екатеринбург)`,
        color: muted,
        margin: [0, 5, 0, 0],
      },
      { text: 'Контактные данные', style: 'section' },
      { columns: [contactCell('ФИО', contact.name), contactCell('Компания', contact.company)], columnGap: 24 },
      { columns: [contactCell('Email', contact.email), contactCell('Телефон', contact.phone)], columnGap: 24 },
      ...(contact.position ? [contactCell('Должность', contact.position)] : []),
      { text: 'Состав заявки', style: 'section' },
      {
        table: { headerRows: 1, widths: [20, '*', 37, 76, 84], body, dontBreakRows: true },
        fontSize: 9,
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0,
          hLineColor: () => '#d5e3f0',
          paddingTop: () => 9,
          paddingBottom: () => 9,
          paddingLeft: () => 6,
          paddingRight: () => 6,
        },
      },
      { text: `Итого: ${amount(receipt.totalMinor)}`, alignment: 'right', fontSize: 18, bold: true, margin: [0, 16, 0, 6] },
      { text: 'Без НДС. Доставка согласуется отдельно.', alignment: 'right', fontSize: 9, color: muted },
      ...extra,
      {
        text: 'Заявка принята в обработку. Менеджер уточнит комплектацию, сроки и условия поставки. Документ не является счётом на оплату.',
        color: muted,
        fontSize: 9,
        lineHeight: 1.4,
        margin: [0, 22, 0, 0],
      },
    ],
  };
};

export const downloadOrderPdf = async (data: OrderPdfData): Promise<void> => {
  const { loadOrderPdfMake } = await import('./pdfMake');
  const pdfMake = await loadOrderPdfMake();
  const filename = `Заявка_${data.receipt.id.replace(/[^A-Za-z0-9_-]/g, '_')}.pdf`;
  await pdfMake.createPdf(createOrderPdfDefinition(data)).download(filename);
};
