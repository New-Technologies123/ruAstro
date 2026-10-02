import { useRef, useState } from 'react';

import Styles from '../products.module.scss';
import { BigPhoto } from '../../../ui/big-photo/BigPhoto';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

import ervipImage from '../../../../images/products/product_2.webp';
import urpdImage from '../../../../images/products/urpd.webp';
import psmImage from '../../../../images/products/product_2_2.webp';
import kmrImage from '../../../../images/products/product_2_3.webp';
import gidroprivodImage from '../../../../images/products/product_2_4.webp';
import separationImage from '../../../../images/products/product_2_5.webp';

type AccessoryId =
  | 'ervip'
  | 'urpd'
  | 'psm'
  | 'kmr'
  | 'gidroprivod'
  | 'separation';

type Accessory = {
  id: AccessoryId;
  shortName: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  imageAlt: string;
  features: readonly { title: string; text: string }[];
  principle: string;
  principlePoints: readonly { title: string; text: string }[];
  survey?: string;
};

const item: Accessory = {
    id: 'psm',
    shortName: 'ПСМ',
    title: 'Переключатель скважин многоходовой',
    accent: 'ПСМ',
    description:
      'Предназначен для ручной и автоматической установки скважин на замер в АГЗУ «Спутник». Вал и каретка проходят специальную обработку.',
    image: psmImage.src,
    imageAlt: 'Многоходовой переключатель скважин ПСМ',
    features: [
      { title: 'Выбор скважины', text: 'Направляет выбранную скважину на замер.' },
      { title: 'Ручное управление', text: 'Поддерживает ручное переключение скважин.' },
      { title: 'Автоматическое управление', text: 'Работает в автоматическом режиме АГЗУ.' },
      { title: 'Обработка деталей', text: 'Вал и каретка проходят специальную обработку.' },
      { title: 'Коррозионная стойкость', text: 'Рабочая зона корпуса имеет наплавку из коррозионностойкой стали.' },
      { title: 'Работа в составе АГЗУ', text: 'Применяется в установках типа «Спутник».' },
    ],
    principle:
      'ПСМ переключает поток от выбранной скважины на измерительный тракт АГЗУ. Устройство может работать при ручном и автоматическом управлении.',
    principlePoints: [
      { title: 'Выбор', text: 'Определяется скважина для текущего замера.' },
      { title: 'Переключение', text: 'Механизм изменяет направление потока.' },
      { title: 'Замер', text: 'Продукция выбранной скважины поступает на измерение.' },
    ],
  };

const related = [
  { id: 'ervip', shortName: 'ЭРВИП', image: ervipImage.src, imageAlt: 'Вихревой расходомер ЭРВИП' },
  { id: 'urpd', shortName: 'УРПД', image: urpdImage.src, imageAlt: 'Устройство для регулирования перепада давления УРПД' },
  { id: 'kmr', shortName: 'КМР', image: kmrImage.src, imageAlt: 'Магниторегулируемый клапан КМР' },
  { id: 'gidroprivod', shortName: 'Гидропривод', image: gidroprivodImage.src, imageAlt: 'Гидропривод ГП для переключателя скважин' },
  { id: 'separation', shortName: 'Сепарационная ёмкость', image: separationImage.src, imageAlt: 'Сепарационная ёмкость АГЗУ' },
] as const;

