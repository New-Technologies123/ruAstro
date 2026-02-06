import { useEffect, useRef, useState } from "react";
import Styles from "./back-to-top.module.scss";
import up from "../../../images/arrow.svg";

export const BackToTop = () => {
  const btnRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || !btnRef.current) return;

    const updatePosition = () => {
      const footerRect = footer.getBoundingClientRect();
      const vh = window.innerHeight;

      const baseOffset = parseFloat(
        getComputedStyle(btnRef.current).getPropertyValue("--offset")
      );

      let bottom = baseOffset;

      if (footerRect.top < vh) {
        bottom = vh - footerRect.top + baseOffset;
      }

      btnRef.current.style.bottom = `${bottom}px`;
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    const checkVisibility = () => {
      setVisible(window.scrollY > 160);
      requestAnimationFrame(checkVisibility);
    };

    rafRef.current = requestAnimationFrame(updatePosition);
    requestAnimationFrame(checkVisibility);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      className={`${Styles.backToTop} ${visible ? Styles.visible : ""}`}
      aria-label="Наверх"
    >
      <img src={up.src} alt="" className={Styles.icon} />
    </button>
  );
};
