import { useState } from 'react';

import Styles from '../products.module.scss';
import productImage from '../../../../images/products/product_5_1.webp';
import relatedImage from '../../../../images/products/product_5.webp';
import { BigPhoto } from '../../../ui/big-photo/BigPhoto';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

const features = [
  { title: "Многофазный поток", text: "Работа с газожидкостной смесью без предварительной сепарации." },
  { title: "Насосные агрегаты", text: "Мультифазные агрегаты подбираются под режим эксплуатации." },
  { title: "Блочное исполнение", text: "Оборудование размещается в составе насосной станции." },
  { title: "Автоматизация", text: "Система управления контролирует работу насосных агрегатов." },
  { title: "Противоаварийная защита", text: "ПАЗ участвует в защите технологического процесса." },
  { title: "Управление режимом", text: "Частотные преобразователи помогают настраивать режим работы." },
] as const;

const composition = [
  { title: "Насосный блок", text: "Мультифазные насосные агрегаты, запорная арматура, технологические и дренажные трубопроводы." },
  { title: "Блок-бокс", text: "Помещение насосной станции с отоплением, вентиляцией и электроснабжением." },
  { title: "Контроль и защита", text: "КИПиА, система управления агрегатами, ПАЗ и блок частотных преобразователей." },
  { title: "Передача данных", text: "Передача информации на верхний уровень управления." },
] as const;

const related = { id: 'internal', title: 'Станция перекачки нефти', image: relatedImage.src, alt: 'Блочная насосная станция перекачки нефти' };

export const Multiphase = () => {
  const [bigPhoto, setBigPhoto] = useState(false);

  return (
    <div className={Styles.page}>
      <main>
        <section className={Styles.hero} aria-labelledby="product-title">
          <div className={Styles.container}>
            <nav className={Styles.breadcrumbs} aria-label="Хлебные крошки">
              <a href="/products/">Продукция</a><span aria-hidden="true">›</span>
              <a href="/products/pumping-stations/">Насосные станции</a><span aria-hidden="true">›</span>
              <span aria-current="page">Мультифазная станция</span>
            </nav>
            <div className={Styles.heroGrid}>
              <div className={Styles.heroContent}>
                <span className={Styles.eyebrow}>Перекачка многофазной продукции</span>
                <h1 id="product-title">Блочная мультифазная <em>насосная станция</em></h1>
                <p className={Styles.heroDescription}>Перекачивает газожидкостную смесь из скважин без предварительной сепарации газа.</p>
                <div className={Styles.heroActions}>
                  <a className={Styles.primaryButton} href="#features">Возможности станции <span aria-hidden="true">↗</span></a>
                  <a className={Styles.secondaryButton} href="/documents/?category=pumping-stations">Документация <span aria-hidden="true">→</span></a>
                </div>
                <div className={Styles.heroNote}><span className={Styles.noteDot} aria-hidden="true" />Газожидкостная смесь · блочное исполнение · ПАЗ</div>
              </div>
              <div className={Styles.productVisual}>
                <button className={Styles.photoButton} type="button" onClick={() => setBigPhoto(true)} aria-label="Открыть крупное фото: Мультифазная станция">
                  <img src={productImage.src} alt="Блочная мультифазная насосная станция" className={Styles.productImage} />
                  <span className={Styles.zoomButton} aria-hidden="true">Увеличить фото ↗</span>
                </button>
                <span className={Styles.visualCaption}>Мультифазная станция · насосная станция</span>
              </div>
            </div>
          </div>
        </section>

        <section className={Styles.purpose} id="features" aria-labelledby="features-title">
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div><span className={Styles.eyebrow}>01 / Назначение</span><h2 id="features-title">Возможности станции</h2></div>
              <p>Перекачка многофазной продукции в промысловых условиях.</p>
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
              <span className={Styles.eyebrow}>02 / Состав станции</span>
              <h2 id="composition-title">Типовой состав станции</h2>
              <p>В составе объединены насосное, технологическое и управляющее оборудование.</p>
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
              <p>Откройте материалы по насосным станциям.</p>
            </div>
            <div className={Styles.documentsGrid}>
              <a className={Styles.materialCard} href="/documents/?category=pumping-stations">
                <span className={Styles.materialIcon} aria-hidden="true">↗</span>
                <span><strong>Документация по насосным станциям</strong><small>Открыть раздел документов</small></span>
                <span className={Styles.materialArrow} aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className={Styles.relatedSection} aria-labelledby="related-title">
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div><span className={Styles.eyebrow}>04 / Насосные станции</span><h2 id="related-title">Смотрите также</h2></div>
              <p>Станция для внутренней и внешней перекачки нефти.</p>
            </div>
            <div className={`${Styles.relatedTrack} ${Styles.relatedTrackOne}`}>
              <article className={Styles.relatedCard}>
                <a href={`/products/pumping-stations/${related.id}/`}>
                  <span className={Styles.relatedImage}><img src={related.image} alt={related.alt} loading="lazy" /></span>
                  <span className={Styles.relatedInfo}><strong>{related.title}</strong><span aria-hidden="true">↗</span></span>
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className={Styles.bottomCta} aria-labelledby="next-title">
          <div className={Styles.container}>
            <div><span className={Styles.eyebrow}>Выбор станции</span><h2 id="next-title">Подберём станцию под вашу задачу</h2><p>Посмотрите оба исполнения насосных станций.</p></div>
            <a href="/products/pumping-stations/">Все станции <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
      <BackToTop />
      {bigPhoto && <BigPhoto src={productImage.src} onClose={() => setBigPhoto(false)} />}
    </div>
  );
};
