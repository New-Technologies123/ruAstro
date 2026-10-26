import { memo, useCallback, useEffect } from 'react';
import Styles from './home.module.scss';
import { NEWS_DATA } from '../news/newsData';

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: '-0.1em' }}
    >
      <path d="M5 15 15 5M6 5h9v9" />
    </svg>
  );
const ArrowUpRight = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M5 15 15 5M6 5h9v9" />
  </svg>
);
}

const LOGOS = [
  '/images/home/ros.webp',
  '/images/home/gas.webp',
  '/images/home/nnk.webp',
  '/images/home/ink.webp',
  '/images/home/sur.webp',
  '/images/home/tat.webp',
  '/images/home/bel.webp',
  '/images/home/cas.webp',
  '/images/home/luc.webp',
  '/images/home/luc_ysb.webp',
];

const FAQ = [
  {
    question: 'Где найти техническую документацию?',
    answer:
      'Каталоги и технические материалы собраны в разделе документов. Если нужного файла нет, отправьте запрос через контакты.',
    link: '/documents',
    linkText: 'Перейти к документам',
  },
  {
    question: 'Как подобрать оборудование для моего объекта?',
    answer:
      'Опишите технологическую задачу и условия эксплуатации. По этим данным можно обсудить подходящее исполнение оборудования.',
    link: '/contact',
    linkText: 'Отправить запрос',
  },
  {
    question: 'В какие регионы осуществляется поставка?',
    answer:
      'Организуем поставки по России и в страны СНГ. География проекта определяется индивидуально с учётом объекта и логистики.',
    link: '/contact',
    linkText: 'Обсудить проект',
  },
  {
    question: 'Можно ли обсудить нестандартное решение?',
    answer:
      'Да. Опишите особенности объекта и требования к оборудованию через страницу контактов — это поможет начать техническое обсуждение.',
    link: '/contact',
    linkText: 'Связаться с нами',
  },
];

