import { LayoutBack } from '../../layout/LayoutBack';
import { Card } from '../../ui/card/Card';
import Styles from './accounting.module.scss';
import product_1_1 from '../../../images/products/product_1.webp';
import product_1_2 from '../../../images/products/product_1_2.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

type TAccounting = 'stationary' | 'mobile' | 'calculator';

export const AccountingSystem = () => {
  const title = 'Автоматизированная групповая замерная установка (АГЗУ)';

  const cardTitle: Record<TAccounting, string> = {
    stationary: 'АГЗУ «Спутник — массомер НТ.1» (стационарный)',
    mobile: 'АГЗУ «Спутник — массомер НТ.1» (мобильный)',
    calculator: 'Калькулятор',
  };

  const goToAccounting = (item: TAccounting) => {
    window.location.href = `/products/accounting-system/${item}`;
  };

  const onBackProducts = () => {
    window.location.href = '/products';
  };

  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.container}>
        {/* Левая часть — текст */}
        <div className={Styles.textColumn}>
          <div className={Styles.price}>
            <button
              className={Styles.buttonPrice}
              onClick={() => goToAccounting('calculator')}
            >
              Калькулятор для расчета цен
            </button>
          </div>          

          <p>
            Измерительная установка (ИУ) предназначена для измерений массы и массового расхода скважинной жидкости в составе нефтегазовой смеси, массы и массового расхода скважинной жидкости за вычетом массы воды и попутного нефтяного газа, приведенных к стандартным условиям.
          </p>
          <p><strong>Функциональное назначение ИУ:</strong></p>
          <ul>
            <li>контроль количества скважинной жидкости и газа с выдачей результата измерений в блок управления или в верхний уровень;</li>
          </ul>
          <p>
            <strong>Эксплуатационное назначение ИУ:</strong> обеспечение измерений (вычислений) массы жидкости, массы обезвоженной нефти, объёма свободного нефтяного газа и суточных расходов массы жидкости, обезвоженной нефти, объема газа для контроля технологических режимов работы нефтяных скважин.
          </p>
          <p>
            <strong>Область применения ИУ:</strong> напорные системы сбора продукции нефтяных скважин и автоматизированные системы управления технологическими процессами нефтедобычи.
          </p>
        </div>

        {/* Правая часть — карточки */}
        <div className={Styles.cardsColumn}>
          <Card
            imgSrc={product_1_1.src}
            title={cardTitle.stationary}
            onClick={() => goToAccounting('stationary')}
          />
          <Card
            imgSrc={product_1_2.src}
            title={cardTitle.mobile}
            onClick={() => goToAccounting('mobile')}
          />
        </div>
      </div>

      <BackToTop />
    </LayoutBack>
  );
};