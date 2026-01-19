import { useState, useEffect } from 'react';
import { Card } from '../../ui/card/Card';
import { PreparationSystems_1 } from './PreparationSystems/PreparationSystems_1';
import { PreparationSystems_2 } from './PreparationSystems/PreparationSystems_2';
import { PreparationSystems_3 } from './PreparationSystems/PreparationSystems_3';
import { PreparationSystems_4 } from './PreparationSystems/PreparationSystems_4';
import Styles from './products.module.scss'

import product_4_1 from '../../../images/products/product_4.webp';
import product_4_2 from '../../../images/products/product_4_2.webp';
import product_4_3 from '../../../images/products/product_4_3.webp';
import product_4_4 from '../../../images/products/product_4_4.webp';

type TPreparation = 'preparationSystems_1' | 'preparationSystems_2' | 'preparationSystems_3' | 'preparationSystems_4';

export const PreparationSystems = () => {
  const cardTitle: Record<TPreparation, string> = {
    preparationSystems_1: 'Устройство запуска и приема внутритрубных средств очистки и диагностики УЗПЗ, УЗПП',
    preparationSystems_2: 'Блок гребенки (БГ)',
    preparationSystems_3: 'Устройство очистки колонны УОК-НКТ',
    preparationSystems_4: 'Установка дозирования химического реагента (БДР)',
  };

  const [selectedItem, setSelectedItem] = useState<TPreparation | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemFromQuery = params.get('item') as TPreparation | null;
    setSelectedItem(itemFromQuery);
  }, []);

  const handleClickCard = (item: TPreparation) => {
    setSelectedItem(item);

    const url = new URL(window.location.href);
    url.searchParams.set('item', item);
    window.history.pushState({}, '', url.toString());
  };

  const onBack = () => {
    setSelectedItem(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('item');
    window.history.pushState({}, '', url.toString());
  };

  // 👇 ВАЖНО: НИКАКИХ Layout / LayoutBack
  if (selectedItem === 'preparationSystems_1') {
    return <PreparationSystems_1 />;
  }

  if (selectedItem === 'preparationSystems_2') {
    return <PreparationSystems_2/>;
  }

  if (selectedItem === 'preparationSystems_3') {
    return <PreparationSystems_3/>;
  }

  if (selectedItem === 'preparationSystems_4') {
    return <PreparationSystems_4/>;
  }

  return (
    <>
      <div className={Styles.ramca}>
        <Card
          imgSrc={product_4_1.src}
          title={cardTitle.preparationSystems_1}
          onClick={() => handleClickCard('preparationSystems_1')}
        />
        <Card
          imgSrc={product_4_2.src}
          title={cardTitle.preparationSystems_2}
          onClick={() => handleClickCard('preparationSystems_2')}
        />
        <Card
          imgSrc={product_4_3.src}
          title={cardTitle.preparationSystems_3}
          onClick={() => handleClickCard('preparationSystems_3')}
        />
        <Card
          imgSrc={product_4_4.src}
          title={cardTitle.preparationSystems_4}
          onClick={() => handleClickCard('preparationSystems_4')}
        />
      </div>      
    </>
  );
};
