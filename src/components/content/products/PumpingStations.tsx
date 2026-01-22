import { useEffect, useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import { PumpingStations_1 } from './PumpingStations/PumpingStations_1';
import { PumpingStations_2 } from './PumpingStations/PumpingStations_2';

import product_5_1 from '../../../images/products/product_5.webp';
import product_5_2 from '../../../images/products/product_5_1.webp';

type TPumping =
  | 'pumpingStations_1'
  | 'pumpingStations_2';

/* ---------------- helpers ---------------- */
const getItemFromPath = (): TPumping | null => {
  const parts = window.location.pathname.split('/').filter(Boolean);

  if (
    parts.length === 3 &&
    parts[0] === 'products' &&
    parts[1] === 'pumping-stations'
  ) {
    return parts[2] as TPumping;
  }

  return null;
};

/* ---------------- component ---------------- */
export const PumpingStations = () => {
  const title = 'Насосные станции';

  const cardTitle: Record<TPumping, string> = {
    pumpingStations_1: 'Блочная насосная станция внутренней и внешней перекачки нефти',
    pumpingStations_2: 'Блочная мультифазная насосная станция',
  };

  const [selectedItem, setSelectedItem] = useState<TPumping | null>(null);

  /* синхронизация с URL */
  useEffect(() => {
    const sync = () => setSelectedItem(getItemFromPath());
    sync(); // при монтировании
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  /* открыть карточку */
  const openItem = (item: TPumping) => {
    window.history.pushState({}, '', `/products/pumping-stations/${item}`);
    setSelectedItem(item);
  };

  /* назад к списку насосных станций */
  const onBackPumping = () => {
    window.history.pushState({}, '', '/products/pumping-stations');
    setSelectedItem(null);
  };

  /* назад к продуктам */
  const onBackProducts = () => {
    window.history.pushState({}, '', '/products');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  /* ---------------- детальные страницы ---------------- */
  if (selectedItem === 'pumpingStations_1') {
    return (
      <PumpingStations_1
        title={cardTitle.pumpingStations_1}
        onBackPumping={onBackPumping}
      />
    );
  }

  if (selectedItem === 'pumpingStations_2') {
    return (
      <PumpingStations_2
        title={cardTitle.pumpingStations_2}
        onBackPumping={onBackPumping}
      />
    );
  }

  /* ---------------- список ---------------- */
  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.ramca}>
        <Card
          imgSrc={product_5_1.src}
          title={cardTitle.pumpingStations_1}
          onClick={() => openItem('pumpingStations_1')}
        />
        <Card
          imgSrc={product_5_2.src}
          title={cardTitle.pumpingStations_2}
          onClick={() => openItem('pumpingStations_2')}
        />
      </div>
    </LayoutBack>
  );
};
