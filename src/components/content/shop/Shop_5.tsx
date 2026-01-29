import Styles from './shop.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { LayoutBack } from '../../layout/LayoutBack';
import { useEffect, useState } from 'react';
import { Cards } from './Cards';
import { Goods_1 } from './Shop_4/Goods_1';
import { Goods_2 } from './Shop_4/Goods_2';
import { Goods_3 } from './Shop_4/Goods_3';
import { Goods_4 } from './Shop_4/Goods_4';

type TTitleOptions = 'goods_1' | 'goods_2' | 'goods_3' | 'goods_4';

type TProps = {
  onBackProducts: VoidFunction;
  title: string;
};

export const Shop_5 = ({ onBackProducts, title }: TProps) => {
  const cardTitle: Record<TTitleOptions, string> = {
    goods_1: 'Клапан магниторегулируемый КМР-2 Ж НТ.200.000.000.0',
    goods_2: 'Клапан магниторегулируемый КМР-2 М НТ.201.000.000.0',
    goods_3: 'Клапан магниторегулируемый КМР-3.1 Ех НТ.302.000.000.1',
    goods_4: 'Клапан магниторегулируемый КМР-2 Г НТ.250.000.000.0',
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
  if (selectedItem === 'goods_3') {
    return <Goods_3 onBackShop={onBackShop} title={cardTitle.goods_3} />;
  }
  if (selectedItem === 'goods_4') {
    return <Goods_4 onBackShop={onBackShop} title={cardTitle.goods_4} />;
  }

  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.container}>
        <div className={Styles.team}>
          <Cards title={cardTitle.goods_1} onClick={() => handleClickCard('goods_1')} />
          <Cards title={cardTitle.goods_2} onClick={() => handleClickCard('goods_2')} />
          <Cards title={cardTitle.goods_3} onClick={() => handleClickCard('goods_3')} />
          <Cards title={cardTitle.goods_4} onClick={() => handleClickCard('goods_4')} />
        </div>
        <BackToTop />
      </div>
    </LayoutBack>
  );
};
