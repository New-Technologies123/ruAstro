import { useEffect, useRef, useState } from "react";
import Styles from "../products.module.scss";
import back from '../../../../images/back.svg';
import product from "../../../../images/products/product_2.webp";

import { BigPhoto } from "../../../ui/big-photo/BigPhoto";
import { BackToTop } from "../../../ui/back-to-top/BackToTop";

export const Ervip = () => {
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
              Вихревой расходомер <span>ЭРВИП</span>
            </h1>

            <p>
              Высокоточный промышленный прибор для измерения расхода
              жидкостей и газов в автоматизированных установках
              типа «Спутник».
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
                <img src={product.src} alt="ЭРВИП" className={Styles.mainImage} />
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
              ["Высокая точность", "Стабильные показания и высокая точность измерения расхода жидкостей и газов."],
              ["Надежность", "Простая эксплуатация и высокая надежность промышленного уровня."],
              ["Долговечность", "Срок службы прибора составляет до 12 лет эксплуатации."],
              ["Устойчивость", "Нечувствительность к загрязнениям и стабильная работа в сложных условиях."],
              ["Межповерочный интервал", "До 4 лет без необходимости поверки оборудования."],
              ["Калибровка", "Гибкая настройка диапазона измерений."],              
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
              Измерение основано на образовании вихревых дорожек Кармана
              за препятствием в потоке среды.
            </p>

            <p>
              Частота образования вихрей пропорциональна скорости потока,
              что позволяет точно определить расход жидкости или газа.
            </p>

            <p>
              Пьезокристалл внутри барьера генерирует электрические
              импульсы, которые обрабатываются электроникой расходомера.
            </p>

            {/* QUESTIONNAIRE */}
            <div className={Styles.questionnaireBlock}>
              <div className={Styles.questionnaireHeader}>
                <div>
                  <h3>Опросный лист</h3>
                  <p className={Styles.questionnaireDesc}>
                    Скачайте опросный лист для заполнения технических требований.
                  </p>
                </div>                
              </div>
              <div className={Styles.questionnaireActions}>
                <button 
                  className={Styles.viewBtn}
                  onClick={() => window.open('/survey/agzu_stationary.pdf', '_blank')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Открыть
                </button>
                <a 
                  href="/survey/ervip.pdf" 
                  download 
                  className={Styles.downloadBtn}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Скачать
                </a>
              </div>
            </div>

            <section className={`${Styles.related} ${Styles.reveal}`}>
              <h1>Смотрите также</h1>

              <div className={Styles.relatedGrid}>
                <a href="/products/accessories/urpd">УРПД</a>
                <a href="/products/accessories/psm">ПСМ</a>
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