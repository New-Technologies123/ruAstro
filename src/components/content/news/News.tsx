// News.tsx
import Styles from './news.module.scss';
import { Gallery } from '../../ui/gallery/Gallery';
import { useState, useEffect, useMemo, useCallback, lazy, Suspense, memo, useRef } from 'react';
import { Title } from '../../ui/title/Title';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { useInView } from 'react-intersection-observer';
import {
  NEWS_DATA,
  CATEGORIES,
  getCategoryColor,
  getCategoryIcon,
  type TNewsItem
} from './newsData';

// Ленивая загрузка BigPhoto
const BigPhoto = lazy(() => 
  import('../../ui/big-photo/BigPhoto').then(module => ({
    default: module.BigPhoto
  }))
);

// Компонент-плейсхолдер для новости
const NewsPlaceholder = memo(({ index }: { index: number }) => (
  <div 
    className={`${Styles.newsItem} ${Styles.placeholder}`}
    style={{ transitionDelay: `${Math.min(index * 30, 300)}ms` }}
  >
    <div className={Styles.placeholderContent}>
      <div className={Styles.placeholderBadge}></div>
      <div className={Styles.placeholderTitle}></div>
      <div className={Styles.placeholderImage}></div>
      <div className={Styles.placeholderText}></div>
      <div className={Styles.placeholderText}></div>
    </div>
  </div>
));

NewsPlaceholder.displayName = 'NewsPlaceholder';

// Мемоизированный компонент карточки новости
const NewsItem = memo(({ news, index }: { news: TNewsItem; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Intersection Observer только для анимации появления карточки
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px 0px',
  });

  return (
    <div 
      ref={ref}
      className={`${Styles.newsItem} ${inView ? Styles.visible : Styles.hidden}`}
      style={{ transitionDelay: `${Math.min(index * 30, 300)}ms` }}
    >
      <div className={Styles.newsHeader}>
        <div className={Styles.newsBadge} style={{ background: getCategoryColor(news.category) }}>
          {getCategoryIcon(news.category)} {news.category}
        </div>
        <div className={Styles.newsDate}>{news.date}</div>
      </div>

      <h3 className={Styles.newsTitle}>{news.title}</h3>

      {/* Галерея рендерится всегда, без условия inView */}
      {news.photos.length > 0 && (
        <Gallery photos={news.photos} />
      )}

      <p className={Styles.newsDescription}>{news.description}</p>

      <details 
        className={Styles.newsDetails}
        onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary className={Styles.newsSummary}>
          {isOpen ? 'Скрыть' : 'Читать подробнее'}
        </summary>
        <div className={Styles.newsFullContent}>
          {news.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </details>
    </div>
  );
});

NewsItem.displayName = 'NewsItem';

export const News = () => {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [bigPhoto, setBigPhoto] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  
  // Реф для заголовка новостей
  const newsTitleRef = useRef<HTMLDivElement>(null);

  // Мемоизация отфильтрованных новостей
  const filteredNews = useMemo(() => {
    if (activeFilter === 'Все') {
      return NEWS_DATA;
    }
    return NEWS_DATA.filter(news => news.category === activeFilter);
  }, [activeFilter]);

  // Сброс видимого количества при смене фильтра
  useEffect(() => {
    setVisibleCount(4);
  }, [activeFilter]);

  // Видимые новости
  const visibleNews = useMemo(() => {
    return filteredNews.slice(0, visibleCount);
  }, [filteredNews, visibleCount]);

  // Проверка, есть ли еще новости для показа
  const hasMoreNews = visibleCount < filteredNews.length;
  
  // Проверка, показаны ли все новости (и их больше 4)
  const isAllShown = visibleCount >= filteredNews.length && filteredNews.length > 4;

  // Показать еще новости (добавляем по 2)
  const handleShowMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 2, filteredNews.length));
  }, [filteredNews.length]);

  // Скрыть все новости (сбросить до 4) с плавным скроллом
  const handleHideAll = useCallback(() => {
    setVisibleCount(4);
    
    // Плавный скролл к заголовку новостей
    setTimeout(() => {
      if (newsTitleRef.current) {
        const titleElement = newsTitleRef.current;
        const titlePosition = titleElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = titlePosition - 80; // Отступ сверху 80px
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Если реф не сработал, скроллим к началу страницы
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 100); // Небольшая задержка для обновления DOM
  }, []);

  // Оптимизированная анимация загрузки
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Мемоизация обработчиков
  const handleFilterChange = useCallback((category: string) => {
    setActiveFilter(category);
  }, []);

  const handleBigPhotoClose = useCallback(() => {
    setBigPhoto(null);
  }, []);

  // Подсчет количества новостей
  const newsCount = filteredNews.length;
  const countText = useMemo(() => {
    if (newsCount === 1) return 'новость';
    if (newsCount < 5) return 'новости';
    return 'новостей';
  }, [newsCount]);

  return (
    <>
      {/* Заголовок новостей с рефом для скролла */}
      <div ref={newsTitleRef}>
        <Title text="Новости" />
      </div>

      {/* ===== ФИЛЬТРЫ ===== */}
      <div className={Styles.filters}>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`${Styles.filterBtn} ${activeFilter === category ? Styles.active : ''}`}
            onClick={() => handleFilterChange(category)}
          >
            {category === 'Все' ? '📰 Все' : `${getCategoryIcon(category)} ${category}`}
          </button>
        ))}
      </div>

      {/* ===== КОЛ-ВО НОВОСТЕЙ ===== */}
      <div className={Styles.newsCount}>
        Показано {visibleNews.length} из {newsCount} {countText}
      </div>

      {/* ===== СПИСОК НОВОСТЕЙ ===== */}
      <div className={`${Styles.newsContent} ${isLoaded ? Styles.loaded : ''}`}>
        {visibleNews.map((news, index) => (
          <NewsItem key={news.id} news={news} index={index} />
        ))}
      </div>

      {/* ===== КНОПКИ УПРАВЛЕНИЯ ===== */}
      <div className={Styles.controlsContainer}>
        {hasMoreNews && (
          <button 
            className={Styles.showMoreBtn}
            onClick={handleShowMore}
          >
            Показать еще
          </button>
        )}
        
        {isAllShown && (
          <button 
            className={Styles.hideBtn}
            onClick={handleHideAll}
          >
            Скрыть все
          </button>
        )}
      </div>

      <BackToTop />

      {/* Ленивая загрузка BigPhoto */}
      {bigPhoto && (
        <Suspense fallback={null}>
          <BigPhoto src={bigPhoto} onClose={handleBigPhotoClose} />
        </Suspense>
      )}
    </>
  );
};