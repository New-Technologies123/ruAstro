import { ShopBase } from '../../../ui/shop-base/ShopBase';
import { gudroProducts } from '../../../products/gudro.products';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

export const Gudro_1 = ({ onBackShop, title }: any) => (
  <>
    <ShopBase
      products={gudroProducts}
      title={title}
      onBackShop={onBackShop}
    />
    <BackToTop/>
  </>
);
