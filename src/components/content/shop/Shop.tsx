import { Layout } from '../../layout/Layout';
import { LayoutBack } from '../../layout/LayoutBack';
import { Card } from '../../ui/card/Card';
import { useState } from 'react';
import { AccountingSystem } from './AccountingSystem';
import { Accessories } from './Accessories';
import { MeasuringSystem } from './MeasuringSystem';
import { PreparationSystems } from './PreparationSystems';
import { PumpingStations } from './PumpingStations';
import product_1 from '../../../images/products/product_1.webp';
import product_2 from '../../../images/products/product_2.0.webp';
import product_3 from '../../../images/products/product_3.webp';
import product_4 from '../../../images/products/product_4.webp';
import product_5 from '../../../images/products/product_5.webp';
import { useEffect } from 'react';

type TProducts = 'accountingSystem' | 'accessories' | 'measuringSystem' | 'preparationSystems' | 'pumpingStations';

export const Shop = () => {

  const cardTitle: Record<TProducts, string> = {
    accountingSystem: 'Автоматизированная замерная установка (АГЗУ)',
    accessories: 'Комплектующие для автоматизированной групповой замерной установки',
    measuringSystem: 'Система учёта углеводородов и пластовой жидкости',
    preparationSystems: 'Системы подготовки нефти, газа и воды',
    pumpingStations: 'Насосные станции перекачки нефти, нефтепродуктов и воды',
  };

  const [typeLayoutBackOpen, setTypeLayoutBackOpen] = useState<TProducts | null>(null);

  useEffect(() => {
    setTypeLayoutBackOpen(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const typeFromQuery = queryParams.get('type');
      return typeFromQuery ? (typeFromQuery as TProducts) : null;
    });
  }, []);

  const onBack = () => {
    setTypeLayoutBackOpen(null);

    const newUrl = `${window.location.origin}${window.location.pathname}`;
    window.history.pushState({}, '', newUrl);
  };

  const onClickCard = (typeProduct: TProducts) => {
    setTypeLayoutBackOpen(typeProduct);

    const newUrl = `${window.location.origin}${window.location.pathname}?type=${typeProduct}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <>
      {typeLayoutBackOpen === null && (
        <Layout title="Магазин" 
          description="Качество продукции ООО ИПП «Новые Технологии» соответствует всем стандартам в области 
            безопасности и качества, что подтверждено соответствующими российскими сертификатами и сертификатами 
            Таможенного союза. ">
          <>
            <Card
              imgSrc={product_1.src}
              title={cardTitle.accountingSystem}
              onClick={() => {
                onClickCard('accountingSystem');
              }}
            />
            <Card
              imgSrc={product_2.src}
              title={cardTitle.accessories}
              onClick={() => {
                onClickCard('accessories');
              }}
            />
            <Card
              imgSrc={product_3.src}
              title={cardTitle.measuringSystem}
              onClick={() => {
                onClickCard('measuringSystem');
              }}
            />
            <Card
              imgSrc={product_4.src}
              title={cardTitle.preparationSystems}
              onClick={() => {
                onClickCard('preparationSystems');
              }}
            />
            <Card
              imgSrc={product_5.src}
              title={cardTitle.pumpingStations}
              onClick={() => {
                onClickCard('pumpingStations');
              }}
            />
          </>
        </Layout>
      )}
      {typeLayoutBackOpen === 'accountingSystem' && <AccountingSystem onBackProducts={onBack} title={cardTitle.accountingSystem} />}
      {typeLayoutBackOpen === 'accessories' && <Accessories onBackProducts={onBack} title={cardTitle.accessories} />}
      {typeLayoutBackOpen === 'measuringSystem' && <MeasuringSystem onBackProducts={onBack} title={cardTitle.accessories} />}
      {typeLayoutBackOpen === 'preparationSystems' && <PreparationSystems onBackProducts={onBack} title={cardTitle.accessories} />}
      {typeLayoutBackOpen === 'pumpingStations' && <PumpingStations onBackProducts={onBack} title={cardTitle.accessories} />}
    </>
  );
};
