import * as XLSX from 'xlsx';

export type ProcurementItem = {
  id: number;
  name: string | null;
  quantity: number | string;
  unit: string;
  note: string | null;
};

export const parseProcurementWorkbook = (data: ArrayBuffer | Uint8Array): ProcurementItem[] => {
  const workbook = XLSX.read(data);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) throw new Error('В файле закупок нет листа с данными');

  const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1 });
  return rows.slice(1).map((row, index) => ({
    id: index + 1,
    name: String(row[2] ?? '').trim() || null,
    quantity: (row[3] ?? '') as number | string,
    unit: String(row[4] ?? ''),
    note: String(row[5] ?? '').trim() || null,
  })).filter((item) => item.name);
};
