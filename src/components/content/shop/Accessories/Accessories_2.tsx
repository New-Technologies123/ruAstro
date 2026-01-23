import Styles from '../shop.module.scss';
import { useEffect, useState } from 'react';
import { Cards } from '../Cards';
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../../layout/LayoutBack';
import { Shop_1 } from './Accessories_2/Shop_1';
import { Shop_2 } from './Accessories_2/Shop_2';

type TTitleOptions = 'shop_1' | 'shop_2';

type TProps = {
  onBackAccessories: VoidFunction;
  title: string;
};

export const Accessories_2 = ({ onBackAccessories, title }: TProps) => {
  const cardTitle: Record<TTitleOptions, string> = {
    shop_1: 'Устройство для регулирования перепада давления УРПД-1.1 НТ.511.000.000.0',
    shop_2: 'Устройство для регулирования перепада давления УРПД-3.1 НТ.531.000.000.0 ',
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
    if (selectedItem === 'shop_2') {
      return <Shop_2 onBackShop={onBackShop} title={cardTitle.shop_2} />;
    }

  return (
    <LayoutBack onBack={onBackAccessories} title={title}>
      <div className={Styles.container}>
        <div className={Styles.team}>
          <Cards title={cardTitle.shop_1} onClick={() => handleClickCard('shop_1')} />
          <Cards title={cardTitle.shop_2} onClick={() => handleClickCard('shop_2')} />
        </div>
        <BackToTop />
      </div>
    </LayoutBack>
  )
}





