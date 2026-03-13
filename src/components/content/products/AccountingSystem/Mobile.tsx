import { useEffect, useRef, useState } from "react";
import Styles from "../Accessories/ervip.module.scss";
import back from '../../../../images/back.svg'
import product from "../../../../images/products/product_1_2.webp";

import { BigPhoto } from "../../../ui/big-photo/BigPhoto";
import { BackToTop } from "../../../ui/back-to-top/BackToTop";

export const Mobile = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  const onBack = () => {
    window.location.href = "/products/accounting-system";
  };

  const onDoc = () => {
    window.location.href = "/documents/?type=accountingSystem";
  };

  /* ---------- 3D TILT ---------- */

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

  return (
    <>
      <div className={Styles.page}>
        <button className={Styles.backButton} onClick={onBack}>
          <img src={back.src} alt=""/>
        </button>

        <section className={Styles.hero}>
          <div className={Styles.heroText}>
            <h1>
              АГЗУ «Спутник — массомер НТ.1»
              <span> мобильный</span>
            </h1>

            <p>
              Мобильная установка для измерения массы и массового расхода сырой
              нефти, объёма и расхода свободного нефтяного газа после
              сепарации.
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
              <img src={product.src} alt="АГЗУ мобильная" className={Styles.mainImage} />
              <div className={Styles.imageOverlay}>
                <span className={Styles.zoomText}>
                  Нажмите для увеличения
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}

        <section className={Styles.features}>
          <h2>Особенности мобильной установки</h2>

          <div className={Styles.featuresGrid}>
            <div className={Styles.featureCard}>
              <h3>Мобильное исполнение</h3>
              <p>
                Блоки АГЗУ устанавливаются в кузове или на шасси автомобиля
                либо прицепа.
              </p>
            </div>

            <div className={Styles.featureCard}>
              <h3>Точный учет продукции</h3>
              <p>
                Измерение массы и массового расхода сырой нефти с учетом и без
                учета воды.
              </p>
            </div>

            <div className={Styles.featureCard}>
              <h3>Контроль газа</h3>
              <p>
                Измерение объема и объемного расхода свободного нефтяного газа
                после сепарации.
              </p>
            </div>

            <div className={Styles.featureCard}>
              <h3>Стандартные условия</h3>
              <p>
                Параметры газа автоматически приводятся к стандартным условиям.
              </p>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY */}

        <section className={Styles.tech}>
          <div className={Styles.techImage}>
            <img src={product.src} alt="" />
          </div>

          <div className={Styles.techText}>
            <h2>Принцип работы</h2>

            <p>
              Работа установки основана на сепарации нефтегазовой смеси с
              последующим измерением массы и массового расхода жидкости, а
              также объема свободного нефтяного газа. Полученные параметры
              используются для точного учета продукции скважин.
            </p>
            <section className={Styles.related}>
              <h1>Смотрите также:</h1>

              <div className={Styles.relatedGrid}>
                <a href="/products/accounting-system/stationary/">Стационарное АГЗУ</a>
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