export const Home = memo(() => {
  const latestNews = NEWS_DATA[0];
  const latestNewsPhoto = latestNews?.photos[0];

  const handleNavigation = useCallback((path: string) => {
    window.location.href = path;
  }, []);

  const handleScrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        `.${Styles.animateOnScroll}`,
      ),
    );

    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) =>
        element.classList.add(Styles.visible),
      );
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
        rootMargin: '0px 0px -60px 0px',
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={Styles.page}>

      {/* HERO */}

      <section className={Styles.hero}>
        <div className={Styles.heroGlow} />

        <div className={Styles.heroGrid}>
          <div
            className={`${Styles.heroContent} ${Styles.animateOnScroll}`}
          >
            <div className={Styles.heroEyebrow}>
              <span className={Styles.liveDot} />
              <span>ООО ИПП «Новые Технологии»</span>
              <i />
            </div>

            <div className={Styles.heroHeading}>
              <h1>
                Инженерные
                <br />
                решения
                <strong>для нефтегазовой отрасли</strong>
              </h1>
            </div>

            <p className={Styles.heroDescription}>
              Проектируем, производим и поставляем оборудование
              для технологических процессов добычи, подготовки
              и транспортировки углеводородов.
            </p>

            <div className={Styles.heroActions}>
              <button
                type="button"
                className={Styles.primaryButton}
                onClick={() => handleScrollTo('directions')}
              >
                <span>Смотреть решения</span>
                <b><ArrowUpRight /></b>
              </button>

              <a className={Styles.heroSecondary} href="/contact">
                Обсудить проект <span aria-hidden="true"><ArrowUpRight /></span>
              </a>
            </div>

            <div className={Styles.heroStats}>
              <div>
                <strong>20+</strong>
                <span>лет в отрасли</span>
              </div>

              <div>
                <strong>80+</strong>
                <span>городов поставки</span>
              </div>

              <div>
                <strong>12+</strong>
                <span>стран</span>
              </div>
            </div>
          </div>

          <div
            className={`${Styles.heroVisual} ${Styles.animateOnScroll}`}
          >
            <div className={Styles.heroImageFrame}>
              <img
                src="/images/home/product.webp"
                alt="Оборудование для нефтегазовой отрасли"
                className={Styles.heroImage}
              />

              <div className={Styles.heroImageShade} />

              <div className={Styles.heroCoordinates}>
                <span>НТ/ 2026</span>
                <span>Уфа / Россия</span>
              </div>

              <div className={Styles.heroImageLabel}>
                <i />
                <span>Технические решения</span>
              </div>

              <div className={Styles.heroFloatingCard}>
                <span>Полный цикл</span>

                <strong>
                  От задачи
                  <br />
                  до поставки
                </strong>

                <div className={Styles.floatingProgress}>
                  <i />
                </div>

                <small>
                  Проектирование · производство · сервис
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className={Styles.heroFooter}>
          <span>01</span>

          <div className={Styles.heroFooterLine}>
            <i />
          </div>

          <div>
            <span>ИНЖИНИРИНГ</span>
            <span>ПРОИЗВОДСТВО</span>
            <span>ПОСТАВКА</span>
            <span>СЕРВИС</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}

      <section
        className={`${Styles.section} ${Styles.aboutSection} ${Styles.animateOnScroll}`}
      >
        <div className={Styles.container}>

          <div className={Styles.sectionTop}>
            <div className={Styles.kicker}>
              <span>02</span>
              <b>О компании</b>
            </div>

            <div className={Styles.sectionLine} />
          </div>

          <div className={Styles.aboutLayout}>
            <div>
              <h2 className={Styles.sectionTitle}>
                Технологии, которые работают
                <em> на результат.</em>
              </h2>
            </div>

            <div className={Styles.aboutMain}>
              <p className={Styles.aboutLead}>
                ООО ИПП «Новые Технологии» — российское инженерное
                предприятие, специализирующееся на технических
                решениях для нефтегазовой отрасли.
              </p>

              <p>
                Разрабатываем в том числе автоматизированные групповые
                замерные установки и решения для учёта продукции скважин.
                Подбираем оборудование под параметры конкретного объекта.
              </p>

              <button
                type="button"
                className={Styles.modernButton}
                onClick={() => handleNavigation('/about')}
              >
                <span>Подробнее о компании</span>
                <b><ArrowUpRight /></b>
              </button>
            </div>
          </div>

          <div className={Styles.aboutBottom}>
            <div className={Styles.aboutSideText}>
              <span>ПРАКТИЧЕСКИЙ ОПЫТ</span>
              <p>
                Работаем там, где важны точность, надёжность
                и предсказуемый результат.
              </p>
            </div>

            <button
              type="button"
              className={Styles.career}
              onClick={() => handleNavigation('/careers')}
            >
              <div>
                <span>КАРЬЕРА</span>
                <strong>
                  Создавайте решения
                  <br />
                  вместе с нами
                </strong>
              </div>

              <b><ArrowUpRight /></b>
            </button>
          </div>

          <div id="directions" className={Styles.capabilities}>
            <div className={Styles.capabilitiesHeader}>
              <span>ЧЕМ МЫ ЗАНИМАЕМСЯ</span>

              <p>
                Выберите направление, чтобы перейти
                к продукции или сервисным услугам.
              </p>
            </div>

            <div className={Styles.capabilityGrid}>
              {[
                {
                  number: '01',
                  title: 'Продукция',
                  text: 'Оборудование для добычи, подготовки и транспортировки углеводородов.',
                  href: '/products',
                  image: '/images/home/product.webp',
                },
                {
                  number: '02',
                  title: 'Сервисные услуги',
                  text: 'Техническое сопровождение и поддержка оборудования на протяжении жизненного цикла.',
                  href: '/services',
                  image: '/images/home/services.png',
                },
              ].map(({ number, title, text, href, image }) => (
                <a
                  className={Styles.capability}
                  key={number}
                  href={href}
                >
                  <div className={Styles.capabilityMedia}>
                    <img src={image} alt="" loading="lazy" />
                    <span>{number}</span>
                    <b aria-hidden="true"><ArrowUpRight /></b>
                  </div>

                  <div className={Styles.capabilityBody}>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GEOGRAPHY */}

      <section
        className={`${Styles.section} ${Styles.mapSection} ${Styles.animateOnScroll}`}
      >
        <div className={Styles.container}>

          <div className={Styles.mapHeader}>
            <div>
              <div className={Styles.kicker}>
                <span>03</span>
                <b>География</b>
              </div>

              <h2 className={Styles.sectionTitle}>
                Работаем там, где нужны
                <em> решения.</em>
              </h2>
            </div>

            <p>
              Организуем поставки оборудования и технических
              решений по всей России и в страны СНГ.
            </p>
          </div>

          <div className={Styles.mapLayout}>
            <div className={Styles.mapSide}>

              <div className={Styles.mapStats}>
                <div>
                  <strong>200+</strong>
                  <span>проектов</span>
                </div>
              </div>

              <button
                type="button"
                className={Styles.modernButton}
                onClick={() => handleNavigation('/contact')}
              >
                <span>Обсудить поставку</span>
                <b>→</b>
              </button>
            </div>

            <div className={Styles.mapFrame}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A1b8f65f94a276e996aad834e0a7f72466019818dd5d59a5f194f1d391a7e68ac&source=constructor"
                title="Карта географии поставок"
                loading="lazy"
                className={Styles.map}
              />
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}

      <section
        className={`${Styles.section} ${Styles.newsSection} ${Styles.animateOnScroll}`}
      >
        <div className={Styles.container}>

          <div className={Styles.newsHeader}>
            <div>
              <div className={Styles.kicker}>
                <span>04</span>
                <b>Новости</b>
              </div>

              <h2 className={Styles.sectionTitle}>
                Новости компании
                <em> и отрасли.</em>
              </h2>
            </div>

          </div>

          {latestNews && (
            <a
              className={Styles.newsTeaser}
              href={`/news/?news=${latestNews.id}`}
              aria-label={`Читать новость: ${latestNews.title}`}
            >
              <span className={Styles.newsTeaserEyebrow}>АКТУАЛЬНАЯ НОВОСТЬ</span>
              <div className={`${Styles.newsTeaserContent} ${latestNewsPhoto ? Styles.newsTeaserWithImage : ''}`}>
                {latestNewsPhoto && (
                  <div className={Styles.newsTeaserImage}>
                    <img
                      src={latestNewsPhoto.src}
                      alt={latestNewsPhoto.alt}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className={Styles.newsTeaserText}>
                  <div className={Styles.newsMeta}>
                    <span>{latestNews.date}</span>
                    <i />
                    <span>{latestNews.category}</span>
                  </div>
                  <h3>{latestNews.title}</h3>
                  <p>{latestNews.description}</p>
                </div>
                <span className={Styles.newsTeaserAction}>
                  Читать эту новость <b aria-hidden="true"><ArrowUpRight /></b>
                </span>
              </div>
            </a>
          )}

          <div className={Styles.newsFooter}>
            <div>
              <span>БОЛЬШЕ СОБЫТИЙ</span>
              <p>Проекты, выставки и новости компании — в общем архиве.</p>
            </div>
            <a className={Styles.newsAllButton} href="/news/">
              <span>Смотреть все новости</span>
              <b aria-hidden="true">→</b>
            </a>
          </div>

        </div>
      </section>

      {/* CLIENTS */}

      <section
        className={`${Styles.section} ${Styles.clientsSection} ${Styles.animateOnScroll}`}
      >
        <div className={Styles.container}>

          <div className={Styles.clientsHeader}>
            <div>
              <div className={Styles.kicker}>
                <span>05</span>
                <b>Клиенты</b>
              </div>

              <h2 className={Styles.sectionTitle}>
                Нам доверяют
                <em> отраслевые компании.</em>
              </h2>
            </div>

            <p>
              Партнёрство строится на качестве, технической
              компетенции и выполнении обязательств.
            </p>
          </div>

          <div className={Styles.brands}>
            <div className={Styles.brandsTrack}>
              {[...LOGOS, ...LOGOS].map((logo, index) => (
                <div
                  className={Styles.brand}
                  key={`${logo}-${index}`}
                >
                  <img
                    src={logo}
                    alt={`Партнёр ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}

      <section
        id="faq"
        className={`${Styles.section} ${Styles.faqSection} ${Styles.animateOnScroll}`}
      >
        <div className={Styles.container}>

          <div className={Styles.faqLayout}>

            <div className={Styles.faqIntro}>
              <div className={Styles.kicker}>
                <span>06</span>
                <b>Вопросы</b>
              </div>

              <h2 className={Styles.sectionTitle}>
                Частые
                <em> вопросы.</em>
              </h2>

              <p>
                Собрали ответы на основные вопросы.
                Если нужной информации нет — свяжитесь
                с нами напрямую.
              </p>

              <button
                type="button"
                className={Styles.primaryButton}
                onClick={() => handleNavigation('/contact')}
              >
                <span>Связаться с нами</span>
                <b><ArrowUpRight /></b>
              </button>
            </div>

            <div className={Styles.faqList}>
              {FAQ.map((item, index) => (
                <details
                  className={Styles.faqItem}
                  key={item.question}
                >
                  <summary>
                    <span className={Styles.faqNumber}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={Styles.faqQuestion}>{item.question}</span>

                    <b aria-hidden="true">+</b>
                  </summary>

                  <div className={Styles.faqAnswer}>
                    <p>{item.answer}</p>

                    <a href={item.link}>
                      {item.linkText}
                      <span><ArrowUpRight /></span>
                    </a>
                  </div>
                </details>
              ))}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
});

Home.displayName = 'Home';