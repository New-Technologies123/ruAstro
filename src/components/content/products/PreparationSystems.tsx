import { useEffect, useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './accounting.module.scss';

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
      <div className={Styles.container}>
        <div className={Styles.textColumn}>
          <p>
            Отложения, коррозия и неравномерное дозирование реагентов снижают эффективность подготовки углеводородов. Наши решения — 
            устройства запуска и приёма средств очистки (УЗПЗ/УЗПП), блоки гребёнок, очистители колонн НКТ и дозирующие установки — 
            помогают поддерживать чистоту оборудования и стабильность технологических процессов.
          </p>
          <p>
            <strong>Область применения:</strong>
          </p>
          <ul>
            <li>нефтепромысловые трубопроводы;</li>
            <li>кустовые площадки и АГЗУ;</li>
            <li>системы поддержания пластового давления (ППД);</li>
            <li>установки подготовки нефти (УПН);</li>
            <li>месторождения с высоковязкой нефтью и высоким содержанием парафина.</li>
          </ul>
          <p>
            <strong>Результат внедрения:</strong>
          </p>
          <ul>
            <li>стабильная работа оборудования без простоев из‑за отложений и коррозии;</li>
            <li>оптимизация расходов на реагенты и ремонт;</li>
            <li>повышение эффективности подготовки углеводородов;</li>
            <li>соответствие экологическим и технологическим нормам.</li>
          </ul>
          <p>Выбирайте комплексные решения для защиты нефтепромыслового оборудования — обеспечьте надёжность и рентабельность добычи!</p>
        </div>
        <div className={Styles.cardsColumn}>
          <div className={Styles.cardsColumnTwo}>
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
          <div className={Styles.cardsColumnTwo}>
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
