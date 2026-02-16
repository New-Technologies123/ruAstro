import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './products.module.scss';

import product_3_1 from '../../../images/products/product_3.webp';
import product_3_2 from '../../../images/products/product_3_1.webp';
import product_3_3 from '../../../images/products/product_3_2.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop'

type TMeasuring = | 'measuringSystem_1' | 'measuringSystem_2' | 'measuringSystem_3';

/* ---------------- component ---------------- */
export const MeasuringSystem = () => {
  const title = 'Система учёта углеводородов и пластовой жидкости';

  const cardTitle: Record<TMeasuring, string> = {
    measuringSystem_1: 'Система измерения количества и показателей качества нефти (СИКН)',
    measuringSystem_2: 'Система измерения количества газа (СИКГ)',
    measuringSystem_3: 'Система измерения количества воды (СИКВ)',
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
          title={cardTitle.measuringSystem_1}
          onClick={() => goToMeasuring('measuringSystem_1')}
        />
        <Card
          imgSrc={product_3_2.src}
          title={cardTitle.measuringSystem_2}
          onClick={() => goToMeasuring('measuringSystem_2')}
        />
        <Card
          imgSrc={product_3_3.src}
          title={cardTitle.measuringSystem_3}
          onClick={() => goToMeasuring('measuringSystem_3')}
        />
      </div>
      <BackToTop />
    </LayoutBack>
  );
};
