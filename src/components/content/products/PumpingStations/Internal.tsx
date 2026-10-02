import { useState } from 'react';

import Styles from '../products.module.scss';
import productImage from '../../../../images/products/product_5.webp';
import relatedImage from '../../../../images/products/product_5_1.webp';
import { BigPhoto } from '../../../ui/big-photo/BigPhoto';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';

const features = [
  { title: "Перекачка", text: "Работа в системах сбора, подготовки и транспортировки нефти." },
  { title: "Автоматизация", text: "Средства управления и КИП контролируют рабочие параметры." },
  { title: "Безопасность", text: "Предусмотрены сигнализация, контроль загазованности и пожаротушение." },
  { title: "Блочное исполнение", text: "Компоновка облегчает транспортировку и монтаж станции." },
  { title: "Разные агрегаты", text: "Состав насосного оборудования подбирается под параметры объекта." },
  { title: "Обслуживание", text: "Доступ к оборудованию для эксплуатации и ремонта." },
] as const;

const composition = [
  { title: "Насосная часть", text: "Насосные агрегаты, приёмный и нагнетательный коллекторы, запорная арматура и дренажные трубопроводы." },
  { title: "Безопасность", text: "Пожарная сигнализация, контроль загазованности и система пенного пожаротушения." },
  { title: "Автоматизация", text: "КИП, управление подпорными насосами и передача информации на верхний уровень." },
  { title: "Инфраструктура", text: "Электроснабжение, системы жизнеобеспечения блок-бокса и грузоподъёмные устройства." },
] as const;

const related = { id: 'multiphase', title: 'Мультифазная станция', image: relatedImage.src, alt: 'Блочная мультифазная насосная станция' };

export const Internal = () => {
  const [bigPhoto, setBigPhoto] = useState(false);

  return (
    <div className={Styles.page}>
      <main>
        <section className={Styles.hero} aria-labelledby="product-title">
          <div className={Styles.container}>
            <nav className={Styles.breadcrumbs} aria-label="Хлебные крошки">
              <a href="/products/">Продукция</a><span aria-hidden="true">›</span>
              <a href="/products/pumping-stations/">Насосные станции</a><span aria-hidden="true">›</span>
              <span aria-current="page">Перекачка нефти</span>
            </nav>
            <div className={Styles.heroGrid}>
              <div className={Styles.heroContent}>
                <span className={Styles.eyebrow}>Внутренняя и внешняя перекачка</span>
                <h1 id="product-title">Блочная насосная станция <em>перекачки нефти</em></h1>
                <p className={Styles.heroDescription}>Транспортирует нефть, нефтепродукты и конденсат в системах сбора и подготовки, при внутрипарковой и внешней перекачке.</p>
                <div className={Styles.heroActions}>
                  <a className={Styles.primaryButton} href="#features">Возможности станции <span aria-hidden="true">↗</span></a>
                  <a className={Styles.secondaryButton} href="/documents/?category=pumping-stations">Документация <span aria-hidden="true">→</span></a>
                </div>
                <div className={Styles.heroNote}><span className={Styles.noteDot} aria-hidden="true" />Центробежные насосы · блочное исполнение · автоматизация</div>
              </div>
              <div className={Styles.productVisual}>
                <button className={Styles.photoButton} type="button" onClick={() => setBigPhoto(true)} aria-label="Открыть крупное фото: Перекачка нефти">
                  <img src={productImage.src} alt="Блочная насосная станция перекачки нефти" className={Styles.productImage} />
                  <span className={Styles.zoomButton} aria-hidden="true">Увеличить фото ↗</span>
                </button>
                <span className={Styles.visualCaption}>Перекачка нефти · насосная станция</span>
              </div>
            </div>
          </div>
        </section>

        <section className={Styles.purpose} id="features" aria-labelledby="features-title">
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div><span className={Styles.eyebrow}>01 / Назначение</span><h2 id="features-title">Возможности станции</h2></div>
              <p>Блочное решение для технологической перекачки нефти.</p>
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
              <p>Состав станции подбирают под рабочую среду, производительность и условия объекта.</p>
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
              <p>Мультифазная станция для перекачки продукции скважин.</p>
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
