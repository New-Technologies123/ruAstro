// News.tsx
import Styles from './news.module.scss';
import { Gallery } from '../../ui/gallery/Gallery';
import { useState, useEffect } from 'react';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { Title } from '../../ui/title/Title';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import {
  NEWS_DATA,
  CATEGORIES,
  getCategoryColor,
  getCategoryIcon,
  type TNewsItem
} from './newsData';

export const News = () => {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [filteredNews, setFilteredNews] = useState<TNewsItem[]>(NEWS_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bigPhoto, setBigPhoto] = useState<string | null>(null);

  // Фильтрация новостей
  useEffect(() => {
    if (activeFilter === 'Все') {
      setFilteredNews(NEWS_DATA);
    } else {
      setFilteredNews(NEWS_DATA.filter(news => news.category === activeFilter));
    }
  }, [activeFilter]);

  // Анимация загрузки
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Title text="Новости" />

      {/* ===== ФИЛЬТРЫ ===== */}
      <div className={Styles.filters}>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`${Styles.filterBtn} ${activeFilter === category ? Styles.active : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category === 'Все' ? '📰 Все' : `${getCategoryIcon(category)} ${category}`}
          </button>
        ))}
      </div>

      {/* ===== КОЛ-ВО НОВОСТЕЙ ===== */}
      <div className={Styles.newsCount}>
        {filteredNews.length} {filteredNews.length === 1 ? 'новость' : filteredNews.length < 5 ? 'новости' : 'новостей'}
      </div>

      {/* ===== СПИСОК НОВОСТЕЙ ===== */}
      <div className={`${Styles.newsContent} ${isLoaded ? Styles.loaded : ''}`}>
        {filteredNews.map((news, index) => (
          <div key={news.id} className={Styles.newsItem} style={{ transitionDelay: `${index * 100}ms` }}>
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

            <details className={Styles.newsDetails}>
              <summary className={Styles.newsSummary}>Читать подробнее</summary>
              <div className={Styles.newsFullContent}>
                {news.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </details>
          </div>
        ))}
      </div>

      <BackToTop />

      {bigPhoto && (
        <BigPhoto src={bigPhoto} onClose={() => setBigPhoto(null)} />
      )}
    </>
  );
};