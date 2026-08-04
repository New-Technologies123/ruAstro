// Gallery.tsx
import Styles from './gallery.module.scss';
import { useState, useEffect } from 'react';
import { GalleryModal } from './GalleryModal';
import { type TPhoto } from '../../content/news/newsData';

type TProps = {
  photos: TPhoto[];
};

export const Gallery = ({ photos = [] }: TProps) => {
  const [showPhotoId, setShowPhotoId] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  // Определяем touch-устройство и добавляем класс на body
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    
    if (isTouch) {
      document.body.classList.add('no-hover');
    }
    
    return () => {
      document.body.classList.remove('no-hover');
    };
  }, []);

  const showPhoto = photos.find((photo) => photo.id === showPhotoId);

  const nextSlide = () => {
    setShowPhotoId((prev) => {
      let nextValue = prev + 1;
      return nextValue > photos.length ? 1 : nextValue;
    });
  };

  const previousSlide = () => {
    setShowPhotoId((prev) => {
      let prevValue = prev - 1;
      return prevValue === 0 ? photos.length : prevValue;
    });
  };

  const handleCloseModal = (lastViewedPhotoId: number) => {
    setShowPhotoId(lastViewedPhotoId);
    setIsOpenModal(false);
  };

  // Предотвращаем всплытие клика к карточке новости
  const handleGalleryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Открываем модалку с фото
  const handlePhotoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpenModal(true);
  };

  return (
    <div className={Styles.slider} onClick={handleGalleryClick}>
      <div 
        className={Styles.item} 
        onClick={handlePhotoClick}
      >
        <img 
          className={Styles.thumbnail} 
          src={showPhoto?.src} 
          alt={showPhoto?.alt || 'Фото'} 
        />
        
        <div className={Styles.imageOverlay}>
          <span className={Styles.zoomText}>🔍 Увеличить</span>
        </div>

        {photos.length > 1 && (
          <div className={Styles.photoCounter}>
            {showPhotoId} / {photos.length}
          </div>
        )}
      </div>

      {photos.length > 1 && (
        <>
          <button 
            className={`${Styles.previous} ${isTouchDevice ? Styles.touchDevice : ''}`} 
            onClick={(e) => { e.stopPropagation(); previousSlide(); }}
          >
            ‹
          </button>
          <button 
            className={`${Styles.next} ${isTouchDevice ? Styles.touchDevice : ''}`} 
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          >
            ›
          </button>
        </>
      )}
      
      {isOpenModal && (
        <GalleryModal
          openPhotoId={showPhotoId}
          photos={photos}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};