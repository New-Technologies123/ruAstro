import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './accounting.module.scss';

import product_2_1 from '../../../images/products/product_2.webp';
import product_2_2 from '../../../images/products/product_2_1.webp';
import product_2_3 from '../../../images/products/product_2_2.webp';
import product_2_4 from '../../../images/products/product_2_3.webp';
import product_2_5 from '../../../images/products/product_2_4.webp';
import product_2_6 from '../../../images/products/product_2_5.webp';
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
      <div className={Styles.container}>
        {/* Левая часть — текст */}
        <div className={Styles.textColumn}>
          <p>
            Для обеспечения стабильной и точной работы автоматических групповых замерных установок 
            (АГЗУ) мы предлагаем полный спектр комплектующих собственного производства. В данном 
            разделе представлены ключевые элементы обвязки: от вихревых расходомеров ЭРВИП до 
            устройств регулирования перепада давления и переключателей скважин. Все изделия 
            разработаны с учётом требований нефтепромыслового оборудования и подтвердили свою 
            надёжность в реальных условиях эксплуатации.
          </p>
          <p>
            <strong>Область применения комплектующих:</strong>
          </p>
          <ul>
            <li>напорные системы сбора продукции нефтяных скважин;</li>
            <li>автоматизированные системы управления технологическими процессами (АСУ ТП) нефтедобычи;</li>
            <li>кустовые площадки с количеством скважин от 8 до 14;</li>
            <li>объекты с требованиями взрывозащиты класса В‑1а.</li>
          </ul>
          <p>
            Выбирайте проверенные решения для бесперебойной работы ваших АГЗУ — надёжные комплектующие от производителя с гарантией качества и технической поддержкой!
          </p>
        </div>

        <div className={Styles.cardsColumn}>
          <Card imgSrc={product_2_1.src} title={cardTitle.ervip} onClick={() => goToAccessory('ervip')} />
          <Card imgSrc={product_2_2.src} title={cardTitle.urpd} onClick={() => goToAccessory('urpd')} />
          <Card imgSrc={product_2_3.src} title={cardTitle.psm} onClick={() => goToAccessory('psm')} />
          <Card imgSrc={product_2_4.src} title={cardTitle.kmr} onClick={() => goToAccessory('kmr')} />
          <Card imgSrc={product_2_5.src} title={cardTitle.gidroprivod} onClick={() => goToAccessory('gidroprivod')} />
          <Card imgSrc={product_2_6.src} title={cardTitle.separation} onClick={() => goToAccessory('separation')} />
        </div>
      </div>
      <BackToTop />
    </LayoutBack>
  );
};