export const Psm = () => {
  const [bigPhoto, setBigPhoto] = useState(false);
  const relatedRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = () => {
    const track = relatedRef.current;
    if (!track) return;

    const start = track.getBoundingClientRect().left +
      parseFloat(getComputedStyle(track).paddingLeft);
    let nearest = 0;
    let nearestDistance = Infinity;

    Array.from(track.children).forEach((child, index) => {
      const distance = Math.abs(child.getBoundingClientRect().left - start);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });
    setActiveIndex(nearest);
  };

  const scrollToRelated = (index: number) => {
    const track = relatedRef.current;
    const card = track?.children.item(index) as HTMLElement | null;
    if (!track || !card) return;

    const left = card.getBoundingClientRect().left -
      track.getBoundingClientRect().left + track.scrollLeft -
      parseFloat(getComputedStyle(track).paddingLeft);
    track.scrollTo({ left, behavior: 'smooth' });
    setActiveIndex(index);
  };

  return (
    <div className={Styles.page}>
      <main>
        <section className={Styles.hero} aria-labelledby="product-title">
          <div className={Styles.container}>
            <nav className={Styles.breadcrumbs} aria-label="Хлебные крошки">
              <a href="/products/">Продукция</a>
              <span aria-hidden="true">›</span>
              <a href="/products/accessories/">Комплектующие АГЗУ</a>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{item.shortName}</span>
            </nav>

            <div className={Styles.heroGrid}>
              <div className={Styles.heroContent}>
                <span className={Styles.eyebrow}>Комплектующие для замерных установок</span>
                <h1 id="product-title">{item.title} <em>{item.accent}</em></h1>
                <p className={Styles.heroDescription}>{item.description}</p>
                <div className={Styles.heroActions}>
                  <a className={Styles.primaryButton} href="#features">
                    Оборудование и назначение <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    className={Styles.secondaryButton}
                    href="/documents/?category=accessories"
                  >
                    Документация <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className={Styles.heroNote}>
                  <span className={Styles.noteDot} aria-hidden="true" />
                  Компонент АГЗУ типа «Спутник»
                </div>
              </div>

              <div className={Styles.productVisual}>
                <button
                  className={Styles.photoButton}
                  type="button"
                  aria-label={`Открыть крупное фото: ${item.shortName}`}
                  onClick={() => setBigPhoto(true)}
                >
                  <img src={item.image} alt={item.imageAlt} className={Styles.productImage} />
                  <span className={Styles.zoomButton} aria-hidden="true">Увеличить фото ↗</span>
                </button>
                <span className={Styles.visualCaption}>{item.shortName} · фото оборудования</span>
              </div>
            </div>
          </div>
        </section>

        <section className={Styles.purpose} id="features" aria-labelledby="features-title">
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div>
                <span className={Styles.eyebrow}>01 / Особенности</span>
                <h2 id="features-title">Назначение и особенности</h2>
              </div>
              <p>Ключевые свойства {item.shortName} в составе замерной установки.</p>
            </div>
            <div className={Styles.purposeGrid}>
              {item.features.map((feature, index) => (
                <article className={Styles.purposeCard} key={feature.title}>
                  <span className={Styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={Styles.principle} aria-labelledby="principle-title">
          <div className={Styles.container}>
            <div className={Styles.principleIntro}>
              <span className={Styles.eyebrow}>02 / Работа оборудования</span>
              <h2 id="principle-title">Принцип работы</h2>
              <p>{item.principle}</p>
            </div>
            <div className={Styles.processList}>
              {item.principlePoints.map((point, index) => (
                <div key={point.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{point.title}</strong>
                  <p>{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={Styles.resources} aria-labelledby="resources-title">
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div>
                <span className={Styles.eyebrow}>03 / Материалы</span>
                <h2 id="resources-title">Документы по оборудованию</h2>
              </div>
              <p>Материалы для ознакомления и подбора компонента.</p>
            </div>
            <div className={Styles.documentsGrid}>
              <a
                className={Styles.materialCard}
                href="/documents/?category=accessories"
              >
                <span className={Styles.materialIcon} aria-hidden="true">↗</span>
                <span><strong>Документация по комплектующим</strong><small>Открыть раздел документов</small></span>
                <span className={Styles.materialArrow} aria-hidden="true">→</span>
              </a>
              {item.survey && (
                <div className={Styles.documentCard}>
                  <div className={Styles.documentIcon} aria-hidden="true">PDF</div>
                  <div className={Styles.documentText}>
                    <h3>Опросный лист {item.shortName}</h3>
                    <p>PDF · технические требования</p>
                  </div>
                  <div className={Styles.documentActions}>
                    <a href={item.survey} target="_blank" rel="noopener noreferrer">
                      Открыть <span aria-hidden="true">↗</span>
                    </a>
                    <a className={Styles.downloadButton} href={item.survey} download>
                      Скачать <span aria-hidden="true">↓</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={Styles.relatedSection} aria-labelledby="related-title">
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div>
                <span className={Styles.eyebrow}>04 / Комплектующие</span>
                <h2 id="related-title">Смотрите также</h2>
              </div>
              <p>Другие компоненты АГЗУ типа «Спутник».</p>
            </div>
            <div
              className={Styles.relatedTrack}
              ref={relatedRef}
              onScroll={updateActiveIndex}
              role="region"
              aria-label="Другие комплектующие АГЗУ"
              tabIndex={0}
            >
              {related.map((product) => (
                <article className={Styles.relatedCard} key={product.id}>
                  <a href={`/products/accessories/${product.id}/`}>
                    <span className={Styles.relatedImage}>
                      <img src={product.image} alt={product.imageAlt} loading="lazy" />
                    </span>
                    <span className={Styles.relatedInfo}>
                      <strong>{product.shortName}</strong>
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </article>
              ))}
            </div>
            <div className={Styles.relatedControls}>
              <span>Листайте карточки свайпом</span>
              <div>
                <span aria-live="polite">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(related.length).padStart(2, '0')}
                </span>
                <button type="button" aria-label="Предыдущий компонент" disabled={activeIndex === 0} onClick={() => scrollToRelated(activeIndex - 1)}>←</button>
                <button type="button" aria-label="Следующий компонент" disabled={activeIndex === related.length - 1} onClick={() => scrollToRelated(activeIndex + 1)}>→</button>
              </div>
            </div>
          </div>
        </section>

        <section className={Styles.bottomCta} aria-labelledby="next-title">
          <div className={Styles.container}>
            <div>
              <span className={Styles.eyebrow}>Подбор оборудования</span>
              <h2 id="next-title">Нужны комплектующие для АГЗУ?</h2>
              <p>Посмотрите весь раздел оборудования.</p>
            </div>
            <a href="/products/accessories/">
              Все комплектующие <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <BackToTop />
      {bigPhoto && <BigPhoto src={item.image} onClose={() => setBigPhoto(false)} />}
    </div>
  );
};
