import { useEffect, useRef, useState } from 'react';

import Styles from './accounting.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { EquipmentCard } from '../../ui/equipment-card/EquipmentCard';

import ervipImage from '../../../images/products/product_2.webp';
import urpdImage from '../../../images/products/urpd.webp';
import psmImage from '../../../images/products/product_2_2.webp';
import kmrImage from '../../../images/products/product_2_3.webp';
import driveImage from '../../../images/products/product_2_4.webp';
import separatorImage from '../../../images/products/product_2_5.webp';

const accessories = [
  {
    id: 'ervip',
    number: '01',
    label: 'Измерение',
    title: 'Вихревой расходомер ЭРВИП',
    description:
      'Прибор для измерения расхода рабочей среды в технологической линии.',
    image: ervipImage.src,
    href: '/products/accessories/ervip/',
  },
  {
    id: 'urpd',
    number: '02',
    label: 'Регулирование',
    title: 'Устройство регулирования перепада давления (УРПД)',
    description:
      'Регулирование перепада давления в составе технологической системы.',
    image: urpdImage.src,
    href: '/products/accessories/urpd/',
  },
  {
    id: 'psm',
    number: '03',
    label: 'Переключение',
    title: 'Переключатель скважин многоходовой (ПСМ)',
    description:
      'Последовательное подключение скважин к измерительному контуру.',
    image: psmImage.src,
    href: '/products/accessories/psm/',
  },
  {
    id: 'kmr',
    number: '04',
    label: 'Управление потоком',
    title: 'Магниторегулируемый клапан (КМР)',
    description:
      'Управление потоком рабочей среды в технологической линии.',
    image: kmrImage.src,
    href: '/products/accessories/kmr/',
  },
  {
    id: 'gidroprivod',
    number: '05',
    label: 'Привод',
    title: 'Гидропривод (ГП)',
    description:
      'Привод исполнительных механизмов технологического оборудования.',
    image: driveImage.src,
    href: '/products/accessories/gidroprivod/',
  },
  {
    id: 'separation',
    number: '06',
    label: 'Сепарация',
    title: 'Сепарационная ёмкость',
    description:
      'Ёмкость для разделения продукции нефтяных скважин.',
    image: separatorImage.src,
    href: '/products/accessories/separation/',
  },
] as const;

