import { ArrowUpRight, CategoryCarouselControls, useCategoryCarousel } from './CategoryCarousel';

import Styles from './accounting.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { EquipmentCard } from '../../ui/equipment-card/EquipmentCard';

import stationaryImage from '../../../images/products/product_1.webp';
import mobileImage from '../../../images/products/product_1_2.webp';

const models = [
  {
    id: 'stationary',
    number: '01',
    label: 'Стационарное исполнение',
    title: 'АГЗУ «Спутник — массомер НТ.1»',
    description:
      'Для постоянной эксплуатации на кустовых площадках и объектах нефтедобычи.',
    features: ['Постоянное размещение', 'Учёт продукции скважин'],
    image: stationaryImage.src,
    href: '/products/accounting-system/stationary/',
  },
  {
    id: 'mobile',
    number: '02',
    label: 'Мобильное исполнение',
    title: 'АГЗУ «Спутник — массомер НТ.1»',
    description:
      'Для временного размещения и оперативного перемещения между объектами.',
    features: ['Временное размещение', 'Перемещение между объектами'],
    image: mobileImage.src,
    href: '/products/accounting-system/mobile/',
  },
] as const;

export const AccountingSystem = () => {
  const { trackRef, activeIndex, scrollToCard } = useCategoryCarousel(models.length);

  return (
    <div className={Styles.page}>
      <main>
        <section
          className={Styles.hero}
          aria-labelledby="agzu-title"
        >
          <div
            className={Styles.heroPattern}
            aria-hidden="true"
          />

          <div className={Styles.container}>
            <nav
              className={Styles.breadcrumbs}
              aria-label="Хлебные крошки"
            >
              <a href="/products/">Продукция</a>

              <span aria-hidden="true">/</span>

              <span aria-current="page">АГЗУ</span>
            </nav>

            <h1 id="agzu-title">
              Автоматизированные групповые{' '}
              <em>замерные установки</em>
            </h1>

            <p className={Styles.heroDescription}>
              Оборудование для измерения продукции нефтяных
              скважин и контроля технологических параметров.
            </p>

            <div className={Styles.heroActions}>
              <a
                className={Styles.primaryButton}
                href="#equipment"
              >
                Смотреть исполнения{' '}
                <ArrowUpRight />
              </a>

              <a
                className={Styles.secondaryButton}
                href="/products/accounting-system/calculator/"
              >
                Рассчитать стоимость{' '}
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className={Styles.heroFacts}>
              <span>
                <strong>2</strong> исполнения
              </span>

              <span>
                Стационарное и мобильное
              </span>

              <span>
                Производство в Уфе
              </span>
            </div>
          </div>
        </section>

        <section
          className={Styles.collection}
          id="equipment"
          aria-labelledby="equipment-title"
        >
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div>
                <span className={Styles.eyebrow}>
                  01 / Оборудование
                </span>

                <h2 id="equipment-title">
                  Выберите исполнение АГЗУ
                </h2>
              </div>

              <p>
                Откройте модель, чтобы посмотреть
                характеристики, фото и документацию.
              </p>
            </div>

            <div
              ref={trackRef}
              className={`${Styles.cards} ${Styles.cardsTwo}`}
              role="region"
              aria-label="Исполнения АГЗУ"
              tabIndex={0}
            >
              {models.map((model) => (
                <EquipmentCard
                  key={model.id}
                  item={model}
                />
              ))}
            </div>

            <CategoryCarouselControls
              labels={models.map((item) => item.label)}
              activeIndex={activeIndex}
              onSelect={scrollToCard}
            />
          </div>
        </section>

        <section
          className={Styles.details}
          aria-labelledby="details-title"
        >
          <div className={Styles.container}>
            <div className={Styles.detailsIntro}>
              <span className={Styles.eyebrow}>
                02 / Назначение
              </span>

              <h2 id="details-title">
                Измерение и учёт продукции скважин
              </h2>

              <p>
                Установка измеряет массу и массовый расход
                скважинной жидкости. Конфигурацию подбирают
                под условия эксплуатации и требования объекта.
              </p>
            </div>

            <div className={Styles.detailsList}>
              <div>
                <span>01</span>
                <strong>Измерение</strong>
                <p>
                  Получение данных о массе и расходе
                  скважинной жидкости.
                </p>
              </div>

              <div>
                <span>02</span>
                <strong>Контроль</strong>
                <p>
                  Сбор технологических параметров
                  в процессе работы установки.
                </p>
              </div>

              <div>
                <span>03</span>
                <strong>Передача данных</strong>
                <p>
                  Подготовка измерительной информации
                  для учёта и анализа.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className={Styles.contactCta}
          aria-labelledby="contact-title"
        >
          <div className={Styles.container}>
            <div>
              <span className={Styles.eyebrow}>
                Подбор под объект
              </span>

              <h2 id="contact-title">
                Нужна конфигурация АГЗУ для вашего проекта?
              </h2>

              <p>
                Передайте параметры объекта — специалисты
                помогут выбрать исполнение.
              </p>
            </div>

            <a href="/products/accounting-system/calculator/">
              Рассчитать стоимость{' '}
              <ArrowUpRight />
            </a>
          </div>
        </section>
      </main>

      <BackToTop />
    </div>
  );
};