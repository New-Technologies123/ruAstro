import Styles from './shop.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { LayoutBack } from '../../layout/LayoutBack';
import { useEffect, useState } from 'react';
import { Cards } from './Cards';
import { Goods_1 } from './Shop_4/Goods_1';
import { Goods_2 } from './Shop_4/Goods_2';
import { Goods_3 } from './Shop_4/Goods_3';
import { Goods_4 } from './Shop_4/Goods_4';

import type { Product } from '../../products/types';
import { addToCart } from '../../utils/cartStorage';

type TKey = 'goods_1' | 'goods_2' | 'goods_3' | 'goods_4';

type TProps = {
  onBackProducts: VoidFunction;
  title: string;
};

export const Shop_4 = ({ onBackProducts, title }: TProps) => {
  // ✅ ЕДИНЫЙ источник товаров (Product)
  const PRODUCTS: Record<TKey, Product> = {
    goods_1: {
      id: 201,
      title: 'Клапан магниторегулируемый КМР-2 Ж НТ.200.000.000.0',
      description: '',
      price: '98 600',
      nds: 'без НДС',
      deliveryTime: '60–90 календарных дней',
      image: ''
    },
    goods_2: {
      id: 202,
      title: 'Клапан магниторегулируемый КМР-2 М НТ.201.000.000.0',
      description: '',
      price: '105 100',
      nds: 'без НДС',
      deliveryTime: '60–90 календарных дней',
      image: ''
    },
    goods_3: {
      id: 203,
      title: 'Клапан магниторегулируемый КМР-3.1 Ех НТ.302.000.000.1',
      description: '',
      price: '105 300',
      nds: 'без НДС',
      deliveryTime: '60–90 календарных дней',
      image: ''
    },
    goods_4: {
      id: 204,
      title: 'Клапан магниторегулируемый КМР-2 Г НТ.250.000.000.0',
      description: '',
      price: '135 135',
      nds: 'без НДС',
      deliveryTime: '60–90 календарных дней',
      image: ''
    }
  };

  const [selectedItem, setSelectedItem] = useState<TKey | null>(null);

  // читаем ?tem=
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

  // ✅ добавление в корзину через Product
  const handleAddToCart = (key: TKey, quantity: number) => {
    addToCart(PRODUCTS[key], quantity);
  };

  // ---------- страницы товаров ----------
  if (selectedItem === 'goods_1') return <Goods_1 onBackShop={onBackShop} title={PRODUCTS.goods_1.title} />;
  if (selectedItem === 'goods_2') return <Goods_2 onBackShop={onBackShop} title={PRODUCTS.goods_2.title} />;
  if (selectedItem === 'goods_3') return <Goods_3 onBackShop={onBackShop} title={PRODUCTS.goods_3.title} />;
  if (selectedItem === 'goods_4') return <Goods_4 onBackShop={onBackShop} title={PRODUCTS.goods_4.title} />;

  // ---------- список товаров ----------
  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.container}>
        <div className={Styles.team}>
          {(Object.keys(PRODUCTS) as TKey[]).map((key) => {
            const product = PRODUCTS[key];
            return (
              <Cards
                key={product.id}
                title={product.title}
                price={Number(product.price.replace(/\s/g, ''))} // превращаем "98 600" → 98600 для Cards
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
