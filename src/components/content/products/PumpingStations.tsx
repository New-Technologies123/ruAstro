import { useEffect, useState } from 'react';
import { Card } from '../../ui/card/Card';
import { LayoutBack } from '../../layout/LayoutBack';
import Styles from './accounting.module.scss';

import product_5_1 from '../../../images/products/product_5.webp';
import product_5_2 from '../../../images/products/product_5_1.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop'

type TPumping = | 'internal' | 'multiphase';

/* ---------------- component ---------------- */
export const PumpingStations = () => {
  const title = 'Насосные станции перекачки нефти, нефтепродуктов и воды';

  const cardTitle: Record<TPumping, string> = {
    internal: 'Блочная насосная станция внутренней и внешней перекачки нефти',
    multiphase: 'Блочная мультифазная насосная станция',
  };

  /* открыть карточку */
  const goToPumping = (item: TPumping) => {
    window.location.href = `/products/pumping-stations/${item}`;
  };

  /* назад к продуктам */
  const onBackProducts = () => {
    window.location.href = '/products';
  };

  return (
    <LayoutBack onBack={onBackProducts} title={title}>
      <div className={Styles.container}>
        <div className={Styles.textColumn}>
          <p>
            Для надёжной перекачки нефти, нефтепродуктов и воды мы предлагаем блочные насосные станции, разработанные с учётом требований 
            промышленной безопасности и энергоэффективности. В данном разделе представлены блочные насосные станции внутренней и внешней 
            перекачки нефти, а также блочные мультифазные насосные станции — готовые решения для магистральных и технологических трубопроводов
          </p>
          <p>
            <strong>Функциональное назначение:</strong>
          </p>
          <ul>
            <li>перекачка жидкостей на заданные расстояния и высоты;</li>
            <li>создание и поддержание необходимого давления в трубопроводах;</li>
            <li>равномерное распределение потоков между потребителями или технологическими линиями;</li>
            <li>приём и подача жидкостей из резервуаров, скважин, водоёмов;</li>
            <li>автоматизированный контроль и управление процессами перекачки;</li>
            <li>обеспечение бесперебойной работы систем водоснабжения, нефтедобычи и транспортировки.</li>
          </ul>
        </div>
        <div className={Styles.cardsColumn}>
          <Card
            imgSrc={product_5_1.src}
            title={cardTitle.internal}
            onClick={() => goToPumping('internal')}
          />
          <Card
            imgSrc={product_5_2.src}
            title={cardTitle.multiphase}
            onClick={() => goToPumping('multiphase')}
          />
        </div>        
      </div>
      <BackToTop />
    </LayoutBack>
  );
};
