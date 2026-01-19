import { useState, useEffect } from 'react';
import { Card } from '../../ui/card/Card';
import { MeasuringSystem_1 } from './MeasuringSystem/MeasuringSystem_1';
import { MeasuringSystem_2 } from './MeasuringSystem/MeasuringSystem_2';
import { MeasuringSystem_3 } from './MeasuringSystem/MeasuringSystem_3';
import Styles from './products.module.scss'

import product_3_1 from '../../../images/products/product_3.webp';
import product_3_2 from '../../../images/products/product_3_1.webp';
import product_3_3 from '../../../images/products/product_3_2.webp';

type TMeasuring = 'measuringSystem_1' | 'measuringSystem_2' | 'measuringSystem_3';

export const MeasuringSystem = () => {
  const cardTitle: Record<TMeasuring, string> = {
    measuringSystem_1: 'Система измерения количества и показателей качества нефти (СИКН)',
    measuringSystem_2: 'Система измерения количества газа (СИКГ)',
    measuringSystem_3: 'Система измерения количества воды (СИКВ)',
  };

  const [selectedItem, setSelectedItem] = useState<TMeasuring | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemFromQuery = params.get('item') as TMeasuring | null;
    setSelectedItem(itemFromQuery);
  }, []);

  const handleClickCard = (item: TMeasuring) => {
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
  if (selectedItem === 'measuringSystem_1') {
    return <MeasuringSystem_1 />;
  }

  if (selectedItem === 'measuringSystem_2') {
    return <MeasuringSystem_2/>;
  }

  if (selectedItem === 'measuringSystem_3') {
    return <MeasuringSystem_3/>;
  }

  return (
    <>
      <div className={Styles.ramca}>
        <Card
          imgSrc={product_3_1.src}
          title={cardTitle.measuringSystem_1}
          onClick={() => handleClickCard('measuringSystem_1')}
        />
        <Card
          imgSrc={product_3_2.src}
          title={cardTitle.measuringSystem_2}
          onClick={() => handleClickCard('measuringSystem_2')}
        />
        <Card
          imgSrc={product_3_3.src}
          title={cardTitle.measuringSystem_3}
          onClick={() => handleClickCard('measuringSystem_3')}
        />
      </div>      
    </>
  );
};
