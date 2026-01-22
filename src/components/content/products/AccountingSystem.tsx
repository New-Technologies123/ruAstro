import { useEffect, useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import { AccountingSystem_1 } from './AccountingSystem/AccountingSystem_1';
import { AccountingSystem_2 } from './AccountingSystem/AccountingSystem_2';
import { Calculator } from '../calculator/Calculator';

import product_1_1 from '../../../images/products/product_1.webp';
import product_1_2 from '../../../images/products/product_1_2.webp';

type TAccounting =
  | 'accountingSystem_1'
  | 'accountingSystem_2'
  | 'calculator';

/* ---------------- helpers ---------------- */
const getItemFromPath = (): TAccounting | null => {
  const parts = window.location.pathname.split('/').filter(Boolean);

  if (
    parts.length === 3 &&
    parts[0] === 'products' &&
    parts[1] === 'accounting-system'
  ) {
    return parts[2] as TAccounting;
  }

  return null;
};

/* ---------------- component ---------------- */
export const AccountingSystem = () => {
  const title = 'Автоматизированная замерная установка (АГЗУ)';

  const cardTitle: Record<TAccounting, string> = {
    accountingSystem_1: 'АГЗУ «Спутник — массомер НТ.1» (стационарный)',
    accountingSystem_2: 'АГЗУ «Спутник — массомер НТ.1» (мобильный)',
    calculator: 'Калькулятор',
  };

  const [selectedItem, setSelectedItem] = useState<TAccounting | null>(null);

  /* синхронизация с URL (как в Accessories) */
  useEffect(() => {
    const sync = () => setSelectedItem(getItemFromPath());
    sync(); // при монтировании
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  /* открыть карточку */
  const openItem = (item: TAccounting) => {
    window.history.pushState({}, '', `/products/accounting-system/${item}`);
    setSelectedItem(item);
  };

  /* назад к списку АГЗУ */
  const onBackAccountingSystem = () => {
    window.history.pushState({}, '', '/products/accounting-system');
    setSelectedItem(null);
  };

  /* назад к продуктам */
  const onBackProducts = () => {
    window.history.pushState({}, '', '/products');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  /* ---------------- детальные страницы ---------------- */
  if (selectedItem === 'accountingSystem_1') {
    return (
      <AccountingSystem_1
        title={cardTitle.accountingSystem_1}
        onBackAccountingSystem={onBackAccountingSystem}
      />
    );
  }

  if (selectedItem === 'accountingSystem_2') {
    return (
      <AccountingSystem_2
        title={cardTitle.accountingSystem_2}
        onBackAccountingSystem={onBackAccountingSystem}
      />
    );
  }

  if (selectedItem === 'calculator') {
    return <Calculator onBackAccountingSystem={onBackAccountingSystem} />;
  }

  /* ---------------- список ---------------- */
  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.price}>
        <button
          className={Styles.buttonPrice}
          onClick={() => openItem('calculator')}
        >
          Калькулятор для расчета цен
        </button>
      </div>

      <div className={Styles.ramca}>
        <Card
          imgSrc={product_1_1.src}
          title={cardTitle.accountingSystem_1}
          onClick={() => openItem('accountingSystem_1')}
        />
        <Card
          imgSrc={product_1_2.src}
          title={cardTitle.accountingSystem_2}
          onClick={() => openItem('accountingSystem_2')}
        />
      </div>
    </LayoutBack>
  );
};
