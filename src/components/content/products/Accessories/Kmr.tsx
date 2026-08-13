import { useEffect, useRef, useState } from "react";
import Styles from "../products.module.scss";
import back from '../../../../images/back.svg'
import product from "../../../../images/products/product_2_3.webp";

import { BigPhoto } from "../../../ui/big-photo/BigPhoto";
import { BackToTop } from "../../../ui/back-to-top/BackToTop";

export const Kmr = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  const onBack = () => {
    window.location.href = "/products/accessories";
  };

  const onDoc = () => {
    window.location.href = "/documents/?category=accessories";
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
            <h1>
              Магниторегулируемый клапан <span>КМР</span>
            </h1>

            <p>
              Используется для регулирования расхода жидкости в групповых
              замерных установках типа «Спутник» вместо стандартных
              регуляторов расхода РР.
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
              <div className={Styles.frame}>
                <img src={product.src} alt="КМР" className={Styles.mainImage} />
              </div>
              <div className={Styles.imageOverlay}>
                <span className={Styles.zoomText}>
                  Нажмите для увеличения
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}

        <section className={`${Styles.features} ${Styles.reveal}`}>
          <h2>Преимущества оборудования</h2>

          <div className={Styles.featuresGrid}>
            {[
              [
                "Надежность",
                "Стабильная работа в системах регулирования расхода жидкости.",
              ],
              [
                "Долговечность",
                "Прочная конструкция обеспечивает длительный срок эксплуатации.",
              ],
              [
                "Точность регулирования",
                "Позволяет точно настраивать расход рабочей среды.",
              ],
              [
                "Устойчивость к нагрузкам",
                "Надежная работа в условиях промышленной эксплуатации.",
              ],
              [
                "Простота обслуживания",
                "Минимальные требования к техническому обслуживанию.",
              ],
              [
                "Совместимость",
                "Полностью совместим с установками типа «Спутник».",
              ],
            ].map(([title, text], i) => (
              <div key={i} className={Styles.featureCard}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNOLOGY */}

        <section className={`${Styles.tech} ${Styles.reveal}`}>
          <div className={Styles.techImage}>
            <img src={product.src} alt="" />
          </div>

          <div className={Styles.techText}>
            <h2>Принцип работы</h2>

            <p>
              Клапан регулирует поток жидкости за счет изменения положения
              регулирующего элемента. Это обеспечивает стабильное управление
              расходом в составе групповых замерных установок.
            </p>

            <section className={`${Styles.related} ${Styles.reveal}`}>
              <h1>Смотрите также</h1>
              <div className={Styles.relatedGrid}>
                <a href="/products/accessories/ervip">ЭРВИП</a>
                <a href="/products/accessories/urpd">УРПД</a>
                <a href="/products/accessories/psm">ПСМ</a>
                <a href="/products/accessories/gidroprivod">Гидропривод</a>
                <a href="/products/accessories/separation">
                  Сепарационная емкость
                </a>
              </div>
            </section>
          </div>
        </section>

        <BackToTop />

        {bigPhoto && (
          <BigPhoto src={bigPhoto} onClose={() => setBigPhoto(null)} />
        )}
      </div>
    </>
  );
};