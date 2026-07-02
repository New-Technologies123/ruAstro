import { useEffect, useState, useRef } from 'react';
import { Layout } from '../../layout/Layout';
import { Card } from '../../ui/card/Card';
import { Order } from '../../ui/order/Order';

import { Shop_1 } from './Shop_1';
import { Shop_2 } from './Shop_2';
import { Shop_3 } from './Shop_3';
import { Shop_4 } from './Shop_4';
import { Shop_5 } from './Shop_5';

import { CartButton } from '../../ui/cart-button/CartButton';
import { BackToTop } from '../../ui/back-to-top/BackToTop'

import product_2 from '../../../images/products/product_2_1.webp';
import product_3 from '../../../images/products/product_2_2.webp';
import product_4 from '../../../images/products/product_2_3.webp';
import product_5 from '../../../images/products/product_2_4.webp';

import styles from '../products/scroll.module.scss';

type TProducts = 'shop_1' | 'shop_2' | 'shop_3' | 'shop_4' | 'shop_5';
type Page = 'shop' | TProducts | 'order';

// Ключи для хранения данных в sessionStorage
const SCROLL_POSITION_KEY = 'shop_scroll_position';
const SELECTED_CARD_KEY = 'shop_selected_card';
const FROM_SHOP_KEY = 'from_shop_page';

