import Styles from './gallery-modal.module.scss';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const GalleryModal = ({ openPhotoId, photos, onClose }) => {
  const [showPhotoId, setShowPhotoId] = useState(openPhotoId);
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    const root = document.createElement('div');
    root.id = 'modal-root';
    document.body.appendChild(root);
    setModalRoot(root);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.removeChild(root);
      document.body.style.overflow = '';
    };
  }, []);

  const currentPhoto = photos.find(photo => photo.id === showPhotoId);

  const nextPhoto = () => {
    setShowPhotoId(prev => (prev % photos.length) + 1);
  };

  const previousPhoto = () => {
    setShowPhotoId(prev => (prev - 1 + photos.length) % photos.length || photos.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose(showPhotoId);
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') previousPhoto();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showPhotoId]);

  const handleClose = () => {
    onClose(showPhotoId);
  };

  if (!modalRoot) return null;

  return createPortal(
    <div className={Styles.modalOverlay} onClick={handleClose}>
      <div className={Styles.modalContent}>
        <button 
          className={Styles.close} 
          onClick={handleClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        
        <img 
          src={currentPhoto.src} 
          alt={currentPhoto.alt || ''} 
          className={Styles.fullImage}
        />
        
        {photos.length > 1 && (
          <>
            <button 
              className={`${Styles.navButton} ${Styles.previous}`}
              onClick={(e) => {
                e.stopPropagation(); // Только для кнопок навигации
                previousPhoto();
              }}
              aria-label="Previous image"
            >
              &#10094;
            </button>
            <button 
              className={`${Styles.navButton} ${Styles.next}`}
              onClick={(e) => {
                e.stopPropagation(); // Только для кнопок навигации
                nextPhoto();
              }}
              aria-label="Next image"
            >
              &#10095;
            </button>
          </>
        )}
      </div>
    </div>,
    modalRoot
  );
};