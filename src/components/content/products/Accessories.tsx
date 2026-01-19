import { useState, useEffect } from 'react';
import { Card } from '../../ui/card/Card';
import { Accessories_1 } from './Accessories/Accessories_1';
import { Accessories_2 } from './Accessories/Accessories_2';
import { Accessories_3 } from './Accessories/Accessories_3';
import { Accessories_4 } from './Accessories/Accessories_4';
import { Accessories_5 } from './Accessories/Accessories_5';
import { Accessories_6 } from './Accessories/Accessories_6';
import Styles from './products.module.scss'
import { LayoutBack } from '../../layout/LayoutBack';

import product_2_1 from '../../../images/products/product_2.webp';
import product_2_2 from '../../../images/products/product_2_1.webp';
import product_2_3 from '../../../images/products/product_2_2.webp';
import product_2_4 from '../../../images/products/product_2_3.webp';
import product_2_5 from '../../../images/products/product_2_4.webp';
import product_2_6 from '../../../images/products/product_2_5.webp';

type TAccessories = 'accessories_1' | 'accessories_2' | 'accessories_3' | 'accessories_4' | 'accessories_5' | 'accessories_6';

type TProps = {
  onBackProducts: VoidFunction;
  title: string;
};

export const Accessories = ({ onBackProducts, title }: TProps) => {
  const cardTitle: Record<TAccessories, string> = {
    accessories_1: 'Вихревой расходомер ЭРВИП',
    accessories_2: 'Устройство регулирования перепада давления (УРПД)',
    accessories_3: 'Переключатель скважин многоходовой (ПСМ)',
    accessories_4: 'Магниторегулируемый клапан (КМР)',
    accessories_5: 'Гидропривод (ГП)',
    accessories_6: 'Сепарационная ёмкость',
  };

  const [selectedItem, setSelectedItem] = useState<TAccessories | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemFromQuery = params.get('item') as TAccessories | null;
    setSelectedItem(itemFromQuery);
  }, []);

  const handleClickCard = (item: TAccessories) => {
    setSelectedItem(item);

    const url = new URL(window.location.href);
    url.searchParams.set('item', item);
    window.history.pushState({}, '', url.toString());
  };

  const onBackAccessories = () => {
    setSelectedItem(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('item');
    window.history.pushState({}, '', url.toString());
  };

  // 👇 ВАЖНО: НИКАКИХ Layout / LayoutBack
  if (selectedItem === 'accessories_1') {
    return <Accessories_1 onBackAccessories={onBackAccessories} title={cardTitle.accessories_1} />;
  }

  if (selectedItem === 'accessories_2') {
    return <Accessories_2 onBackAccessories={onBackAccessories} title={cardTitle.accessories_2} />;
  }

  if (selectedItem === 'accessories_3') {
    return <Accessories_3 onBackAccessories={onBackAccessories} title={cardTitle.accessories_3} />;
  }

  if (selectedItem === 'accessories_4') {
    return <Accessories_4 onBackAccessories={onBackAccessories} title={cardTitle.accessories_4} />;
  }

  if (selectedItem === 'accessories_5') {
    return <Accessories_5 onBackAccessories={onBackAccessories} title={cardTitle.accessories_5} />;
  }

  if (selectedItem === 'accessories_6') {
    return <Accessories_6 onBackAccessories={onBackAccessories} title={cardTitle.accessories_6} />;
  }

  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.ramca}>
        <Card
          imgSrc={product_2_1.src}
          title={cardTitle.accessories_1}
          onClick={() => handleClickCard('accessories_1')}
        />
        <Card
          imgSrc={product_2_2.src}
          title={cardTitle.accessories_2}
          onClick={() => handleClickCard('accessories_2')}
        />
        <Card
          imgSrc={product_2_3.src}
          title={cardTitle.accessories_3}
          onClick={() => handleClickCard('accessories_3')}
        />
        <Card
          imgSrc={product_2_4.src}
          title={cardTitle.accessories_4}
          onClick={() => handleClickCard('accessories_4')}
        />
        <Card
          imgSrc={product_2_5.src}
          title={cardTitle.accessories_5}
          onClick={() => handleClickCard('accessories_5')}
        />
        <Card
          imgSrc={product_2_6.src}
          title={cardTitle.accessories_6}
          onClick={() => handleClickCard('accessories_6')}
        />
      </div>
    </LayoutBack>
  );
};
