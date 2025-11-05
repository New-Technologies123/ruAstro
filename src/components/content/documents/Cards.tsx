import Styles from './cards.module.scss';
import { List } from '../../ui/list/List';
import { useMemo } from 'react';

export const Cards = ({ selectId }) => {

  const handleCardClick = (docType: string) => {
    const openUrl = `${window.location.origin}/doc/${docType}.pdf`;
    window.open(openUrl, '_blank');
  };

  const cards = useMemo(() => {
    const allCards = [
      { id: 'accountingSystem', condition: (selectId === 'all' || selectId === 'accountingSystem'), title: 'Сертификат сделано в России', docType: '1-1' },
      { id: 'accountingSystem', condition: (selectId === 'all' || selectId === 'accountingSystem'), title: 'Декларация ТР ТС 010 от 2024г.', docType: '1-2' },
      { id: 'accountingSystem', condition: (selectId === 'all' || selectId === 'accountingSystem'), title: 'Заключение INTI.QS.PS.90-06-2024-244 АГЗУ', docType: '1-3' },
      { id: 'accountingSystem', condition: (selectId === 'all' || selectId === 'accountingSystem'), title: 'Сертификат НСС ИУ Спутник-Массомер НТ. 1', docType: '1-4' },

      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: 'Декларация ТР ТС 020 2022г.', docType: '2-1' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: 'Сертификат ТР ТС 012 № ЕАЭС RU C-RU.АЖ58.В.04794_23', docType: '2-2' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: 'Сертификат СТ-1 УРПД', docType: '2-3' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: 'Декларации о соответсвии ТР ТС  010-2011  и 032-2013 УРПД 2020г.', docType: '2-4' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: 'Сертификат № ЕАЭС RU C-RU.АЖ58.В.04522_23', docType: '2-5' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: 'Декларация ТР ТС 032 от 2023 г.', docType: '2-6' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: 'Сертификат на тип  продукции  ТР ТС 010', docType: '2-7' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: 'Сертификат ТР ТС 012 2023 г.', docType: '2-8' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: 'ЕАЭС RU C-RU.АВ29.В.02346-24 ТР ТС 012', docType: '2-9' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: 'С-RU.НВ54.В.05918', docType: '2-10' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: 'Декларация ТР ТС 032 2024г.', docType: '2-11' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: 'Декларация ТР ТС 010 2024г.', docType: '2-12' },

      { id: 'measurementSystem', condition: (selectId === 'all' || selectId === 'measurementSystem'), title: 'Сертификат на тпи продукции  СИКН', docType: '3-1' },
      { id: 'measurementSystem', condition: (selectId === 'all' || selectId === 'measurementSystem'), title: 'Декларация-СИСТЕМЫ ИЗМЕРЕНИЙ', docType: '3-2' },

      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: 'ТР ТС 032 ЕАЭС RU C-RU.НА19.В.00123-2024', docType: '4-1' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: 'Декларация ТР ТС 010 5д', docType: '4-2' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: 'Декларация ТР ТС 032 для камер Ду до 150 мм', docType: '4-3' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: 'Сертфикат на тип ТР ТС 010 5д', docType: '4-4' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: 'Декларация ТР ТС 010 5 д', docType: '4-5' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: 'Декларация ТР ТС 032 на ттрубопроводы', docType: '4-6' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: 'Декларация ТР ТС 032', docType: '4-7' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: 'СС на тип № ЕАЭС RU СТ-RU.НВ94.00258', docType: '4-8' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: 'Сертификат ТР ТС 012', docType: '4-9' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: 'Сертификат ТР ТС 012 ЕАЭС RU С-RU.ПБ98.В.00504.24', docType: '4-10' },

      { id: 'pumpingStations', condition: (selectId === 'all' || selectId === 'pumpingStations'), title: 'Декларация соответствия насосные установки', docType: '5-1' },
      { id: 'pumpingStations', condition: (selectId === 'all' || selectId === 'pumpingStations'), title: 'Сертификат соответсвия КНС', docType: '5-2' },
      { id: 'pumpingStations', condition: (selectId === 'all' || selectId === 'pumpingStations'), title: 'Сертификат соответствия БКНС', docType: '5-3' },
    ];

    return allCards.filter(card => card.condition);
  }, [selectId]);

  return (
    <div className={Styles.team}>
      {cards.map((card, index) => (
        <List 
          key={`${selectId}-${card.id}-${card.docType}`}
          title={card.title} 
          onClick={() => handleCardClick(card.docType)}
          index={index}
        />
      ))}
    </div>
  );
};