export const Shop = () => {
  const cardTitle: Record<TProducts, string> = {
    shop_1: 'Вихревой расходомер ЭРВИП',
    shop_2: 'Устройство регулирования перепада давления (УРПД)',
    shop_3: 'Переключатель скважин многоходовой (ПСМ)',
    shop_4: 'Магниторегулируемый клапан (КМР)',
    shop_5: 'Гидропривод (ГП)',
  };

  const [currentPage, setCurrentPage] = useState<Page>('shop');
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

  // 🔁 синхронизация состояния со строкой браузера
  const syncFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    const type = params.get('type') as TProducts | null;

    if (view === 'order') {
      setCurrentPage('order');
      return;
    }

    setCurrentPage(type ?? 'shop');
  };

  useEffect(() => {
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  // Логика скролла для мобильных кнопок
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

    // Функция для определения целевой карточки при возврате
    const getTargetCardIndex = (): number => {
      // Проверяем, возвращаемся ли мы с детальной страницы товара
      const fromShop = sessionStorage.getItem(FROM_SHOP_KEY);
      
      if (fromShop === 'true') {
        // Возвращаемся с детальной страницы - показываем карточку, с которой перешли
        const savedCardIndex = sessionStorage.getItem(SELECTED_CARD_KEY);
        
        // Очищаем флаги после использования
        sessionStorage.removeItem(FROM_SHOP_KEY);
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

      // Если пришли с другой страницы (не с детальной страницы товара)
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

    // Сохраняем обработчики в переменные для правильного удаления
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

    const handleTrackScroll = () => {
      handleScroll();
      if (trackRef.current) {
        sessionStorage.setItem(SCROLL_POSITION_KEY, String(trackRef.current.scrollLeft));
      }
    };

    nextBtn.addEventListener('click', handleNextClick);
    prevBtn.addEventListener('click', handlePrevClick);
    track.addEventListener('scroll', handleTrackScroll, { passive: true });

    return () => {
      nextBtn.removeEventListener('click', handleNextClick);
      prevBtn.removeEventListener('click', handlePrevClick);
      track.removeEventListener('scroll', handleTrackScroll);
    };
  }, [currentPage]); // Добавляем currentPage в зависимости

  // 🔹 навигация по каталогу
  const openCategory = (type: TProducts, cardIndex?: number) => {
    // Сохраняем индекс карточки, с которой переходим на детальную страницу
    if (cardIndex !== undefined) {
      sessionStorage.setItem(SELECTED_CARD_KEY, String(cardIndex));
      // Отмечаем, что переходим с страницы магазина на детальную страницу
      sessionStorage.setItem(FROM_SHOP_KEY, 'true');
    }
    // Сохраняем текущую позицию скролла перед уходом
    if (trackRef.current) {
      sessionStorage.setItem(SCROLL_POSITION_KEY, String(trackRef.current.scrollLeft));
    }

    const url = new URL(window.location.href);
    url.searchParams.set('type', type);
    url.searchParams.delete('view');
    window.history.pushState({}, '', url.toString());
    setCurrentPage(type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToShop = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('type');
    url.searchParams.delete('view');
    window.history.pushState({}, '', url.toString());
    setCurrentPage('shop');
    // Не очищаем sessionStorage здесь, это сделает useEffect при восстановлении
  };

  // 🛒 глобальная корзина
  const openBasket = () => {
    window.dispatchEvent(new CustomEvent('toggleGlobalCart'));
  };

  // 📝 переход к заказу
  const openOrder = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'order');
    url.searchParams.delete('type');
    window.history.pushState({}, '', url.toString());
    setCurrentPage('order');
  };

  const closeOrder = () => {
    window.history.back();
  };

  const isOrder = currentPage === 'order';

  // Массив товаров для отображения
  const products = [
    { img: product_2.src, title: cardTitle.shop_2, type: 'shop_2' as TProducts },
    { img: product_3.src, title: cardTitle.shop_3, type: 'shop_3' as TProducts },
    { img: product_4.src, title: cardTitle.shop_4, type: 'shop_4' as TProducts },
    { img: product_5.src, title: cardTitle.shop_5, type: 'shop_5' as TProducts },
  ];

  return (
    <>
      {/* 🛒 Кнопка корзины скрыта на странице заказа */}
      {!isOrder && <CartButton goToBasket={openBasket} />}

      {/* ORDER */}
      {isOrder && <Order onBack={closeOrder} />}

      {/* SHOP */}
      {currentPage === 'shop' && (
        <Layout
          title="Онлайн магазин"
          description="Качество продукции ООО ИПП «Новые Технологии» соответствует всем стандартам в области безопасности и качества."
        >
          <>
            <div className={styles.shopWrapper}>
              <div className={styles.cardsTrack} ref={trackRef}>
                {products.map((product, index) => (
                  <div className="card" key={index}>
                    <Card
                      imgSrc={product.img}
                      title={product.title}
                      onClick={() => openCategory(product.type, index)}
                    />
                  </div>
                ))}
              </div>
              
              <div className={styles.mobileNav}>
                <button 
                  className={`${styles.prevBtn}`} 
                  ref={prevBtnRef}
                  aria-label="Предыдущий товар"
                >
                  ←
                </button>
                <button 
                  className={`${styles.nextBtn}`} 
                  ref={nextBtnRef}
                  aria-label="Следующий товар"
                >
                  →
                </button>
              </div>

              {/* Индикаторы пагинации (только на мобильных) */}
              {isMobile && (
                <div className={styles.paginationDots} role="tablist" aria-label="Навигация по товарам">
                  {products.map((_, index) => {
                    const cards = trackRef.current?.querySelectorAll('.card');
                    const total = cards?.length || products.length;
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
                        aria-label={`Перейти к товару ${index + 1}`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </>
          <BackToTop />
        </Layout>
      )}

      {/* PRODUCTS */}
      {currentPage === 'shop_1' && <Shop_1 title={cardTitle.shop_1} onBackProducts={backToShop} />}
      {currentPage === 'shop_2' && <Shop_2 title={cardTitle.shop_2} onBackProducts={backToShop} />}
      {currentPage === 'shop_3' && <Shop_3 title={cardTitle.shop_3} onBackProducts={backToShop} />}
      {currentPage === 'shop_4' && <Shop_4 title={cardTitle.shop_4} onBackProducts={backToShop} />}
      {currentPage === 'shop_5' && <Shop_5 title={cardTitle.shop_5} onBackProducts={backToShop} />}
    </>
  );
};