import Styles from '../shop.module.scss'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../../layout/LayoutBack';
import { useEffect } from 'react';
import { Cards } from '../Cards';
import { useState} from 'react';

type TProps = {
  onBackAccessories: VoidFunction;
  title: string;
};

export const Accessories_4 = ({ onBackAccessories, title }: TProps) => {

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
    <LayoutBack onBack={onBackAccessories} title={title}>
      <div className={Styles.container}>
        {/* ===== CONTENT ===== */}
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
        <BackToTop />
      </div>
    </LayoutBack>
  )
}





