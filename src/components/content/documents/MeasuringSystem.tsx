import { List } from '../../ui/list/List';
import Styles from './documents.module.scss';


export const MeasuringSystem = () => {

  const handleCardClick = (docType: string) => {
    const openUrl = `${window.location.origin}/doc/${docType}.pdf`;
    window.open(openUrl, '_blank');
  };

  const cards = [
    {
      title: 'Сертификат на тпи продукции  СИКН',
      docType: '3-1',
    },
    {
      title: 'Декларация-СИСТЕМЫ ИЗМЕРЕНИЙ',
      docType: '3-2',
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
