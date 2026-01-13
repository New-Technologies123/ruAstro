import { List } from '../../ui/list/List';
import Styles from './documents.module.scss';


export const PreparationSystems = () => {

  const handleCardClick = (docType: string) => {
    const openUrl = `${window.location.origin}/doc/${docType}.pdf`;
    window.open(openUrl, '_blank');
  };

  const cards = [
    {
      title: 'ТР ТС 032 ЕАЭС RU C-RU.НА19.В.00123-2024',
      docType: '4-1',
    },
    {
      title: 'Декларация ТР ТС 010 5д',
      docType: '4-2',
    },
    {
      title: 'Декларация ТР ТС 032 для камер Ду до 150 мм',
      docType: '4-3',
    },
    {
      title: 'Сертфикат на тип ТР ТС 010 5д',
      docType: '4-4',
    },
    {
      title: 'Декларация ТР ТС 010 5 д',
      docType: '4-5',
    },
    {
      title: 'Декларация ТР ТС 032 на ттрубопроводы',
      docType: '4-6',
    },
    {
      title: 'Декларация ТР ТС 032',
      docType: '4-7',
    },
    {
      title: 'СС на тип № ЕАЭС RU СТ-RU.НВ94.00258',
      docType: '4-8',
    },
    {
      title: 'Сертификат ТР ТС 012',
      docType: '4-9',
    },
    {
      title: 'Сертификат ТР ТС 012 ЕАЭС RU С-RU.ПБ98.В.00504.24',
      docType: '4-10',
    }
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
