import { useEffect, useRef, useState } from "react";
import Styles from "../Accessories/ervip.module.scss";
import back from '../../../../images/back.svg'
import product from "../../../../images/products/product_4_2.webp";

import { BigPhoto } from "../../../ui/big-photo/BigPhoto";
import { BackToTop } from "../../../ui/back-to-top/BackToTop";

export const Block = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  const onBack = () => {
    window.location.href = "/products/preparation-systems";
  };

  const onDoc = () => {
    window.location.href = "/documents/?type=preparation-systems";
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
              Блок гребенки<span> БГ</span>
            </h1>

            <p>
              Для распределения потоков воды, подаваемой кустовыми насосными станциями,
              в нагнетательные скважины с целью поддержания пластового давления.
            </p>

            <div className={Styles.heroButtons}>
              <button
                className={Styles.primaryBtn}
                onClick={() => setBigPhoto(product.src)}
              >
                Смотреть фото
              </button>

              <button className={Styles.secondaryBtn} onClick={onDoc}>
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
              <img src={product.src} alt="БГ" className={Styles.mainImage} />
              
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
          <h2>Назначение системы</h2>

          <div className={Styles.featuresGrid}>
            {[
              [
                "Распределение потоков",
                "Блок гребенки предназначен для распределения воды, подаваемой кустовыми насосными станциями, по нагнетательным скважинам."
              ],
              [
                "Поддержание давления",
                "Обеспечивает стабильную подачу воды для поддержания пластового давления в системе разработки месторождения."
              ],
              [
                "Надежная работа",
                "Рассчитан на эксплуатацию в условиях нефтегазовых промыслов и работу под высоким давлением."
              ]
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
            <img src={product.src} alt="БГ оборудование" />
          </div>

          <div className={Styles.techText}>
            <h2>Особенности конструкции</h2>

            <ul className={Styles.featuresList}>
              <li className={Styles.feature}>
                <div className={Styles.featureText}>
                  <p>Обеспечивает стабильное давление на выходе каждой линии;</p>
                </div>
              </li>
              <li className={Styles.feature}>
                <div className={Styles.featureText}>
                  <p>Компактная и надежная конструкция для работы на кустовых площадках;</p>
                </div>
              </li>
              <li className={Styles.feature}>
                <div className={Styles.featureText}>
                  <p>Минимальные требования к обслуживанию и техническому контролю;</p>
                </div>
              </li>
            </ul>

            <section className={`${Styles.related} ${Styles.reveal}`}>
              <h2>Смотрите также</h2>

              <div className={Styles.relatedGrid}>
                <a href="/products/preparation-systems/launch">УЗПЗ, УЗПП</a>
                <a href="/products/preparation-systems/cleaning">УОК-НКТ</a>
                <a href="/products/preparation-systems/dosing">БДР</a>
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