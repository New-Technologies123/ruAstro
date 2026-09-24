import { useEffect, useRef, useState } from 'react';

import { Repair } from './Repair';
import { Metering } from './Metering';
import { Service } from './Service';
import { Dewaxing } from './Dewaxing';

import serves_12 from '../../../images/services/serves_12.png';
import serves_3 from '../../../images/services/serves_3.webp';
import serves_4 from '../../../images/services/serves_4.webp';
import serves_5 from '../../../images/services/serves_5.webp';

import { BackToTop } from '../../ui/back-to-top/BackToTop';

import styles from './services.module.scss';

type TServices =
  | 'repair'
  | 'metering'
  | 'service'
  | 'dewaxing';

type ServiceItem = {
  number: string;
  slug: TServices;
  title: string;
  shortTitle: string;
  description: string;
  tags: string[];
  image: string;
};

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    slug: 'repair',
    title:
      'Обслуживание, капитальный ремонт и модернизация АГЗУ',
    shortTitle: 'Обслуживание и ремонт АГЗУ',
    description:
      'Техническое обслуживание, капитальный ремонт и модернизация автоматизированных групповых замерных установок.',
    tags: [
      'Обслуживание',
      'Ремонт',
      'Модернизация',
    ],
    image: serves_12.src,
  },
  {
    number: '02',
    slug: 'metering',
    title:
      'Замер дебита нефтяных скважин с помощью мобильной замерной установки',
    shortTitle: 'Мобильный замер дебита',
    description:
      'Проведение мобильных измерений дебита нефтяных скважин с подготовкой оборудования и оформлением результатов.',
    tags: [
      'Измерения',
      'Мобильная установка',
      'Документация',
    ],
    image: serves_3.src,
  },
  {
    number: '03',
    slug: 'service',
    title:
      'Обслуживание устройства очистки колонны УОК-НКТ',
    shortTitle: 'Обслуживание УОК-НКТ',
    description:
      'Диагностика и техническое обслуживание механических, электрических и управляющих компонентов установки.',
    tags: [
      'Диагностика',
      'Автоматика',
      'Обслуживание',
    ],
    image: serves_4.src,
  },
  {
    number: '04',
    slug: 'dewaxing',
    title:
      'Услуги депарафинизации нефтяных скважин',
    shortTitle: 'Депарафинизация скважин',
    description:
      'Удаление асфальтосмолопарафиновых отложений с применением специализированного оборудования и инструмента.',
    tags: [
      'АСПО',
      'Скважины',
      'Спецоборудование',
    ],
    image: serves_5.src,
  },
];

const SCROLL_POSITION_KEY =
  'services_scroll_position';

const SELECTED_CARD_KEY =
  'services_selected_card';

const FROM_SERVICE_KEY =
  'from_service_page';

const pathnameToService = (
  pathname: string,
): TServices | null => {
  const parts = pathname
    .split('/')
    .filter(Boolean);

  if (
    parts.length === 2 &&
    parts[0] === 'services'
  ) {
    const service = parts[1] as TServices;

    if (
      service === 'repair' ||
      service === 'metering' ||
      service === 'service' ||
      service === 'dewaxing'
    ) {
      return service;
    }
  }

  return null;
};

