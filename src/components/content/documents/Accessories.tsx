import { List } from '../../ui/list/List';
import Styles from './documents.module.scss';


export const Accessories = () => {

  const handleCardClick = (docType: string) => {
    const openUrl = `${window.location.origin}/doc/${docType}.pdf`;
    window.open(openUrl, '_blank');
  };

  const cards = [
    {
      title: 'Декларация ТР ТС 020 2022г. расходомер-счетчики вихривые ЭРВИП.НТ',
      docType: '2-1',
    },
    {
      title: 'Сертификат ТР ТС 012 № ЕАЭС RU C-RU.АЖ58.В.04794_23',
      docType: '2-2',
    },
    {
      title: 'Декларации о соответсвии ТР ТС  010-2011  и 032-2013 УРПД 2020г.',
      docType: '2-4',
    },
    {
      title: 'Сертификат СТ-1 УРПД',
      docType: '2-3',
    },    
    {
      title: 'Сертификат № ЕАЭС RU C-RU.АЖ58.В.04522_23',
      docType: '2-5',
    },
    {
      title: 'Декларация ТР ТС 032 от 2023 г.',
      docType: '2-6',
    },
    {
      title: 'Сертификат на тип  продукции  ТР ТС 010',
      docType: '2-7',
    },
    {
      title: 'Сертификат ТР ТС 012 2023 г.',
      docType: '2-8',
    },
    {
      title: 'ЕАЭС RU C-RU.АВ29.В.02346-24 ТР ТС 012',
      docType: '2-9',
    },
    {
      title: 'С-RU.НВ54.В.05918',
      docType: '2-10',
    },
    {
      title: 'Декларация ТР ТС 032 2024г.',
      docType: '2-11',
    },
    {
      title: 'Декларация ТР ТС 010 2024г.',
      docType: '2-12',
    },
  ];

  return (
    <>
      <div className={Styles.team}>
      {cards.map((card, index) => (
        <List
          key={card.docType}          
          title={card.title}
          onClick={() => handleCardClick(card.docType)}
          index={index}
        />
      ))}
    </div>
    </>
  );
};
