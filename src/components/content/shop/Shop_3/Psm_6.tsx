import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { psm_6Products } from '../../../products/psm_6.products';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

export const Psm_6 = ({ onBackShop, title }: any) => (
  <>
      <ShopBase
        products={psm_6Products}
        title={title}
        onBackShop={onBackShop}
      />
      <BackToTop/>
    </>
);
