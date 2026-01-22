import { Layout } from '../../layout/Layout';
import { LayoutBack } from '../../layout/LayoutBack';
import { Card } from '../../ui/card/Card';
import { useState, useEffect } from 'react';
import { AccountingSystem } from './AccountingSystem';
import { Accessories } from './Accessories';
import { MeasuringSystem } from './MeasuringSystem';
import { PreparationSystems } from './PreparationSystems';
import { PumpingStations } from './PumpingStations';
import { CartButton } from '../../ui/cart-button/CartButton';
import { Basket } from '../../content/basket/Basket'; // компонент корзины

import product_1 from '../../../images/products/product_1.webp';
import product_2 from '../../../images/products/product_2.0.webp';
import product_3 from '../../../images/products/product_3.webp';
import product_4 from '../../../images/products/product_4.webp';
import product_5 from '../../../images/products/product_5.webp';

type TProducts = 'accountingSystem' | 'accessories' | 'measuringSystem' | 'preparationSystems' | 'pumpingStations';
type Page = 'shop' | 'basket' | TProducts;

export const Shop = () => {
  const cardTitle: Record<TProducts, string> = {
    accountingSystem: 'Автоматизированная замерная установка (АГЗУ)',
    accessories: 'Комплектующие для автоматизированной групповой замерной установки',
    measuringSystem: 'Система учёта углеводородов и пластовой жидкости',
    preparationSystems: 'Системы подготовки нефти, газа и воды',
    pumpingStations: 'Насосные станции перекачки нефти, нефтепродуктов и воды',
  };

  const [currentPage, setCurrentPage] = useState<Page>('shop');

  // Определяем начальную страницу по URL
  useEffect(() => {
    const path = window.location.pathname;
    const query = new URLSearchParams(window.location.search);
    const type = query.get('type') as TProducts | null;

    if (path === '/basket') setCurrentPage('basket');
    else if (type) setCurrentPage(type);
    else setCurrentPage('shop');
  }, []);

  // Обработка кнопок "назад/вперед" в браузере
  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname;
      const query = new URLSearchParams(window.location.search);
      const type = query.get('type') as TProducts | null;

      if (path === '/basket') setCurrentPage('basket');
      else if (type) setCurrentPage(type ?? 'shop');
      else setCurrentPage('shop');
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const onBack = () => {
    setCurrentPage('shop');
    window.history.pushState({}, '', '/shop');
  };

  const onClickCard = (typeProduct: TProducts) => {
    setCurrentPage(typeProduct);
    window.history.pushState({}, '', `/shop?type=${typeProduct}`);
  };

  const goToBasket = () => {
    setCurrentPage('basket');
    window.history.pushState({}, '', '/basket');
  };

  return (
    <>
      {currentPage !== 'basket' && <CartButton goToBasket={goToBasket} />}

      {currentPage === 'shop' && (
        <Layout
          title="Магазин"
          description="Качество продукции ООО ИПП «Новые Технологии» соответствует всем стандартам в области 
          безопасности и качества, что подтверждено соответствующими российскими сертификатами и сертификатами 
          Таможенного союза."
        >
          <>
            <Card
              imgSrc={product_1.src}
              title={cardTitle.accountingSystem}
              onClick={() => onClickCard('accountingSystem')}
            />
            <Card
              imgSrc={product_2.src}
              title={cardTitle.accessories}
              onClick={() => onClickCard('accessories')}
            />
            <Card
              imgSrc={product_3.src}
              title={cardTitle.measuringSystem}
              onClick={() => onClickCard('measuringSystem')}
            />
            <Card
              imgSrc={product_4.src}
              title={cardTitle.preparationSystems}
              onClick={() => onClickCard('preparationSystems')}
            />
            <Card
              imgSrc={product_5.src}
              title={cardTitle.pumpingStations}
              onClick={() => onClickCard('pumpingStations')}
            />
          </>
        </Layout>
      )}

      {currentPage === 'basket' && <Basket onBack={onBack} />}

      {currentPage === 'accountingSystem' && (
        <AccountingSystem onBackProducts={onBack} title={cardTitle.accountingSystem} />
      )}
      {currentPage === 'accessories' && (
        <Accessories onBackProducts={onBack} title={cardTitle.accessories} />
      )}
      {currentPage === 'measuringSystem' && (
        <MeasuringSystem onBackProducts={onBack} title={cardTitle.measuringSystem} />
      )}
      {currentPage === 'preparationSystems' && (
        <PreparationSystems onBackProducts={onBack} title={cardTitle.preparationSystems} />
      )}
      {currentPage === 'pumpingStations' && (
        <PumpingStations onBackProducts={onBack} title={cardTitle.pumpingStations} />
      )}
    </>
  );
};
