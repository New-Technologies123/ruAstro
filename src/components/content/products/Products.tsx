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
import product_2_5 from '../../../images/products/product_2_5.webp';
import product_3 from '../../../images/products/product_3.webp';
import product_4 from '../../../images/products/product_4.webp';
import product_5 from '../../../images/products/product_5.webp';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

type TProducts = 'accountingSystem' | 'accessories' | 'measuringSystem' | 'preparationSystems' | 'pumpingStations';

export const Products = () => {
  const { t } = useTranslation('products');

  const cardTitle: Record<TProducts, string> = {
    accountingSystem: t('Система учета'),
    accessories: t('Комплектующие'),
    measuringSystem: t('Система измерения'),
    preparationSystems: t('Системы подготовки'),
    pumpingStations: t('Насосные станции'),
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
        <Layout title="Продукция" description="Текст о продукции">
          <>
            <Card
              imgSrc={product_1.src}
              title={cardTitle.accountingSystem}
              onClick={() => {
                onClickCard('accountingSystem');
              }}
            />
            <Card
              imgSrc={product_2_5.src}
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
