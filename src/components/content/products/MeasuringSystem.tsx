import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './accounting.module.scss';

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
      <div className={Styles.container}>
        <div className={Styles.textColumn}>
          <p>
            Достоверный учёт — основа эффективного управления добычей. Мы разрабатываем и 
            поставляем системы измерения нефти, газа и воды для любых промысловых условий. 
            Оборудование соответствует метрологическим требованиям и готово к интеграции в 
            вашу систему автоматизации.
          </p>
          <p>
            <strong>Почему выбирают наши системы учёта:</strong>
          </p>
          <ul>
            <li><strong>Точность.</strong> Погрешность измерений в пределах нормируемых стандартов — вы получаете достоверные данные по добыче нефти, газа и воды;</li>
            <li><strong>Надёжность.</strong> Оборудование работает в экстремальных условиях нефтепромысла: низкие температуры, высокое давление, агрессивные среды;</li>
            <li><strong>Автоматизация.</strong> Данные поступают в режиме реального времени — вы оперативно реагируете на изменения в работе скважин;</li>
            <li><strong>Гибкость.</strong> Системы адаптируются под ваши задачи: от небольших кустовых площадок до крупных месторождений с десятками скважин;</li>
            <li><strong>Интеграция.</strong> Лёгкое подключение к существующим АСУ ТП и системам телемеханики;</li>
            <li><strong>Поддержка.</strong> Полный цикл услуг: проектирование, поставка, монтаж, пуско-наладочные работы.</li>
          </ul>
        </div>
        <div className={Styles.cardsColumn}>
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
      </div>
      <BackToTop />
    </LayoutBack>
  );
};
