import { useEffect, useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import { PreparationSystems_1 } from './PreparationSystems/PreparationSystems_1';
import { PreparationSystems_2 } from './PreparationSystems/PreparationSystems_2';
import { PreparationSystems_3 } from './PreparationSystems/PreparationSystems_3';
import { PreparationSystems_4 } from './PreparationSystems/PreparationSystems_4';

import product_4_1 from '../../../images/products/product_4.webp';
import product_4_2 from '../../../images/products/product_4_2.webp';
import product_4_3 from '../../../images/products/product_4_3.webp';
import product_4_4 from '../../../images/products/product_4_4.webp';

type TPreparation =
  | 'preparationSystems_1'
  | 'preparationSystems_2'
  | 'preparationSystems_3'
  | 'preparationSystems_4';

/* ---------------- helpers ---------------- */
const getItemFromPath = (): TPreparation | null => {
  const parts = window.location.pathname.split('/').filter(Boolean);

  if (
    parts.length === 3 &&
    parts[0] === 'products' &&
    parts[1] === 'preparation-systems'
  ) {
    return parts[2] as TPreparation;
  }

  return null;
};

/* ---------------- component ---------------- */
export const PreparationSystems = () => {
  const title = 'Системы подготовки продукции';

  const cardTitle: Record<TPreparation, string> = {
    preparationSystems_1:
      'Устройство запуска и приема внутритрубных средств очистки и диагностики УЗПЗ, УЗПП',
    preparationSystems_2: 'Блок гребенки (БГ)',
    preparationSystems_3: 'Устройство очистки колонны УОК-НКТ',
    preparationSystems_4: 'Установка дозирования химического реагента (БДР)',
  };

  const [selectedItem, setSelectedItem] = useState<TPreparation | null>(null);

  /* синхронизация с URL */
  useEffect(() => {
    const sync = () => setSelectedItem(getItemFromPath());
    sync(); // при монтировании
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  /* открыть карточку */
  const openItem = (item: TPreparation) => {
    window.history.pushState({}, '', `/products/preparation-systems/${item}`);
    setSelectedItem(item);
  };

  /* назад к списку */
  const onBackPreparation = () => {
    window.history.pushState({}, '', '/products/preparation-systems');
    setSelectedItem(null);
  };

  /* назад к продуктам */
  const onBackProducts = () => {
    window.history.pushState({}, '', '/products');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  /* ---------------- детальные страницы ---------------- */
  if (selectedItem === 'preparationSystems_1') {
    return (
      <PreparationSystems_1
        title={cardTitle.preparationSystems_1}
        onBackPreparation={onBackPreparation}
      />
    );
  }

  if (selectedItem === 'preparationSystems_2') {
    return (
      <PreparationSystems_2
        title={cardTitle.preparationSystems_2}
        onBackPreparation={onBackPreparation}
      />
    );
  }

  if (selectedItem === 'preparationSystems_3') {
    return (
      <PreparationSystems_3
        title={cardTitle.preparationSystems_3}
        onBackPreparation={onBackPreparation}
      />
    );
  }

  if (selectedItem === 'preparationSystems_4') {
    return (
      <PreparationSystems_4
        title={cardTitle.preparationSystems_4}
        onBackPreparation={onBackPreparation}
      />
    );
  }

  /* ---------------- список ---------------- */
  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.ramca}>
        <Card
          imgSrc={product_4_1.src}
          title={cardTitle.preparationSystems_1}
          onClick={() => openItem('preparationSystems_1')}
        />
        <Card
          imgSrc={product_4_2.src}
          title={cardTitle.preparationSystems_2}
          onClick={() => openItem('preparationSystems_2')}
        />
        <Card
          imgSrc={product_4_3.src}
          title={cardTitle.preparationSystems_3}
          onClick={() => openItem('preparationSystems_3')}
        />
        <Card
          imgSrc={product_4_4.src}
          title={cardTitle.preparationSystems_4}
          onClick={() => openItem('preparationSystems_4')}
        />
      </div>
    </LayoutBack>
  );
};
