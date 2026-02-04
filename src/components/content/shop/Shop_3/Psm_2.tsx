import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { psm_2Products } from '../../../products/psm_2.products';

export const Psm_2 = ({ onBackShop, title }: any) => (
  <ShopBase
    products={psm_2Products}
    title={title}
    onBackShop={onBackShop}
  />
);
