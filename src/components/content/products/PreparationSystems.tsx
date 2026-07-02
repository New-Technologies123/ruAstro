// preparation-systems.tsx
import { useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './accounting.module.scss';

import product_4_1 from '../../../images/products/product_4.webp';
import product_4_2 from '../../../images/products/product_4_2.webp';
import product_4_3 from '../../../images/products/product_4_3.webp';
import product_4_4 from '../../../images/products/product_4_4.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

type TPreparation = 'launch' | 'block' | 'cleaning' | 'dosing';

export const PreparationSystems = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'specs'>('info');

  const cardTitle: Record<TPreparation, string> = {
    launch: 'Устройство запуска и приема внутритрубных средств очистки и диагностики УЗПЗ, УЗПП',
    block: 'Блок гребенки (БГ)',
    cleaning: 'Устройство очистки колонны УОК-НКТ',
    dosing: 'Установка дозирования химического реагента (БДР)',
  };

  const goToPreparation = (item: TPreparation) => {
    window.location.href = `/products/preparation-systems/${item}`;
  };

  const onBackProducts = () => {
    window.location.href = '/products';
  };

  return (
    <LayoutBack onBack={onBackProducts} title="Системы подготовки нефти, газа и воды">
      <div className={Styles.container}>
        <div className={Styles.textColumn}>

          <div className={Styles.contentWrapper}>
            <div className={Styles.fadeIn}>
              <p>
                Отложения, коррозия и неравномерное дозирование реагентов снижают эффективность подготовки углеводородов. Наши решения — 
                устройства запуска и приёма средств очистки (УЗПЗ/УЗПП), блоки гребёнок, очистители колонн НКТ и дозирующие установки — 
                помогают поддерживать чистоту оборудования и стабильность технологических процессов.
              </p>

              <div className={Styles.featureGrid}>
                <div className={Styles.featureItem}>
                  <div className={Styles.iconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                      <path d="M3 12h4l2-3 3 3 3-3 2 3 4-3"/>
                      <path d="M3 8h4l2-3 3 3 3-3 2 3 4-3"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Очистка оборудования</h4>
                    <p>Удаление отложений и коррозии из трубопроводов и колонн</p>
                  </div>
                </div>
                <div className={Styles.featureItem}>
                  <div className={Styles.iconWrapper}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 12h8"/>
                      <path d="M12 8v8"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Дозирование реагентов</h4>
                    <p>Точная подача химических реагентов для стабилизации процессов</p>
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
                    <p>Нефтепромысловые трубопроводы, кустовые площадки, УПН</p>
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
                    <h4>Диагностика</h4>
                    <p>Контроль состояния трубопроводов и своевременное выявление проблем</p>
                  </div>
                </div>
              </div>
              <p style={{ marginTop: '16px' }}>
                Выбирайте комплексные решения для защиты нефтепромыслового оборудования — обеспечьте надёжность и рентабельность добычи!
              </p>
            </div>
          </div>
        </div>

        <div className={Styles.cardsColumn}>
          <div className={Styles.cardsRow}>
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
          </div>
          <div className={Styles.cardsRow}>
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
        </div>
      </div>

      <BackToTop />
    </LayoutBack>
  );
};