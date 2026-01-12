import jsPDF from 'jspdf';

export const exportToPDF = (
  selectedInstallations: any[],
  totalPrice: number
) => {
  const doc = new jsPDF();

  let y = 10;

  doc.setFontSize(16);
  doc.text('Коммерческое предложение', 10, y);
  y += 10;

  doc.setFontSize(12);

  selectedInstallations.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.summary}`, 10, y);
    y += 6;

    doc.text(`Цена: ${item.price.toLocaleString('ru-RU')} ₽`, 10, y);
    y += 6;

    doc.text(`Количество скважин: ${item.quantity}`, 10, y);
    y += 6;

    doc.text(`Макс. давление: ${item.heating?.join(', ')}`, 10, y);
    y += 6;

    doc.text(
      `Производительность (жидкость): ${item.volume?.join(', ')}`,
      10,
      y
    );
    y += 6;

    doc.text(
      `Производительность (газ): ${item.max_gas?.join(', ')}`,
      10,
      y
    );
    y += 6;

    doc.text(`Шкафное оборудование: ${item.closet?.join(', ')}`, 10, y);
    y += 10;

    // если страница закончилась — создаём новую
    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  doc.setFontSize(14);
  doc.text(
    `Итого: ${totalPrice.toLocaleString('ru-RU')} руб. с НДС`,
    10,
    y + 5
  );

  doc.save('calculator-result.pdf');
};
