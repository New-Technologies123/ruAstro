import Styles from './documents.module.scss';
import { Select } from '../../ui/select/Select';
import { useState} from 'react';
import { Cards } from './Cards';
import { useTranslation } from 'react-i18next';
import { Title } from '../../ui/title/Title';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

export const Documents = () => {
  const { t, i18n } = useTranslation('documents');
  const [selectedId, setSelectedId] = useState<TTitleOptions>('all');
  const [showId, setShowId] = useState<TTitleOptions>('all');

  type TTitleOptions = 'all' | 'accountingSystem' | 'components' | 'measurementSystem' | 'trainingSystem' | 'pumpingStations';

  const options: { id: TTitleOptions; title: string }[] = [
    {
      id: 'all',
      title: t('Вся'),
    },
    {
      id: 'accountingSystem',
      title: t('Система учета'),
    },
    {
      id: 'components',
      title: t('Комплектующие'),
    },
    {
      id: 'measurementSystem',
      title: t('Система измерения'),
    },
    { 
      id: 'trainingSystem',
      title: t('Системы подготовки'),
    },
    {
      id: 'pumpingStations',
      title: t('Насосные станции'),
    },
  ];

  const onShowClick = () => {
    setShowId(selectedId);
  };

  return (
    <>
      <Title text={t('Документы')}></Title>
      
      <div className={Styles.documentList}>
        <p>{t('Выбор')}</p>
        <div className={Styles.list}>
          <Select options={options} selectedId={selectedId} onSelect={(id) => setSelectedId(id as TTitleOptions)}/>

          <div className={Styles.documentButton}>
            <button onClick={onShowClick}>{t('Показать')}</button>
          </div>
        </div>
      </div>
      <Cards selectId={showId} key={showId}/>
      <BackToTop/>
    </>
  );
};