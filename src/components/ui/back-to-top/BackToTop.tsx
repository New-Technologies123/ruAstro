import { useEffect, useState } from 'react';
import Styles from './back-to-top.module.scss';
import up from '../../../images/arrow.svg';

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const updateButton = () => {
      const footer = document.querySelector('footer');

      setVisible(window.scrollY > 400);

      if (!footer) {
        setBottomOffset(24);
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const buttonSize = window.innerWidth <= 500
        ? 44
        : window.innerWidth <= 850
          ? 48
          : 52;

      const defaultOffset =
        window.innerWidth <= 500
          ? 16
          : window.innerWidth <= 850
            ? 20
            : 24;

      /*
       * Пока футер ниже экрана — обычное положение.
       *
       * Когда футер начинает появляться,
       * поднимаем кнопку так, чтобы она оставалась
       * над футером.
       */
      const distanceToFooter =
        window.innerHeight - footerRect.top;

      if (distanceToFooter > 0) {
        setBottomOffset(
          Math.max(
            defaultOffset,
            distanceToFooter + defaultOffset
          )
        );
      } else {
        setBottomOffset(defaultOffset);
      }
    };

    updateButton();

    window.addEventListener('scroll', updateButton, {
      passive: true,
    });

    window.addEventListener('resize', updateButton);

    return () => {
      window.removeEventListener('scroll', updateButton);
      window.removeEventListener('resize', updateButton);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`${Styles.backToTop} ${
        visible ? Styles.visible : ''
      }`}
      style={{
        bottom: `${bottomOffset}px`,
      }}
      aria-label="Наверх"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span className={Styles.iconWrap}>
        <img
          src={up.src}
          alt=""
          className={Styles.icon}
          aria-hidden="true"
        />
      </span>
    </button>
  );
};