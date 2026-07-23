// News.tsx
import Styles from './news.module.scss';
import { Gallery } from '../../ui/gallery/Gallery';
import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { Title } from '../../ui/title/Title';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import {
  NEWS_DATA,
  CATEGORIES,
  getCategoryColor,
  getCategoryIcon,
  type TNewsItem
} from './newsData';

// Ленивая загрузка BigPhoto - правильная обработка для именованного экспорта
const BigPhoto = lazy(() => 
  import('../../ui/big-photo/BigPhoto').then(module => ({
    default: module.BigPhoto // Явно указываем, что берем именованный экспорт
  }))
);

// Мемоизированный компонент карточки новости
const NewsItem = ({ news, index }: { news: TNewsItem; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className={Styles.newsItem} 
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className={Styles.newsHeader}>
        <div className={Styles.newsBadge} style={{ background: getCategoryColor(news.category) }}>
          {getCategoryIcon(news.category)} {news.category}
        </div>
        <div className={Styles.newsDate}>{news.date}</div>
      </div>

      <h3 className={Styles.newsTitle}>{news.title}</h3>

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
};

export const News = () => {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [bigPhoto, setBigPhoto] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Мемоизация отфильтрованных новостей
  const filteredNews = useMemo(() => {
    if (activeFilter === 'Все') {
      return NEWS_DATA;
    }
    return NEWS_DATA.filter(news => news.category === activeFilter);
  }, [activeFilter]);

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

  const handleBigPhotoOpen = useCallback((src: string) => {
    setBigPhoto(src);
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
      <Title text="Новости" />

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
        {newsCount} {countText}
      </div>

      {/* ===== СПИСОК НОВОСТЕЙ ===== */}
      <div className={`${Styles.newsContent} ${isLoaded ? Styles.loaded : ''}`}>
        {filteredNews.map((news, index) => (
          <NewsItem key={news.id} news={news} index={index} />
        ))}
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