import { useEffect, useRef, useState } from 'react';

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
  const trackRef = useRef<HTMLDivElement | null>(null);

  /**
   * Во время программного smooth-scroll
   * onScroll не должен менять activeIndex.
   */
  const isProgrammaticScroll = useRef(false);

  /**
   * Таймер завершения программного перехода.
   */
  const scrollTimerRef = useRef<number | null>(null);

  /**
   * Ограничиваем количество пересчётов
   * activeIndex во время ручного свайпа.
   */
  const rafRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * Очистка таймеров при размонтировании.
   */
  useEffect(() => {
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  /**
   * Определяем ближайшую карточку к текущей позиции
   * горизонтального скролла.
   *
   * Во время программного перехода функция заблокирована.
   */
  const updateActiveIndex = () => {
    if (isProgrammaticScroll.current) return;

    const track = trackRef.current;

    if (!track) return;

    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = window.requestAnimationFrame(() => {
      const currentTrack = trackRef.current;

      if (!currentTrack || isProgrammaticScroll.current) {
        return;
      }

      const cards = Array.from(
        currentTrack.children,
      ) as HTMLElement[];

      if (!cards.length) return;

      const currentScrollLeft =
        currentTrack.scrollLeft;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(
          card.offsetLeft - currentScrollLeft,
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      /**
       * Не вызываем setState, если индекс уже тот же.
       */
      setActiveIndex((previousIndex) =>
        previousIndex === closestIndex
          ? previousIndex
          : closestIndex,
      );
    });
  };

  /**
   * Переход к выбранной станции.
   */
  const scrollToStation = (index: number) => {
    const track = trackRef.current;

    if (!track) return;

    /**
     * Защита от выхода за границы.
     */
    const safeIndex = Math.max(
      0,
      Math.min(index, stations.length - 1),
    );

    const card = track.children.item(
      safeIndex,
    ) as HTMLElement | null;

    if (!card) return;

    /**
     * Отменяем предыдущий таймер.
     */
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }

    /**
     * Отменяем ожидающий RAF.
     */
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    /**
     * Блокируем onScroll.
     */
    isProgrammaticScroll.current = true;

    /**
     * Сразу устанавливаем нужную станцию.
     *
     * Поэтому номер 01 / 02 не будет прыгать
     * во время smooth-анимации.
     */
    setActiveIndex(safeIndex);

    const computedStyle = getComputedStyle(track);

    const paddingLeft =
      parseFloat(computedStyle.paddingLeft) || 0;

    /**
     * Рассчитываем точную позицию карточки
     * внутри scroll-контейнера.
     */
    const targetLeft = Math.max(
      0,
      card.offsetLeft - paddingLeft,
    );

    track.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });

    /**
     * После окончания анимации снова разрешаем
     * обычную синхронизацию с ручным свайпом.
     */
    scrollTimerRef.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;

      const currentTrack = trackRef.current;

      if (!currentTrack) return;

      const cards = Array.from(
        currentTrack.children,
      ) as HTMLElement[];

      if (!cards.length) return;

      const currentScrollLeft =
        currentTrack.scrollLeft;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((item, itemIndex) => {
        const distance = Math.abs(
          item.offsetLeft -
            paddingLeft -
            currentScrollLeft,
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = itemIndex;
        }
      });

      setActiveIndex((previousIndex) =>
        previousIndex === closestIndex
          ? previousIndex
          : closestIndex,
      );
    }, 500);
  };

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
                <span aria-hidden="true">↗</span>
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
              onScroll={updateActiveIndex}
            >
              {stations.map((station) => (
                <EquipmentCard
                  key={station.id}
                  item={station}
                />
              ))}
            </div>

            <div className={Styles.carouselControls}>
              <span className={Styles.carouselHint}>
                Листайте карточки свайпом
              </span>

              <div className={Styles.carouselButtons}>
                <span
                  className={Styles.carouselCount}
                  aria-live="polite"
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                  {' / '}
                  {String(stations.length).padStart(2, '0')}
                </span>

                <button
                  type="button"
                  aria-label="Предыдущая станция"
                  disabled={activeIndex === 0}
                  onClick={() =>
                    scrollToStation(activeIndex - 1)
                  }
                >
                  ←
                </button>

                <button
                  type="button"
                  aria-label="Следующая станция"
                  disabled={
                    activeIndex === stations.length - 1
                  }
                  onClick={() =>
                    scrollToStation(activeIndex + 1)
                  }
                >
                  →
                </button>
              </div>
            </div>

            <div
              className={Styles.carouselProgress}
              aria-hidden="true"
            >
              <span
                style={{
                  width: `${
                    ((activeIndex + 1) /
                      stations.length) *
                    100
                  }%`,
                }}
              />
            </div>
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
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <BackToTop />
    </div>
  );
};