import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Styles from './gallery-modal.module.scss';
import type { TPhoto } from '../../content/news/newsData';

type TProps = {
  openPhotoId: number;
  photos: TPhoto[];
  onClose: (lastViewedPhotoId: number) => void;
};

export const GalleryModal = ({ openPhotoId, photos, onClose }: TProps) => {
  const [showPhotoId, setShowPhotoId] = useState(openPhotoId);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const currentIndex = Math.max(0, photos.findIndex((photo) => photo.id === showPhotoId));
  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => setIsImageLoaded(false), [showPhotoId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose(showPhotoId);
      } else if (event.key === 'ArrowRight' && photos.length > 1) {
        event.preventDefault();
        setShowPhotoId(photos[(currentIndex + 1) % photos.length].id);
      } else if (event.key === 'ArrowLeft' && photos.length > 1) {
        event.preventDefault();
        setShowPhotoId(photos[(currentIndex - 1 + photos.length) % photos.length].id);
      } else if (event.key === 'Tab') {
        const controls = [closeRef.current, previousRef.current, nextRef.current]
          .filter((element): element is HTMLButtonElement => Boolean(element));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, photos, showPhotoId]);

  if (!currentPhoto) return null;

  const move = (direction: -1 | 1) => {
    setShowPhotoId(photos[(currentIndex + direction + photos.length) % photos.length].id);
  };

  return createPortal(
    <div
      className={Styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографий новости"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose(showPhotoId);
      }}
    >
      <div className={Styles.modalContent}>
        <button
          ref={closeRef}
          type="button"
          className={Styles.close}
          onClick={() => onClose(showPhotoId)}
          aria-label="Закрыть фото"
        >
          ×
        </button>

        <div className={Styles.imageWrapper}>
          {!isImageLoaded && (
            <div className={Styles.modalPlaceholder} role="status" aria-label="Загрузка фотографии">
              <div className={Styles.modalSpinner} />
            </div>
          )}
          <img
            key={currentPhoto.id}
            className={`${Styles.fullImage} ${isImageLoaded ? Styles.loaded : Styles.loading}`}
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            loading="eager"
            decoding="async"
            onLoad={() => setIsImageLoaded(true)}
            onClick={(event) => {
              event.stopPropagation();
              onClose(showPhotoId);
            }}
          />
        </div>

        {photos.length > 1 && (
          <>
            <span className={Styles.counter} aria-live="polite">{currentIndex + 1} / {photos.length}</span>
            <button
              ref={previousRef}
              type="button"
              className={`${Styles.navButton} ${Styles.previous}`}
              onClick={() => move(-1)}
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
            <button
              ref={nextRef}
              type="button"
              className={`${Styles.navButton} ${Styles.next}`}
              onClick={() => move(1)}
              aria-label="Следующее фото"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};
