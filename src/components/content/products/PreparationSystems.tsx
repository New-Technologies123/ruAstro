import { useEffect, useRef, useState } from 'react';

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
  const trackRef = useRef<HTMLDivElement | null>(null);

  /**
   * Когда true — пользователь нажал кнопку
   * и сейчас выполняется программный smooth-scroll.
   *
   * onScroll в этот момент не должен менять activeIndex.
   */
  const isProgrammaticScroll = useRef(false);

  /**
   * Таймер окончания программного скролла.
   */
  const scrollTimerRef = useRef<number | null>(null);

  /**
   * RAF для ограничения количества пересчётов
   * activeIndex во время ручного свайпа.
   */
  const rafRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * Очистка таймеров при размонтировании компонента.
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
   * Определяем карточку, которая находится ближе
   * всего к текущей позиции scrollLeft.
   *
   * Во время программного scroll ничего не меняем,
   * чтобы кнопка не вызывала скачки 01 → 02 → 01.
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

      setActiveIndex((previousIndex) =>
        previousIndex === closestIndex
          ? previousIndex
          : closestIndex,
      );
    });
  };

  /**
   * Плавный переход к выбранной карточке.
   */
  const scrollToSystem = (index: number) => {
    const track = trackRef.current;

    if (!track) return;

    /**
     * Не позволяем уйти за границы массива.
     */
    const safeIndex = Math.max(
      0,
      Math.min(index, systems.length - 1),
    );

    const card = track.children.item(
      safeIndex,
    ) as HTMLElement | null;

    if (!card) return;

    /**
     * Останавливаем предыдущий таймер.
     */
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }

    /**
     * Останавливаем ожидающий RAF.
     */
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    /**
     * Самое важное:
     * блокируем обработку onScroll.
     */
    isProgrammaticScroll.current = true;

    /**
     * Номер меняется сразу и больше не прыгает
     * во время smooth-scroll.
     */
    setActiveIndex(safeIndex);

    const computedStyle = getComputedStyle(track);

    const paddingLeft =
      parseFloat(computedStyle.paddingLeft) || 0;

    /**
     * Позиция карточки относительно scroll-контейнера.
     *
     * Учитываем padding-left карусели,
     * чтобы карточка попадала точно в начало.
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
     * После завершения анимации снова разрешаем
     * ручное определение активной карточки.
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
              onScroll={updateActiveIndex}
            >
              {systems.map((system) => (
                <EquipmentCard
                  key={system.id}
                  item={system}
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
                  {String(systems.length).padStart(2, '0')}
                </span>

                <button
                  type="button"
                  aria-label="Предыдущее изделие"
                  disabled={activeIndex === 0}
                  onClick={() =>
                    scrollToSystem(activeIndex - 1)
                  }
                >
                  ←
                </button>

                <button
                  type="button"
                  aria-label="Следующее изделие"
                  disabled={
                    activeIndex === systems.length - 1
                  }
                  onClick={() =>
                    scrollToSystem(activeIndex + 1)
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
                      systems.length) *
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
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <BackToTop />
    </div>
  );
};