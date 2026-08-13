import { useEffect, useRef, useState } from "react";
import Styles from "../products.module.scss";
import back from '../../../../images/back.svg';
import product from "../../../../images/products/product_5_1.webp";

import { BigPhoto } from "../../../ui/big-photo/BigPhoto";
import { BackToTop } from "../../../ui/back-to-top/BackToTop";

export const Multiphase = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  const onBack = () => {
    window.location.href = "/products/pumping-stations";
  };

  const onDoc = () => {
    window.location.href = "/documents/?category=pumping-stations";
  };

  /* ---------- 3D TILT EFFECT ---------- */
  useEffect(() => {
    const el = heroImageRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -(y - centerY) / 20;
      const rotateY = (x - centerX) / 20;
      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const leave = () => {
      el.style.transform = "rotateX(0) rotateY(0)";
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  /* ---------- SCROLL REVEAL ---------- */
  useEffect(() => {
    const elements = document.querySelectorAll(`.${Styles.reveal}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(Styles.visible);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={Styles.page}>
        <button className={Styles.backButton} onClick={onBack}>
          <img src={back.src} alt=""/>
        </button>

        <section className={`${Styles.hero} ${Styles.reveal}`}>
          <div className={Styles.heroText}>
            <h1>Блочная 
              <span> мультифазная</span> насосная станция</h1>
            <p>
              Для перекачивания газожидкостной смеси из скважин без
              предварительной сепарации газа с содержанием газовой фазы до
              100%.
            </p>
            <div className={Styles.heroButtons}>
              <button
                className={Styles.primaryBtn}
                onClick={() => setBigPhoto(product.src)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15L16 10L5 21" />
                </svg>
                Смотреть фото
              </button>
              <button className={Styles.secondaryBtn} onClick={onDoc}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Документация
              </button>
            </div>
          </div>

          <div className={Styles.heroImageWrap}>
            <div
              className={Styles.imageCard}
              ref={heroImageRef}
              onClick={() => setBigPhoto(product.src)}
            >
              <img src={product.src} alt="Мультифазная насосная станция" className={Styles.mainImage} />
              
              <div className={Styles.imageOverlay}>
                <span className={Styles.zoomText}>
                  Нажмите для увеличения
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ADVANTAGES */}
        <section className={`${Styles.features} ${Styles.reveal}`}>
          <h2>Преимущества оборудования</h2>
          <div className={Styles.featuresGrid}>
            {[
              [
                "Высокая точность",
                "Стабильные показания и высокая точность измерения перекачиваемой смеси.",
              ],
              ["Надежность", "Простая эксплуатация и высокая надежность промышленного уровня."],
              ["Долговечность", "Срок службы оборудования рассчитан на длительную эксплуатацию."],
              ["Устойчивость", "Нечувствительность к перепадам давления и составу жидкости."],
              ["Безопасность", "Система противоаварийной автоматической защиты ПАЗ."],
              [
                "Энергоэффективность",
                "Оптимизация режимов работы насосных агрегатов.",
              ],
            ].map(([title, text], i) => (
              <div key={i} className={Styles.featureCard}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TYPICAL COMPOSITION */}
        <section className={`${Styles.tech} ${Styles.reveal}`}>
          <div className={Styles.techImage}>
            <img src={product.src} alt="Типовой состав" />
          </div>
          <div className={Styles.techText}>
            <h2>Типовой состав</h2>
            <ul className={Styles.featuresList}>
              {[
                "Мультифазные насосные агрегаты",
                "Блок-бокс насосной станции",
                "Запорная арматура",
                "Технологические трубопроводы",
                "Дренажные трубопроводы",
                "Комплект КИПиА",
                "Системы жизнеобеспечения блок-бокса насосной станции (отопление, вентиляция)",
                "Система управления мультифазными насосными агрегатами",
                "Система противоаварийной автоматической защиты ПАЗ",
                "Блок частотных преобразователей",
                "Система передачи информации на верхний уровень",
                "Система электроснабжения насосных агрегатов",
              ].map((text, i) => (
                <li key={i} className={Styles.feature}>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
            <section className={`${Styles.related} ${Styles.reveal}`}>
              <h1>Смотрите также</h1>
              <div className={Styles.relatedGrid}>
                <a href="/products/pumping-stations/internal">
                  Блочная насосная станция внутренней и внешней перекачки нефти
                </a>
              </div>
            </section>
          </div>          
        </section>
        <BackToTop />

        {bigPhoto && <BigPhoto src={bigPhoto} onClose={() => setBigPhoto(null)} />}
      </div>
    </>
  );
};