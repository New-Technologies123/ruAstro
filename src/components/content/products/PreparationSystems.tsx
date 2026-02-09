import { useEffect, useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import product_4_1 from '../../../images/products/product_4.webp';
import product_4_2 from '../../../images/products/product_4_2.webp';
import product_4_3 from '../../../images/products/product_4_3.webp';
import product_4_4 from '../../../images/products/product_4_4.webp';

type TPreparation = | 'preparationSystems_1' | 'preparationSystems_2' | 'preparationSystems_3' | 'preparationSystems_4';

/* ---------------- component ---------------- */
export const PreparationSystems = () => {
  const title = 'Системы подготовки нефти, газа и воды';

  const cardTitle: Record<TPreparation, string> = {
    preparationSystems_1: 'Устройство запуска и приема внутритрубных средств очистки и диагностики УЗПЗ, УЗПП',
    preparationSystems_2: 'Блок гребенки (БГ)',
    preparationSystems_3: 'Устройство очистки колонны УОК-НКТ',
    preparationSystems_4: 'Установка дозирования химического реагента (БДР)',
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
          title={cardTitle.preparationSystems_1}
          onClick={() => goToPreparation('preparationSystems_1')}
        />
        <Card
          imgSrc={product_4_2.src}
          title={cardTitle.preparationSystems_2}
          onClick={() => goToPreparation('preparationSystems_2')}
        />
        <Card
          imgSrc={product_4_3.src}
          title={cardTitle.preparationSystems_3}
          onClick={() => goToPreparation('preparationSystems_3')}
        />
        <Card
          imgSrc={product_4_4.src}
          title={cardTitle.preparationSystems_4}
          onClick={() => goToPreparation('preparationSystems_4')}
        />
      </div>
    </LayoutBack>
  );
};
