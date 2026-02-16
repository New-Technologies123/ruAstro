import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { shop3Products } from '../../../products/kmr_3.products';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

export const Goods_3 = ({ onBackShop, title }: any) => (
  <>
    <ShopBase
      products={shop3Products}
      title={title}
      onBackShop={onBackShop}
    />
    <BackToTop/>
  </>
);
