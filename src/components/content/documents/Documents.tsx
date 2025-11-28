import Styles from './documents.module.scss';
import { Select } from '../../ui/select/Select';
import { useState} from 'react';
import { Cards } from './Cards';
import { Title } from '../../ui/title/Title';

export const Documents = () => {
  const [selectedId, setSelectedId] = useState<TTitleOptions>('all');
  const [showId, setShowId] = useState<TTitleOptions>('all');

  type TTitleOptions = 'all' | 'accountingSystem' | 'components' | 'measurementSystem' | 'trainingSystem' | 'pumpingStations';

  const options: { id: TTitleOptions; title: string }[] = [
    {
      id: 'all',
      title: 'Вся продукция',
    },
    {
      id: 'accountingSystem',
      title: 'Автоматизированная замерная установка (АГЗУ)',
    },
    {
      id: 'components',
      title: 'Комплектующие для автоматизированной групповой замерной установки',
    },
    {
      id: 'measurementSystem',
      title: 'Система учёта углеводородов и пластовой жидкости',
    },
    { 
      id: 'trainingSystem',
      title: 'Системы подготовки нефти, газа и воды',
    },
    {
      id: 'pumpingStations',
      title: 'Насосные станции перекачки нефти, нефтепродуктов и воды',
    },
  ];

  const onShowClick = () => {
    setShowId(selectedId);
  };

  return (
    <>
      <Title text={'Документы'}></Title>
      
      <div className={Styles.documentList}>
        <p>Выберите вид продукции:</p>
        <div className={Styles.list}>
          <Select options={options} selectedId={selectedId} onSelect={(id) => setSelectedId(id as TTitleOptions)}/>

          <div className={Styles.documentButton}>
            <button onClick={onShowClick}>Показать</button>
          </div>
        </div>
      </div>
      <Cards selectId={showId} key={showId}/>
    </>
  );
};