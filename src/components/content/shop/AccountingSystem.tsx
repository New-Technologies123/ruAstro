import { useState, useEffect } from 'react';
import { Card } from '../../ui/card/Card';
import { AccountingSystem_1 } from './AccountingSystem/AccountingSystem_1';
import { AccountingSystem_2 } from './AccountingSystem/AccountingSystem_2';
import Styles from './products.module.scss'

import product_1_1 from '../../../images/products/product_1.webp';
import product_1_2 from '../../../images/products/product_1_2.webp';

type TAccountingSystem = 'accountingSystem_1' | 'accountingSystem_2';

export const AccountingSystem = () => {
  const cardTitle: Record<TAccountingSystem, string> = {
    accountingSystem_1: 'АГЗУ «Спутник — массомер НТ.1» (стационарный)',
    accountingSystem_2: 'АГЗУ «Спутник — массомер НТ.1» (мобильный)',
  };

  const [selectedItem, setSelectedItem] = useState<TAccountingSystem | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemFromQuery = params.get('item') as TAccountingSystem | null;
    setSelectedItem(itemFromQuery);
  }, []);

  const handleClickCard = (item: TAccountingSystem) => {
    setSelectedItem(item);

    const url = new URL(window.location.href);
    url.searchParams.set('item', item);
    window.history.pushState({}, '', url.toString());
  };

  const onBack = () => {
    setSelectedItem(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('item');
    window.history.pushState({}, '', url.toString());
  };

  // 👇 ВАЖНО: НИКАКИХ Layout / LayoutBack
  if (selectedItem === 'accountingSystem_1') {
    return <AccountingSystem_1 />;
  }

  if (selectedItem === 'accountingSystem_2') {
    return <AccountingSystem_2/>;
  }

  return (
    <>
      {/* ===== КНОПКА ЦЕН ===== */}
      <div className={Styles.price}>
        <a className={Styles.buttonPrice} href="/calculator">
          Калькулятор для расчета цен
        </a>
      </div>
      <div className={Styles.ramca}>
        <Card
          imgSrc={product_1_1.src}
          title={cardTitle.accountingSystem_1}
          onClick={() => handleClickCard('accountingSystem_1')}
        />
        <Card
          imgSrc={product_1_2.src}
          title={cardTitle.accountingSystem_2}
          onClick={() => handleClickCard('accountingSystem_2')}
        />
      </div>      
    </>
  );
};
