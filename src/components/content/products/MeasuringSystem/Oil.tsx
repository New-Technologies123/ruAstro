import { useRef, useState } from 'react';

import Styles from '../products.module.scss';
import productImage from '../../../../images/products/product_3.webp';
import gasImage from '../../../../images/products/product_3_1.webp';
import waterImage from '../../../../images/products/product_3_2.webp';
import { BigPhoto } from '../../../ui/big-photo/BigPhoto';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

const features = [
  { title: 'Измерение количества', text: 'Автоматизированное измерение количества нефти и нефтепродуктов.' },
  { title: 'Контроль качества', text: 'Определение плотности, вязкости и влагосодержания нефти.' },
  { title: 'Параметры среды', text: 'Измерение давления и температуры рабочей среды.' },
  { title: 'Отбор проб', text: 'Отбор объединённой пробы нефти для контроля качества.' },
  { title: 'Передача данных', text: 'Передача результатов в систему автоматизации и на рабочее место оператора.' },
  { title: 'Конфигурация', text: 'Возможность применения объёмных, массовых или ультразвуковых расходомеров.' },
] as const;

const composition = [
  { title: 'Измерение', text: 'Расходомеры определяют количество проходящей нефти.' },
  { title: 'Контроль качества', text: 'Приборы и пробоотборное оборудование дают данные о составе и свойствах.' },
  { title: 'Рабочее место', text: 'Результаты архивируются и отображаются оператору.' },
] as const;

const related = [
  { id: 'gas', title: 'СИКГ · Газ', image: gasImage.src, alt: 'Система измерения газа СИКГ' },
  { id: 'water', title: 'СИКВ · Вода', image: waterImage.src, alt: 'Система измерения воды СИКВ' },
] as const;

export const Oil = () => {
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
              <a href="/products/measuring-system/">Измерительные системы</a><span aria-hidden="true">›</span>
              <span aria-current="page">СИКН</span>
            </nav>
            <div className={Styles.heroGrid}>
              <div className={Styles.heroContent}>
                <span className={Styles.eyebrow}>Измерение и учёт нефти</span>
                <h1 id="product-title">Система измерения количества и показателей качества нефти <em>СИКН</em></h1>
                <p className={Styles.heroDescription}>
                  Система для автоматизированного измерения количества нефти и нефтепродуктов,
                  а также определения их основных показателей качества.
                </p>
                <div className={Styles.heroActions}>
                  <a className={Styles.primaryButton} href="#features">Назначение системы <span aria-hidden="true">↗</span></a>
                  <a className={Styles.secondaryButton} href="/documents/?category=measuring-system">Документация <span aria-hidden="true">→</span></a>
                </div>
                <div className={Styles.heroNote}><span className={Styles.noteDot} aria-hidden="true" />Количество · качество · передача данных</div>
              </div>
              <div className={Styles.productVisual}>
                <button className={Styles.photoButton} type="button" onClick={() => setBigPhoto(true)} aria-label="Открыть крупное фото СИКН">
                  <img src={productImage.src} alt="Система измерения количества и качества нефти СИКН" className={Styles.productImage} />
                  <span className={Styles.zoomButton} aria-hidden="true">Увеличить фото ↗</span>
                </button>
                <span className={Styles.visualCaption}>СИКН · система измерения нефти</span>
              </div>
            </div>
          </div>
        </section>

        <section className={Styles.purpose} id="features" aria-labelledby="features-title">
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div><span className={Styles.eyebrow}>01 / Назначение</span><h2 id="features-title">Возможности СИКН</h2></div>
              <p>Измерение количества нефти и контроль показателей качества.</p>
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
              <span className={Styles.eyebrow}>02 / Работа системы</span>
              <h2 id="composition-title">Измерение и обработка данных</h2>
              <p>Система учитывает количество нефти, контролирует её свойства и передаёт результаты в систему автоматизации.</p>
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
              <p>Откройте раздел материалов по измерительным системам.</p>
            </div>
            <div className={Styles.documentsGrid}>
              <a className={Styles.materialCard} href="/documents/?category=measuring-system">
                <span className={Styles.materialIcon} aria-hidden="true">↗</span>
                <span><strong>Документация по измерительным системам</strong><small>Открыть раздел документов</small></span>
                <span className={Styles.materialArrow} aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className={Styles.relatedSection} aria-labelledby="related-title">
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div><span className={Styles.eyebrow}>04 / Измерительные системы</span><h2 id="related-title">Смотрите также</h2></div>
              <p>Системы измерения газа и воды.</p>
            </div>
            <div className={`${Styles.relatedTrack} ${Styles.relatedTrackTwo}`} ref={relatedRef} onScroll={updateActiveIndex} role="region" aria-label="Другие измерительные системы" tabIndex={0}>
              {related.map((system) => (
                <article className={Styles.relatedCard} key={system.id}>
                  <a href={`/products/measuring-system/${system.id}/`}>
                    <span className={Styles.relatedImage}><img src={system.image} alt={system.alt} loading="lazy" /></span>
                    <span className={Styles.relatedInfo}><strong>{system.title}</strong><span aria-hidden="true">↗</span></span>
                  </a>
                </article>
              ))}
            </div>
            <div className={Styles.relatedControls}>
              <span>Листайте карточки свайпом</span>
              <div><span aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / 02</span>
                <button type="button" aria-label="Предыдущая система" disabled={activeIndex === 0} onClick={() => scrollToRelated(activeIndex - 1)}>←</button>
                <button type="button" aria-label="Следующая система" disabled={activeIndex === related.length - 1} onClick={() => scrollToRelated(activeIndex + 1)}>→</button>
              </div>
            </div>
          </div>
        </section>

        <section className={Styles.bottomCta} aria-labelledby="next-title">
          <div className={Styles.container}>
            <div><span className={Styles.eyebrow}>Выбор системы</span><h2 id="next-title">Нужна система для другого продукта?</h2><p>Посмотрите все измерительные системы.</p></div>
            <a href="/products/measuring-system/">Все системы <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
      <BackToTop />
      {bigPhoto && <BigPhoto src={productImage.src} onClose={() => setBigPhoto(false)} />}
    </div>
  );
};
