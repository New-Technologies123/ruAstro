import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { psm_1Products } from '../../../products/psm_1.products';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

export const Psm_1 = ({ onBackShop, title }: any) => (
  <>
    <ShopBase
      products={psm_1Products}
      title={title}
      onBackShop={onBackShop}
    />
    <BackToTop/>
  </>  
);
