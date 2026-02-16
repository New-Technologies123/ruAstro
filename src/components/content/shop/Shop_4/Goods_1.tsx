import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { shop1Products } from '../../../products/kmr_1.products';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

export const Goods_1 = ({ onBackShop, title }: any) => (
  <>
    <ShopBase
      products={shop1Products}
      title={title}
      onBackShop={onBackShop}
    />
    <BackToTop/>
  </>
);
