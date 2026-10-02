import { useRef, useState } from 'react';

import Styles from '../products.module.scss';

import productImage from '../../../../images/products/product_1.webp';
import mobileImage from '../../../../images/products/product_1_2.webp';

import { BigPhoto } from '../../../ui/big-photo/BigPhoto';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

const purpose = [
  {
    number: '01',
    title: 'Скважинная жидкость',
    text: 'Измерение массы и массового расхода жидкости в составе нефтегазовой смеси.',
  },
  {
    number: '02',
    title: 'Сырая нефть',
    text: 'Определение массы и массового расхода сырой нефти без учёта воды.',
  },
  {
    number: '03',
    title: 'Нефтяной газ',
    text: 'Измерение объёма и расхода свободного нефтяного газа после сепарации.',
  },
] as const;

const process = [
  {
    number: '01',
    title: 'Поступление смеси',
    text: 'Продукция скважины поступает в установку для последующего разделения и измерения.',
  },
  {
    number: '02',
    title: 'Сепарация',
    text: 'Свободный нефтяной газ отделяется от жидкой фазы.',
  },
  {
    number: '03',
    title: 'Измерение',
    text: 'Фиксируются параметры жидкой фазы и свободного нефтяного газа.',
  },
] as const;

export const Stationary = () => {
  const [bigPhoto, setBigPhoto] = useState(false);

  const relatedRef = useRef<HTMLDivElement | null>(null);

  const scrollRelated = (direction: 'prev' | 'next') => {
    if (!relatedRef.current) return;

    relatedRef.current.scrollBy({
      left: direction === 'next' ? 320 : -320,
      behavior: 'smooth',
    });
  };

  return (
    <div className={Styles.page}>
      <main>
        {/* HERO */}
        <section
          className={Styles.hero}
          aria-labelledby="product-title"
        >
          <div className={Styles.container}>
            <nav
              className={Styles.breadcrumbs}
              aria-label="Хлебные крошки"
            >
              <a href="/products/">Продукция</a>

              <span aria-hidden="true">/</span>

              <a href="/products/accounting-system/">
                АГЗУ
              </a>

              <span aria-hidden="true">/</span>

              <span aria-current="page">
                Стационарная
              </span>
            </nav>

            <div className={Styles.heroGrid}>
              {/* ТЕКСТ */}
              <div className={Styles.heroContent}>
                <span className={Styles.eyebrow}>
                  Автоматизированная групповая замерная установка
                </span>

                <h1 id="product-title">
                  АГЗУ «Спутник — массомер НТ.1»
                  <em>стационарная</em>
                </h1>

                <p className={Styles.heroDescription}>
                  Стационарная установка для измерения массы и массового
                  расхода скважинной жидкости, а также объёма свободного
                  нефтяного газа после сепарации.
                </p>

                <div className={Styles.heroActions}>
                  <a
                    className={Styles.primaryButton}
                    href="#questionnaire"
                  >
                    Опросный лист
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    className={Styles.secondaryButton}
                    href="/documents/?category=accounting-system"
                  >
                    Документация
                    <span aria-hidden="true">→</span>
                  </a>
                </div>

                <div className={Styles.heroNote}>
                  <span
                    className={Styles.noteDot}
                    aria-hidden="true"
                  />

                  Исполнение для стационарного размещения
                  на объекте
                </div>
              </div>

              {/* ФОТО */}
              <div className={Styles.productVisual}>
                <button
                  className={Styles.photoButton}
                  type="button"
                  onClick={() => setBigPhoto(true)}
                  aria-label="Открыть крупное фото стационарной АГЗУ"
                >
                  <img
                    src={productImage.src}
                    alt="Стационарная АГЗУ «Спутник — массомер НТ.1»"
                    className={Styles.productImage}
                  />

                  <span
                    className={Styles.zoomButton}
                    aria-hidden="true"
                  >
                    Увеличить фото ↗
                  </span>
                </button>

                <span className={Styles.visualCaption}>
                  Стационарное исполнение
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* НАЗНАЧЕНИЕ */}
        <section
          className={Styles.purpose}
          id="purpose"
          aria-labelledby="purpose-title"
        >
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div>
                <span className={Styles.eyebrow}>
                  01 / Назначение
                </span>

                <h2 id="purpose-title">
                  Что измеряет установка
                </h2>
              </div>

              <p>
                Данные о жидкости, нефти и газе для учёта
                продукции скважин.
              </p>
            </div>

            <div className={Styles.purposeGrid}>
              {purpose.map((item) => (
                <article
                  className={Styles.purposeCard}
                  key={item.number}
                >
                  <span className={Styles.cardNumber}>
                    {item.number}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ПРИНЦИП РАБОТЫ */}
        <section
          className={Styles.principle}
          aria-labelledby="principle-title"
        >
          <div className={Styles.container}>
            <div className={Styles.principleIntro}>
              <span className={Styles.eyebrow}>
                02 / Принцип работы
              </span>

              <h2 id="principle-title">
                Измерение после сепарации
              </h2>

              <p>
                Нефтегазовая смесь разделяется, после чего
                установка измеряет массу и массовый расход
                жидкости и объём свободного нефтяного газа.
                Результаты используются для учёта продукции
                скважин.
              </p>
            </div>

            <div className={Styles.processList}>
              {process.map((item) => (
                <div key={item.number}>
                  <span>{item.number}</span>

                  <strong>{item.title}</strong>

                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ОПРОСНЫЙ ЛИСТ */}
        <section
          className={Styles.resources}
          id="questionnaire"
          aria-labelledby="resources-title"
        >
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div>
                <span className={Styles.eyebrow}>
                  03 / Материалы
                </span>

                <h2 id="resources-title">
                  Опросный лист
                </h2>
              </div>

              <p>
                Заполните технические требования, чтобы
                обсудить исполнение установки.
              </p>
            </div>

            <div className={Styles.documentCard}>
              <div
                className={Styles.documentIcon}
                aria-hidden="true"
              >
                PDF
              </div>

              <div className={Styles.documentText}>
                <h3>Стационарная АГЗУ</h3>

                <p>
                  Опросный лист · PDF
                </p>
              </div>

              <div className={Styles.documentActions}>
                <a
                  href="/survey/agzu_stationary.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Открыть
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  className={Styles.downloadButton}
                  href="/survey/agzu_stationary.pdf"
                  download
                >
                  Скачать
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ДРУГОЕ ИСПОЛНЕНИЕ */}
        <section
          className={Styles.relatedSection}
          aria-labelledby="related-title"
        >
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div>
                <span className={Styles.eyebrow}>
                  04 / Другое исполнение
                </span>

                <h2 id="related-title">
                  АГЗУ для мобильной эксплуатации
                </h2>
              </div>

              <p>
                Если оборудование необходимо перемещать
                между объектами, обратите внимание на
                мобильное исполнение.
              </p>
            </div>

            <div
              className={`${Styles.relatedTrack} ${Styles.relatedTrackSingle}`}
              ref={relatedRef}
            >
              <article className={Styles.relatedCard}>
                <a href="/products/accounting-system/mobile/">
                  <div className={Styles.relatedImage}>
                    <img
                      src={mobileImage.src}
                      alt="Мобильная АГЗУ «Спутник — массомер НТ.1»"
                      loading="lazy"
                    />
                  </div>

                  <div className={Styles.relatedInfo}>
                    <strong>
                      Мобильная АГЗУ
                    </strong>

                    <span aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </a>
              </article>
            </div>

            <div className={Styles.relatedControls}>
              <div>
                <button
                  type="button"
                  onClick={() => scrollRelated('prev')}
                  aria-label="Предыдущее исполнение"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() => scrollRelated('next')}
                  aria-label="Следующее исполнение"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className={Styles.bottomCta}
          aria-labelledby="next-title"
        >
          <div className={Styles.container}>
            <div>
              <span className={Styles.eyebrow}>
                Подбор оборудования
              </span>

              <h2 id="next-title">
                Нужна АГЗУ под условия объекта?
              </h2>

              <p>
                Обсудим параметры объекта и подберём
                подходящее исполнение оборудования.
              </p>
            </div>

            <a href="/contact/">
              Обсудить проект
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <BackToTop />

      {bigPhoto && (
        <BigPhoto
          src={productImage.src}
          onClose={() => setBigPhoto(false)}
        />
      )}
    </div>
  );
};