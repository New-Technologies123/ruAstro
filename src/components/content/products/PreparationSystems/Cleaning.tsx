import { useRef, useState } from 'react';

import Styles from '../products.module.scss';
import productImage from '../../../../images/products/product_4_3.webp';
import launchImage from '../../../../images/products/product_4.webp';
import blockImage from '../../../../images/products/product_4_2.webp';
import dosingImage from '../../../../images/products/product_4_4.webp';
import { BigPhoto } from '../../../ui/big-photo/BigPhoto';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

const features = [
  { title: "Очистка колонны", text: "Удаление парафиновых и механических отложений с внутренней поверхности НКТ." },
  { title: "Меньше риск пробок", text: "Очистка снижает риск образования парафиновых пробок." },
  { title: "Пропускная способность", text: "Работа устройства помогает поддерживать проходное сечение колонны." },
] as const;

const composition = [
  { title: "Контроль проволоки", text: "Подпружиненный ролик с датчиком веса помогает предотвращать сматывание проволоки с барабана." },
  { title: "Автоматизация", text: "Процесс очистки и ликвидации пробок автоматизирован." },
  { title: "Положение скребка", text: "Калибровка положения скребка с точностью до 40 см." },
  { title: "Варианты скребка", text: "Раздвижное, кольцевое, фрезерное, лезвийное и шнековое исполнение." },
  { title: "Датчики", text: "Магниты на ролике и герконовые датчики отслеживают направление его вращения." },
] as const;

const related = [
  { id: 'launch', title: 'УЗПЗ, УЗПП', image: launchImage.src, alt: 'Устройства запуска и приёма внутритрубных средств' },
  { id: 'block', title: 'БГ', image: blockImage.src, alt: 'Блок гребёнки' },
  { id: 'dosing', title: 'БДР', image: dosingImage.src, alt: 'Установка дозирования химического реагента' },
] as const;

