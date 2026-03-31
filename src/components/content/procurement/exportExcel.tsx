import * as XLSX from "xlsx-js-style";

type Item = {
    id: number;
    name: string | null;
    quantity: number | string;
    unit: string;
    note: string | null;
};

type Group = {
    note: string;
    items: Item[];
};

export const exportGroupToExcel = (group: Group) => {
    const wb = XLSX.utils.book_new();

    const headers = [
        "Полное наименование изделия Поставщика",
        "Полное наименование изделия по заявке",
        "Количество",
        "Единицы измерения",
        "Примечание",
        "Цена с НДС",
        "Сумма с НДС",
        "Срок поставки (календарный день)",
        "Условие оплаты"
    ];

    const wsData: any[][] = [headers];

    // Заполняем строки данных
    group.items.forEach(item => {
        wsData.push([
            "",
            item.name || "",
            item.quantity || 0,
            item.unit || "",
            item.note || "",
            "", // Цена
            "", // Сумма
            "",
            ""
        ]);
    });

    const startRow = 2; // Excel 1-based
    const lastDataRow = wsData.length;

    // Добавляем строку Итого
    wsData.push(["", "", "", "", "Итого", "", "", "", ""]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const range = XLSX.utils.decode_range(ws["!ref"]!);

    const border = {
        top: { style: "medium", color: { rgb: "000000" } },
        bottom: { style: "medium", color: { rgb: "000000" } },
        left: { style: "medium", color: { rgb: "000000" } },
        right: { style: "medium", color: { rgb: "000000" } }
    };

    // Стилизация всех ячеек
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
            if (!ws[cellRef]) ws[cellRef] = { t: "s", v: "" };

            let style: any = {
                border,
                alignment: { vertical: "center", wrapText: true }
            };

            // Шапка
            if (R === 0) {
                style = {
                    ...style,
                    font: { bold: true, color: { rgb: "FFFFFF" }, sz: 13 },
                    fill: { fgColor: { rgb: "1F4E78" } },
                    alignment: { horizontal: "center", vertical: "center", wrapText: true }
                };
            }

            // Строка Итого
            else if (R === range.e.r) {
                const isTargetCell = [4, 5, 6].includes(C);
                style = {
                    alignment: { horizontal: "center", vertical: "center" },
                    font: { bold: isTargetCell }
                };
                if (isTargetCell) {
                    style.border = border;
                    style.fill = { fgColor: { rgb: "D9D9D9" } };
                } else {
                    style.border = {};
                }
            }

            // Выравнивание чисел вправо
            if ([2, 5, 6].includes(C)) {
                style.alignment = { horizontal: "right", vertical: "center" };
            }

            ws[cellRef].s = style;
        }
    }

    const qtyCol = 2;   // C
    const priceCol = 5; // F
    const sumCol = 6;   // G

    // Формулы для суммы каждой строки: IFERROR(F*Количество, 0)
    for (let i = startRow - 1; i < lastDataRow; i++) {
        const sumCellRef = XLSX.utils.encode_cell({ r: i, c: sumCol });
        const qtyCellRef = XLSX.utils.encode_cell({ r: i, c: qtyCol });
        const priceCellRef = XLSX.utils.encode_cell({ r: i, c: priceCol });

        ws[sumCellRef] = ws[sumCellRef] || { t: "n", v: 0, s: {} };
        ws[sumCellRef].t = "n";
        ws[sumCellRef].f = `IFERROR(${priceCellRef}*${qtyCellRef},0)`;
    }

    // Формулы для Итого
    const totalRowIndex = wsData.length - 1;
    const totalPriceCellRef = XLSX.utils.encode_cell({ r: totalRowIndex, c: priceCol });
    const totalSumCellRef = XLSX.utils.encode_cell({ r: totalRowIndex, c: sumCol });

    ws[totalPriceCellRef] = ws[totalPriceCellRef] || { t: "n", v: 0, s: {} };
    ws[totalPriceCellRef].t = "n";
    ws[totalPriceCellRef].f = `SUM(F${startRow}:F${lastDataRow})`;

    ws[totalSumCellRef] = ws[totalSumCellRef] || { t: "n", v: 0, s: {} };
    ws[totalSumCellRef].t = "n";
    ws[totalSumCellRef].f = `SUM(G${startRow}:G${lastDataRow})`;

    // Автоширина колонок
    ws["!cols"] = headers.map((h, i) => ({
        wch:
            Math.max(
                h.length,
                ...wsData.map(row => (row[i] ? row[i].toString().length : 10))
            ) + 3
    }));

    // Закрепляем шапку
    ws["!freeze"] = { xSplit: 0, ySplit: 1 };
    ws["!rows"] = [{ hpt: 30 }];

    XLSX.utils.book_append_sheet(wb, ws, "Товары");
    XLSX.writeFile(wb, `Закупки_${group.note || "Без примечания"}.xlsx`);
};