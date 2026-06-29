import { useEffect, useRef, useState } from "react";
import Styles from "./back-to-top.module.scss";
import up from "../../../images/arrow.svg";

export const BackToTop = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || !btnRef.current) return;

    const updatePosition = () => {
      if (!btnRef.current) return;
      const footerRect = footer.getBoundingClientRect();
      const vh = window.innerHeight;

      const baseOffset = parseFloat(
        getComputedStyle(btnRef.current).getPropertyValue("offset") || "25"
      );

      let bottom = baseOffset;

      if (footerRect.top < vh) {
        bottom = vh - footerRect.top + baseOffset;
      }

      btnRef.current.style.bottom = `${bottom}px`;
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    const checkVisibility = () => {
      setVisible(window.scrollY > 300);
      rafRef.current = requestAnimationFrame(checkVisibility);
    };

    rafRef.current = requestAnimationFrame(updatePosition);
    requestAnimationFrame(checkVisibility);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
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