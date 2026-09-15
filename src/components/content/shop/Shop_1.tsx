import Styles from './shop.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { LayoutBack } from '../../layout/LayoutBack';
import { Cards } from './Cards';

import type { Product } from '../../products/types';
import { addToCart } from '../../utils/cartStorage';

type TProps = {
  onBackProducts: VoidFunction;
  title: string;
};

export const Shop_1 = ({ onBackProducts, title }: TProps) => {
  // Товары ЭРВИ (без клика на карточку)
  const PRODUCTS: Product[] = [
    {
      id: 9001,
      title: 'Расходомер-счетчик ЭРВИП.НТ',
      description: '',
      price: '250 000',
      nds: 'без НДС',
      deliveryTime: 'по запросу',
      image: '/images/shop/product_1.webp'
    }
  ];

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
  };

  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.container}>
        <div className={Styles.team}>
          {PRODUCTS.map(product => (
            <Cards
              key={product.id}
              title={product.title}
              image={product.image}
              price={Number(product.price.replace(/\s/g, ''))}
              // ❌ НЕТ onClick — карточка не кликабельна
              onAddToCart={(qty) => handleAddToCart(product, qty)}
            />
          ))}
        </div>
        <BackToTop />
      </div>
    </LayoutBack>
  );
};