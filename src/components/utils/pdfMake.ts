import pdfMakeUrl from 'pdfmake/build/pdfmake.min.js?url';
import pdfFontsUrl from 'pdfmake/build/vfs_fonts.js?url';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

type PdfMake = {
  createPdf: (definition: TDocumentDefinitions) => { download: (filename: string) => Promise<void> };
};

let pending: Promise<PdfMake> | undefined;

const script = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const element = document.createElement('script');
    element.src = src;
    element.onload = () => resolve();
    element.onerror = () => {
      element.remove();
      reject(new Error('Не удалось загрузить модуль PDF.'));
    };
    document.head.appendChild(element);
  });

export const loadOrderPdfMake = (): Promise<PdfMake> => {
  if (!pending) {
    pending = (async () => {
      const target = window as Window & { pdfMake?: PdfMake };
      if (!target.pdfMake) await script(pdfMakeUrl);
      if (!target.pdfMake) throw new Error('Модуль PDF недоступен.');
      await script(pdfFontsUrl);
      return target.pdfMake;
    })().catch((error) => {
      pending = undefined;
      throw error;
    });
  }
  return pending;
};
