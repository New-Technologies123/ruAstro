import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { shop4Products } from '../../../products/kmr_4.products';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

export const Goods_4 = ({ onBackShop, title }: any) => (
  <>
    <ShopBase
      products={shop4Products}
      title={title}
      onBackShop={onBackShop}
    />
    <BackToTop/>
  </>
);
