import { Breadcrumbs } from '../../ui/breadcrumbs/Breadcrumbs';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import Styles from './about.module.scss';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { ArrowUpRightIcon } from '../../ui/icon/ArrowUpRightIcon';
import latestNewsPhoto from '../../../images/news/news_17.webp';

const STATS = [
  {
    value: 20,
    suffix: '+',
    label: 'лет',
    text: 'опыта в нефтегазовой отрасли',
  },
  {
    value: 31404,
    suffix: '',
    label: 'м²',
    text: 'собственной производственной базы',
  },
  {
    value: 79,
    suffix: '',
    label: 'единиц',
    text: 'вездеходной техники',
  },
  {
    value: 200,
    suffix: '+',
    label: 'проектов',
    text: 'реализовано в России и странах СНГ',
  },
  {
    value: 100,
    suffix: '%',
    label: 'безопасность',
    text: 'внимание к требованиям HSE на всех этапах работы',
  },
];

const DIRECTIONS = [
  {
    number: '01',
    title: 'Проектирование',
    text: 'Разработка технологических решений под конкретные условия эксплуатации.',
  },
  {
    number: '02',
    title: 'Производство',
    text: 'Изготовление блочно-модульного оборудования на собственной производственной площадке в Уфе, Республика Башкортостан.',
  },
  {
    number: '03',
    title: 'Комплектация',
    text: 'Подготовка оборудования и технологических систем для промысловых объектов.',
  },
  {
    number: '04',
    title: 'Поставка',
    text: 'Организация поставки и сопровождение проекта до передачи оборудования заказчику.',
  },
];

const COMPETENCIES = [
  'Инженерная экспертиза',
  'Собственное производство',
  'Комплексная комплектация',
  'Промысловое исполнение',
];

const COMPANY_LINKS = [
  {
    title: 'Новости',
    text: 'События предприятия, проекты и участие в отраслевых мероприятиях.',
    href: '/news/',
  },
  {
    title: 'Документы',
    text: 'Техническая и эксплуатационная документация по направлениям продукции.',
    href: '/documents/',
  },
  {
    title: 'Карьера',
    text: 'Открытые вакансии и возможности работать в нашей команде.',
    href: '/careers/',
  },
];

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('ru-RU').format(
    Math.round(value)
  );
};

