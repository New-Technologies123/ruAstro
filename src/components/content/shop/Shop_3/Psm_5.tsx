import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { psm_5Products } from '../../../products/psm_5.products';

export const Psm_5 = ({ onBackShop, title }: any) => (
  <ShopBase
    products={psm_5Products}
    title={title}
    onBackShop={onBackShop}
  />
);
