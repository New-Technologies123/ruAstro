import { useEffect, useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import product_4_1 from '../../../images/products/product_4.webp';
import product_4_2 from '../../../images/products/product_4_2.webp';
import product_4_3 from '../../../images/products/product_4_3.webp';
import product_4_4 from '../../../images/products/product_4_4.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop'

type TPreparation = | 'launch' | 'block' | 'cleaning' | 'dosing';

/* ---------------- component ---------------- */
export const PreparationSystems = () => {
  const title = 'Системы подготовки нефти, газа и воды';

  const cardTitle: Record<TPreparation, string> = {
    launch: 'Устройство запуска и приема внутритрубных средств очистки и диагностики УЗПЗ, УЗПП',
    block: 'Блок гребенки (БГ)',
    cleaning: 'Устройство очистки колонны УОК-НКТ',
    dosing: 'Установка дозирования химического реагента (БДР)',
  };

  /* открыть карточку */
  const goToPreparation = (item: TPreparation) => {
    window.location.href = `/products/preparation-systems/${item}`;
  };

  /* назад к продуктам */
  const onBackProducts = () => {
    window.location.href = '/products';
  };

  /* ---------------- список ---------------- */
  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.ramca}>
        <Card
          imgSrc={product_4_1.src}
          title={cardTitle.launch}
          onClick={() => goToPreparation('launch')}
        />
        <Card
          imgSrc={product_4_2.src}
          title={cardTitle.block}
          onClick={() => goToPreparation('block')}
        />
        <Card
          imgSrc={product_4_3.src}
          title={cardTitle.cleaning}
          onClick={() => goToPreparation('cleaning')}
        />
        <Card
          imgSrc={product_4_4.src}
          title={cardTitle.dosing}
          onClick={() => goToPreparation('dosing')}
        />
      </div>
      <BackToTop />
    </LayoutBack>
  );
};
