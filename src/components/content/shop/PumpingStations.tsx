import { useState, useEffect } from 'react';
import { Card } from '../../ui/card/Card';
import { PumpingStations_1 } from './PumpingStations/PumpingStations_1';
import { PumpingStations_2 } from './PumpingStations/PumpingStations_2';
import Styles from './products.module.scss'
import { LayoutBack } from '../../layout/LayoutBack';

import product_5_1 from '../../../images/products/product_5.webp';
import product_5_2 from '../../../images/products/product_5_1.webp';

type TPumping = 'pumpingStations_1' | 'pumpingStations_2';

type TProps = {
  onBackProducts: VoidFunction;
  title: string;
};

export const PumpingStations = ({ onBackProducts, title }: TProps) => {
  const cardTitle: Record<TPumping, string> = {
    pumpingStations_1: 'Блочная насосная станция внутренней и внешней перекачки нефти',
    pumpingStations_2: 'Блочная мультифазная насосная станция',
  };

  const [selectedItem, setSelectedItem] = useState<TPumping | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemFromQuery = params.get('item') as TPumping | null;
    setSelectedItem(itemFromQuery);
  }, []);

  const handleClickCard = (item: TPumping) => {
    setSelectedItem(item);

    const url = new URL(window.location.href);
    url.searchParams.set('item', item);
    window.history.pushState({}, '', url.toString());
  };

  const onBackPumping = () => {
    setSelectedItem(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('item');
    window.history.pushState({}, '', url.toString());
  };

  // 👇 ВАЖНО: НИКАКИХ Layout / LayoutBack
  if (selectedItem === 'pumpingStations_1') {
    return <PumpingStations_1 onBackPumping={onBackPumping} title={cardTitle.pumpingStations_1}/>;
  }

  if (selectedItem === 'pumpingStations_2') {
    return <PumpingStations_2 onBackPumping={onBackPumping} title={cardTitle.pumpingStations_2}/>;
  }

  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.ramca}>
        <Card
          imgSrc={product_5_1.src}
          title={cardTitle.pumpingStations_1}
          onClick={() => handleClickCard('pumpingStations_1')}
        />
        <Card
          imgSrc={product_5_2.src}
          title={cardTitle.pumpingStations_2}
          onClick={() => handleClickCard('pumpingStations_2')}
        />
      </div>      
    </LayoutBack>
  );
};