export const Services = () => {
  const [currentPage, setCurrentPage] =
    useState<TServices | null>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPage = () => {
      setCurrentPage(
        pathnameToService(
          window.location.pathname,
        ),
      );
    };

    syncPage();

    window.addEventListener(
      'popstate',
      syncPage,
    );

    return () => {
      window.removeEventListener(
        'popstate',
        syncPage,
      );
    };
  }, []);

  const goToService = (
    slug: TServices,
    index: number,
  ) => {
    sessionStorage.setItem(
      SELECTED_CARD_KEY,
      String(index),
    );

    sessionStorage.setItem(
      FROM_SERVICE_KEY,
      'true',
    );

    if (trackRef.current) {
      sessionStorage.setItem(
        SCROLL_POSITION_KEY,
        String(
          trackRef.current.scrollLeft,
        ),
      );
    }

    window.location.href =
      `/services/${slug}/`;
  };

  /*
   * Возвращаем пользователя к выбранной карточке
   * после возврата со страницы услуги.
   */
  useEffect(() => {
    if (currentPage !== null) {
      return;
    }

    const savedFromService =
      sessionStorage.getItem(
        FROM_SERVICE_KEY,
      );

    const savedIndex =
      sessionStorage.getItem(
        SELECTED_CARD_KEY,
      );

    if (
      savedFromService !== 'true' ||
      savedIndex === null
    ) {
      return;
    }

    const index = Number(savedIndex);

    if (
      !Number.isFinite(index) ||
      index < 0 ||
      index >= SERVICES.length
    ) {
      sessionStorage.removeItem(
        FROM_SERVICE_KEY,
      );

      sessionStorage.removeItem(
        SELECTED_CARD_KEY,
      );

      sessionStorage.removeItem(
        SCROLL_POSITION_KEY,
      );

      return;
    }

    requestAnimationFrame(() => {
      const track =
        trackRef.current;

      if (!track) {
        return;
      }

      const cards =
        track.querySelectorAll<HTMLElement>(
          '[data-service-card]',
        );

      const card = cards[index];

      if (!card) {
        return;
      }

      const left =
        card.offsetLeft -
        (track.clientWidth -
          card.clientWidth) /
        2;

      track.scrollTo({
        left,
        behavior: 'auto',
      });
    });

    sessionStorage.removeItem(
      FROM_SERVICE_KEY,
    );

    sessionStorage.removeItem(
      SELECTED_CARD_KEY,
    );

    sessionStorage.removeItem(
      SCROLL_POSITION_KEY,
    );
  }, [currentPage]);

  /*
   * На мобильном сохраняем положение
   * горизонтального скролла.
   *
   * Никаких стрелок, точек или ручного
   * переключения карточек здесь нет.
   */
  useEffect(() => {
    const track =
      trackRef.current;

    if (
      !track ||
      currentPage !== null
    ) {
      return;
    }

    const handleScroll = () => {
      sessionStorage.setItem(
        SCROLL_POSITION_KEY,
        String(track.scrollLeft),
      );
    };

    track.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      track.removeEventListener(
        'scroll',
        handleScroll,
      );
    };
  }, [currentPage]);

  if (currentPage === 'repair') {
    return <Repair />;
  }

  if (currentPage === 'metering') {
    return <Metering />;
  }

  if (currentPage === 'service') {
    return <Service />;
  }

  if (currentPage === 'dewaxing') {
    return <Dewaxing />;
  }

  return (
    <>
      <main className={styles.page}>

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <div
                className={styles.eyebrow}
              >
                <span
                  className={
                    styles.eyebrowLine
                  }
                />

                <span>
                  СЕРВИСНЫЕ УСЛУГИ
                </span>
              </div>

              <h1
                className={
                  styles.heroTitle
                }
              >
                Сервис и техническое
                <span>
                  {' '}
                  сопровождение
                </span>
              </h1>

              <p
                className={
                  styles.heroDescription
                }
              >
                Обслуживаем, ремонтируем
                и модернизируем
                нефтепромысловое
                оборудование, выполняем
                специализированные работы
                на скважинах и обеспечиваем
                техническое сопровождение
                оборудования на протяжении
                жизненного цикла.
              </p>

              <div
                className={
                  styles.heroActions
                }
              >
                <a
                  className={
                    styles.primaryButton
                  }
                  href="#services"
                >
                  Смотреть услуги
                  <span>↗</span>
                </a>

                <a
                  className={
                    styles.secondaryButton
                  }
                  href="/contact/"
                >
                  Обсудить сервисную задачу
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SERVICES
        ====================================================== */}

        <section
          className={
            styles.servicesSection
          }
          id="services"
        >
          <div
            className={
              styles.sectionHeading
            }
          >
            <div>
              <span
                className={
                  styles.sectionEyebrow
                }
              >
                01 / НАПРАВЛЕНИЯ
              </span>

              <h2>
                Сервисные решения
                <span>
                  {' '}
                  для промысловых объектов
                </span>
              </h2>
            </div>

            <p>
              От регламентного
              обслуживания и ремонта
              до специализированных
              измерительных
              и технологических работ.
            </p>
          </div>

          <div
            className={
              styles.servicesCarousel
            }
          >
            <div
              className={
                styles.cardsTrack
              }
              ref={trackRef}
            >
              {SERVICES.map(
                (service, index) => (
                  <article
                    key={service.slug}
                    className={
                      styles.serviceCard
                    }
                    data-service-card
                    tabIndex={0}
                    role="button"
                    onClick={() =>
                      goToService(
                        service.slug,
                        index,
                      )
                    }
                    onKeyDown={(
                      event,
                    ) => {
                      if (
                        event.key ===
                        'Enter' ||
                        event.key ===
                        ' '
                      ) {
                        event.preventDefault();

                        goToService(
                          service.slug,
                          index,
                        );
                      }
                    }}
                  >
                    <div
                      className={
                        styles.cardImageWrap
                      }
                    >
                      <img
                        src={service.image}
                        alt={
                          service.shortTitle
                        }
                        className={
                          styles.cardImage
                        }
                        loading={
                          index === 0
                            ? 'eager'
                            : 'lazy'
                        }
                      />

                      <div
                        className={
                          styles.cardNumber
                        }
                      >
                        {service.number}
                      </div>
                    </div>

                    <div
                      className={
                        styles.cardContent
                      }
                    >
                      <h3>
                        {
                          service.shortTitle
                        }
                      </h3>

                      <p>
                        {
                          service.description
                        }
                      </p>

                      <div
                        className={
                          styles.cardTags
                        }
                      >
                        {service.tags.map(
                          (tag) => (
                            <span
                              key={tag}
                            >
                              {tag}
                            </span>
                          ),
                        )}
                      </div>

                      <div
                        className={
                          styles.cardLink
                        }
                      >
                        Подробнее
                        <span>→</span>
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>

            {/* Подсказка только для мобильных */}
            <div
              className={
                styles.swipeHint
              }
              aria-hidden="true"
            >
              <span
                className={
                  styles.swipeHintLine
                }
              />

              <span>
                Смахните, чтобы увидеть
                другие услуги
              </span>

              <span
                className={
                  styles.swipeHintArrow
                }
              >
                →
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            WORKFLOW
        ====================================================== */}

        <section
          className={
            styles.workflowSection
          }
        >
          <div
            className={
              styles.sectionHeading
            }
          >
            <div>
              <span
                className={
                  styles.sectionEyebrow
                }
              >
                02 / ПРОЦЕСС
              </span>

              <h2>
                От технической задачи
                <span>
                  {' '}
                  до результата
                </span>
              </h2>
            </div>

            <p>
              Организуем сервисные работы
              последовательно: от анализа
              объекта и подготовки
              оборудования до выполнения
              работ и оформления
              результатов.
            </p>
          </div>

          <div
            className={
              styles.workflowGrid
            }
          >
            <div
              className={
                styles.workflowItem
              }
            >
              <span>01</span>

              <div>
                <h3>Заявка</h3>

                <p>
                  Получаем информацию
                  об объекте,
                  оборудовании
                  и необходимом виде
                  работ.
                </p>
              </div>
            </div>

            <div
              className={
                styles.workflowItem
              }
            >
              <span>02</span>

              <div>
                <h3>
                  Анализ задачи
                </h3>

                <p>
                  Определяем состав
                  работ, оборудование
                  и необходимые
                  ресурсы.
                </p>
              </div>
            </div>

            <div
              className={
                styles.workflowItem
              }
            >
              <span>03</span>

              <div>
                <h3>Подготовка</h3>

                <p>
                  Формируем
                  технический план,
                  комплектуем
                  оборудование
                  и персонал.
                </p>
              </div>
            </div>

            <div
              className={
                styles.workflowItem
              }
            >
              <span>04</span>

              <div>
                <h3>Выполнение</h3>

                <p>
                  Проводим
                  обслуживание,
                  ремонт, измерения
                  или
                  специализированные
                  работы.
                </p>
              </div>
            </div>

            <div
              className={
                styles.workflowItem
              }
            >
              <span>05</span>

              <div>
                <h3>Результат</h3>

                <p>
                  Передаём результаты
                  выполненных работ
                  и необходимую
                  техническую
                  документацию.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            EXPERTISE
        ====================================================== */}

        <section
          className={
            styles.expertiseSection
          }
        >
          <div
            className={
              styles.expertiseIntro
            }
          >
            <span
              className={
                styles.sectionEyebrow
              }
            >
              03 / КОМПЕТЕНЦИИ
            </span>

            <h2>
              Инженерный подход
              <span>
                {' '}
                к сервису
              </span>
            </h2>

            <p>
              Сервисное направление
              объединяет
              производственную базу,
              техническую экспертизу
              и специализированное
              оборудование для работы
              с нефтепромысловыми
              объектами.
            </p>
          </div>

          <div className={styles.expertiseGrid}>
            <div className={styles.expertiseItem}>
              <span>01</span>

              <h3>Диагностика</h3>

              <p>
                Определяем техническое
                состояние оборудования
                и состав необходимых
                работ.
              </p>
            </div>

            <div className={styles.expertiseItem}>
              <span>02</span>

              <h3>Ремонт</h3>

              <p>
                Выполняем обслуживание
                и восстановление
                работоспособности
                оборудования.
              </p>
            </div>

            <div className={styles.expertiseItem}>
              <span>03</span>

              <h3>Модернизация</h3>

              <p>
                Обновляем оборудование
                с учётом технической
                задачи и требований
                объекта.
              </p>
            </div>

            <div className={styles.expertiseItem}>
              <span>04</span>
              <h3>
                Специализированные работы
              </h3>

              <p>
                Выполняем мобильные
                измерения,
                депарафинизацию
                и другие сервисные
                задачи.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ====================================================== */}

        <section className={styles.ctaSection}>
          <div className={styles.ctaInner}>
            <div>
              <span className={styles.sectionEyebrow}>
                04 / ОБСУДИМ ЗАДАЧУ
              </span>

              <h2>
                Нужен сервис
                <span>
                  {' '} для вашего объекта?
                </span>
              </h2>

              <p>
                Передайте нам информацию
                об оборудовании или
                необходимом виде работ.
                Специалисты помогут
                определить оптимальный
                состав сервисных работ.
              </p>
            </div>

            <div className={styles.ctaActions}>
              <a href="/contact/" className={styles.ctaButton}>
                Обсудить сервисную задачу
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <BackToTop />
    </>
  );
};