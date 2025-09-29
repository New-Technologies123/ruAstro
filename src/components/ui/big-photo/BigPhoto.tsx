import { useEffect } from 'react';
import Styles from './big-photo.module.scss';

export const BigPhoto = ({ src, onClose }) => {
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div className={Styles.modal} onClick={onClose}>
      <button 
        className={Styles.close} 
        onClick={(e) => {
          e.stopPropagation(); // Останавливаем всплытие
          onClose();
        }}
      >
        &times;
      </button>
      <img 
        src={src} 
        alt="" 
        className={Styles.modalContent}
      />
    </div>
  );
};