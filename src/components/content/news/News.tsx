import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import Styles from './news.module.scss';
import { Gallery } from '../../ui/gallery/Gallery';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import {
  NEWS_DATA,
  CATEGORIES,
  getCategoryColor,
  type TNewsItem,
} from './newsData';

const ArrowUpRight = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M5 15 15 5M6 5h9v9" />
  </svg>
);

const MOBILE_INITIAL_COUNT = 2;
const DESKTOP_INITIAL_COUNT = 4;
const MOBILE_PAGE_SIZE = 2;
const DESKTOP_PAGE_SIZE = 3;

function newsWord(count: number) {
  const form = new Intl.PluralRules('ru').select(count);
  return form === 'one' ? 'новость' : form === 'few' ? 'новости' : 'новостей';
}

type NewsCardProps = {
  news: TNewsItem;
  onOpen: (news: TNewsItem, trigger: HTMLElement) => void;
  photoId?: number;
  onPhotoChange: (photoId: number) => void;
  featured?: boolean;
};

function NewsCard({ news, onOpen, photoId, onPhotoChange, featured = false }: NewsCardProps) {
  return (
    <article className={`${Styles.newsItem} ${featured ? Styles.featured : ''}`}>
      {news.photos.length > 0 ? (
        <div className={Styles.cardGallery} data-news-gallery>
          <Gallery photos={news.photos} photoId={photoId} onPhotoChange={onPhotoChange} />
        </div>
      ) : (
        <div className={Styles.cardNoPhoto} aria-hidden="true">
          <span className={Styles.noPhotoMark}>
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M7 8h6v5H7zM16 8h2M16 11h2M7 16h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={Styles.noPhotoCaption}>Новости компании</span>
        </div>
      )}

      <div className={Styles.cardBody}>
        {featured && <span className={Styles.featuredLabel}>Главная новость</span>}
        <div className={Styles.newsMeta}>
          <span
            className={Styles.newsBadge}
            style={{ '--category-color': getCategoryColor(news.category) } as CSSProperties}
          >
            {news.category}
          </span>
          <span className={Styles.newsDate}>{news.date}</span>
        </div>

        <h2 className={Styles.newsTitle}>
          <button type="button" className={Styles.titleButton} onClick={(event) => onOpen(news, event.currentTarget)}>
            {news.title}
          </button>
        </h2>
        <p className={Styles.newsDescription}>{news.description}</p>

        <button
          type="button"
          className={Styles.readMore}
          data-open-news
          onClick={(event) => onOpen(news, event.currentTarget)}
          aria-label={`Читать новость: ${news.title}`}
        >
          Читать новость <span aria-hidden="true"><ArrowUpRight /></span>
        </button>
      </div>
    </article>
  );
}

type NewsDialogProps = {
  news: TNewsItem;
  newsIndex: number;
  newsTotal: number;
  onNavigate: (direction: -1 | 1) => void;
  onClose: () => void;
  returnFocusTo: HTMLElement | null;
  photoId?: number;
  onPhotoChange: (photoId: number) => void;
};

