import { useEffect, useRef, useState } from "react";
import Styles from "./ervip.module.scss";
import back from '../../../../images/back.svg'
import product from "../../../../images/products/product_2_2.webp";

import { BigPhoto } from "../../../ui/big-photo/BigPhoto";
import { BackToTop } from "../../../ui/back-to-top/BackToTop";

export const Psm = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  const onBack = () => {
    window.location.href = "/products/accessories";
  };

  const onDoc = () => {
    window.location.href = "/documents/?type=accessories";
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
              Переключатель скважин многоходовой <span>ПСМ</span>
            </h1>
            <p>
              Для ручной и автоматической установки скважин на замер в АГЗУ «Спутник». Вал и каретка ПСМ подвергаются специальной обработке для долговечности.
            </p>
            <div className={Styles.heroButtons}>
              <button
                className={Styles.primaryBtn}
                onClick={() => setBigPhoto(product.src)}
              >
                Смотреть фото
              </button>
              <button className={Styles.secondaryBtn}>
                Скачать паспорт
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
                <img src={product.src} alt="ПСМ" className={Styles.mainImage} />
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
              ["Надежность", "Высокая надежность при ручной и автоматической работе."],
              ["Долговечность", "Обработка валов и каретки повышает срок службы."],
              ["Точность", "Точная установка скважин на замер."],
              ["Коррозионная стойкость", "Наплавка рабочей зоны корпусом из коррозионностойкой стали."],
              ["Простота обслуживания", "Минимальные требования к ремонту."],
              ["Устойчивость к нагрузкам", "Стабильная работа в сложных условиях."],
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
              ПСМ позволяет точно и надежно устанавливать скважины на замер в АГЗУ «Спутник». Специальная обработка деталей повышает долговечность и устойчивость к нагрузкам.
            </p>
            <section className={`${Styles.related} ${Styles.reveal}`}>
              <h2>Смотрите также</h2>
              <div className={Styles.relatedGrid}>
                <a href="/products/accessories/ervip">ЭРВИП</a>
                <a href="/products/accessories/urpd">УРПД</a>
                <a href="/products/accessories/kmr">КМР</a>
                <a href="/products/accessories/gidroprivod">Гидропривод</a>
                <a href="/products/accessories/separation">Сепарационная емкость</a>
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