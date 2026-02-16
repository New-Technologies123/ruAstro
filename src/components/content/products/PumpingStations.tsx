import { useEffect, useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import product_5_1 from '../../../images/products/product_5.webp';
import product_5_2 from '../../../images/products/product_5_1.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop'

type TPumping = | 'pumpingStations_1' | 'pumpingStations_2';

/* ---------------- component ---------------- */
export const PumpingStations = () => {
  const title = 'Насосные станции перекачки нефти, нефтепродуктов и воды';

  const cardTitle: Record<TPumping, string> = {
    pumpingStations_1: 'Блочная насосная станция внутренней и внешней перекачки нефти',
    pumpingStations_2: 'Блочная мультифазная насосная станция',
  };

  /* открыть карточку */
  const goToPumping = (item: TPumping) => {
    window.location.href = `/products/pumping-stations/${item}`;
  };

  /* назад к продуктам */
  const onBackProducts = () => {
    window.location.href = '/products';
  };

  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.ramca}>
        <Card
          imgSrc={product_5_1.src}
          title={cardTitle.pumpingStations_1}
          onClick={() => goToPumping('pumpingStations_1')}
        />
        <Card
          imgSrc={product_5_2.src}
          title={cardTitle.pumpingStations_2}
          onClick={() => goToPumping('pumpingStations_2')}
        />
      </div>
      <BackToTop />
    </LayoutBack>
  );
};
