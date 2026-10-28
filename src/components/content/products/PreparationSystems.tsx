import { ArrowUpRight, CategoryCarouselControls, useCategoryCarousel } from '../../ui/carousel/CategoryCarousel';

import Styles from './accounting.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { EquipmentCard } from '../../ui/equipment-card/EquipmentCard';

import launchImage from '../../../images/products/product_4.webp';
import blockImage from '../../../images/products/product_4_2.webp';
import cleaningImage from '../../../images/products/product_4_3.webp';
import dosingImage from '../../../images/products/product_4_4.webp';

const systems = [
  {
    id: 'launch',
    number: '01',
    label: 'Очистка трубопроводов',
    title:
      'Устройство запуска и приёма внутритрубных средств очистки и диагностики УЗПЗ, УЗПП',
    description:
      'Запуск и приём средств очистки и диагностики технологических трубопроводов.',
    image: launchImage.src,
    href: '/products/preparation-systems/launch/',
  },
  {
    id: 'block',
    number: '02',
    label: 'Распределение потоков',
    title: 'Блок гребенки (БГ)',
    description:
      'Распределение и управление потоками рабочей среды на объекте.',
    image: blockImage.src,
    href: '/products/preparation-systems/block/',
  },
  {
    id: 'cleaning',
    number: '03',
    label: 'Очистка НКТ',
    title: 'Устройство очистки колонны УОК-НКТ',
    description:
      'Очистка колонн насосно-компрессорных труб при эксплуатации оборудования.',
    image: cleaningImage.src,
    href: '/products/preparation-systems/cleaning/',
  },
  {
    id: 'dosing',
    number: '04',
    label: 'Дозирование',
    title: 'Установка дозирования химического реагента (БДР)',
    description:
      'Контролируемая подача химических реагентов в технологический процесс.',
    image: dosingImage.src,
    href: '/products/preparation-systems/dosing/',
  },
] as const;

export const PreparationSystems = () => {
  const { trackRef, activeIndex, scrollToCard } = useCategoryCarousel(systems.length);

  return (
    <div className={Styles.page}>
      <main>
        <section
          className={Styles.hero}
          aria-labelledby="preparation-title"
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
                Подготовка нефти, газа и воды
              </span>
            </nav>

            <h1 id="preparation-title">
              Системы подготовки{' '}
              <em>нефти, газа и воды</em>
            </h1>

            <p className={Styles.heroDescription}>
              Оборудование для технологической обвязки,
              очистки и дозирования на нефтегазовых объектах.
            </p>

            <div className={Styles.heroActions}>
              <a
                className={Styles.primaryButton}
                href="#equipment"
              >
                Смотреть оборудование{' '}
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
                <strong>4</strong> направления
              </span>

              <span>
                Очистка · обвязка · дозирование
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
                  Выберите решение для подготовки
                </h2>
              </div>

              <p>
                Откройте изделие, чтобы посмотреть назначение
                и технические материалы.
              </p>
            </div>

            <div
              ref={trackRef}
              className={`${Styles.cards} ${Styles.cardsFour}`}
              role="region"
              aria-label="Оборудование для подготовки"
              tabIndex={0}
            >
              {systems.map((system) => (
                <EquipmentCard
                  key={system.id}
                  item={system}
                />
              ))}
            </div>

            <CategoryCarouselControls
              labels={systems.map((item) => item.label)}
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
                Оборудование под технологическую схему
              </h2>

              <p>
                Состав системы определяется производственной
                задачей, рабочей средой и условиями эксплуатации
                конкретного объекта.
              </p>
            </div>

            <div className={Styles.detailsList}>
              <div>
                <span>01</span>
                <strong>Очистка</strong>
                <p>
                  Средства для работы с трубопроводами и
                  колоннами НКТ.
                </p>
              </div>

              <div>
                <span>02</span>
                <strong>Распределение</strong>
                <p>
                  Блоки для управления потоками рабочей среды.
                </p>
              </div>

              <div>
                <span>03</span>
                <strong>Дозирование</strong>
                <p>
                  Подача реагента в заданный технологический
                  процесс.
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
                Нужно оборудование для подготовки?
              </h2>

              <p>
                Опишите технологическую задачу — обсудим
                состав решения и исполнение.
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