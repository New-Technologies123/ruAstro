export type TDocument = {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
  fileSize?: string;
};

export type TDocumentCategory = {
  id: string;
  title: string;
  description: string;
  documents: TDocument[];
};

export const documentsData: TDocumentCategory[] = [
  {
    id: 'accounting-system',
    title: 'Автоматизированная групповая замерная установка (АГЗУ)',
    description: 'Документация для систем АГЗУ',
    documents: [
      {
        id: '1-1',
        title: 'Made is Russia',
        fileName: '1-1.pdf',
        fileUrl: '/doc/1-1.pdf',
        fileSize: '701 КБ',
      },
      {
        id: '1-2',
        title: 'Декларация ТР ТС 010 от 2024г.',
        fileName: '1-2.pdf',
        fileUrl: '/doc/1-2.pdf',
        fileSize: '1 038 КБ',
      },
      {
        id: '1-3',
        title: 'Заключение по производственной площадке INTI.QS.PS.90-06-2024-244',
        fileName: '1-3.pdf',
        fileUrl: '/doc/1-3.pdf',
        fileSize: '666 КБ',
      },
      {
        id: '1-4',
        title: 'Сертификат соответствия установки «Спутник - Массомер НТ.1',
        fileName: '1-4.pdf',
        fileUrl: '/doc/1-4.pdf',
        fileSize: '586 КБ',
      },
    ],
  },
  {
    id: 'accessories',
    title: 'Комплектующие для АГЗУ',
    description: 'Документация на комплектующие и запасные части',
    documents: [
      {
        id: '2-1',
        title: 'Декларация ТР ТС 020 2022г. расходомер-счетчики вихривые ЭРВИП.НТ',
        fileName: '2-1.pdf',
        fileUrl: '/doc/2-1.pdf',
        fileSize: '481 КБ',
      },
      {
        id: '2-2',
        title: 'Сертификат ТР ТС 012 № ЕАЭС RU C-RU.АЖ58.В.04794_23',
        fileName: '2-2.pdf',
        fileUrl: '/doc/2-2.pdf',
        fileSize: '1 907 КБ',
      },
      {
        id: '2-3',
        title: 'Сертификат СТ-1 УРПД',
        fileName: '2-3.pdf',
        fileUrl: '/doc/2-3.pdf',
        fileSize: '261 КБ',
      },
      {
        id: '2-4',
        title: 'Декларации о соответствии ТР ТС 010-2011 и 032-2013 УРПД 2020г.',
        fileName: '2-4.pdf',
        fileUrl: '/doc/2-4.pdf',
        fileSize: '1 199 КБ',
      },
      {
        id: '2-5',
        title: 'Сертификат № ЕАЭС RU C-RU.АЖ58.В.04522_23',
        fileName: '2-5.pdf',
        fileUrl: '/doc/2-5.pdf',
        fileSize: '1 866 КБ',
      },
      {
        id: '2-6',
        title: 'Декларация ТР ТС 032 от 2023 г.',
        fileName: '2-6.pdf',
        fileUrl: '/doc/2-6.pdf',
        fileSize: '960 КБ',
      },
      {
        id: '2-7',
        title: 'Сертификат на тип продукции ТР ТС 010',
        fileName: '2-7.pdf',
        fileUrl: '/doc/2-7.pdf',
        fileSize: '1 671 КБ',
      },
      {
        id: '2-8',
        title: 'Сертификат ТР ТС 012 2023 г.',
        fileName: '2-8.pdf',
        fileUrl: '/doc/2-8.pdf',
        fileSize: '1 681 КБ',
      },
      {
        id: '2-9',
        title: 'ЕАЭС RU C-RU.АВ29.В.02346-24 ТР ТС 012',
        fileName: '2-9.pdf',
        fileUrl: '/doc/2-9.pdf',
        fileSize: '1 679 КБ',
      },
      {
        id: '2-10',
        title: 'С-RU.НВ54.В.05918',
        fileName: '2-10.pdf',
        fileUrl: '/doc/2-10.pdf',
        fileSize: '494 КБ',
      },
      {
        id: '2-11',
        title: 'Декларация ТР ТС 032 2024г.',
        fileName: '2-11.pdf',
        fileUrl: '/doc/2-11.pdf',
        fileSize: '994 КБ',
      },
      {
        id: '2-12',
        title: 'Декларация ТР ТС 010 2024г.',
        fileName: '2-12.pdf',
        fileUrl: '/doc/2-12.pdf',
        fileSize: '900 КБ',
      },
    ],
  },
  {
    id: 'measuring-system',
    title: 'Система учёта углеводородов и пластовой жидкости',
    description: 'Документация для систем измерения и учета углеводородов',
    documents: [
      {
        id: '3-1',
        title: 'Сертификат на тип продукции СИКН',
        fileName: '3-1.pdf',
        fileUrl: '/doc/3-1.pdf',
        fileSize: '383 КБ',
      },
      {
        id: '3-2',
        title: 'Декларация-СИСТЕМЫ ИЗМЕРЕНИЙ',
        fileName: '3-2.pdf',
        fileUrl: '/doc/3-2.pdf',
        fileSize: '492 КБ',
      },
    ],
  },
  {
    id: 'preparation-systems',
    title: 'Система подготовки нефти, газа и воды',
    description: 'Документация для систем подготовки и очистки',
    documents: [
      {
        id: '4-1',
        title: 'ТР ТС 032 ЕАЭС RU C-RU.НА19.В.00123-2024',
        fileName: '4-1.pdf',
        fileUrl: '/doc/4-1.pdf',
        fileSize: '2 445 КБ',
      },
      {
        id: '4-2',
        title: 'Декларация ТР ТС 010 5д',
        fileName: '4-2.pdf',
        fileUrl: '/doc/4-2.pdf',
        fileSize: '18 338 КБ',
      },
      {
        id: '4-3',
        title: 'Декларация ТР ТС 032 для камер Ду до 150 мм',
        fileName: '4-3.pdf',
        fileUrl: '/doc/4-3.pdf',
        fileSize: '355 КБ',
      },
      {
        id: '4-4',
        title: 'Сертфикат на тип ТР ТС 010 5д',
        fileName: '4-4.pdf',
        fileUrl: '/doc/4-4.pdf',
        fileSize: '122 КБ',
      },
      {
        id: '4-5',
        title: 'Декларация ТР ТС 010 5 д',
        fileName: '4-5.pdf',
        fileUrl: '/doc/4-5.pdf',
        fileSize: '856 КБ',
      },
      {
        id: '4-6',
        title: 'Декларация ТР ТС 032 на ттрубопроводы',
        fileName: '4-6.pdf',
        fileUrl: '/doc/4-6.pdf',
        fileSize: '374 КБ',
      },
      {
        id: '4-7',
        title: 'Декларация ТР ТС 032',
        fileName: '4-7.pdf',
        fileUrl: '/doc/4-7.pdf',
        fileSize: '1 071 КБ',
      },
      {
        id: '4-8',
        title: 'СС на тип № ЕАЭС RU СТ-RU.НВ94.00258',
        fileName: '4-8.pdf',
        fileUrl: '/doc/4-8.pdf',
        fileSize: '469 КБ',
      },
      {
        id: '4-9',
        title: 'Сертификат ТР ТС 012',
        fileName: '4-9.pdf',
        fileUrl: '/doc/4-9.pdf',
        fileSize: '1 392 КБ',
      },
      {
        id: '4-10',
        title: 'Сертификат ТР ТС 012 ЕАЭС RU С-RU.ПБ98.В.00504.24',
        fileName: '4-10.pdf',
        fileUrl: '/doc/4-10.pdf',
        fileSize: '4 132 КБ',
      },
    ],
  },
  {
    id: 'pumping-stations',
    title: 'Насосные станции перекачки',
    description: 'Документация для насосных станций перекачки нефти и воды',
    documents: [
      {
        id: '5-1',
        title: 'Декларация соответствия насосные установки',
        fileName: '5-1.pdf',
        fileUrl: '/doc/5-1.pdf',
        fileSize: '1 040 КБ',
      },
      {
        id: '5-2',
        title: 'Сертификат соответсвия КНС',
        fileName: '5-2.pdf',
        fileUrl: '/doc/5-2.pdf',
        fileSize: '412 КБ',
      },
      {
        id: '5-3',
        title: 'Сертификат соответствия БКНС',
        fileName: '5-3.pdf',
        fileUrl: '/doc/5-3.pdf',
        fileSize: '411 КБ',
      },
    ],
  },
];