import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { gudroProducts } from '../../../products/gudro.products';

export const Gudro_1 = ({ onBackShop, title }: any) => (
  <ShopBase
    products={gudroProducts}
    title={title}
    onBackShop={onBackShop}
  />
);
