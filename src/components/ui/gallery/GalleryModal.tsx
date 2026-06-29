import Styles from './gallery-modal.module.scss';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

type TPhoto = {
  id: number;
  src: string;
  alt: string;
};

type TProps = {
  openPhotoId: number;
  photos: TPhoto[];
  onClose: (lastViewedPhotoId: number) => void;
};

export const GalleryModal = ({ openPhotoId, photos, onClose }: TProps) => {
  const [showPhotoId, setShowPhotoId] = useState(openPhotoId);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  useEffect(() => {
    const root = document.createElement('div');
    root.id = 'modal-root';
    document.body.appendChild(root);
    setModalRoot(root);
    document.body.style.overflow = 'hidden';

    return () => {
      if (root.parentNode) {
        document.body.removeChild(root);
      }
      document.body.style.overflow = '';
    };
  }, []);

  const currentPhoto = photos.find(photo => photo.id === showPhotoId);
  const currentIndex = photos.findIndex(photo => photo.id === showPhotoId) + 1;
  const totalPhotos = photos.length;

  const nextPhoto = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowPhotoId(prev => (prev % photos.length) + 1);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const previousPhoto = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowPhotoId(prev => (prev - 1 + photos.length) % photos.length || photos.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose(showPhotoId);
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') previousPhoto();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showPhotoId, isTransitioning]);

  const handleClose = () => {
    onClose(showPhotoId);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, action: () => void) => {
    e.stopPropagation();
    action();
  };

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleClose();
  };

  if (!modalRoot) return null;

  return createPortal(
    <div className={Styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={Styles.modalContent}>
        <button
          className={`${Styles.close} ${isTouchDevice ? Styles.touchDevice : ''}`}
          onClick={handleCloseClick}
          aria-label="Закрыть"
        >
          ✕
        </button>

        <img
          src={currentPhoto?.src}
          alt={currentPhoto?.alt || ''}
          className={`${Styles.fullImage} ${isTransitioning ? Styles.transitioning : ''}`}
        />

        {photos.length > 1 && (
          <div className={Styles.counter}>
            {currentIndex} / {totalPhotos}
          </div>
        )}

        {photos.length > 1 && (
          <>
            <button
              className={`${Styles.navButton} ${Styles.previous} ${isTouchDevice ? Styles.touchDevice : ''}`}
              onClick={(e) => handleNavClick(e, previousPhoto)}
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
            <button
              className={`${Styles.navButton} ${Styles.next} ${isTouchDevice ? Styles.touchDevice : ''}`}
              onClick={(e) => handleNavClick(e, nextPhoto)}
              aria-label="Следующее фото"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>,
    modalRoot
  );
};