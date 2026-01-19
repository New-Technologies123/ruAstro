
import Styles from '../shop.module.scss';
import { Title } from '../../../ui/title/Title';
import { Cards } from '../Cards';
import { useEffect } from 'react';
import { useState} from 'react';


export const Accessories_4 = () => {

  type TTitleOptions = 'accountingSystem' | 'accessories'  | 'measuringSystem' | 'preparationSystems';

   const cardTitle: Record<TTitleOptions, string> = {
    accountingSystem: 'Клапан магниторегулируемый КМР-2 Ж НТ.200.000.000.0',
    accessories: 'Клапан магниторегулируемый КМР-2 М НТ.201.000.000.0',
    measuringSystem: 'Клапан магниторегулируемый КМР-3.1 Ех НТ.302.000.000.1',
    preparationSystems: 'Клапан магниторегулируемый КМР-2 Г НТ.250.000.000.0',
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
    <div className={Styles.container}>
      <Title text="Магниторегулируемый клапан (КМР)"></Title>
        
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
          </div>
        
    </div>
  )
}





