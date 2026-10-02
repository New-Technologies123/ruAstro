import { useRef, useState } from 'react';

import Styles from '../products.module.scss';

import productImage from '../../../../images/products/product_1_2.webp';
import stationaryImage from '../../../../images/products/product_1.webp';

import { BigPhoto } from '../../../ui/big-photo/BigPhoto';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

const features = [
  {
    number: '01',
    title: 'Мобильное исполнение',
    text: 'Блоки АГЗУ размещаются в кузове, на шасси автомобиля или прицепа.',
  },
  {
    number: '02',
    title: 'Учёт жидкости и нефти',
    text: 'Измерение массы и массового расхода сырой нефти с учётом воды и без него.',
  },
  {
    number: '03',
    title: 'Контроль газа',
    text: 'Измерение объёма и объёмного расхода свободного газа после сепарации.',
  },
  {
    number: '04',
    title: 'Стандартные условия',
    text: 'Параметры газа автоматически приводятся к стандартным условиям.',
  },
  {
    number: '05',
    title: 'Размещение на объекте',
    text: 'Мобильный формат позволяет использовать установку на разных площадках.',
  },
  {
    number: '06',
    title: 'Подбор исполнения',
    text: 'Вариант установки выбирают с учётом условий измерения и размещения.',
  },
] as const;

const process = [
  {
    number: '01',
    title: 'Подключение',
    text: 'Установка работает с продукцией выбранной скважины.',
  },
  {
    number: '02',
    title: 'Сепарация',
    text: 'Жидкая и газовая фазы разделяются.',
  },
  {
    number: '03',
    title: 'Измерение',
    text: 'Определяются параметры нефти и газа.',
  },
] as const;

const questionnaires = [1, 2, 3, 4, 5, 6].map((number) => ({
  number,
  title: `АГЗУ мобильная · исполнение ${number}`,
  href: `/survey/agzu_mobile_${number}.pdf`,
}));

export const Mobile = () => {
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
                Мобильная
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
                  <em>мобильная</em>
                </h1>

                <p className={Styles.heroDescription}>
                  Мобильная установка для измерения массы и
                  массового расхода сырой нефти, объёма и
                  расхода свободного нефтяного газа после
                  сепарации.
                </p>

                <div className={Styles.heroActions}>
                  <a
                    className={Styles.primaryButton}
                    href="#questionnaires"
                  >
                    Выбрать опросный лист
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

                  Шесть вариантов опросного листа для
                  разных исполнений
                </div>
              </div>

              {/* ФОТО */}
              <div className={Styles.productVisual}>
                <button
                  className={Styles.photoButton}
                  type="button"
                  onClick={() => setBigPhoto(true)}
                  aria-label="Открыть крупное фото мобильной АГЗУ"
                >
                  <img
                    src={productImage.src}
                    alt="Мобильная АГЗУ «Спутник — массомер НТ.1»"
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
                  Мобильное исполнение
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ВОЗМОЖНОСТИ */}
        <section
          className={Styles.purpose}
          id="purpose"
          aria-labelledby="purpose-title"
        >
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div>
                <span className={Styles.eyebrow}>
                  01 / Возможности
                </span>

                <h2 id="purpose-title">
                  Что делает мобильная АГЗУ
                </h2>
              </div>

              <p>
                Измерение параметров продукции скважин в
                мобильном исполнении.
              </p>
            </div>

            <div className={Styles.purposeGrid}>
              {features.map((feature) => (
                <article
                  className={Styles.purposeCard}
                  key={feature.number}
                >
                  <span className={Styles.cardNumber}>
                    {feature.number}
                  </span>

                  <h3>{feature.title}</h3>

                  <p>{feature.text}</p>
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
                Измерение продукции скважин
              </h2>

              <p>
                Нефтегазовая смесь проходит сепарацию.
                Затем измеряются масса и массовый расход
                жидкой фазы, а также объём свободного газа.
                Полученные параметры используются для учёта
                продукции скважин.
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

        {/* ОПРОСНЫЕ ЛИСТЫ */}
        <section
          className={Styles.resources}
          id="questionnaires"
          aria-labelledby="resources-title"
        >
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div>
                <span className={Styles.eyebrow}>
                  03 / Материалы
                </span>

                <h2 id="resources-title">
                  Опросные листы
                </h2>
              </div>

              <p>
                Выберите исполнение и заполните технические
                требования.
              </p>
            </div>

            <div className={Styles.documentsGrid}>
              {questionnaires.map((document) => (
                <div
                  className={Styles.documentCard}
                  key={document.number}
                >
                  <div
                    className={Styles.documentIcon}
                    aria-hidden="true"
                  >
                    PDF
                  </div>

                  <div className={Styles.documentText}>
                    <h3>{document.title}</h3>

                    <p>
                      Опросный лист · PDF
                    </p>
                  </div>

                  <div className={Styles.documentActions}>
                    <a
                      href={document.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Открыть
                      <span aria-hidden="true">↗</span>
                    </a>

                    <a
                      className={Styles.downloadButton}
                      href={document.href}
                      download
                    >
                      Скачать
                      <span aria-hidden="true">↓</span>
                    </a>
                  </div>
                </div>
              ))}
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
                  АГЗУ для стационарного размещения
                </h2>
              </div>

              <p>
                Для постоянного размещения на объекте
                доступно стационарное исполнение установки.
              </p>
            </div>

            <div
              className={`${Styles.relatedTrack} ${Styles.relatedTrackSingle}`}
              ref={relatedRef}
            >
              <article className={Styles.relatedCard}>
                <a href="/products/accounting-system/stationary/">
                  <div className={Styles.relatedImage}>
                    <img
                      src={stationaryImage.src}
                      alt="Стационарная АГЗУ «Спутник — массомер НТ.1»"
                      loading="lazy"
                    />
                  </div>

                  <div className={Styles.relatedInfo}>
                    <strong>
                      Стационарная АГЗУ
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
                Нужна мобильная АГЗУ под условия объекта?
              </h2>

              <p>
                Обсудим условия эксплуатации и подберём
                подходящее исполнение установки.
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