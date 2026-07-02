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

// Ключи для хранения данных в sessionStorage
const SCROLL_POSITION_KEY = 'products_scroll_position';
const SELECTED_CARD_KEY = 'products_selected_card';
const FROM_PRODUCT_KEY = 'from_product_page';

export const Products = () => {
  const [currentPage, setCurrentPage] = useState<TProducts | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const trackRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Проверка мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 720);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goTo = (path: string, cardIndex?: number) => {
    if (cardIndex !== undefined) {
      sessionStorage.setItem(SELECTED_CARD_KEY, String(cardIndex));
      sessionStorage.setItem(FROM_PRODUCT_KEY, 'true');
    }
    if (trackRef.current) {
      sessionStorage.setItem(SCROLL_POSITION_KEY, String(trackRef.current.scrollLeft));
    }
    window.history.pushState({}, '', path);
    setCurrentPage(pathnameToProduct(path));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    const cards = track?.querySelectorAll('.card');
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!track || !cards?.length || !prevBtn || !nextBtn) return;

    let current = 0;

    const updateArrows = () => {
      if (current <= 0) {
        prevBtn.classList.remove('visible');
        prevBtn.style.visibility = 'hidden';
      } else {
        prevBtn.classList.add('visible');
        prevBtn.style.visibility = 'visible';
      }
      
      if (current >= cards.length - 1) {
        nextBtn.classList.remove('visible');
        nextBtn.style.visibility = 'hidden';
      } else {
        nextBtn.classList.add('visible');
        nextBtn.style.visibility = 'visible';
      }
    };

    const updateDots = (index: number) => {
      setCurrentCardIndex(index);
    };

    const cardStep = () => {
      return cards.length > 1
        ? (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft
        : (cards[0] as HTMLElement).offsetWidth;
    };

    const goToCard = (index: number, smooth: boolean = true) => {
      current = Math.max(0, Math.min(cards.length - 1, index));
      const card = cards[current] as HTMLElement;
      const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
      track.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
      updateArrows();
      updateDots(current);
    };

    const handleScroll = () => {
      const step = cardStep();
      if (step > 0) {
        current = Math.round(track.scrollLeft / step);
        current = Math.max(0, Math.min(cards.length - 1, current));
        updateArrows();
        updateDots(current);
      }
    };

    const getTargetCardIndex = (): number => {
      const fromProduct = sessionStorage.getItem(FROM_PRODUCT_KEY);
      
      if (fromProduct === 'true') {
        const savedCardIndex = sessionStorage.getItem(SELECTED_CARD_KEY);
        sessionStorage.removeItem(FROM_PRODUCT_KEY);
        sessionStorage.removeItem(SELECTED_CARD_KEY);
        sessionStorage.removeItem(SCROLL_POSITION_KEY);
        
        if (savedCardIndex !== null) {
          const index = parseInt(savedCardIndex, 10);
          if (!isNaN(index) && index >= 0 && index < cards.length) {
            return index;
          }
        }
        return 0;
      }

      sessionStorage.removeItem(SELECTED_CARD_KEY);
      sessionStorage.removeItem(SCROLL_POSITION_KEY);
      return 0;
    };

    const targetIndex = getTargetCardIndex();
    goToCard(targetIndex, false);

    setIsInitialized(true);

    // Сохраняем ссылки на обработчики для правильного удаления
    const handleNextClick = () => {
      goToCard(current + 1);
      setTimeout(() => {
        if (trackRef.current) {
          sessionStorage.setItem(SCROLL_POSITION_KEY, String(trackRef.current.scrollLeft));
        }
      }, 100);
    };
    
    const handlePrevClick = () => {
      goToCard(current - 1);
      setTimeout(() => {
        if (trackRef.current) {
          sessionStorage.setItem(SCROLL_POSITION_KEY, String(trackRef.current.scrollLeft));
        }
      }, 100);
    };

    const handleScrollEvent = () => {
      handleScroll();
      if (trackRef.current) {
        sessionStorage.setItem(SCROLL_POSITION_KEY, String(trackRef.current.scrollLeft));
      }
    };

    nextBtn.addEventListener('click', handleNextClick);
    prevBtn.addEventListener('click', handlePrevClick);
    track.addEventListener('scroll', handleScrollEvent, { passive: true });

    return () => {
      nextBtn.removeEventListener('click', handleNextClick);
      prevBtn.removeEventListener('click', handlePrevClick);
      track.removeEventListener('scroll', handleScrollEvent);
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
                onClick={() => goTo('/products/accounting-system', 0)}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={product_2.src} 
                title="Комплектующие для автоматизированной групповой замерной установки"
                onClick={() => goTo('/products/accessories', 1)}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={product_3.src} 
                title="Система учёта углеводородов и пластовой жидкости"
                onClick={() => goTo('/products/measuring-system', 2)}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={product_4.src} 
                title="Системы подготовки нефти, газа и воды"
                onClick={() => goTo('/products/preparation-systems', 3)}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={product_5.src} 
                title="Насосные станции перекачки нефти, нефтепродуктов и воды"
                onClick={() => goTo('/products/pumping-stations', 4)}
              />
            </div>
          </div>
          
          <div className={styles.mobileNav}>
            <button 
              className={`${styles.prevBtn}`} 
              ref={prevBtnRef}
              aria-label="Предыдущий продукт"
            >
              ←
            </button>
            <button 
              className={`${styles.nextBtn}`} 
              ref={nextBtnRef}
              aria-label="Следующий продукт"
            >
              →
            </button>
          </div>

          {/* Индикаторы пагинации (только на мобильных) */}
          {isMobile && (
            <div className={styles.paginationDots} role="tablist" aria-label="Навигация по продуктам">
              {Array.from({ length: 5 }).map((_, index) => {
                const cards = trackRef.current?.querySelectorAll('.card');
                const total = cards?.length || 5;
                if (index >= total) return null;
                
                return (
                  <button
                    key={index}
                    className={`${styles.dot} ${currentCardIndex === index ? styles.active : ''}`}
                    onClick={() => {
                      const track = trackRef.current;
                      const cards = track?.querySelectorAll('.card');
                      if (!track || !cards) return;
                      
                      const card = cards[index] as HTMLElement;
                      const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
                      track.scrollTo({ left, behavior: 'smooth' });
                      setCurrentCardIndex(index);
                    }}
                    role="tab"
                    aria-selected={currentCardIndex === index}
                    aria-label={`Перейти к продукту ${index + 1}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </>
      <BackToTop />
    </Layout>
  );
};