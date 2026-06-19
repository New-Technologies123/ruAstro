import { useEffect, useRef, useState } from "react";
import Styles from "../products.module.scss";
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

  // Массив с файлами опросных листов
  const questionnaireFiles = [
    {
      id: 1,
      name: "АГЗУ мобильный исп.1",
      fileName: "agzu_mobile_1.pdf",
    },
    {
      id: 2,
      name: "АГЗУ мобильный исп.2",
      fileName: "agzu_mobile_2.pdf",
    },
    {
      id: 3,
      name: "АГЗУ мобильный исп.3",
      fileName: "agzu_mobile_3.pdf",
    },
    {
      id: 4,
      name: "АГЗУ мобильный исп.4",
      fileName: "agzu_mobile_4.pdf",
    },
    {
      id: 5,
      name: "АГЗУ мобильный исп.5",
      fileName: "agzu_mobile_5.pdf",
    },
    {
      id: 6,
      name: "АГЗУ мобильный исп.6",
      fileName: "agzu_mobile_6.pdf",
    }
  ];

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

            <div className={Styles.featureCard}>
              <h3>Быстрое развертывание</h3>
              <p>
                Ввод в эксплуатацию без капитального строительства и длительного монтажа.
              </p>
            </div>

            <div className={Styles.featureCard}>
              <h3>Снижение затрат</h3>
              <p>
                Отсутствие необходимости строительства стационарных узлов учета.
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

            {/* QUESTIONNAIRE FILES */}

            <div className={Styles.questionnaireBlock}>
              <h3>Опросные листы</h3>
              <p className={Styles.questionnaireDesc}>
                Здесь вы можете открыть или скачать опросные листы и документацию для заполнения.
              </p>
              
              <div className={Styles.filesGrid}>
                {questionnaireFiles.map((file) => (
                  <div key={file.id} className={Styles.fileCard}>
                    <div className={Styles.fileCardIcon}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div className={Styles.fileCardContent}>
                      <div className={Styles.fileCardInfo}>
                        <div className={Styles.fileCardName}>{file.name}</div>
                      </div>
                      <div className={Styles.fileCardActions}>
                        <a 
                          href={`/survey/${file.fileName}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={Styles.viewBtn}
                        >
                          Открыть
                        </a>
                        <a 
                          href={`/survey/${file.fileName}`} 
                          download={file.name.replace(/\s/g, '_') + '.pdf'}
                          className={Styles.downloadBtn}
                        >
                          Скачать
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <section className={Styles.related}>
              <h1>Смотрите также:</h1>
              <div className={Styles.relatedGrid}>
                <a href="/products/accounting-system/stationary/">Стационарная АГЗУ</a>
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