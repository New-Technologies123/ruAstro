import { Layout } from '../../layout/Layout';
import { Card } from '../../ui/card/Card';
import { useEffect, useState, useRef } from 'react';
import { AccountingSystem } from './AccountingSystem';
import { Accessories } from './Accessories';
import { MeasuringSystem } from './MeasuringSystem';
import { PreparationSystems } from './PreparationSystems';
import { PumpingStations } from './PumpingStations';

import product_1 from '../../../images/products/product_1.webp';
import product_2 from '../../../images/products/product_2.0.webp';
import product_3 from '../../../images/products/product_3.webp';
import product_4 from '../../../images/products/product_4.webp';
import product_5 from '../../../images/products/product_5.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop'
import styles from './scroll.module.scss';

type TProducts = | 'accounting-system' | 'accessories' | 'measuring-system' | 'preparation-systems' | 'pumping-stations';

const pathnameToProduct = (pathname: string): TProducts | null => {
  const parts = pathname.split('/').filter(Boolean);

  if (parts.length === 2 && parts[0] === 'products') {
    return parts[1] as TProducts;
  }

  return null;
};

export const Products = () => {
  const [currentPage, setCurrentPage] = useState<TProducts | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const goTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPage(pathnameToProduct(path));
    window.scrollTo({ top: 0, behavior: 'smooth', });
  };

  useEffect(() => {
    const track = trackRef.current;
    const cards = track?.querySelectorAll('.card');
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!track || !cards?.length || !prevBtn || !nextBtn) return;

    let current = 0;

    const updateArrows = () => {
      prevBtn.style.visibility = current <= 0 ? 'hidden' : 'visible';
      nextBtn.style.visibility = current >= cards.length - 1 ? 'hidden' : 'visible';
    };

    const cardStep = () => {
      return cards.length > 1
        ? (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft
        : (cards[0] as HTMLElement).offsetWidth;
    };

    const goTo = (index: number) => {
      current = Math.max(0, Math.min(cards.length - 1, index));
      const card = cards[current] as HTMLElement;
      const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
      track.scrollTo({ left, behavior: 'smooth' });
      updateArrows();
    };

    const handleScroll = () => {
      current = Math.round(track.scrollLeft / cardStep());
      current = Math.max(0, Math.min(cards.length - 1, current));
      updateArrows();
    };

    nextBtn.addEventListener('click', () => goTo(current + 1));
    prevBtn.addEventListener('click', () => goTo(current - 1));
    track.addEventListener('scroll', handleScroll, { passive: true });

    updateArrows();

    return () => {
      nextBtn.removeEventListener('click', () => goTo(current + 1));
      prevBtn.removeEventListener('click', () => goTo(current - 1));
      track.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const sync = () => setCurrentPage(pathnameToProduct(window.location.pathname));
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  if (currentPage === 'accounting-system') {
    return <AccountingSystem/>;
  }

  if (currentPage === 'accessories') {
    return <Accessories/>;
  }

  if (currentPage === 'measuring-system') {
    return <MeasuringSystem/>;
  }

  if (currentPage === 'preparation-systems') {
    return <PreparationSystems/>;
  }

  if (currentPage === 'pumping-stations') {
    return <PumpingStations/>;
  }

  return (
    <Layout title="Продукция" 
      description="Качество продукции ООО ИПП «Новые Технологии» соответствует всем стандартам в области 
      безопасности и качества, что подтверждено соответствующими российскими сертификатами и сертификатами 
      Таможенного союза. На предприятии разработана, внедрена и успешно работает Интегрированная система 
      менеджмента качества, сертифицированная на соответствие с требованиями ГОСТ ISO 9001-2015 (ISO 9001:2015), 
      ГОСТ Р ИСО 14001-2016 (ISO 14001:2016), ГОСТ Р 45001-2020 (ISO 45001:2018), ГОСТ Р ИСО 29001-2023 (ISO 29001:2020).">
      <>
        <div className={styles.productsWrapper}>
          <div className={styles.cardsTrack} ref={trackRef}>
            <div className="card">
              <Card
                imgSrc={product_1.src} 
                title="Автоматизированная групповая замерная установка (АГЗУ)"
                onClick={() => goTo('/products/accounting-system')}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={product_2.src} 
                title="Комплектующие для автоматизированной групповой замерной установки"
                onClick={() => goTo('/products/accessories')}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={product_3.src} 
                title="Система учёта углеводородов и пластовой жидкости"
                onClick={() => goTo('/products/measuring-system')}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={product_4.src} 
                title="Системы подготовки нефти, газа и воды"
                onClick={() => goTo('/products/preparation-systems')}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={product_5.src} 
                title="Насосные станции перекачки нефти, нефтепродуктов и воды"
                onClick={() => goTo('/products/pumping-stations')}
              />
            </div>
          </div>
          
          <div className={styles.mobileNav}>
            <button className={styles.prevBtn} ref={prevBtnRef}>←</button>
            <button className={styles.nextBtn} ref={nextBtnRef}>→</button>
          </div>
        </div>
      </>
      <BackToTop />
    </Layout>
  );
};