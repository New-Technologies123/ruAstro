import { useEffect, useRef, useState } from "react";
import Styles from "../products.module.scss";
import back from '../../../../images/back.svg'
import product from "../../../../images/products/product_2_5.webp";

import { BigPhoto } from "../../../ui/big-photo/BigPhoto";
import { BackToTop } from "../../../ui/back-to-top/BackToTop";

export const Separation = () => {
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
              Сепарационная <span>ёмкость</span>
            </h1>

            <p>
              Оборудование для разделения нефтегазовых смесей на жидкость и газ
              в составе замерных установок типа «Спутник».
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
              <div className={Styles.frame}>
                <img src={product.src} alt="Емкасть" className={Styles.mainImage} />
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
                "Эффективное разделение",
                "Надежное разделение газожидкостных смесей.",
              ],
              [
                "Надежность",
                "Стабильная работа в составе промышленных установок.",
              ],
              [
                "Долговечность",
                "Прочная конструкция рассчитана на длительную эксплуатацию.",
              ],
              [
                "Устойчивость к нагрузкам",
                "Работа в сложных условиях добычи нефти и газа.",
              ],
              [
                "Простота обслуживания",
                "Минимальные требования к техническому обслуживанию.",
              ],
              [
                "Совместимость",
                "Используется в установках типа «Спутник».",
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
              Сепарационная емкость разделяет поток нефтегазовой смеси на
              жидкую и газовую фазы за счет изменения скорости потока и
              гравитационного отделения компонентов.
            </p>

            <section className={`${Styles.related} ${Styles.reveal}`}>
              <h1>Смотрите также</h1>
              <div className={Styles.relatedGrid}>
                <a href="/products/accessories/ervip">ЭРВИП</a>
                <a href="/products/accessories/urpd">УРПД</a>
                <a href="/products/accessories/psm">ПСМ</a>
                <a href="/products/accessories/kmr">КМР</a>
                <a href="/products/accessories/gidroprivod">Гидропривод</a>
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