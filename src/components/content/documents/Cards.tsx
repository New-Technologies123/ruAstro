import Styles from './cards.module.scss';
import { List } from '../../ui/list/List';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export const Cards = ({ selectId }) => {
  const { t, i18n } = useTranslation('documents');

  const handleCardClick = (docType: string) => {
    const openUrl = `${window.location.origin}/doc/${i18n.language}/${docType}.pdf`;
    window.open(openUrl, '_blank');
  };

  const cards = useMemo(() => {
    const allCards = [
      { id: 'accountingSystem', condition: (selectId === 'all' || selectId === 'accountingSystem'), title: t('Сделано'), docType: '1-1' },
      { id: 'accountingSystem', condition: (selectId === 'all' || selectId === 'accountingSystem'), title: t('Декларация'), docType: '1-2' },
      { id: 'accountingSystem', condition: (selectId === 'all' || selectId === 'accountingSystem'), title: t('Заключение'), docType: '1-3' },
      { id: 'accountingSystem', condition: (selectId === 'all' || selectId === 'accountingSystem'), title: t('Сертификат'), docType: '1-4' },

      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: t('Декларация020'), docType: '2-1' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: t('Сертификат23'), docType: '2-2' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: t('СертификатСТ'), docType: '2-3' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: t('Декларации'), docType: '2-4' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: t('СертификатЕАЭС'), docType: '2-5' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: t('ДекларацияТр'), docType: '2-6' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: t('СертификатНаТип'), docType: '2-7' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: t('СертификатТр'), docType: '2-8' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: t('Гидропривод'), docType: '2-9' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: t('05918'), docType: '2-10' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: t('Декларация032'), docType: '2-11' },
      { id: 'components', condition: (selectId === 'all' || selectId === 'components'), title: t('Декларация010'), docType: '2-12' },

      { id: 'measurementSystem', condition: (selectId === 'all' || selectId === 'measurementSystem'), title: t('СертификатСИКН'), docType: '3-1' },
      { id: 'measurementSystem', condition: (selectId === 'all' || selectId === 'measurementSystem'), title: t('ДекларацияСистемы'), docType: '3-2' },

      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: t('00123'), docType: '4-1' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: t('Декларация5д'), docType: '4-2' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: t('Декларация150м'), docType: '4-3' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: t('Сертификат010'), docType: '4-4' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: t('ДекларацияТр010'), docType: '4-5' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: t('ДекларацияТруб'), docType: '4-6' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: t('ДекларацияТР'), docType: '4-7' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: t('00258'), docType: '4-8' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: t('Очистки'), docType: '4-9' },
      { id: 'trainingSystem', condition: (selectId === 'all' || selectId === 'trainingSystem'), title: t('Дозирования'), docType: '4-10' },

      { id: 'pumpingStations', condition: (selectId === 'all' || selectId === 'pumpingStations'), title: t('ДекларацияСоответсвия'), docType: '5-1' },
      { id: 'pumpingStations', condition: (selectId === 'all' || selectId === 'pumpingStations'), title: t('СертификатСоответсвия'), docType: '5-2' },
      { id: 'pumpingStations', condition: (selectId === 'all' || selectId === 'pumpingStations'), title: t('СертификатБКНС'), docType: '5-3' },
    ];

    return allCards.filter(card => card.condition);
  }, [selectId, t]);

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