export const Cleaning = () => {
  const [bigPhoto, setBigPhoto] = useState(false);
  const relatedRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = () => {
    const track = relatedRef.current;
    if (!track) return;
    const start = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft);
    let nearest = 0;
    let distance = Infinity;
    Array.from(track.children).forEach((child, index) => {
      const delta = Math.abs(child.getBoundingClientRect().left - start);
      if (delta < distance) { distance = delta; nearest = index; }
    });
    setActiveIndex(nearest);
  };

  const scrollToRelated = (index: number) => {
    const track = relatedRef.current;
    const card = track?.children.item(index) as HTMLElement | null;
    if (!track || !card) return;
    const left = card.getBoundingClientRect().left - track.getBoundingClientRect().left +
      track.scrollLeft - parseFloat(getComputedStyle(track).paddingLeft);
    track.scrollTo({ left, behavior: 'smooth' });
    setActiveIndex(index);
  };

  return (
    <div className={Styles.page}>
      <main>
        <section className={Styles.hero} aria-labelledby="product-title">
          <div className={Styles.container}>
            <nav className={Styles.breadcrumbs} aria-label="Хлебные крошки">
              <a href="/products/">Продукция</a><span aria-hidden="true">›</span>
              <a href="/products/preparation-systems/">Системы подготовки</a><span aria-hidden="true">›</span>
              <span aria-current="page">УОК-НКТ</span>
            </nav>
            <div className={Styles.heroGrid}>
              <div className={Styles.heroContent}>
                <span className={Styles.eyebrow}>Очистка насосно-компрессорных труб</span>
                <h1 id="product-title">Устройство очистки <em>колонны НКТ</em></h1>
                <p className={Styles.heroDescription}>Автоматически очищает внутреннюю поверхность колонны НКТ нефтяной скважины, срезая парафиновые отложения со стенок.</p>
                <div className={Styles.heroActions}>
                  <a className={Styles.primaryButton} href="#features">Назначение и особенности <span aria-hidden="true">↗</span></a>
                  <a className={Styles.secondaryButton} href="/documents/?category=preparation-systems">Документация <span aria-hidden="true">→</span></a>
                </div>
                <div className={Styles.heroNote}><span className={Styles.noteDot} aria-hidden="true" />Автоматическая очистка · контроль положения скребка</div>
              </div>
              <div className={Styles.productVisual}>
                <button className={Styles.photoButton} type="button" onClick={() => setBigPhoto(true)} aria-label="Открыть крупное фото: УОК-НКТ">
                  <img src={productImage.src} alt="Устройство очистки колонны НКТ" className={Styles.productImage} />
                  <span className={Styles.zoomButton} aria-hidden="true">Увеличить фото ↗</span>
                </button>
                <span className={Styles.visualCaption}>УОК-НКТ · оборудование для подготовки</span>
              </div>
            </div>
          </div>
        </section>

        <section className={Styles.purpose} id="features" aria-labelledby="features-title">
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div><span className={Styles.eyebrow}>01 / Назначение</span><h2 id="features-title">Задачи устройства УОК-НКТ</h2></div>
              <p>Очистка колонны и поддержание её пропускной способности.</p>
            </div>
            <div className={Styles.purposeGrid}>
              {features.map((feature, index) => (
                <article className={Styles.purposeCard} key={feature.title}>
                  <span className={Styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{feature.title}</h3><p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={Styles.principle} aria-labelledby="composition-title">
          <div className={Styles.container}>
            <div className={Styles.principleIntro}>
              <span className={Styles.eyebrow}>02 / Конструкция</span>
              <h2 id="composition-title">Контроль и исполнение</h2>
              <p>Работа скребка автоматизирована; его исполнение подбирается под конкретную задачу.</p>
            </div>
            <div className={Styles.processList}>
              {composition.map((part, index) => (
                <div key={part.title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{part.title}</strong><p>{part.text}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className={Styles.resources} aria-labelledby="resources-title">
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div><span className={Styles.eyebrow}>03 / Материалы</span><h2 id="resources-title">Документация</h2></div>
              <p>Откройте материалы по оборудованию для подготовки нефти, газа и воды.</p>
            </div>
            <div className={Styles.documentsGrid}>
              <a className={Styles.materialCard} href="/documents/?category=preparation-systems">
                <span className={Styles.materialIcon} aria-hidden="true">↗</span>
                <span><strong>Документация по системам подготовки</strong><small>Открыть раздел документов</small></span>
                <span className={Styles.materialArrow} aria-hidden="true">→</span>
              </a>
              <div className={Styles.documentCard}>
                <div className={Styles.documentIcon} aria-hidden="true">PDF</div>
                <div className={Styles.documentText}><h3>Опросный лист УОК-НКТ</h3><p>PDF · технические требования</p></div>
                <div className={Styles.documentActions}>
                  <a href="/survey/wok-nkt.pdf" target="_blank" rel="noopener noreferrer">Открыть <span aria-hidden="true">↗</span></a>
                  <a className={Styles.downloadButton} href="/survey/wok-nkt.pdf" download>Скачать <span aria-hidden="true">↓</span></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={Styles.relatedSection} aria-labelledby="related-title">
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div><span className={Styles.eyebrow}>04 / Системы подготовки</span><h2 id="related-title">Смотрите также</h2></div>
              <p>Оборудование для подготовки и технологической обвязки.</p>
            </div>
            <div className={`${Styles.relatedTrack} ${Styles.relatedTrackThree}`} ref={relatedRef} onScroll={updateActiveIndex} role="region" aria-label="Другое оборудование для подготовки" tabIndex={0}>
              {related.map((system) => (
                <article className={Styles.relatedCard} key={system.id}>
                  <a href={`/products/preparation-systems/${system.id}/`}>
                    <span className={Styles.relatedImage}><img src={system.image} alt={system.alt} loading="lazy" /></span>
                    <span className={Styles.relatedInfo}><strong>{system.title}</strong><span aria-hidden="true">↗</span></span>
                  </a>
                </article>
              ))}
            </div>
            <div className={Styles.relatedControls}>
              <span>Листайте карточки свайпом</span>
              <div><span aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / {String(related.length).padStart(2, '0')}</span>
                <button type="button" aria-label="Предыдущее изделие" disabled={activeIndex === 0} onClick={() => scrollToRelated(activeIndex - 1)}>←</button>
                <button type="button" aria-label="Следующее изделие" disabled={activeIndex === related.length - 1} onClick={() => scrollToRelated(activeIndex + 1)}>→</button>
              </div>
            </div>
          </div>
        </section>

        <section className={Styles.bottomCta} aria-labelledby="next-title">
          <div className={Styles.container}>
            <div><span className={Styles.eyebrow}>Выбор системы</span><h2 id="next-title">Нужно оборудование для другой задачи?</h2><p>Посмотрите весь раздел систем подготовки.</p></div>
            <a href="/products/preparation-systems/">Все решения <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
      <BackToTop />
      {bigPhoto && <BigPhoto src={productImage.src} onClose={() => setBigPhoto(false)} />}
    </div>
  );
};
