import { ArrowUpRightIcon } from "../icon/ArrowUpRightIcon";
import { useRef, useState } from 'react';
import Styles from './gallery.module.scss';
import { GalleryModal } from './GalleryModal';
import type { TPhoto } from '../../content/news/newsData';

type TProps = {
  photos: TPhoto[];
  photoId?: number;
  onPhotoChange: (photoId: number) => void;
  variant?: 'detail' | 'card';
  onImageClick?: (trigger: HTMLButtonElement) => void;
  imageLabel?: string;
  loading?: 'eager' | 'lazy';
};

export const Gallery = ({ photos, photoId, onPhotoChange, variant = 'detail', onImageClick, imageLabel, loading }: TProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const imageButtonRef = useRef<HTMLButtonElement>(null);

  if (photos.length === 0) return null;

  const currentIndex = Math.max(0, photos.findIndex((photo) => photo.id === photoId));
  const currentPhoto = photos[currentIndex];

  const move = (direction: -1 | 1) => {
    const nextIndex = (currentIndex + direction + photos.length) % photos.length;
    onPhotoChange(photos[nextIndex].id);
  };

  return (
    <div className={`${Styles.slider} ${variant === 'card' ? Styles.cardSlider : ''}`} onClick={(event) => event.stopPropagation()}>
      <button
        ref={imageButtonRef}
        type="button"
        className={Styles.item}
        onClick={(event) => {
          if (onImageClick) onImageClick(event.currentTarget);
          else setIsOpenModal(true);
        }}
        aria-label={onImageClick ? `Читать новость: ${imageLabel || currentPhoto.alt}` : `Увеличить фото: ${currentPhoto.alt || 'Новость'}`}
      >
        <img className={Styles.thumbnail} src={currentPhoto.src} alt={currentPhoto.alt || ''} loading={loading} decoding="async" />
        <span className={Styles.imageOverlay} aria-hidden="true">
          <span className={Styles.zoomText}>{onImageClick ? 'Читать новость' : 'Увеличить фото'} <ArrowUpRightIcon /></span>
        </span>
        {photos.length > 1 && variant !== 'card' && (
          <span className={Styles.photoCounter}>{currentIndex + 1} / {photos.length}</span>
        )}
      </button>

      {variant === 'card' && photos.length > 1 && (
        <span className={Styles.visuallyHidden} aria-live="polite">Фото {currentIndex + 1} из {photos.length}</span>
      )}

      {photos.length > 1 && (
        <>
          <button
            type="button"
            className={Styles.previous}
            onClick={() => move(-1)}
            aria-label="Предыдущее фото"
          >‹</button>
          <button
            type="button"
            className={Styles.next}
            onClick={() => move(1)}
            aria-label="Следующее фото"
          >›</button>
        </>
      )}

      {isOpenModal && (
        <GalleryModal
          openPhotoId={currentPhoto.id}
          photos={photos}
          onClose={(lastViewedPhotoId) => {
            onPhotoChange(lastViewedPhotoId);
            setIsOpenModal(false);
            requestAnimationFrame(() => imageButtonRef.current?.focus());
          }}
        />
      )}
    </div>
  );
};
