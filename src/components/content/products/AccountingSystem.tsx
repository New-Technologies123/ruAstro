import { useEffect, useRef, useState } from 'react';

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
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Флаг программной прокрутки по кнопке.
  // Пока карточка доезжает до позиции, onScroll не меняет activeIndex.
  const isProgrammaticScroll = useRef(false);

  // Таймер завершения программной прокрутки.
  const scrollTimerRef = useRef<number | null>(null);

  // requestAnimationFrame для ограничения количества setState.
  const rafRef = useRef<number | null>(null);

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

  const updateActiveIndex = () => {
    const track = trackRef.current;

    if (!track) return;

    // Во время программной прокрутки activeIndex уже установлен
    // кнопкой и не должен прыгать вслед за промежуточными scroll-событиями.
    if (isProgrammaticScroll.current) {
      return;
    }

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

      const scrollLeft = currentTrack.scrollLeft;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - scrollLeft);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((current) =>
        current === closestIndex ? current : closestIndex
      );
    });
  };

  const scrollToModel = (index: number) => {
    const track = trackRef.current;

    if (!track) return;

    const card = track.children.item(index) as HTMLElement | null;

    if (!card) return;

    // Защита от выхода за границы.
    const safeIndex = Math.max(
      0,
      Math.min(index, models.length - 1)
    );

    const targetCard = track.children.item(
      safeIndex
    ) as HTMLElement | null;

    if (!targetCard) return;

    // Отменяем предыдущий таймер.
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }

    // Блокируем обработку промежуточных scroll-событий.
    isProgrammaticScroll.current = true;

    // Сразу показываем правильный номер.
    // Он больше не будет прыгать 01 → 02 → 01 во время smooth scroll.
    setActiveIndex(safeIndex);

    // offsetLeft уже учитывает положение элемента внутри scroll-контейнера.
    // Это стабильнее, чем комбинация getBoundingClientRect() + scrollLeft.
    const targetLeft = targetCard.offsetLeft;

    track.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });

    // После завершения анимации снова разрешаем
    // определять activeIndex по свайпу.
    scrollTimerRef.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;

      // Финально синхронизируем состояние с реальной позицией.
      updateActiveIndex();
    }, 450);
  };

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
                <span aria-hidden="true">↗</span>
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
              onScroll={updateActiveIndex}
            >
              {models.map((model) => (
                <EquipmentCard
                  key={model.id}
                  item={model}
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
                  {String(models.length).padStart(2, '0')}
                </span>

                <button
                  type="button"
                  aria-label="Предыдущее исполнение"
                  disabled={activeIndex === 0}
                  onClick={() =>
                    scrollToModel(activeIndex - 1)
                  }
                >
                  ←
                </button>

                <button
                  type="button"
                  aria-label="Следующее исполнение"
                  disabled={
                    activeIndex === models.length - 1
                  }
                  onClick={() =>
                    scrollToModel(activeIndex + 1)
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
                      models.length) *
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
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <BackToTop />
    </div>
  );
};