export const About = () => {
  const statsRef = useRef<HTMLDivElement | null>(null);

  /* =====================================================
     SCROLL REVEAL
  ====================================================== */

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      `.${Styles.animateOnScroll}`
    );

    if (!elements.length) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
      elements.forEach((element) => {
        element.classList.add(Styles.visible);
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(Styles.visible);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  /* =====================================================
     COUNTERS
  ====================================================== */

  useEffect(() => {
    const statsElement = statsRef.current;

    if (!statsElement) return;

    const counterElements =
      statsElement.querySelectorAll<HTMLElement>(
        '[data-counter]'
      );

    if (!counterElements.length) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animationFrame: number | null = null;

    const setFinalValues = () => {
      counterElements.forEach((element) => {
        const value = Number(
          element.dataset.counter || 0
        );

        const suffix =
          element.dataset.suffix || '';

        element.textContent =
          `${formatNumber(value)}${suffix}`;
      });
    };

    if (reduceMotion) {
      setFinalValues();

      return;
    }

    const runCounters = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      counterElements.forEach((element) => {
        const suffix =
          element.dataset.suffix || '';

        element.textContent = `0${suffix}`;
      });

      const duration = 1600;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed =
          currentTime - startTime;

        const progress = Math.min(
          elapsed / duration,
          1
        );

        const easedProgress =
          1 - Math.pow(1 - progress, 3);

        counterElements.forEach((element) => {
          const target = Number(
            element.dataset.counter || 0
          );

          const suffix =
            element.dataset.suffix || '';

          const currentValue =
            target * easedProgress;

          element.textContent =
            `${formatNumber(currentValue)}${suffix}`;
        });

        if (progress < 1) {
          animationFrame =
            requestAnimationFrame(animate);
        } else {
          animationFrame = null;

          setFinalValues();
        }
      };

      animationFrame =
        requestAnimationFrame(animate);
    };

    const counterObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCounters();
              counterObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.35,
        }
      );

    counterObserver.observe(statsElement);

    return () => {
      counterObserver.disconnect();

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <main className={Styles.aboutPage}>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className={Styles.heroSection}>
        <div className={Styles.heroGlow} />
        <div className={Styles.heroGrid} />

        <div className={Styles.heroInner}>
          <div className={Styles.heroMain}>
            <div className={Styles.heroCopy}>
              <Breadcrumbs path="/about/" />
              <div className={Styles.heroBadge}>
                <span />
                Работаем с 2005 года
              </div>

              <h1 className={Styles.heroTitle}>
                Инженерия, которая работает
                <span> на результат.</span>
              </h1>

              <p className={Styles.heroText}>
                Инженерно-производственное предприятие полного
                цикла. Проектируем и производим оборудование для
                нефтегазовой отрасли — от инженерной задачи до
                готового решения для промыслового объекта.
              </p>
            </div>

            <div className={Styles.heroAside}>
              <div className={Styles.heroAsideLine} />

              <div className={Styles.heroFact}>
                <span>Производственная база</span>
                <strong>31 404 м² · Уфа</strong>
              </div>

              <div className={Styles.heroFact}>
                <span>Расположение производства</span>
                <strong>
                  Республика Башкортостан
                </strong>
              </div>

              <div className={Styles.heroFact}>
                <span>Основное направление</span>
                <strong>
                  Нефтегазовое оборудование
                </strong>
              </div>

              <div className={Styles.heroFact}>
                <span>География проектов</span>
                <strong>Россия · СНГ</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section
        className={`${Styles.introSection} ${Styles.animateOnScroll}`}
      >
        <div className={Styles.container}>
          <div className={Styles.sectionLabel}>
            О предприятии
          </div>

          <div className={Styles.introGrid}>
            <h2 className={Styles.introTitle}>
              Создаём оборудование, рассчитанное на
              <em> реальную эксплуатацию.</em>
            </h2>

            <div className={Styles.introText}>
              <p>
                ООО ИПП «Новые Технологии» специализируется
                на разработке, производстве и поставке
                технологического оборудования для обустройства
                нефтегазовых месторождений.
              </p>

              <p>
                Собственная производственная площадка расположена
                в Уфе, Республика Башкортостан. Мы объединяем
                инженерную экспертизу, производство и комплексную
                комплектацию в одном проектном цикле, контролируя
                качество решения на каждом этапе — от технического
                задания до поставки оборудования заказчику.
              </p>

              <div className={Styles.introMeta}>
                <span>Уфа · Башкортостан</span>
                <i />
                <span>Россия</span>
                <i />
                <span>СНГ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}

      <section
        className={`${Styles.statsSection} ${Styles.animateOnScroll}`}
        ref={statsRef}
      >
        <div className={Styles.container}>
          <div className={Styles.statsHeader}>
            <div>
              <div className={Styles.sectionLabel}>
                Компания в цифрах
              </div>

              <h2>
                Масштаб, который можно
                <em> измерить.</em>
              </h2>
            </div>

            <p>
              Опыт, производственные ресурсы и реализованные
              проекты формируют основу наших инженерных решений.
            </p>
          </div>

          <div className={Styles.statsGrid}>
            {STATS.map((stat, index) => (
              <article
                className={Styles.statItem}
                key={`${stat.value}-${stat.label}`}
                style={
                  {
                    '--delay': `${index * 100}ms`,
                  } as CSSProperties
                }
              >
                <div className={Styles.statTop}>
                  <span className={Styles.statIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className={Styles.statLabel}>
                    {stat.label}
                  </span>
                </div>

                <div
                  className={Styles.statValue}
                  data-counter={stat.value}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </div>

                <p>{stat.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FULL CYCLE
      ====================================================== */}

      <section className={Styles.cycleSection}>
        <div className={Styles.container}>
          <div className={Styles.cycleHeader}>
            <div className={Styles.sectionLabel}>
              Полный цикл
            </div>

            <h2>
              От инженерной задачи
              <br />{' '}
              до <em>готового оборудования.</em>
            </h2>

            <p>
              Собственная производственная база в Уфе позволяет
              объединять инженерные и производственные компетенции
              внутри одного предприятия.
            </p>
          </div>

          <div className={Styles.directionList}>
            {DIRECTIONS.map((direction, index) => (
              <div
                className={`${Styles.directionItem} ${Styles.animateOnScroll}`}
                key={direction.number}
                data-motion-ignore
                style={{ '--delay': `${index * 140}ms` } as CSSProperties}
              >
                <span
                  className={Styles.directionNumber}
                >
                  {direction.number}
                </span>

                <div className={Styles.directionMain}>
                  <h3>{direction.title}</h3>

                  <p>{direction.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          COMPETENCIES
      ====================================================== */}

      <section className={Styles.competenciesSection}>
        <div className={Styles.container}>
          <div className={Styles.competenciesHeader}>
            <div className={Styles.sectionLabel} data-motion-text>
              Компетенции
            </div>

            <h2>
              Компетенции, собранные
              <em> в одном цикле.</em>
            </h2>

            <p>
              Мы объединяем ключевые этапы проекта внутри
              предприятия, чтобы сохранять управляемость,
              качество и соответствие требованиям заказчика.
            </p>
          </div>

          <div className={Styles.competenciesGrid}>
            {COMPETENCIES.map((item, index) => (
              <div
                className={`${Styles.competencyItem} ${Styles.animateOnScroll}`}
                key={item}
                style={
                  {
                    '--delay': `${index * 140}ms`,
                  } as CSSProperties
                }
              >
                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={Styles.companyLinksSection} aria-labelledby="company-links-title">
        <div className={Styles.container}>
          <div className={Styles.companyLinksHeader}>
            <div className={Styles.sectionLabel}>Другие разделы</div>
            <h2 id="company-links-title">Продолжить знакомство.</h2>
          </div>

          <nav className={Styles.companyLinksGrid} aria-label="Другие разделы компании">
            <a className={`${Styles.companyNewsLink} ${Styles.animateOnScroll}`} href={COMPANY_LINKS[0].href} data-motion-ignore>
              <img
                src={latestNewsPhoto.src}
                width={latestNewsPhoto.width}
                height={latestNewsPhoto.height}
                alt="Команда компании на выставке KIOGE 2026"
                loading="lazy"
              />
              <div className={Styles.companyNewsCaption}>
                <div>
                  <span className={Styles.companyLinkEyebrow}>События компании</span>
                  <h3>{COMPANY_LINKS[0].title}</h3>
                  <p>{COMPANY_LINKS[0].text}</p>
                </div>
                <span className={Styles.companyLinkArrow}><ArrowUpRightIcon /></span>
              </div>
            </a>

            <div className={Styles.companyLinksAside}>
              {COMPANY_LINKS.slice(1).map((link, index) => (
                <a
                  className={`${Styles.companySideLink} ${Styles.animateOnScroll}`}
                  href={link.href}
                  key={link.href}
                  data-motion-ignore
                  style={{ '--delay': `${(index + 1) * 130}ms` } as CSSProperties}
                >
                  <div className={Styles.companySideLinkTop}>
                    <span className={Styles.companyLinkEyebrow}>{index === 0 ? 'Документация' : 'Команда'}</span>
                    <span className={Styles.companyLinkArrow}><ArrowUpRightIcon /></span>
                  </div>
                  <div className={Styles.companySideLinkBody}>
                    <h3>{link.title}</h3>
                    <p>{link.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA          
      ====================================================== */}

      <section className={Styles.finalSection}>
        <div className={Styles.finalGlow} />
        <div className={Styles.finalGrid} />

        <div className={Styles.container}>
          <div
            className={`${Styles.finalContent} ${Styles.animateOnScroll}`}
          >
            <span className={Styles.finalEyebrow}>
              ООО ИПП «НОВЫЕ ТЕХНОЛОГИИ»
            </span>

            <h2>
              От инженерной идеи до оборудования
              <span> на объекте.</span>
            </h2>

            <p>
              Инженерные и производственные решения
              для нефтегазовой отрасли.
            </p>

            <div className={Styles.finalMeta}>
              <span>УФА · БАШКОРТОСТАН</span>

              <i />

              <span>РОССИЯ</span>

              <i />

              <span>С 2005 ГОДА</span>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </main>
  );
};
