import { useEffect, useState } from 'react';
import { Layout } from '../../layout/Layout';
import { Card } from '../../ui/card/Card';

import { AccountingSystem } from './AccountingSystem';
import { Accessories } from './Accessories';
import { MeasuringSystem } from './MeasuringSystem';
import { PreparationSystems } from './PreparationSystems';
import { PumpingStations } from './PumpingStations';

import { CartButton } from '../../ui/cart-button/CartButton';
import { Basket } from '../../ui/basket/Basket';

import product_1 from '../../../images/products/product_1.webp';
import product_2 from '../../../images/products/product_2.0.webp';
import product_3 from '../../../images/products/product_3.webp';
import product_4 from '../../../images/products/product_4.webp';
import product_5 from '../../../images/products/product_5.webp';

type TProducts = | 'accountingSystem' | 'accessories' | 'measuringSystem' | 'preparationSystems' | 'pumpingStations';

type Page = 'shop' | TProducts | 'basket';

export const Shop = () => {
  const cardTitle: Record<TProducts, string> = {
    accountingSystem: 'Автоматизированная замерная установка (АГЗУ)',
    accessories: 'Комплектующие для автоматизированной групповой замерной установки',
    measuringSystem: 'Система учёта углеводородов и пластовой жидкости',
    preparationSystems: 'Системы подготовки нефти, газа и воды',
    pumpingStations: 'Насосные станции перекачки нефти, нефтепродуктов и воды',
  };

  const [currentPage, setCurrentPage] = useState<Page>('shop');

  // 🔁 синхронизация состояния со строкой браузера
  const syncFromUrl = () => {
    const params = new URLSearchParams(window.location.search);

    const view = params.get('view');
    const type = params.get('type') as TProducts | null;

    if (view === 'basket') {
      setCurrentPage('basket');
      return;
    }

    setCurrentPage(type ?? 'shop');
  };

  useEffect(() => {
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  // 🔹 навигация по каталогу
  const openCategory = (type: TProducts) => {
    const url = new URL(window.location.href);
    url.searchParams.set('type', type);
    window.history.pushState({}, '', url.toString());
    setCurrentPage(type);
  };

  const backToShop = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('type');
    window.history.pushState({}, '', url.toString());
    setCurrentPage('shop');
  };

  // 🛒 корзина
  const openBasket = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'basket');

    // ❗ ВАЖНО: pushState, а не replace
    window.history.pushState({}, '', url.toString());
    setCurrentPage('basket');
  };

  const closeBasket = () => {
    // ❗ возвращаемся туда, откуда пришли
    window.history.back();
  };

  return (
    <>
      <CartButton goToBasket={openBasket} />

      {/* SHOP */}
      {currentPage === 'shop' && (
        <Layout
          title="Магазин"
          description="Качество продукции ООО ИПП «Новые Технологии» соответствует всем стандартам в области безопасности и качества."
        >
          <>
            <Card
              imgSrc={product_1.src}
              title={cardTitle.accountingSystem}
              onClick={() => openCategory('accountingSystem')}
            />
            <Card
              imgSrc={product_2.src}
              title={cardTitle.accessories}
              onClick={() => openCategory('accessories')}
            />
            <Card
              imgSrc={product_3.src}
              title={cardTitle.measuringSystem}
              onClick={() => openCategory('measuringSystem')}
            />
            <Card
              imgSrc={product_4.src}
              title={cardTitle.preparationSystems}
              onClick={() => openCategory('preparationSystems')}
            />
            <Card
              imgSrc={product_5.src}
              title={cardTitle.pumpingStations}
              onClick={() => openCategory('pumpingStations')}
            />
          </>
        </Layout>
      )}

      {/* PRODUCTS */}
      {currentPage === 'accountingSystem' && (
        <AccountingSystem
          title={cardTitle.accountingSystem}
          onBackProducts={backToShop}
        />
      )}

      {currentPage === 'accessories' && (
        <Accessories
          title={cardTitle.accessories}
          onBackProducts={backToShop}
        />
      )}

      {currentPage === 'measuringSystem' && (
        <MeasuringSystem
          title={cardTitle.measuringSystem}
          onBackProducts={backToShop}
        />
      )}

      {currentPage === 'preparationSystems' && (
        <PreparationSystems
          title={cardTitle.preparationSystems}
          onBackProducts={backToShop}
        />
      )}

      {currentPage === 'pumpingStations' && (
        <PumpingStations
          title={cardTitle.pumpingStations}
          onBackProducts={backToShop}
        />
      )}

      {/* BASKET — ОТДЕЛЬНАЯ СТРАНИЦА */}
      {currentPage === 'basket' && (
        <Basket onBack={closeBasket} />
      )}
    </>
  );
};
