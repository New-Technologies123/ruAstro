import { useEffect, useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import { MeasuringSystem_1 } from './MeasuringSystem/MeasuringSystem_1';
import { MeasuringSystem_2 } from './MeasuringSystem/MeasuringSystem_2';
import { MeasuringSystem_3 } from './MeasuringSystem/MeasuringSystem_3';

import product_3_1 from '../../../images/products/product_3.webp';
import product_3_2 from '../../../images/products/product_3_1.webp';
import product_3_3 from '../../../images/products/product_3_2.webp';

type TMeasuring =
  | 'measuringSystem_1'
  | 'measuringSystem_2'
  | 'measuringSystem_3';

/* ---------------- helpers ---------------- */
const getItemFromPath = (): TMeasuring | null => {
  const parts = window.location.pathname.split('/').filter(Boolean);

  if (
    parts.length === 3 &&
    parts[0] === 'products' &&
    parts[1] === 'measuring-system'
  ) {
    return parts[2] as TMeasuring;
  }

  return null;
};

/* ---------------- component ---------------- */
export const MeasuringSystem = () => {
  const title = 'Система учёта углеводородов и пластовой жидкости';

  const cardTitle: Record<TMeasuring, string> = {
    measuringSystem_1:
      'Система измерения количества и показателей качества нефти (СИКН)',
    measuringSystem_2: 'Система измерения количества газа (СИКГ)',
    measuringSystem_3: 'Система измерения количества воды (СИКВ)',
  };

  const [selectedItem, setSelectedItem] = useState<TMeasuring | null>(null);

  /* синхронизация с URL */
  useEffect(() => {
    const sync = () => {
      setSelectedItem(getItemFromPath());
    };

    sync(); // при монтировании
    window.addEventListener('popstate', sync);

    return () => window.removeEventListener('popstate', sync);
  }, []);

  /* открыть карточку */
  const openItem = (item: TMeasuring) => {
    window.history.pushState({}, '', `/products/measuring-system/${item}`);
    setSelectedItem(item);
  };

  /* назад к списку измерительных систем */
  const onBackMeasuring = () => {
    window.history.pushState({}, '', '/products/measuring-system');
    setSelectedItem(null);
  };

  /* назад к продуктам */
  const onBackProducts = () => {
    window.location.href = '/products';
  };

  /* ---------------- детальные страницы ---------------- */
  if (selectedItem === 'measuringSystem_1') {
    return (
      <MeasuringSystem_1
        title={cardTitle.measuringSystem_1}
        onBackMeasuring={onBackMeasuring}
      />
    );
  }

  if (selectedItem === 'measuringSystem_2') {
    return (
      <MeasuringSystem_2
        title={cardTitle.measuringSystem_2}
        onBackMeasuring={onBackMeasuring}
      />
    );
  }

  if (selectedItem === 'measuringSystem_3') {
    return (
      <MeasuringSystem_3
        title={cardTitle.measuringSystem_3}
        onBackMeasuring={onBackMeasuring}
      />
    );
  }

  /* ---------------- список ---------------- */
  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.ramca}>
        <Card
          imgSrc={product_3_1.src}
          title={cardTitle.measuringSystem_1}
          onClick={() => openItem('measuringSystem_1')}
        />
        <Card
          imgSrc={product_3_2.src}
          title={cardTitle.measuringSystem_2}
          onClick={() => openItem('measuringSystem_2')}
        />
        <Card
          imgSrc={product_3_3.src}
          title={cardTitle.measuringSystem_3}
          onClick={() => openItem('measuringSystem_3')}
        />
      </div>
    </LayoutBack>
  );
};
