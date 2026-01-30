import Styles from './shop.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { LayoutBack } from '../../layout/LayoutBack';
import { useEffect, useState } from 'react';
import { Cards } from './Cards';
import { Urpd_1 } from './Shop_2/Urpd_1';
import { Urpd_2 } from './Shop_2/Urpd_2';

import type { Product } from '../../products/types';
import { addToCart } from '../../utils/cartStorage';

type TKey = 'urpd_1' | 'urpd_2';

type TProps = {
  onBackProducts: VoidFunction;
  title: string;
};

export const Shop_2 = ({ onBackProducts, title }: TProps) => {

  // ✅ ЕДИНЫЙ источник товаров (Product!)
  const PRODUCTS: Record<TKey, Product> = {
    urpd_1: {
      id: 101,
      title: 'Устройство для регулирования перепада давления УРПД-1.1 НТ.511.000.000.0',
      description: '',
      price: '19 500',
      nds: 'без НДС',
      deliveryTime: 'по запросу',
      image: ''
    },
    urpd_2: {
      id: 102,
      title: 'Устройство для регулирования перепада давления УРПД-3.1 НТ.531.000.000.0',
      description: '',
      price: '34 500',
      nds: 'без НДС',
      deliveryTime: 'по запросу',
      image: ''
    }
  };

  const [selectedItem, setSelectedItem] = useState<TKey | null>(null);

  // читать ?tem=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tem = params.get('tem') as TKey | null;
    if (tem && PRODUCTS[tem]) setSelectedItem(tem);
  }, []);

  // открыть карточку товара
  const handleClickCard = (key: TKey) => {
    setSelectedItem(key);

    const url = new URL(window.location.href);
    url.searchParams.set('tem', key);
    window.history.pushState({}, '', url.toString());
  };

  // назад из карточки
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

  // ---------- страницы товаров ----------

  if (selectedItem === 'urpd_1') {
    return (
      <Urpd_1
        onBackShop={onBackShop}
        title={PRODUCTS.urpd_1.title}
      />
    );
  }

  if (selectedItem === 'urpd_2') {
    return (
      <Urpd_2
        onBackShop={onBackShop}
        title={PRODUCTS.urpd_2.title}
      />
    );
  }

  // ---------- список ----------

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
