import { ArrowUpRight, CategoryCarouselControls, useCategoryCarousel } from '../../ui/carousel/CategoryCarousel';

import Styles from './accounting.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { EquipmentCard } from '../../ui/equipment-card/EquipmentCard';

import transferImage from '../../../images/products/product_5.webp';
import multiphaseImage from '../../../images/products/product_5_1.webp';

const stations = [
  {
    id: 'internal',
    number: '01',
    label: 'Перекачка нефти',
    title:
      'Блочная насосная станция внутренней и внешней перекачки нефти',
    description:
      'Решение для технологической и межобъектовой перекачки нефти с контролем рабочих параметров.',
    image: transferImage.src,
    href: '/products/pumping-stations/internal/',
  },
  {
    id: 'multiphase',
    number: '02',
    label: 'Мультифазная перекачка',
    title: 'Блочная мультифазная насосная станция',
    description:
      'Установка для перекачки многофазной продукции скважин в промысловых условиях.',
    image: multiphaseImage.src,
    href: '/products/pumping-stations/multiphase/',
  },
] as const;

export const PumpingStations = () => {
  const { trackRef, activeIndex, scrollToCard } = useCategoryCarousel(stations.length);

  return (
    <div className={Styles.page}>
      <main>
        <section
          className={Styles.hero}
          aria-labelledby="pumping-title"
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

              <span aria-hidden="true">›</span>

              <span aria-current="page">
                Насосные станции
              </span>
            </nav>

            <h1 id="pumping-title">
              Насосные станции{' '}
              <em>для нефтегазовых объектов</em>
            </h1>

            <p className={Styles.heroDescription}>
              Блочные решения для перекачки нефти и
              многофазной продукции скважин. Конфигурацию
              подбирают под параметры объекта.
            </p>

            <div className={Styles.heroActions}>
              <a
                className={Styles.primaryButton}
                href="#equipment"
              >
                Смотреть станции{' '}
                <ArrowUpRight />
              </a>

              <a
                className={Styles.secondaryButton}
                href="/contact/"
              >
                Обсудить задачу{' '}
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className={Styles.heroFacts}>
              <span>
                <strong>2</strong> типа станций
              </span>

              <span>
                Перекачка нефти и многофазной продукции
              </span>

              <span>Производство в Уфе</span>
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
                  Выберите насосную станцию
                </h2>
              </div>

              <p>
                Откройте исполнение, чтобы посмотреть
                назначение и технические материалы.
              </p>
            </div>

            <div
              ref={trackRef}
              className={`${Styles.cards} ${Styles.cardsTwo}`}
              role="region"
              aria-label="Насосные станции"
              tabIndex={0}
            >
              {stations.map((station) => (
                <EquipmentCard
                  key={station.id}
                  item={station}
                />
              ))}
            </div>

            <CategoryCarouselControls
              labels={stations.map((item) => item.label)}
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
                02 / Применение
              </span>

              <h2 id="details-title">
                Станция под технологическую задачу
              </h2>

              <p>
                Состав, исполнение и рабочие параметры станции
                определяют по условиям эксплуатации и
                требованиям объекта.
              </p>
            </div>

            <div className={Styles.detailsList}>
              <div>
                <span>01</span>
                <strong>Перекачка</strong>
                <p>
                  Выбор насосного решения под рабочую среду
                  и режим объекта.
                </p>
              </div>

              <div>
                <span>02</span>
                <strong>Блочное исполнение</strong>
                <p>
                  Компоновка оборудования в составе готовой
                  станции.
                </p>
              </div>

              <div>
                <span>03</span>
                <strong>Контроль</strong>
                <p>
                  Отслеживание рабочих параметров в
                  технологическом процессе.
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
                Подберём станцию под параметры проекта
              </h2>

              <p>
                Расскажите о среде, производительности и
                условиях эксплуатации.
              </p>
            </div>

            <a href="/contact/">
              Обсудить проект{' '}
              <ArrowUpRight />
            </a>
          </div>
        </section>
      </main>

      <BackToTop />
    </div>
  );
};