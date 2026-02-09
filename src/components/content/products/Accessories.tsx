import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import product_2_1 from '../../../images/products/product_2.webp';
import product_2_2 from '../../../images/products/product_2_1.webp';
import product_2_3 from '../../../images/products/product_2_2.png';
import product_2_4 from '../../../images/products/product_2_3.png';
import product_2_5 from '../../../images/products/product_2_4.png';
import product_2_6 from '../../../images/products/product_2_5.png';

type TAccessories = 'accessories_1' | 'accessories_2' | 'accessories_3' | 'accessories_4' | 'accessories_5' | 'accessories_6';

/* ---------------- component ---------------- */
export const Accessories = () => {
  const title = 'Комплектующие для автоматизированной групповой замерной установки';

  const cardTitle: Record<TAccessories, string> = {
    accessories_1: 'Вихревой расходомер ЭРВИП',
    accessories_2: 'Устройство регулирования перепада давления (УРПД)',
    accessories_3: 'Переключатель скважин многоходовой (ПСМ)',
    accessories_4: 'Магниторегулируемый клапан (КМР)',
    accessories_5: 'Гидропривод (ГП)',
    accessories_6: 'Сепарационная ёмкость',
  };

  /* открыть карточку */
  const goToAccessory = (item: TAccessories) => {
    window.location.href = `/products/accessories/${item}`;
  };

  /* назад к продуктам */
  const onBackProducts = () => {
    window.location.href = '/products';
  };

  /* ---------------- список ---------------- */
  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.ramca}>
        <Card imgSrc={product_2_1.src} title={cardTitle.accessories_1} onClick={() => goToAccessory('accessories_1')} />
        <Card imgSrc={product_2_2.src} title={cardTitle.accessories_2} onClick={() => goToAccessory('accessories_2')} />
        <Card imgSrc={product_2_3.src} title={cardTitle.accessories_3} onClick={() => goToAccessory('accessories_3')} />
        <Card imgSrc={product_2_4.src} title={cardTitle.accessories_4} onClick={() => goToAccessory('accessories_4')} />
        <Card imgSrc={product_2_5.src} title={cardTitle.accessories_5} onClick={() => goToAccessory('accessories_5')} />
        <Card imgSrc={product_2_6.src} title={cardTitle.accessories_6} onClick={() => goToAccessory('accessories_6')} />
      </div>
    </LayoutBack>
  );
};
