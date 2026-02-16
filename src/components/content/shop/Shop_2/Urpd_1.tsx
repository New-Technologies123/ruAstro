import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { yrpd1Products } from '../../../products/yrpd_1.products';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

export const Urpd_1 = ({ onBackShop, title }: any) => (
  <>
    <ShopBase
      products={yrpd1Products}
      title={title}
      onBackShop={onBackShop}
    />
    <BackToTop/>
  </>
);
