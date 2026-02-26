import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { urpd1Products } from '../../../products/urpd_1.products';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

export const Urpd_1 = ({ onBackShop, title }: any) => (
  <>
    <ShopBase
      products={urpd1Products}
      title={title}
      onBackShop={onBackShop}
    />
    <BackToTop/>
  </>
);
