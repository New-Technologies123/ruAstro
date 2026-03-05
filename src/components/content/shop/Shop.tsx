import { useEffect, useState } from 'react';
import { Layout } from '../../layout/Layout';
import { Card } from '../../ui/card/Card';
import { Order } from '../../ui/order/Order';

import { Shop_1 } from './Shop_1';
import { Shop_2 } from './Shop_2';
import { Shop_3 } from './Shop_3';
import { Shop_4 } from './Shop_4';
import { Shop_5 } from './Shop_5';

import { CartButton } from '../../ui/cart-button/CartButton';
import { BackToTop } from '../../ui/back-to-top/BackToTop'

import product_1 from '../../../images/products/product_2.webp';
import product_2 from '../../../images/products/product_2_1.webp';
import product_3 from '../../../images/products/product_2_2.png';
import product_4 from '../../../images/products/product_2_3.png';
import product_5 from '../../../images/products/product_2_4.png';

type TProducts = 'shop_1' | 'shop_2' | 'shop_3' | 'shop_4' | 'shop_5';
type Page = 'shop' | TProducts | 'order';

export const Shop = () => {
  const cardTitle: Record<TProducts, string> = {
    shop_1: 'Вихревой расходомер ЭРВИП',
    shop_2: 'Устройство регулирования перепада давления (УРПД)',
    shop_3: 'Переключатель скважин многоходовой (ПСМ)',
    shop_4: 'Магниторегулируемый клапан (КМР)',
    shop_5: 'Гидропривод (ГП)',
  };

  const [currentPage, setCurrentPage] = useState<Page>('shop');

  // 🔁 синхронизация состояния со строкой браузера
  const syncFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    const type = params.get('type') as TProducts | null;

    if (view === 'order') {
      setCurrentPage('order');
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
    url.searchParams.delete('view');
    window.history.pushState({}, '', url.toString());
    setCurrentPage(type);
  };

  const backToShop = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('type');
    url.searchParams.delete('view');
    window.history.pushState({}, '', url.toString());
    setCurrentPage('shop');
  };

  // 🛒 глобальная корзина
  const openBasket = () => {
    // отправляем событие для GlobalCart
    window.dispatchEvent(new CustomEvent('toggleGlobalCart'));
  };

  // 📝 переход к заказу
  const openOrder = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'order');
    url.searchParams.delete('type');
    window.history.pushState({}, '', url.toString());
    setCurrentPage('order');
  };

  const closeOrder = () => {
    window.history.back();
  };

  const isOrder = currentPage === 'order';

  return (
    <>
      {/* 🛒 Кнопка корзины скрыта на странице заказа */}
      {!isOrder && <CartButton goToBasket={openBasket} />}

      {/* ORDER */}
      {isOrder && <Order onBack={closeOrder} />}

      {/* SHOP */}
      {currentPage === 'shop' && (
        <Layout
          title="Онлайн магазин"
          description="Качество продукции ООО ИПП «Новые Технологии» соответствует всем стандартам в области безопасности и качества."
        >
          <>
            {/* <Card
              imgSrc={product_1.src}
              title={cardTitle.shop_1}
              onClick={() => openCategory('shop_1')}
            /> */}
            <Card
              imgSrc={product_2.src}
              title={cardTitle.shop_2}
              onClick={() => openCategory('shop_2')}
            />
            <Card
              imgSrc={product_3.src}
              title={cardTitle.shop_3}
              onClick={() => openCategory('shop_3')}
            />
            <Card
              imgSrc={product_4.src}
              title={cardTitle.shop_4}
              onClick={() => openCategory('shop_4')}
            />
            <Card
              imgSrc={product_5.src}
              title={cardTitle.shop_5}
              onClick={() => openCategory('shop_5')}
            />
          </>
          <BackToTop />
        </Layout>
      )}

      {/* PRODUCTS */}
      {currentPage === 'shop_1' && <Shop_1 title={cardTitle.shop_1} onBackProducts={backToShop} />}
      {currentPage === 'shop_2' && <Shop_2 title={cardTitle.shop_2} onBackProducts={backToShop} />}
      {currentPage === 'shop_3' && <Shop_3 title={cardTitle.shop_3} onBackProducts={backToShop} />}
      {currentPage === 'shop_4' && <Shop_4 title={cardTitle.shop_4} onBackProducts={backToShop} />}
      {currentPage === 'shop_5' && <Shop_5 title={cardTitle.shop_5} onBackProducts={backToShop} />}
    </>
  );
};