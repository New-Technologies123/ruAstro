import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { shop2Products } from '../../../products/kmr_2.products';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

export const Goods_2 = ({ onBackShop, title }: any) => (
  <>
    <ShopBase
      products={shop2Products}
      title={title}
      onBackShop={onBackShop}
    />
    <BackToTop/>
  </>
);
