import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { shop3Products } from '../../../products/kmr_3.products';

export const Goods_3 = ({ onBackShop, title }: any) => (
  <ShopBase
    products={shop3Products}
    title={title}
    onBackShop={onBackShop}
  />
);
