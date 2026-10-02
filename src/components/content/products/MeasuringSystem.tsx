import { useEffect, useRef, useState } from 'react';

import Styles from './accounting.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { EquipmentCard } from '../../ui/equipment-card/EquipmentCard';

import oilImage from '../../../images/products/product_3.webp';
import gasImage from '../../../images/products/product_3_1.webp';
import waterImage from '../../../images/products/product_3_2.webp';

const systems = [
  {
    id: 'oil',
    number: '01',
    label: 'Нефть',
    title: 'Система измерения количества и показателей качества нефти (СИКН)',
    description:
      'Измерение количества и показателей качества нефти при приёме и сдаче.',
    image: oilImage.src,
    href: '/products/measuring-system/oil/',
  },
  {
    id: 'gas',
    number: '02',
    label: 'Газ',
    title: 'Система измерения количества газа (СИКГ)',
    description:
      'Автоматизированное измерение количества газа и передача данных контроля.',
    image: gasImage.src,
    href: '/products/measuring-system/gas/',
  },
  {
    id: 'water',
    number: '03',
    label: 'Вода',
    title: 'Система измерения количества воды (СИКВ)',
    description:
      'Контроль количества пластовой и подготовленной воды в технологической системе.',
    image: waterImage.src,
    href: '/products/measuring-system/water/',
  },
] as const;

export const MeasuringSystem = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Блокирует пересчёт activeIndex во время программного скролла
  const isProgrammaticScroll = useRef(false);

  // Таймер завершения программного скролла
  const scrollTimerRef = useRef<number | null>(null);

  // RAF для обновления activeIndex без лишних setState
  const rafRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

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
   * Определяем ближайшую к левой границе карточку.
   *
   * Во время программного перехода функция ничего не делает,
   * чтобы onScroll не перебивал activeIndex.
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

      const currentScrollLeft = currentTrack.scrollLeft;

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
   * Переход к конкретной карточке.
   *
   * Главное отличие от старой версии:
   * activeIndex фиксируется сразу, а onScroll временно
   * не имеет права менять его во время smooth-scroll.
   */
  const scrollToSystem = (index: number) => {
    const track = trackRef.current;

    if (!track) return;

    const safeIndex = Math.max(
      0,
      Math.min(index, systems.length - 1),
    );

    const card = track.children.item(
      safeIndex,
    ) as HTMLElement | null;

    if (!card) return;

    // Отменяем предыдущий таймер
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }

    // Отменяем ожидающий RAF
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    // Блокируем onScroll
    isProgrammaticScroll.current = true;

    // Сразу показываем нужный номер
    setActiveIndex(safeIndex);

    const computedStyle = getComputedStyle(track);

    const paddingLeft =
      parseFloat(computedStyle.paddingLeft) || 0;

    /**
     * offsetLeft уже находится относительно scroll-контейнера.
     * Вычитаем padding, чтобы карточка точно попадала
     * в начальную позицию карусели.
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
     * После завершения smooth-scroll снова разрешаем
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
          aria-labelledby="measuring-title"
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
                Измерительные системы
              </span>
            </nav>

            <h1 id="measuring-title">
              Измерительные системы{' '}
              <em>для нефти, газа и воды</em>
            </h1>

            <p className={Styles.heroDescription}>
              Оборудование для измерения количества продукции
              и передачи данных в системы технологического
              контроля.
            </p>

            <div className={Styles.heroActions}>
              <a
                className={Styles.primaryButton}
                href="#equipment"
              >
                Смотреть системы{' '}
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
                <strong>3</strong> типа систем
              </span>

              <span>Нефть · газ · вода</span>

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
                  Выберите измерительную систему
                </h2>
              </div>

              <p>
                На странице изделия доступны его назначение,
                характеристики и документация.
              </p>
            </div>

            <div
              ref={trackRef}
              className={Styles.cards}
              role="region"
              aria-label="Системы измерения"
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
                  aria-label="Предыдущая система"
                  disabled={activeIndex === 0}
                  onClick={() =>
                    scrollToSystem(activeIndex - 1)
                  }
                >
                  ←
                </button>

                <button
                  type="button"
                  aria-label="Следующая система"
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
                02 / Назначение
              </span>

              <h2 id="details-title">
                Данные для учёта и контроля
              </h2>

              <p>
                Состав измерительной системы подбирают под
                рабочую среду, технологическую схему и
                требования конкретного объекта.
              </p>
            </div>

            <div className={Styles.detailsList}>
              <div>
                <span>01</span>
                <strong>Измерение</strong>
                <p>
                  Получение данных о количестве нефти, газа
                  или воды.
                </p>
              </div>

              <div>
                <span>02</span>
                <strong>Контроль</strong>
                <p>
                  Наблюдение за параметрами в технологическом
                  процессе.
                </p>
              </div>

              <div>
                <span>03</span>
                <strong>Передача данных</strong>
                <p>
                  Использование результатов в системах учёта
                  и анализа.
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
                Нужна система измерения для вашего проекта?
              </h2>

              <p>
                Расскажите о рабочей среде и требованиях к
                учёту — обсудим конфигурацию.
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