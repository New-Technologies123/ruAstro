import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { shop1Products } from '../../../products/shop1.products';

export const Goods_4 = ({ onBackShop, title }: any) => (
  <ShopBase
    products={shop1Products}
    title={title}
    onBackShop={onBackShop}
  />
);
