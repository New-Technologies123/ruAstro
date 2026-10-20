import { useRef, useState } from 'react';
import Styles from './gallery.module.scss';
import { GalleryModal } from './GalleryModal';
import type { TPhoto } from '../../content/news/newsData';

type TProps = {
  photos: TPhoto[];
  photoId?: number;
  onPhotoChange: (photoId: number) => void;
};

export const Gallery = ({ photos, photoId, onPhotoChange }: TProps) => {
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
    <div className={Styles.slider} onClick={(event) => event.stopPropagation()}>
      <button
        ref={imageButtonRef}
        type="button"
        className={Styles.item}
        onClick={() => setIsOpenModal(true)}
        aria-label={`Увеличить фото: ${currentPhoto.alt || 'Новость'}`}
      >
        <img className={Styles.thumbnail} src={currentPhoto.src} alt={currentPhoto.alt || ''} />
        <span className={Styles.imageOverlay} aria-hidden="true">
          <span className={Styles.zoomText}>Увеличить фото ↗</span>
        </span>
        {photos.length > 1 && (
          <span className={Styles.photoCounter}>{currentIndex + 1} / {photos.length}</span>
        )}
      </button>

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