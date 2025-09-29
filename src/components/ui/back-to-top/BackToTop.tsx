import { useState, useEffect } from 'react';
import Styles from './back-to-top.module.scss';
import up from '../../../images/arrow.svg';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) setIsVisible(true);
      else setIsVisible(false);
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      onClick={scrollToTop} 
      className={`${Styles.backToTop} ${isVisible ? Styles.visible : ''}`}
      aria-label="Наверх"
    >
      <img src={up.src} alt="" className={Styles.upIcon} />
    </button>
  );
};