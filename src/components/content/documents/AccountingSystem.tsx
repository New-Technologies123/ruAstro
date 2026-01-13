import { List } from '../../ui/list/List';
import Styles from './documents.module.scss';


export const AccountingSystem = () => {

  const handleCardClick = (docType: string) => {
    const openUrl = `${window.location.origin}/doc/${docType}.pdf`;
    window.open(openUrl, '_blank');
  };

  const cards = [
    {
      title: 'Made is Russia',
      docType: '1-1',
    },
    {
      title: 'Декларация ТР ТС 010 от 2024г.',
      docType: '1-2',
    },
    {
      title: 'Заключение по произведственной площадке INTI.QS.PS.90-06-2024-244',
      docType: '1-3',
    },
    {
      title: 'Сертификат соответствия установки «Спутник - Массомер НТ.1',
      docType: '1-4',
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
