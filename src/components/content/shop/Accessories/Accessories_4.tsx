import Styles from '../shop.module.scss';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';
import { LayoutBack } from '../../../layout/LayoutBack';
import { useEffect, useState } from 'react';
import { Cards } from '../Cards';
import { Shop_1 } from './Accessories_4/Shop_1';

type TTitleOptions = 'shop_1' | 'shop_2' | 'shop_3' | 'shop_4';

type TProps = {
  onBackAccessories: VoidFunction;
  title: string;
};

export const Accessories_4 = ({ onBackAccessories, title }: TProps) => {
  const cardTitle: Record<TTitleOptions, string> = {
    shop_1: 'Клапан магниторегулируемый КМР-2 Ж НТ.200.000.000.0',
    shop_2: 'Клапан магниторегулируемый КМР-2 М НТ.201.000.000.0',
    shop_3: 'Клапан магниторегулируемый КМР-3.1 Ех НТ.302.000.000.1',
    shop_4: 'Клапан магниторегулируемый КМР-2 Г НТ.250.000.000.0',
  };

  const [selectedItem, setSelectedItem] = useState<TTitleOptions | null>(null);

  // читаем ?tem=shop_1 при обновлении страницы
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tem = params.get('tem') as TTitleOptions | null;
    setSelectedItem(tem);
  }, []);

  const handleClickCard = (tem: TTitleOptions) => {
    setSelectedItem(tem);

    const url = new URL(window.location.href);
    url.searchParams.set('tem', tem);
    window.history.pushState({}, '', url.toString());
  };

  const onBackShop = () => {
    setSelectedItem(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('tem');
    window.history.pushState({}, '', url.toString());
  };

  if (selectedItem === 'shop_1') {
    return <Shop_1 onBackShop={onBackShop} title={cardTitle.shop_1} />;
  }

  return (
    <LayoutBack onBack={onBackAccessories} title={title}>
      <div className={Styles.container}>
        <div className={Styles.team}>
          <Cards title={cardTitle.shop_1} onClick={() => handleClickCard('shop_1')} />
          <Cards title={cardTitle.shop_2} onClick={() => handleClickCard('shop_2')} />
          <Cards title={cardTitle.shop_3} onClick={() => handleClickCard('shop_3')} />
          <Cards title={cardTitle.shop_4} onClick={() => handleClickCard('shop_4')} />
        </div>
        <BackToTop />
      </div>
    </LayoutBack>
  );
};
