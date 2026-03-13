import { useEffect, useRef, useState } from "react";
import Styles from "../Accessories/ervip.module.scss";
import back from '../../../../images/back.svg'
import product from "../../../../images/products/product_3.webp";
import { BigPhoto } from "../../../ui/big-photo/BigPhoto";
import { BackToTop } from "../../../ui/back-to-top/BackToTop";

export const Oil = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  const onBack = () => {
    window.location.href = "/products/measuring-system";
  };

  const onDoc = () => {
    window.location.href = "/documents/?type=measuring-system";
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
              Система измерения количества и показателей качества нефти<span> СИКН</span>
            </h1>

            <p>
              СИКН предназначена для автоматизированного измерения количества
              нефти и нефтепродуктов, а также определения их основных
              показателей качества.
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
              <img src={product.src} alt="СИКН" className={Styles.mainImage} />
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
                "Измерение количества",
                "Автоматизированное измерение количества нефти и нефтепродуктов.",
              ],
              [
                "Контроль качества",
                "Определение плотности, вязкости и влагосодержания нефти.",
              ],
              [
                "Контроль параметров",
                "Измерение давления и температуры рабочей среды.",
              ],
              [
                "Отбор проб",
                "Отбор объединенной пробы нефти в соответствии с ГОСТ 2517.",
              ],
              [
                "Передача данных",
                "Передача информации в систему автоматизации и АРМ оператора.",
              ],
              [
                "Гибкость конфигурации",
                "Система может изготавливаться на базе объемных, массовых или ультразвуковых расходомеров.",
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
            <img src={product.src} alt="СИКН" />
          </div>

          <div className={Styles.techText}>
            <h2>Принцип работы</h2>

            <p>
              Система обеспечивает автоматический учет количества нефти и
              контроль ее качества. Данные измерений передаются в систему
              автоматизации, архивируются и отображаются на рабочем месте
              оператора.
            </p>

            <section className={`${Styles.related} ${Styles.reveal}`}>
              <h2>Смотрите также</h2>

              <div className={Styles.relatedGrid}>
                <a href="/products/measuring-system/gas">СИКГ</a>
                <a href="/products/measuring-system/water">СИКВ</a>
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