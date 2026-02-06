import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { psm_4Products } from '../../../products/psm_4.products';

export const Psm_4 = ({ onBackShop, title }: any) => (
  <ShopBase
    products={psm_4Products}
    title={title}
    onBackShop={onBackShop}
  />
);
