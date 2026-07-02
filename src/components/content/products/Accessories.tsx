// accessories.tsx
import { LayoutBack } from '../../layout/LayoutBack';
import { Card } from '../../ui/card/Card';
import Styles from './accounting.module.scss';

import product_2_1 from '../../../images/products/product_2.webp';
import product_2_2 from '../../../images/products/urpd.webp';
import product_2_3 from '../../../images/products/product_2_2.webp';
import product_2_4 from '../../../images/products/product_2_3.webp';
import product_2_5 from '../../../images/products/product_2_4.webp';
import product_2_6 from '../../../images/products/product_2_5.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { useState } from 'react';

type TAccessories = 'ervip' | 'urpd' | 'psm' | 'kmr' | 'gidroprivod' | 'separation';

export const Accessories = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'specs'>('info');

  const cardTitle: Record<TAccessories, string> = {
    ervip: 'Вихревой расходомер ЭРВИП',
    urpd: 'Устройство регулирования перепада давления (УРПД)',
    psm: 'Переключатель скважин многоходовой (ПСМ)',
    kmr: 'Магниторегулируемый клапан (КМР)',
    gidroprivod: 'Гидропривод (ГП)',
    separation: 'Сепарационная ёмкость',
  };

  const goToAccessory = (item: TAccessories) => {
    window.location.href = `/products/accessories/${item}`;
  };

  const onBackProducts = () => {
    window.location.href = '/products';
  };

  return (
    <LayoutBack onBack={onBackProducts} title="Комплектующие для АГЗУ">
      <div className={Styles.container}>
        <div className={Styles.textColumn}>

          <div className={Styles.contentWrapper}>
              <div className={Styles.fadeIn}>
                <p>
                  Для обеспечения стабильной и точной работы автоматических групповых замерных установок 
                  (АГЗУ) мы предлагаем полный спектр комплектующих собственного производства. В данном 
                  разделе представлены ключевые элементы обвязки: от вихревых расходомеров ЭРВИП до 
                  устройств регулирования перепада давления и переключателей скважин. Все изделия 
                  разработаны с учётом требований нефтепромыслового оборудования и подтвердили свою 
                  надёжность в реальных условиях эксплуатации.
                </p>

                <div className={Styles.featureGrid}>
                  <div className={Styles.featureItem}>
                    <div className={Styles.iconWrapper}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div>
                      <h4>Область применения</h4>
                      <p>Напорные системы сбора продукции нефтяных скважин и АСУ ТП нефтедобычи</p>
                    </div>
                  </div>
                  <div className={Styles.featureItem}>
                    <div className={Styles.iconWrapper}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <div>
                      <h4>Количество скважин</h4>
                      <p>Кустовые площадки с количеством скважин от 8 до 14</p>
                    </div>
                  </div>
                  <div className={Styles.featureItem}>
                    <div className={Styles.iconWrapper}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="M9 12l2 2 4-4"/>
                      </svg>
                    </div>
                    <div>
                      <h4>Взрывозащита</h4>
                      <p>Соответствие требованиям взрывозащиты класса В-1а</p>
                    </div>
                  </div>
                </div>
                <p>
                  Выбирайте проверенные решения для бесперебойной работы ваших АГЗУ — надёжные комплектующие от производителя 
                  с гарантией качества и технической поддержкой!
                </p>
              </div>

          </div>
        </div>

        <div className={Styles.cardsColumn}>
          <Card
            imgSrc={product_2_1.src}
            title={cardTitle.ervip}
            onClick={() => goToAccessory('ervip')}
          />
          <Card
            imgSrc={product_2_2.src}
            title={cardTitle.urpd}
            onClick={() => goToAccessory('urpd')}
          />
          <Card
            imgSrc={product_2_3.src}
            title={cardTitle.psm}
            onClick={() => goToAccessory('psm')}
          />
          <Card
            imgSrc={product_2_4.src}
            title={cardTitle.kmr}
            onClick={() => goToAccessory('kmr')}
          />
          <Card
            imgSrc={product_2_5.src}
            title={cardTitle.gidroprivod}
            onClick={() => goToAccessory('gidroprivod')}
          />
          <Card
            imgSrc={product_2_6.src}
            title={cardTitle.separation}
            onClick={() => goToAccessory('separation')}
          />
        </div>
      </div>

      <BackToTop />
    </LayoutBack>
  );
};