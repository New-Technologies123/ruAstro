// 1️⃣ Импорт
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

// 2️⃣ Инициализация vfs
(pdfMake as any).vfs = (pdfFonts as any).vfs;

// 3️⃣ Используем pdfMake
export const exportToPDF = (selectedInstallations: any[], totalPrice: number) => {
  const content: any[] = [
    { text: "Коммерческое предложение", fontSize: 18, bold: true, margin: [0, 0, 0, 15] },
  ];

  selectedInstallations.forEach((item, index) => {
    content.push(
      {
        text: `${index + 1}. ${item.summary}`,
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      {
        table: {
          widths: ['45%', '55%'],
          body: [
            ['Количество скважин', item.quantity ?? '-'],
            ['Максимальное рабочее давление', item.heating?.join(', ') ?? '-'],
            ['Производительность по жидкости', item.volume?.join(', ') ?? '-'],
            ['Производительность по газу (сеп.)', item.max_gas?.join(', ') ?? '-'],
            ['Производительность по газу (бессеп.)', item.max_gas_1?.join(', ') ?? '-'],
            ['Расходомер (газ)', item.vagometer?.join(', ') ?? '-'],
            ['Расходомер (жидкость)', item.vagometer1?.join(', ') ?? '-'],
            ['Дублирующий расходомер', item.vagometer2?.join(', ') ?? '-'],
            ['Влагомер', item.pollution?.join(', ') ?? '-'],
            ['Шкафное оборудование', item.closet?.join(', ') ?? '-'],
            ['Запорная арматура', item.fittings?.join(', ') ?? '-'],
            [
              { text: 'Цена', bold: true },
              { text: `${item.price.toLocaleString('ru-RU')} ₽ без НДС`, bold: true }
            ]
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 10]
      }
    );
  });

  content.push({
    text: `Итого: ${totalPrice.toLocaleString('ru-RU')} руб. без НДС`,
    fontSize: 16,
    bold: true,
    margin: [0, 15, 0, 0]
  });

  const docDefinition = { content, defaultStyle: { fontSize: 11 } };

  // Открыть PDF
  (pdfMake as any).createPdf(docDefinition).open();
};
