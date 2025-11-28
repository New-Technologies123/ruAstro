import { useEffect, useRef, useState } from "react";
import Styles from "./back-to-top.module.scss";
import up from "../../../images/arrow.svg";

export const BackToTop = () => {
  const btnRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const currentBottom = useRef(32); // текущее значение
  const animationFrame = useRef(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const update = () => {
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // targetBottom = всегда >= 32
      let targetBottom = 32;
      if (footerRect.top < viewportHeight) {
        targetBottom = viewportHeight - footerRect.top + 32;
      }

      // плавная интерполяция
      currentBottom.current += (targetBottom - currentBottom.current) * 0.95;

      if (btnRef.current) {
        btnRef.current.style.bottom = currentBottom.current.toFixed(1) + "px";
      }

      animationFrame.current = requestAnimationFrame(update);
    };

    animationFrame.current = requestAnimationFrame(update);

    // видимость кнопки
    const checkVisible = () => {
      setIsVisible(window.pageYOffset > 100);
      requestAnimationFrame(checkVisible);
    };
    requestAnimationFrame(checkVisible);

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      className={`${Styles.backToTop} ${isVisible ? Styles.visible : ""}`}
      aria-label="Наверх"
    >
      <img src={up.src} alt="" className={Styles.upIcon} />
    </button>
  );
};