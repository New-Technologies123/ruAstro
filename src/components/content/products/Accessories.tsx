import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import product_2_1 from '../../../images/products/product_2.webp';
import product_2_2 from '../../../images/products/product_2_1.webp';
import product_2_3 from '../../../images/products/product_2_2.png';
import product_2_4 from '../../../images/products/product_2_3.png';
import product_2_5 from '../../../images/products/product_2_4.png';
import product_2_6 from '../../../images/products/product_2_5.png';
import { BackToTop } from '../../ui/back-to-top/BackToTop'

type TAccessories = 'ervip' | 'urpd' | 'psm' | 'kmr' | 'gidroprivod' | 'separation';

/* ---------------- component ---------------- */
export const Accessories = () => {

  const cardTitle: Record<TAccessories, string> = {
    ervip: 'Вихревой расходомер ЭРВИП',
    urpd: 'Устройство регулирования перепада давления (УРПД)',
    psm: 'Переключатель скважин многоходовой (ПСМ)',
    kmr: 'Магниторегулируемый клапан (КМР)',
    gidroprivod: 'Гидропривод (ГП)',
    separation: 'Сепарационная ёмкость',
  };

  /* открыть карточку */
  const goToAccessory = (item: TAccessories) => {
    window.location.href = `/products/accessories/${item}`;
  };

  /* назад к продуктам */
  const onBackProducts = () => {
    window.location.href = '/products';
  };

  return (
    <LayoutBack onBack={onBackProducts} title='Комплектующие для АГЗУ'>
      <div className={Styles.ramca}>
        <Card imgSrc={product_2_1.src} title={cardTitle.ervip} onClick={() => goToAccessory('ervip')} />
        <Card imgSrc={product_2_2.src} title={cardTitle.urpd} onClick={() => goToAccessory('urpd')} />
        <Card imgSrc={product_2_3.src} title={cardTitle.psm} onClick={() => goToAccessory('psm')} />
        <Card imgSrc={product_2_4.src} title={cardTitle.kmr} onClick={() => goToAccessory('kmr')} />
        <Card imgSrc={product_2_5.src} title={cardTitle.gidroprivod} onClick={() => goToAccessory('gidroprivod')} />
        <Card imgSrc={product_2_6.src} title={cardTitle.separation} onClick={() => goToAccessory('separation')} />
      </div>
      <BackToTop />
    </LayoutBack>
  );
};
