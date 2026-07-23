import { useEffect } from 'react';
import Styles from './title.module.scss';

type TitleProps = {
  text: string;
  preloadImage?: string;
};

export const Title = ({ text, preloadImage }: TitleProps) => {
  // Добавляем preload для изображения
  useEffect(() => {
    if (preloadImage && typeof preloadImage === 'string') {
      const existingLink = document.querySelector(
        `link[rel="preload"][as="image"][href="${preloadImage}"]`
      );
      
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = preloadImage;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
        
        return () => {
          if (link.parentNode) {
            document.head.removeChild(link);
          }
        };
      }
    }
  }, [preloadImage]);

  return <h2 className={Styles.title}>{text}</h2>;
};