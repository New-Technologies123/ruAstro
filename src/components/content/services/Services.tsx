import { Layout } from '../../layout/Layout';
import { Card } from '../../ui/card/Card';
import { useEffect, useState, useRef } from 'react';

import { Repair } from './Repair';
import { Metering } from './Metering';
import { Service } from './Service';
import { Dewaxing } from './Dewaxing';

import serves_12 from '../../../images/services/serves_12.png';
import serves_3 from '../../../images/services/serves_3.webp';
import serves_4 from '../../../images/services/serves_4.webp';
import serves_5 from '../../../images/services/serves_5.webp';

import { BackToTop } from '../../ui/back-to-top/BackToTop';
import styles from '../products/scroll.module.scss';

type TServices = | 'repair' | 'metering' | 'service' | 'dewaxing';

const pathnameToService = (pathname: string): TServices | null => {
  const parts = pathname.split('/').filter(Boolean);

  if (parts.length === 2 && parts[0] === 'services') {
    return parts[1] as TServices;
  }

  return null;
};

// Ключи для хранения данных в sessionStorage
const SCROLL_POSITION_KEY = 'services_scroll_position';
const SELECTED_CARD_KEY = 'services_selected_card';
const FROM_SERVICE_KEY = 'from_service_page';

export const Services = () => {
  const [currentPage, setCurrentPage] = useState<TServices | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const goTo = (path: string, cardIndex?: number) => {
    // Сохраняем индекс карточки, с которой переходим на детальную страницу
    if (cardIndex !== undefined) {
      sessionStorage.setItem(SELECTED_CARD_KEY, String(cardIndex));
      // Отмечаем, что переходим с страницы сервисных услуг на детальную страницу
      sessionStorage.setItem(FROM_SERVICE_KEY, 'true');
    }
    // Сохраняем текущую позицию скролла перед уходом
    if (trackRef.current) {
      sessionStorage.setItem(SCROLL_POSITION_KEY, String(trackRef.current.scrollLeft));
    }
    window.history.pushState({}, '', path);
    setCurrentPage(pathnameToService(path));
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
      // Используем классы вместо style.visibility
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
    };

    const handleScroll = () => {
      const step = cardStep();
      if (step > 0) {
        current = Math.round(track.scrollLeft / step);
        current = Math.max(0, Math.min(cards.length - 1, current));
        updateArrows();
      }
    };

    // Функция для определения целевой карточки при возврате
    const getTargetCardIndex = (): number => {
      // Проверяем, возвращаемся ли мы с детальной страницы услуги
      const fromService = sessionStorage.getItem(FROM_SERVICE_KEY);
      
      if (fromService === 'true') {
        // Возвращаемся с детальной страницы - показываем карточку, с которой перешли
        const savedCardIndex = sessionStorage.getItem(SELECTED_CARD_KEY);
        
        // Очищаем флаги после использования
        sessionStorage.removeItem(FROM_SERVICE_KEY);
        sessionStorage.removeItem(SELECTED_CARD_KEY);
        sessionStorage.removeItem(SCROLL_POSITION_KEY);
        
        if (savedCardIndex !== null) {
          const index = parseInt(savedCardIndex, 10);
          if (!isNaN(index) && index >= 0 && index < cards.length) {
            return index;
          }
        }
        // Если индекс не валидный - показываем первую карточку
        return 0;
      }

      // Если пришли с другой страницы (не с детальной страницы услуги)
      // или зашли впервые - показываем первую карточку
      // Очищаем все сохраненные данные
      sessionStorage.removeItem(SELECTED_CARD_KEY);
      sessionStorage.removeItem(SCROLL_POSITION_KEY);
      
      return 0;
    };

    // Восстанавливаем позицию
    const targetIndex = getTargetCardIndex();
    goToCard(targetIndex, false);

    setIsInitialized(true);

    nextBtn.addEventListener('click', () => {
      goToCard(current + 1);
      // Сохраняем позицию после клика (только если не переходим на другую страницу)
      setTimeout(() => {
        if (trackRef.current) {
          sessionStorage.setItem(SCROLL_POSITION_KEY, String(trackRef.current.scrollLeft));
        }
      }, 100);
    });
    
    prevBtn.addEventListener('click', () => {
      goToCard(current - 1);
      // Сохраняем позицию после клика (только если не переходим на другую страницу)
      setTimeout(() => {
        if (trackRef.current) {
          sessionStorage.setItem(SCROLL_POSITION_KEY, String(trackRef.current.scrollLeft));
        }
      }, 100);
    });
    
    track.addEventListener('scroll', () => {
      handleScroll();
      // Сохраняем позицию при скролле (только если не переходим на другую страницу)
      if (trackRef.current) {
        sessionStorage.setItem(SCROLL_POSITION_KEY, String(trackRef.current.scrollLeft));
      }
    }, { passive: true });

    return () => {
      nextBtn.removeEventListener('click', () => {});
      prevBtn.removeEventListener('click', () => {});
      track.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const sync = () => setCurrentPage(pathnameToService(window.location.pathname));
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  if (currentPage === 'repair') {
    return <Repair />;
  }

  if (currentPage === 'metering') {
    return <Metering />;
  }

  if (currentPage === 'service') {
    return <Service />;
  }

  if (currentPage === 'dewaxing') {
    return <Dewaxing />;
  }

  return (
    <Layout
      title="Сервисные услуги"
      description="ООО Инженерно-Производственное предприятие «Новые Технологии» имеет многолетний опыт оказания услуг по ремонту нефтепромыслового оборудования, а также по депарафинизации и замеру дебита скважин"
    >
      <>
        <div className={styles.servicesWrapper}>
          <div className={styles.cardsTrack} ref={trackRef}>
            <div className="card">
              <Card
                imgSrc={serves_12.src}
                title="Обслуживание, капитальный ремонт и модернизация АГЗУ"
                onClick={() => goTo('/services/repair', 0)}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={serves_3.src}
                title="Замер дебита нефтяных скважин с помощью мобильной замерной установки"
                onClick={() => goTo('/services/metering', 1)}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={serves_4.src}
                title="Обслуживание устройства очистки колонны УОК-НКТ"
                onClick={() => goTo('/services/service', 2)}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={serves_5.src}
                title="Услуги депарафинизации нефтяных скважин"
                onClick={() => goTo('/services/dewaxing', 3)}
              />
            </div>
          </div>
          
          <div className={styles.mobileNav}>
            <button 
              className={`${styles.prevBtn}`} 
              ref={prevBtnRef}
            >
              ←
            </button>
            <button 
              className={`${styles.nextBtn}`} 
              ref={nextBtnRef}
            >
              →
            </button>
          </div>
        </div>
      </>
      <BackToTop />
    </Layout>
  );
};