export const Accessories = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * true только во время программной прокрутки
   * по нажатию на стрелку.
   *
   * Пока карточка плавно едет к нужной позиции,
   * onScroll не будет менять activeIndex.
   */
  const isProgrammaticScroll = useRef(false);

  /*
   * Таймер окончания smooth scroll.
   */
  const scrollTimerRef = useRef<number | null>(null);

  /*
   * requestAnimationFrame для ограничения количества
   * перерасчётов activeIndex во время свайпа.
   */
  const rafRef = useRef<number | null>(null);

  /*
   * Очистка таймеров и animation frame
   * при размонтировании компонента.
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

  /*
   * Определяем карточку, которая сейчас находится
   * ближе всего к началу scroll-контейнера.
   *
   * Эта функция используется именно при обычном
   * свайпе пальцем.
   */
  const updateActiveIndex = () => {
    const track = trackRef.current;

    if (!track) return;

    /*
     * Если сейчас выполняется программная прокрутка
     * по стрелке, не трогаем activeIndex.
     */
    if (isProgrammaticScroll.current) {
      return;
    }

    /*
     * Не запускаем множество перерасчётов на каждый
     * scroll event.
     */
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = window.requestAnimationFrame(() => {
      const currentTrack = trackRef.current;

      if (!currentTrack) return;

      const cards = Array.from(
        currentTrack.children
      ) as HTMLElement[];

      if (!cards.length) return;

      const currentScrollLeft = currentTrack.scrollLeft;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        /*
         * offsetLeft работает стабильнее,
         * чем getBoundingClientRect() при мобильном
         * horizontal carousel.
         */
        const distance = Math.abs(
          card.offsetLeft - currentScrollLeft
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      /*
       * Не вызываем setState, если индекс уже тот же.
       */
      setActiveIndex((current) =>
        current === closestIndex
          ? current
          : closestIndex
      );
    });
  };

  /*
   * Переход к конкретной карточке.
   */
  const scrollToAccessory = (index: number) => {
    const track = trackRef.current;

    if (!track) return;

    /*
     * Защита от выхода за пределы массива.
     */
    const safeIndex = Math.max(
      0,
      Math.min(
        index,
        accessories.length - 1
      )
    );

    const card = track.children.item(
      safeIndex
    ) as HTMLElement | null;

    if (!card) return;

    /*
     * Отменяем предыдущий таймер,
     * если пользователь быстро нажал стрелку повторно.
     */
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(
        scrollTimerRef.current
      );
    }

    /*
     * Блокируем onScroll.
     */
    isProgrammaticScroll.current = true;

    /*
     * Сразу показываем нужный номер.
     *
     * Например:
     *
     * 01 / 06
     *     ↓
     * 02 / 06
     *
     * Номер больше не будет прыгать обратно
     * во время smooth scroll.
     */
    setActiveIndex(safeIndex);

    /*
     * offsetLeft даёт стабильную координату
     * карточки внутри горизонтального контейнера.
     */
    const targetLeft = card.offsetLeft;

    /*
     * Плавно перемещаем carousel.
     */
    track.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });

    /*
     * После завершения анимации снова разрешаем
     * onScroll определять активную карточку.
     *
     * 450ms достаточно для мобильной smooth-прокрутки.
     */
    scrollTimerRef.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;

      /*
       * Финальная синхронизация.
       */
      updateActiveIndex();
    }, 450);
  };

  return (
    <div className={Styles.page}>
      <main>

        {/* =================================================
            HERO
            ================================================= */}

        <section
          className={Styles.hero}
          aria-labelledby="accessories-title"
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
              <a href="/products/">
                Продукция
              </a>

              <span aria-hidden="true">
                /
              </span>

              <span aria-current="page">
                Комплектующие для АГЗУ
              </span>
            </nav>

            <h1 id="accessories-title">
              Комплектующие для{' '}
              <em>АГЗУ</em>
            </h1>

            <p className={Styles.heroDescription}>
              Изделия для измерения, регулирования,
              переключения и управления технологическими
              процессами в составе автоматизированных
              групповых замерных установок.
            </p>

            <div className={Styles.heroActions}>
              <a
                className={Styles.primaryButton}
                href="#equipment"
              >
                Смотреть комплектующие{' '}
                <span aria-hidden="true">
                  ↗
                </span>
              </a>

              <a
                className={Styles.secondaryButton}
                href="/contact/"
              >
                Обсудить подбор{' '}
                <span aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            <div className={Styles.heroFacts}>
              <span>
                <strong>6</strong> видов изделий
              </span>

              <span>
                Для комплектации и модернизации
              </span>

              <span>
                Производство в Уфе
              </span>
            </div>

          </div>
        </section>


        {/* =================================================
            COLLECTION
            ================================================= */}

        <section
          className={Styles.collection}
          id="equipment"
          aria-labelledby="equipment-title"
        >
          <div className={Styles.container}>

            <div className={Styles.sectionHeading}>
              <div>
                <span className={Styles.eyebrow}>
                  01 / Ассортимент
                </span>

                <h2 id="equipment-title">
                  Выберите комплектующее
                </h2>
              </div>

              <p>
                Откройте изделие, чтобы посмотреть
                характеристики и документацию.
              </p>
            </div>


            {/* =================================================
                CAROUSEL
                ================================================= */}

            <div
              ref={trackRef}
              className={Styles.cards}
              role="region"
              aria-label="Комплектующие для АГЗУ"
              tabIndex={0}
              onScroll={updateActiveIndex}
            >
              {accessories.map((accessory) => (
                <EquipmentCard
                  key={accessory.id}
                  item={accessory}
                />
              ))}
            </div>


            {/* =================================================
                CAROUSEL CONTROLS
                ================================================= */}

            <div className={Styles.carouselControls}>

              <span className={Styles.carouselHint}>
                Листайте карточки свайпом
              </span>

              <div className={Styles.carouselButtons}>

                <span
                  className={Styles.carouselCount}
                  aria-live="polite"
                >
                  {String(
                    activeIndex + 1
                  ).padStart(2, '0')}

                  {' / '}

                  {String(
                    accessories.length
                  ).padStart(2, '0')}
                </span>


                <button
                  type="button"
                  aria-label="Предыдущее изделие"
                  disabled={activeIndex === 0}
                  onClick={() =>
                    scrollToAccessory(
                      activeIndex - 1
                    )
                  }
                >
                  ←
                </button>


                <button
                  type="button"
                  aria-label="Следующее изделие"
                  disabled={
                    activeIndex ===
                    accessories.length - 1
                  }
                  onClick={() =>
                    scrollToAccessory(
                      activeIndex + 1
                    )
                  }
                >
                  →
                </button>

              </div>
            </div>


            {/* =================================================
                PROGRESS
                ================================================= */}

            <div
              className={Styles.carouselProgress}
              aria-hidden="true"
            >
              <span
                style={{
                  width: `${
                    (
                      (activeIndex + 1) /
                      accessories.length
                    ) * 100
                  }%`,
                }}
              />
            </div>

          </div>
        </section>


        {/* =================================================
            DETAILS
            ================================================= */}

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
                Компоненты для работы
                замерной установки
              </h2>

              <p>
                Изделия применяют при комплектации
                новых АГЗУ и модернизации действующего
                оборудования. Состав подбирают под
                параметры объекта.
              </p>

            </div>


            <div className={Styles.detailsList}>

              <div>
                <span>01</span>

                <strong>
                  Измерение
                </strong>

                <p>
                  Получение данных о расходе
                  и параметрах рабочей среды.
                </p>
              </div>


              <div>
                <span>02</span>

                <strong>
                  Регулирование
                </strong>

                <p>
                  Управление перепадом давления
                  и потоком в системе.
                </p>
              </div>


              <div>
                <span>03</span>

                <strong>
                  Переключение
                </strong>

                <p>
                  Подключение скважин
                  к измерительному контуру.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* =================================================
            CTA
            ================================================= */}

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
                Нужны комплектующие
                для вашей АГЗУ?
              </h2>

              <p>
                Опишите состав установки
                и условия эксплуатации —
                поможем с подбором.
              </p>

            </div>


            <a href="/contact/">
              Обсудить комплектацию{' '}
              <span aria-hidden="true">
                ↗
              </span>
            </a>

          </div>
        </section>

      </main>

      <BackToTop />
    </div>
  );
};