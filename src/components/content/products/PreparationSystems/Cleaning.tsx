import { useEffect, useRef, useState } from "react";
import Styles from "../Accessories/ervip.module.scss";
import back from '../../../../images/back.svg'
import product from "../../../../images/products/product_4_3.webp";

import { BigPhoto } from "../../../ui/big-photo/BigPhoto";
import { BackToTop } from "../../../ui/back-to-top/BackToTop";

export const Cleaning = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  const onBack = () => {
    window.location.href = "/products/preparation-systems";
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
              Устройство очистки <span>колонны НКТ</span>
            </h1>

            <p>
              Предназначено для автоматической непрерывной очистки внутренней поверхности
              колонны НКТ нефтяной скважины путём срезания слоя парафина со стенок.
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
              <img src={product.src} alt="УОК-НКТ" className={Styles.mainImage} />
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
          <h2>Назначение</h2>

          <div className={Styles.featuresGrid}>
            {[
              [
                "Очистка колонны",
                "Автоматическая очистка внутренней поверхности колонны НКТ от парафиновых и механических отложений."
              ],
              [
                "Предотвращение образования пробок",
                "Снижает риск образования парафиновых пробок и засорения трубопроводов в процессе эксплуатации скважины."
              ],
              [
                "Стабильная работа скважины",
                "Обеспечивает поддержание пропускной способности колонны НКТ и стабильную добычу нефти."
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
            <img src={product.src} alt="УОК-НКТ оборудование" />
          </div>

          <div className={Styles.techText}>
            <h2>Преимущества перед аналогами</h2>

            <ul className={Styles.featuresList}>
              <li className={Styles.feature}>
                <div className={Styles.featureText}>
                  <p>Подпружинный подвижный ролик с датчиком веса предотвращает сматывание проволоки с барабана;</p>
                </div>
              </li>
              <li className={Styles.feature}>
                <div className={Styles.featureText}>
                  <p>Полностью автоматизированный процесс ликвидации пробок;</p>
                </div>
              </li>
              <li className={Styles.feature}>
                <div className={Styles.featureText}>
                  <p>Колибровка положения скребка с точностью до 40 см;</p>
                </div>
              </li>
              <li className={Styles.feature}>
                <div className={Styles.featureText}>
                  <p>Различные исполнения скребка: раздвижной, кольцевой, фрезерный, лезвийный, шнековый и др.;</p>
                </div>
              </li>
              <li className={Styles.feature}>
                <div className={Styles.featureText}>
                  <p>Магниты на ролике и герконовые датчики обеспечивают последовательное срабатывание по направлению вращения ролика.</p>
                </div>
              </li>
            </ul>

            <section className={`${Styles.related} ${Styles.reveal}`}>
              <h2>Смотрите также</h2>

              <div className={Styles.relatedGrid}>
                <a href="/products/preparation-systems/launch">УЗПЗ, УЗПП</a>
                <a href="/products/preparation-systems/block">БГ</a>
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