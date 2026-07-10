// accounting.tsx
import { LayoutBack } from '../../layout/LayoutBack';
import { Card } from '../../ui/card/Card';
import Styles from './accounting.module.scss';
import product_1_1 from '../../../images/products/product_1.webp';
import product_1_2 from '../../../images/products/product_1_2.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { useState } from 'react';

type TAccounting = 'stationary' | 'mobile' | 'calculator';

export const AccountingSystem = () => {
  const title = 'Автоматизированная групповая замерная установка (АГЗУ)';
  const [activeTab, setActiveTab] = useState<'info' | 'specs'>('info');

  const cardTitle: Record<TAccounting, string> = {
    stationary: 'АГЗУ «Спутник — массомер НТ.1» (стационарный)',
    mobile: 'АГЗУ «Спутник — массомер НТ.1» (мобильный)',
    calculator: 'Калькулятор',
  };

  const goToAccounting = (item: TAccounting) => {
    window.location.href = `/products/accounting-system/${item}`;
  };

  const onBackProducts = () => {
    window.location.href = '/products';
  };

  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.container}>
        <div className={Styles.textColumn}>
          {/* Обновленная кнопка калькулятора */}
          <div className={Styles.price}>
            <button
              className={Styles.buttonPrice}
              onClick={() => goToAccounting('calculator')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="2" width="16" height="20" rx="2"/>
                <path d="M8 6h8M8 10h8M8 14h4M8 18h8"/>
              </svg>
              Рассчитать стоимость
            </button>
          </div>

          <div className={Styles.contentWrapper}>
            <div className={Styles.fadeIn}>
              <p>
                Измерительная установка (ИУ) предназначена для измерений массы и массового расхода скважинной жидкости в составе нефтегазовой смеси, массы и массового расхода скважинной жидкости за вычетом массы воды и попутного нефтяного газа, приведенных к стандартным условиям.
              </p>

              <div className={Styles.featureGrid}>
                <div className={Styles.featureItem}>
                  <div className={Styles.iconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Контроль количества</h4>
                    <p>Скважинной жидкости и газа с выдачей результата в блок управления</p>
                  </div>
                </div>
                <div className={Styles.featureItem}>
                  <div className={Styles.iconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Эксплуатационное назначение</h4>
                    <p>Измерение массы жидкости, обезвоженной нефти и объема газа</p>
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
                    <h4>Область применения</h4>
                    <p>Напорные системы сбора продукции и автоматизированные системы управления</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={Styles.cardsColumn}>
          <Card
            imgSrc={product_1_1.src}
            title={cardTitle.stationary}
            onClick={() => goToAccounting('stationary')}
          />
          <Card
            imgSrc={product_1_2.src}
            title={cardTitle.mobile}
            onClick={() => goToAccounting('mobile')}
          />
        </div>
      </div>

      <BackToTop />
    </LayoutBack>
  );
};