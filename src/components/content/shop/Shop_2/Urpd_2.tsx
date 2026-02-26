import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { urpd2Products } from '../../../products/urpd_2.products';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

export const Urpd_2 = ({ onBackShop, title }: any) => (
  <>
      <ShopBase
        products={urpd2Products}
        title={title}
        onBackShop={onBackShop}
      />
      <BackToTop/>
    </>
);
