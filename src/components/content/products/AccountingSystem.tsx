import { useEffect, useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import product_1_1 from '../../../images/products/product_1.webp';
import product_1_2 from '../../../images/products/product_1_2.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop'

type TAccounting = | 'accountingSystem_1' | 'accountingSystem_2' | 'calculator';

/* ---------------- component ---------------- */
export const AccountingSystem = () => {
  const title = 'Автоматизированная замерная установка (АГЗУ)';

  const cardTitle: Record<TAccounting, string> = {
    accountingSystem_1: 'АГЗУ «Спутник — массомер НТ.1» (стационарный)',
    accountingSystem_2: 'АГЗУ «Спутник — массомер НТ.1» (мобильный)',
    calculator: 'Калькулятор',
  };

  /* открыть карточку */
  const goToAccounting = (item: TAccounting) => {
    window.location.href = `/products/accounting-system/${item}`;
  };

  /* назад к продуктам */
  const onBackProducts = () => {
    window.location.href = '/products';
  };

  /* ---------------- список ---------------- */
  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.price}>
        <button
          className={Styles.buttonPrice}
          onClick={() => goToAccounting('calculator')}
        >
          Калькулятор для расчета цен
        </button>
      </div>

      <div className={Styles.ramca}>
        <Card
          imgSrc={product_1_1.src}
          title={cardTitle.accountingSystem_1}
          onClick={() => goToAccounting('accountingSystem_1')}
        />
        <Card
          imgSrc={product_1_2.src}
          title={cardTitle.accountingSystem_2}
          onClick={() => goToAccounting('accountingSystem_2')}
        />
      </div>
      <BackToTop />
    </LayoutBack>
  );
};
