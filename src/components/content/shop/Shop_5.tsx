import Styles from './shop.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { LayoutBack } from '../../layout/LayoutBack';
import { useEffect, useState } from 'react';
import { Cards } from './Cards';
import { Gudro_1 } from './Shop_5/Gudro_1';

import type { Product } from '../../products/types';
import { addToCart } from '../../utils/cartStorage';

type TKey = 'gudro_1';

type TProps = {
  onBackProducts: VoidFunction;
  title: string;
};

export const Shop_5 = ({ onBackProducts, title }: TProps) => {
  
  // ✅ ЕДИНЫЙ источник товаров (Product!)
    const PRODUCTS: Record<TKey, Product> = {
      gudro_1: {
        id: 101,
        title: 'Гидропривод ГП-НТ НТ.3.00.00.00.000',
        description: '',
        price: '88 500',
        nds: 'без НДС',
        deliveryTime: 'по запросу',
        image: ''
      },
    };
  

  const [selectedItem, setSelectedItem] = useState<TKey | null>(null);

  // читаем ?tem=shop_1 при обновлении страницы
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tem = params.get('tem') as TKey | null;
    setSelectedItem(tem);
  }, []);

  const handleClickCard = (tem: TKey) => {
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
    const handleAddToCart = (key: TKey, quantity: number) => {
      addToCart(PRODUCTS[key], quantity);
    };

  if (selectedItem === 'gudro_1') {
    return <Gudro_1 onBackShop={onBackShop} title={PRODUCTS.gudro_1.title} />;
  }

  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.container}>
        <div className={Styles.team}>

          {(Object.keys(PRODUCTS) as TKey[]).map(key => {
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
