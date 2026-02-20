import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import product_3_1 from '../../../images/products/product_3.webp';
import product_3_2 from '../../../images/products/product_3_1.webp';
import product_3_3 from '../../../images/products/product_3_2.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop'

type TMeasuring = | 'oil' | 'gas' | 'water';

/* ---------------- component ---------------- */
export const MeasuringSystem = () => {
  const title = 'Система учёта углеводородов и пластовой жидкости';

  const cardTitle: Record<TMeasuring, string> = {
    oil: 'Система измерения количества и показателей качества нефти (СИКН)',
    gas: 'Система измерения количества газа (СИКГ)',
    water: 'Система измерения количества воды (СИКВ)',
  };

  /* открыть карточку */
  const goToMeasuring = (item: TMeasuring) => {
    window.location.href = `/products/measuring-system/${item}`;
  };

  /* назад к продуктам */
  const onBackProducts = () => {
    window.location.href = '/products';
  };

  /* ---------------- список ---------------- */
  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.ramca}>
        <Card
          imgSrc={product_3_1.src}
          title={cardTitle.oil}
          onClick={() => goToMeasuring('oil')}
        />
        <Card
          imgSrc={product_3_2.src}
          title={cardTitle.gas}
          onClick={() => goToMeasuring('gas')}
        />
        <Card
          imgSrc={product_3_3.src}
          title={cardTitle.water}
          onClick={() => goToMeasuring('water')}
        />
      </div>
      <BackToTop />
    </LayoutBack>
  );
};
