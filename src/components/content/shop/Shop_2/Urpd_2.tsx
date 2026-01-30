import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { yrpd2Products } from '../../../products/yrpd_2.products';

export const Urpd_2 = ({ onBackShop, title }: any) => (
  <ShopBase
    products={yrpd2Products}
    title={title}
    onBackShop={onBackShop}
  />
);
