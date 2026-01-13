import { useState, useEffect } from 'react';
import { Card } from '../../ui/card/Card';
import { Accessories_1 } from './Accessories/Accessories_1';
import { Accessories_2 } from './Accessories/Accessories_2';

import product_2_1 from '../../../images/products/product_2.webp';
import product_2_2 from '../../../images/products/product_2_1.webp';

type TAccessories = 'accessories_1' | 'accessories_2';

export const Accessories = () => {
  const cardTitle: Record<TAccessories, string> = {
    accessories_1: 'Автоматизированная замерная установка (АГЗУ)',
    accessories_2: 'Комплектующие для автоматизированной групповой замерной установки',
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

  const onBack = () => {
    setSelectedItem(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('item');
    window.history.pushState({}, '', url.toString());
  };

  // 👇 ВАЖНО: НИКАКИХ Layout / LayoutBack
  if (selectedItem === 'accessories_1') {
    return <Accessories_1 onBack={onBack} />;
  }

  if (selectedItem === 'accessories_2') {
    return <Accessories_2 onBack={onBack} />;
  }

  return (
    <>
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
    </>
  );
};
