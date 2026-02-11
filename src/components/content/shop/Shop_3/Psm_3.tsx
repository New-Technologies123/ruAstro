import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { psm_3Products } from '../../../products/psm_3.products';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

export const Psm_3 = ({ onBackShop, title }: any) => (
  <>
      <ShopBase
        products={psm_3Products}
        title={title}
        onBackShop={onBackShop}
      />
      <BackToTop/>
    </>
);
