// pumping-stations.tsx
import { useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './accounting.module.scss';

import product_5_1 from '../../../images/products/product_5.webp';
import product_5_2 from '../../../images/products/product_5_1.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

type TPumping = 'internal' | 'multiphase';

export const PumpingStations = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'specs'>('info');

  const cardTitle: Record<TPumping, string> = {
    internal: 'Блочная насосная станция внутренней и внешней перекачки нефти',
    multiphase: 'Блочная мультифазная насосная станция',
  };

  const goToPumping = (item: TPumping) => {
    window.location.href = `/products/pumping-stations/${item}`;
  };

  const onBackProducts = () => {
    window.location.href = '/products';
  };

  return (
    <LayoutBack onBack={onBackProducts} title="Насосные станции перекачки нефти, нефтепродуктов и воды">
      <div className={Styles.container}>
        <div className={Styles.textColumn}>

          <div className={Styles.contentWrapper}>
            <div className={Styles.fadeIn}>
              <p>
                Для надёжной перекачки нефти, нефтепродуктов и воды мы предлагаем блочные насосные станции, разработанные с учётом требований 
                промышленной безопасности и энергоэффективности. В данном разделе представлены блочные насосные станции внутренней и внешней 
                перекачки нефти, а также блочные мультифазные насосные станции — готовые решения для магистральных и технологических трубопроводов.
              </p>

              <div className={Styles.featureGrid}>
                <div className={Styles.featureItem}>
                  <div className={Styles.iconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                      <path d="M12 2v4M12 22v-4M4 12H2M6 12H4M20 12h-2M22 12h-2M19.07 4.93l-2.83 2.83M4.93 19.07l2.83-2.83M19.07 19.07l-2.83-2.83M4.93 4.93l2.83 2.83"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Энергоэффективность</h4>
                    <p>Оптимизированные режимы работы для снижения энергопотребления</p>
                  </div>
                </div>
                <div className={Styles.featureItem}>
                  <div className={Styles.iconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Надёжность</h4>
                    <p>Бесперебойная работа в экстремальных условиях эксплуатации</p>
                  </div>
                </div>
                <div className={Styles.featureItem}>
                  <div className={Styles.iconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Автоматизация</h4>
                    <p>Полностью автоматизированные системы контроля и управления</p>
                  </div>
                </div>
                <div className={Styles.featureItem}>
                  <div className={Styles.iconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Модульность</h4>
                    <p>Блочное исполнение для быстрого монтажа и масштабирования</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={Styles.cardsColumn}>
          <Card
            imgSrc={product_5_1.src}
            title={cardTitle.internal}
            onClick={() => goToPumping('internal')}
          />
          <Card
            imgSrc={product_5_2.src}
            title={cardTitle.multiphase}
            onClick={() => goToPumping('multiphase')}
          />
        </div>
      </div>

      <BackToTop />
    </LayoutBack>
  );
};