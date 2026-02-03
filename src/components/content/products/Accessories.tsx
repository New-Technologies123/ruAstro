import { useEffect, useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import { Accessories_1 } from './Accessories/Accessories_1';
import { Accessories_2 } from './Accessories/Accessories_2';
import { Accessories_3 } from './Accessories/Accessories_3';
import { Accessories_4 } from './Accessories/Accessories_4';
import { Accessories_5 } from './Accessories/Accessories_5';
import { Accessories_6 } from './Accessories/Accessories_6';

import product_2_1 from '../../../images/products/product_2.webp';
import product_2_2 from '../../../images/products/product_2_1.webp';
import product_2_3 from '../../../images/products/product_2_2.png';
import product_2_4 from '../../../images/products/product_2_3.png';
import product_2_5 from '../../../images/products/product_2_4.png';
import product_2_6 from '../../../images/products/product_2_5.png';

type TAccessories =
  | 'accessories_1'
  | 'accessories_2'
  | 'accessories_3'
  | 'accessories_4'
  | 'accessories_5'
  | 'accessories_6';

/* ---------------- helpers ---------------- */
const getAccessoryFromPath = (): TAccessories | null => {
  const parts = window.location.pathname.split('/').filter(Boolean);

  if (
    parts.length === 3 &&
    parts[0] === 'products' &&
    parts[1] === 'accessories'
  ) {
    return parts[2] as TAccessories;
  }

  return null;
};

/* ---------------- component ---------------- */
export const Accessories = () => {
  const title =
    'Комплектующие для автоматизированной групповой замерной установки';

  const cardTitle: Record<TAccessories, string> = {
    accessories_1: 'Вихревой расходомер ЭРВИП',
    accessories_2: 'Устройство регулирования перепада давления (УРПД)',
    accessories_3: 'Переключатель скважин многоходовой (ПСМ)',
    accessories_4: 'Магниторегулируемый клапан (КМР)',
    accessories_5: 'Гидропривод (ГП)',
    accessories_6: 'Сепарационная ёмкость',
  };

  const [selectedItem, setSelectedItem] = useState<TAccessories | null>(null);

  /* синхронизация с URL */
  useEffect(() => {
    const sync = () => {
      setSelectedItem(getAccessoryFromPath());
    };

    sync(); // при монтировании
    window.addEventListener('popstate', sync);

    return () => window.removeEventListener('popstate', sync);
  }, []);

  /* открыть карточку */
  const goToAccessory = (item: TAccessories) => {
    window.history.pushState({}, '', `/products/accessories/${item}`);
    setSelectedItem(item);
  };

  /* назад к списку аксессуаров */
  const onBackAccessories = () => {
    window.history.pushState({}, '', '/products/accessories');
    setSelectedItem(null);
  };

  /* назад к продуктам */
  const onBackProducts = () => {
    window.location.href = '/products';
  };

  /* ---------------- детальные страницы ---------------- */
  if (selectedItem === 'accessories_1')
    return (
      <Accessories_1
        title={cardTitle.accessories_1}
        onBackAccessories={onBackAccessories}
      />
    );

  if (selectedItem === 'accessories_2')
    return (
      <Accessories_2
        title={cardTitle.accessories_2}
        onBackAccessories={onBackAccessories}
      />
    );

  if (selectedItem === 'accessories_3')
    return (
      <Accessories_3
        title={cardTitle.accessories_3}
        onBackAccessories={onBackAccessories}
      />
    );

  if (selectedItem === 'accessories_4')
    return (
      <Accessories_4
        title={cardTitle.accessories_4}
        onBackAccessories={onBackAccessories}
      />
    );

  if (selectedItem === 'accessories_5')
    return (
      <Accessories_5
        title={cardTitle.accessories_5}
        onBackAccessories={onBackAccessories}
      />
    );

  if (selectedItem === 'accessories_6')
    return (
      <Accessories_6
        title={cardTitle.accessories_6}
        onBackAccessories={onBackAccessories}
      />
    );

  /* ---------------- список ---------------- */
  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.ramca}>
        <Card
          imgSrc={product_2_1.src}
          title={cardTitle.accessories_1}
          onClick={() => goToAccessory('accessories_1')}
        />
        <Card
          imgSrc={product_2_2.src}
          title={cardTitle.accessories_2}
          onClick={() => goToAccessory('accessories_2')}
        />
        <Card
          imgSrc={product_2_3.src}
          title={cardTitle.accessories_3}
          onClick={() => goToAccessory('accessories_3')}
        />
        <Card
          imgSrc={product_2_4.src}
          title={cardTitle.accessories_4}
          onClick={() => goToAccessory('accessories_4')}
        />
        <Card
          imgSrc={product_2_5.src}
          title={cardTitle.accessories_5}
          onClick={() => goToAccessory('accessories_5')}
        />
        <Card
          imgSrc={product_2_6.src}
          title={cardTitle.accessories_6}
          onClick={() => goToAccessory('accessories_6')}
        />
      </div>
    </LayoutBack>
  );
};
