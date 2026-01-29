import Styles from './shop.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { LayoutBack } from '../../layout/LayoutBack';
import { useEffect, useState } from 'react';
import { Cards } from './Cards';
import { Goods_1 } from './Shop_4/Goods_1';
import { Goods_2 } from './Shop_4/Goods_2';

type TTitleOptions = 'goods_1' | 'goods_2';

type TProps = {
  onBackProducts: VoidFunction;
  title: string;
};

export const Shop_2 = ({ onBackProducts, title }: TProps) => {
  const cardTitle: Record<TTitleOptions, string> = {
    goods_1: 'Устройство для регулирования перепада давления УРПД-1.1 НТ.511.000.000.0',
    goods_2: 'Устройство для регулирования перепада давления УРПД-3.1 НТ.531.000.000.0',
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

  if (selectedItem === 'goods_1') {
    return <Goods_1 onBackShop={onBackShop} title={cardTitle.goods_1} />;
  }
  if (selectedItem === 'goods_2') {
    return <Goods_2 onBackShop={onBackShop} title={cardTitle.goods_2} />;
  }

  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.container}>
        <div className={Styles.team}>
          <Cards title={cardTitle.goods_1} onClick={() => handleClickCard('goods_1')} />
          <Cards title={cardTitle.goods_2} onClick={() => handleClickCard('goods_2')} />
        </div>
        <BackToTop />
      </div>
    </LayoutBack>
  );
};
