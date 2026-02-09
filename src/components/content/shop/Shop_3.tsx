import Styles from './shop.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { LayoutBack } from '../../layout/LayoutBack';
import { useEffect, useState } from 'react';
import { Cards } from './Cards';
import { Psm_1 } from './Shop_3/Psm_1';
import { Psm_2 } from './Shop_3/Psm_2';
import { Psm_3 } from './Shop_3/Psm_3';
import { Psm_4 } from './Shop_3/Psm_4';
import { Psm_5 } from './Shop_3/Psm_5';
import { Psm_6 } from './Shop_3/Psm_6';

import type { Product } from '../../products/types';
import { addToCart } from '../../utils/cartStorage';

type TTitleOptions = 'psm_1' | 'psm_2' | 'psm_3' | 'psm_4' | 'psm_5' | 'psm_6';

type TProps = {
  onBackProducts: VoidFunction;
  title: string;
};

export const Shop_3 = ({ onBackProducts, title }: TProps) => {
  // ✅ ЕДИНЫЙ источник товаров (Product!)
    const PRODUCTS: Record<TTitleOptions, Product> = {
      psm_1: {
        id: 101,
        title: 'Переключатель скважин многоходовой ПСМНТ.001.000.000-02 (8скв) с наплавкой',
        description: '',
        price: '950 000',
        nds: 'без НДС',
        deliveryTime: 'по запросу',
        image: ''
      },
      psm_2: {
        id: 102,
        title: 'Переключатель скважин многоходовой ПСМНТ.001.000.000-02 (8скв) без наплавки',
        description: '',
        price: '900 000',
        nds: 'без НДС',
        deliveryTime: 'по запросу',
        image: ''
      },
      psm_3: {
        id: 103,
        title: 'Переключатель скважин многоходовой ПСМНТ.001.000.000-01 (на 10 скв) с наплавкой',
        description: '',
        price: '1 050 000',
        nds: 'без НДС',
        deliveryTime: 'по запросу',
        image: ''
      },
      psm_4: {
        id: 104,
        title: 'Переключатель скважин многоходовой ПСМНТ.001.000.000-01 (на 10 скв) без наплавки',
        description: '',
        price: '1 000 000',
        nds: 'без НДС',
        deliveryTime: 'по запросу',
        image: ''
      },
      psm_5: {
        id: 104,
        title: 'Переключатель скважин многоходовой ПСМНТ.001.000.000 (на 14 скв) с наплавкой',
        description: '',
        price: '1 150 000',
        nds: 'без НДС',
        deliveryTime: 'по запросу',
        image: ''
      },
      psm_6: {
        id: 104,
        title: 'Переключатель скважин многоходовой ПСМНТ.001.000.000 (на 14 скв) без наплавки',
        description: '',
        price: '1 100 000',
        nds: 'без НДС',
        deliveryTime: 'по запросу',
        image: ''
      }
    };

  const [selectedItem, setSelectedItem] = useState<TTitleOptions | null>(null);

  // читаем ?tem=shop_1 при обновлении страницы
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tem = params.get('tem') as TTitleOptions | null;
    setSelectedItem(tem);
  }, []);

  const handleClickCard = (tem: TTitleOptions) => {
    setSelectedItem(tem);

    const url = new URL(window.location.href);
    url.searchParams.set('tem', tem);
    window.history.pushState({}, '', url.toString());
  };

  const onBackShop = () => {
    setSelectedItem(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('tem');
    window.history.pushState({}, '', url.toString());
  };

  // ✅ ПРАВИЛЬНОЕ добавление в корзину
    const handleAddToCart = (key: TTitleOptions, quantity: number) => {
      addToCart(PRODUCTS[key], quantity);
    };

  if (selectedItem === 'psm_1') {
    return <Psm_1 onBackShop={onBackShop} title={PRODUCTS.psm_1.title} />;
  }
  if (selectedItem === 'psm_2') {
    return <Psm_2 onBackShop={onBackShop} title={PRODUCTS.psm_2.title} />;
  }
  if (selectedItem === 'psm_3') {
    return <Psm_3 onBackShop={onBackShop} title={PRODUCTS.psm_3.title} />;
  }
  if (selectedItem === 'psm_4') {
    return <Psm_4 onBackShop={onBackShop} title={PRODUCTS.psm_4.title} />;
  }
  if (selectedItem === 'psm_5') {
    return <Psm_5 onBackShop={onBackShop} title={PRODUCTS.psm_5.title} />;
  }
  if (selectedItem === 'psm_6') {
    return <Psm_6 onBackShop={onBackShop} title={PRODUCTS.psm_6.title} />;
  }

  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.container}>
        <div className={Styles.team}>

          {(Object.keys(PRODUCTS) as TTitleOptions[]).map(key => {
            const product = PRODUCTS[key];

            return (
              <Cards
                key={product.id}
                title={product.title}
                price={Number(product.price.replace(/\s/g, ''))}
                onClick={() => handleClickCard(key)}
                onAddToCart={(qty) => handleAddToCart(key, qty)}
              />
            );
          })}

        </div>

        <BackToTop />
      </div>
    </LayoutBack>
  );
};