function NewsDialog({ news, newsIndex, newsTotal, onNavigate, onClose, returnFocusTo, photoId, onPhotoChange }: NewsDialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dragStartY = useRef<number | null>(null);
  const dragPointerId = useRef<number | null>(null);
  const dragDistance = useRef(0);
  const dismissTimer = useRef<number | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      if (dismissTimer.current !== null) window.clearTimeout(dismissTimer.current);
      document.body.style.overflow = previousOverflow;
      if (returnFocusTo?.isConnected) returnFocusTo.focus();
    };
  }, [returnFocusTo]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [news.id]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Gallery opens its own photo viewer above this dialog. Let that viewer
    // handle Escape and Tab while a photo is enlarged.
    if (document.querySelector('[class*="modalOverlay"]')) return;

    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== 'Tab' || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.getClientRects().length > 0);

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const resetDrag = () => {
    dragStartY.current = null;
    dragPointerId.current = null;
    dragDistance.current = 0;
    dialogRef.current?.classList.remove(Styles.dragging);
    dialogRef.current?.style.removeProperty('--drag-y');
  };

  const handleDragStart = (event: PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(max-width: 700px)').matches) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if ((event.target as Element).closest('button')) return;
    dragStartY.current = event.clientY;
    dragPointerId.current = event.pointerId;
    dragDistance.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current !== event.pointerId || dragStartY.current === null) return;
    const distance = Math.max(0, event.clientY - dragStartY.current);
    dragDistance.current = distance;
    if (distance > 0 && dialogRef.current) {
      dialogRef.current.classList.add(Styles.dragging);
      dialogRef.current.style.setProperty('--drag-y', `${distance}px`);
    }
  };

  const handleDragEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const shouldClose = dragDistance.current > 110;
    if (shouldClose && dialogRef.current) {
      dragStartY.current = null;
      dragPointerId.current = null;
      dialogRef.current.classList.remove(Styles.dragging);
      dialogRef.current.style.setProperty('--drag-y', '100dvh');
      dismissTimer.current = window.setTimeout(onClose, 220);
    } else {
      resetDrag();
    }
  };

  const handleDragCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resetDrag();
  };

  return createPortal(
    <div
      className={Styles.newsModalOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={Styles.newsModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={handleKeyDown}
      >
        <div
          className={Styles.modalTopbar}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragCancel}
        >
          <div className={Styles.modalPosition}>
            <strong>Новость</strong>
            <span>{newsIndex + 1} из {newsTotal}</span>
          </div>
          <div className={Styles.modalActions}>
            {newsTotal > 1 && (
              <>
                <button
                  type="button"
                  className={Styles.newsNavButton}
                  onClick={() => onNavigate(-1)}
                  disabled={newsIndex === 0}
                  aria-label="Предыдущая новость"
                >←</button>
                <button
                  type="button"
                  className={Styles.newsNavButton}
                  onClick={() => onNavigate(1)}
                  disabled={newsIndex === newsTotal - 1}
                  aria-label="Следующая новость"
                >→</button>
              </>
            )}
            <button
              ref={closeRef}
              type="button"
              className={Styles.closeButton}
              onClick={onClose}
              aria-label="Закрыть новость"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div ref={scrollRef} className={Styles.modalScroll}>
          <div className={Styles.modalIntro}>
            <div className={Styles.newsMeta}>
              <span
                className={Styles.newsBadge}
                style={{ '--category-color': getCategoryColor(news.category) } as CSSProperties}
              >
                {news.category}
              </span>
              <span className={Styles.newsDate}>{news.date}</span>
            </div>
            <h2 id={titleId} className={Styles.modalTitle}>{news.title}</h2>
            <p className={Styles.modalSubtitle}>{news.description}</p>
          </div>

          {news.photos.length > 0 && (
            <div className={Styles.modalGallery}>
              <Gallery photos={news.photos} photoId={photoId} onPhotoChange={onPhotoChange} />
              <p className={Styles.galleryHint}>Нажмите на фото, чтобы увеличить. Если снимков несколько, их можно листать.</p>
            </div>
          )}

          <div className={Styles.modalContent}>
            {news.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export const News = () => {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [isMobile, setIsMobile] = useState(true);
  const [visibleCount, setVisibleCount] = useState(MOBILE_INITIAL_COUNT);
  const [selectedNews, setSelectedNews] = useState<TNewsItem | null>(null);
  const [returnFocusTo, setReturnFocusTo] = useState<HTMLElement | null>(null);
  const [photoIds, setPhotoIds] = useState<Record<number, number>>({});
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 700px)');
    const updateLayout = () => {
      const mobile = mediaQuery.matches;
      setIsMobile(mobile);
      setVisibleCount(mobile ? MOBILE_INITIAL_COUNT : DESKTOP_INITIAL_COUNT);
    };
    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);
    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  const initialCount = isMobile ? MOBILE_INITIAL_COUNT : DESKTOP_INITIAL_COUNT;
  const pageSize = isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;

  const filteredNews = activeFilter === 'Все'
    ? NEWS_DATA
    : NEWS_DATA.filter((news) => news.category === activeFilter);
  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMoreNews = visibleCount < filteredNews.length;
  const canCollapse = visibleCount > initialCount;
  const selectedNewsIndex = selectedNews
    ? filteredNews.findIndex((news) => news.id === selectedNews.id)
    : -1;

  const openNews = useCallback((news: TNewsItem, trigger: HTMLElement) => {
    setReturnFocusTo(trigger);
    setSelectedNews(news);
  }, []);
  const closeNews = useCallback(() => setSelectedNews(null), []);

  const updatePhotoId = useCallback((newsId: number, photoId: number) => {
    setPhotoIds((current) => ({ ...current, [newsId]: photoId }));
  }, []);

  const navigateNews = (direction: -1 | 1) => {
    const nextNews = filteredNews[selectedNewsIndex + direction];
    if (nextNews) setSelectedNews(nextNews);
  };

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setVisibleCount(initialCount);
    setSelectedNews(null);
  };

  const handleCollapse = () => {
    setVisibleCount(initialCount);
    requestAnimationFrame(() => titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <>
      <section className={Styles.newsPage} aria-label="Новости компании">
        <div ref={titleRef} className={Styles.pageHeader}>
          <span className={Styles.eyebrow}>Жизнь компании <span aria-hidden="true">/</span> Новости</span>
          <h1>Новости и события</h1>
          <p>Выставки, проекты, партнёрства и важные события предприятия.</p>
        </div>

        <div className={Styles.toolbar}>
          <div className={Styles.filtersWrap}>
            <div
              className={Styles.filters}
              role="group"
              aria-label="Фильтр новостей"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`${Styles.filterBtn} ${activeFilter === category ? Styles.active : ''}`}
                  aria-pressed={activeFilter === category}
                  onClick={() => handleFilterChange(category)}
                >
                  {category === 'Все' ? 'Все новости' : category}
                </button>
              ))}
            </div>
          </div>
          <p className={Styles.newsCount} aria-live="polite">
            {isMobile ? `${visibleNews.length} из ${filteredNews.length} ${newsWord(filteredNews.length)}` : `Показано ${visibleNews.length} из ${filteredNews.length} ${newsWord(filteredNews.length)}`}
          </p>
        </div>

        {visibleNews.length > 0 ? (
          <div className={Styles.newsContent}>
            {visibleNews.map((news, index) => (
              <NewsCard
                key={news.id}
                news={news}
                featured={index === 0 && activeFilter === 'Все'}
                onOpen={openNews}
                photoId={photoIds[news.id]}
                onPhotoChange={(photoId) => updatePhotoId(news.id, photoId)}
              />
            ))}
          </div>
        ) : (
          <p className={Styles.emptyState}>В этой категории пока нет новостей.</p>
        )}

        {(hasMoreNews || canCollapse) && (
          <div className={Styles.controlsContainer}>
            {hasMoreNews && (
              <button
                type="button"
                className={Styles.showMoreBtn}
                onClick={() => setVisibleCount((count) => Math.min(count + pageSize, filteredNews.length))}
              >
                Показать ещё <span aria-hidden="true">↓</span>
              </button>
            )}
            {canCollapse && (
              <button type="button" className={Styles.hideBtn} onClick={handleCollapse}>
                Свернуть список ↑
              </button>
            )}
          </div>
        )}
      </section>

      <BackToTop />
      {selectedNews && (
        <NewsDialog
          news={selectedNews}
          newsIndex={selectedNewsIndex}
          newsTotal={filteredNews.length}
          onNavigate={navigateNews}
          onClose={closeNews}
          returnFocusTo={returnFocusTo}
          photoId={photoIds[selectedNews.id]}
          onPhotoChange={(photoId) => updatePhotoId(selectedNews.id, photoId)}
        />
      )}
    </>
  );
};