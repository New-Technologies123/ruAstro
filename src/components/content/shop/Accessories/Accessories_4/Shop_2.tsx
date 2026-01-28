import { ShopBase } from '../../../../ui/shop-base/ShopBase';
import { shop2Products } from '../../../../products/shop2.products';

export const Shop_2 = ({ onBackShop, title }: any) => (
  <ShopBase
    products={shop2Products}
    title={title}
    onBackShop={onBackShop}
  />
);
