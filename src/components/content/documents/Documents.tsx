import { useState} from 'react';
import { Cards } from './Cards';
import { Title } from '../../ui/title/Title';
import { useEffect } from 'react';
import { LayoutBack } from '../../layout/LayoutBack';
import { AccountingSystem } from './AccountingSystem';
import { Accessories } from './Accessories';
import { MeasuringSystem } from './MeasuringSystem';
import { PreparationSystems } from './PreparationSystems';
import { PumpingStations } from './PumpingStations';
import Styles from './documents.module.scss';

export const Documents = () => {

  type TTitleOptions = 'accountingSystem' | 'accessories'  | 'measuringSystem' | 'preparationSystems' | 'pumpingStations';

   const cardTitle: Record<TTitleOptions, string> = {
    accountingSystem: 'Документация автоматизированной замерной установки (АГЗУ)',
    accessories: 'Документация комплектующих для автоматизированной групповой замерной установки',
    measuringSystem: 'Документация системы учёта углеводородов и пластовой жидкости',
    preparationSystems: 'Документация системы подготовки нефти, газа и воды',
    pumpingStations: 'Документация насосных станции перекачки нефти, нефтепродуктов и воды',
  };

   useEffect(() => {
      setTypeLayoutBackOpen(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const typeFromQuery = queryParams.get('type');
        return typeFromQuery ? (typeFromQuery as TTitleOptions) : null;
      });
    }, []);
  
    const onBack = () => {
      setTypeLayoutBackOpen(null);
  
      const newUrl = `${window.location.origin}${window.location.pathname}`;
      window.history.pushState({}, '', newUrl);
    };
  
    const onClickCard = (typeDocuments: TTitleOptions) => {
      setTypeLayoutBackOpen(typeDocuments);
  
      const newUrl = `${window.location.origin}${window.location.pathname}?type=${typeDocuments}`;
      window.history.pushState({}, '', newUrl);
    };

  const [typeLayoutBackOpen, setTypeLayoutBackOpen] = useState<TTitleOptions | null>(null);

  return (
    <>
      
      {typeLayoutBackOpen === null && (
        <>
        <Title text={'Документы'}></Title>
          <div className={Styles.team}>
            <Cards
              title={cardTitle.accountingSystem}
              onClick={() => {
                onClickCard('accountingSystem');
              }}
            />
            <Cards
              title={cardTitle.accessories}
              onClick={() => {
                onClickCard('accessories');
              }}
            />
            <Cards
              title={cardTitle.measuringSystem}
              onClick={() => {
                onClickCard('measuringSystem');
              }}
            />
            <Cards
              title={cardTitle.preparationSystems}
              onClick={() => {
                onClickCard('preparationSystems');
              }}
            />
            <Cards
              title={cardTitle.pumpingStations}
              onClick={() => {
                onClickCard('pumpingStations');
              }}
            />
          </div>
        </>
      )}
      {typeLayoutBackOpen === 'accountingSystem' && (
        <LayoutBack onBack={onBack} title={cardTitle.accountingSystem}>
          <AccountingSystem />
        </LayoutBack>
      )}
      {typeLayoutBackOpen === 'accessories' && (
        <LayoutBack onBack={onBack} title={cardTitle.accessories}>
          <Accessories />
        </LayoutBack>
      )}
      {typeLayoutBackOpen === 'measuringSystem' && (
        <LayoutBack onBack={onBack} title={cardTitle.measuringSystem}>
          <MeasuringSystem />
        </LayoutBack>
      )}
      {typeLayoutBackOpen === 'preparationSystems' && (
        <LayoutBack onBack={onBack} title={cardTitle.preparationSystems}>
          <PreparationSystems />
        </LayoutBack>
      )}
      {typeLayoutBackOpen === 'pumpingStations' && (
        <LayoutBack onBack={onBack} title={cardTitle.pumpingStations}>
          <PumpingStations />
        </LayoutBack>
      )}
    </>
  );
};