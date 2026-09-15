import { memo, useCallback, useEffect } from 'react';
import Styles from './home.module.scss';

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

const ADVANTAGES = [
  {
    number: '01',
    title: 'Инженерная экспертиза',
    text: 'Разрабатываем решения с учётом реальных условий эксплуатации и требований отрасли.',
  },
  {
    number: '02',
    title: 'Полный цикл',
    text: 'Проектирование, производство, поставка и сопровождение объединены в единую систему.',
  },
  {
    number: '03',
    title: 'География',
    text: 'Работаем с заказчиками по России и в странах СНГ, организуя поставки в сложные регионы.',
  },
  {
    number: '04',
    title: 'Ответственность',
    text: 'Контролируем качество на каждом этапе — от технического задания до ввода решения в эксплуатацию.',
  },
];

const FAQ = [
  {
    question: 'Какие решения мы поставляем?',
    answer:
      'Оборудование и комплексные технические решения для нефтегазовой отрасли. Подбираем конфигурацию под конкретную задачу, условия эксплуатации и требования заказчика.',
    link: '/products',
    linkText: 'Перейти к продукции',
  },
  {
    question: 'Какие услуги доступны заказчикам?',
    answer:
      'Проектирование, техническая консультация, поставка, сервисное сопровождение и другие работы, связанные с эксплуатацией оборудования.',
    link: '/services',
    linkText: 'Посмотреть услуги',
  },
  {
    question: 'В какие регионы осуществляется поставка?',
    answer:
      'Организуем поставки по России и в страны СНГ. География проекта определяется индивидуально с учётом объекта и логистики.',
    link: '/contact',
    linkText: 'Обсудить проект',
  },
  {
    question: 'Где найти техническую документацию?',
    answer:
      'Основные документы, каталоги и материалы доступны в специальном разделе сайта.',
    link: '/documents',
    linkText: 'Открыть документы',
  },
];

export const Home = memo(() => {
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
              <span>ENGINEERING</span>
            </div>

            <div className={Styles.heroHeading}>
              {/* <span className={Styles.heroIndex}>01 / 06</span> */}

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
                <b>↗</b>
              </button>

              <button
                type="button"
                className={Styles.secondaryButton}
                onClick={() => handleScrollTo('faq')}
              >
                <span>Обсудить проект</span>
                <b>→</b>
              </button>
            </div>

            <div className={Styles.heroStats}>
              <div>
                <strong>15+</strong>
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
                <span>NT / 2026</span>
                <span>UFA / RUSSIA</span>
              </div>

              <div className={Styles.heroImageLabel}>
                <i />
                <span>TECHNICAL SOLUTIONS</span>
              </div>

              <div className={Styles.heroFloatingCard}>
                <span>FULL CYCLE</span>

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
              <span className={Styles.overline}>
                ENGINEERING / INDUSTRY
              </span>

              <h2 className={Styles.sectionTitle}>
                Технологии,
                <br />
                которые работают
                <em>на результат.</em>
              </h2>
            </div>

            <div className={Styles.aboutMain}>
              <p className={Styles.aboutLead}>
                ООО ИПП «Новые Технологии» — российское инженерное
                предприятие, специализирующееся на технических
                решениях для нефтегазовой отрасли.
              </p>

              <p>
                Мы объединяем инженерную компетенцию, производство,
                комплектацию и сервис, чтобы заказчик получал
                не отдельный продукт, а готовое решение под
                конкретные производственные задачи.
              </p>

              <button
                type="button"
                className={Styles.modernButton}
                onClick={() => handleNavigation('/about')}
              >
                <span>Подробнее о компании</span>
                <b>↗</b>
              </button>
            </div>
          </div>

          <div className={Styles.aboutBottom}>
            <div className={Styles.experience}>
              <strong>15</strong>

              <div>
                <span>ПРАКТИЧЕСКИЙ ОПЫТ</span>

                <b>
                  лет работы
                  <br />
                  в отрасли
                </b>

                <p>
                  Работаем там, где важны точность,
                  надёжность и предсказуемый результат.
                </p>
              </div>
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

              <b>↗</b>
            </button>
          </div>

          <div className={Styles.capabilities}>
            <div className={Styles.capabilitiesHeader}>
              <span>ЧЕМ МЫ ЗАНИМАЕМСЯ</span>

              <p>
                Объединяем инженерную разработку,
                производство и сопровождение в одном
                рабочем цикле.
              </p>
            </div>

            <div className={Styles.capabilityGrid}>
              {[
                ['01', 'Добыча', 'Технические решения для производственных задач объектов добычи.'],
                ['02', 'Подготовка', 'Оборудование и решения для технологических процессов подготовки.'],
                ['03', 'Транспортировка', 'Решения для задач транспортировки углеводородов и работы объекта.'],
                ['04', 'Сервис', 'Техническое сопровождение и поддержка на протяжении жизненного цикла.'],
              ].map(([number, title, text]) => (
                <article
                  className={Styles.capability}
                  key={number}
                >
                  <span>{number}</span>

                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>

                  <b>↗</b>
                </article>
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
                Работаем там,
                <br />
                где нужны
                <em>решения.</em>
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
                  <strong>80+</strong>
                  <span>городов</span>
                </div>

                <div>
                  <strong>12+</strong>
                  <span>стран</span>
                </div>

                <div>
                  <strong>100+</strong>
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

              <small>RUSSIA + CIS / DELIVERY</small>
            </div>

            <div className={Styles.mapFrame}>
              <div className={Styles.mapLabel}>
                <span>DELIVERY MAP</span>
                <span>LIVE / PROJECTS</span>
              </div>

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

      {/* DIRECTIONS */}

      <section
        id="directions"
        className={`${Styles.section} ${Styles.solutionsSection} ${Styles.animateOnScroll}`}
      >
        <div className={Styles.container}>

          <div className={Styles.solutionsHeader}>
            <div>
              <div className={Styles.kicker}>
                <span>04</span>
                <b>Направления</b>
              </div>

              <h2 className={Styles.sectionTitle}>
                От оборудования
                <br />
                до
                <em>комплексного решения.</em>
              </h2>
            </div>

            <p>
              Подбираем конфигурацию под технологическую
              задачу, условия эксплуатации и требования объекта.
            </p>
          </div>

          <div className={Styles.solutionsGrid}>

            <article
              className={Styles.solutionCard}
              onClick={() => handleNavigation('/products')}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handleNavigation('/products');
                }
              }}
            >
              <div className={Styles.solutionImage}>
                <img
                  src="/images/home/product.webp"
                  alt="Продукция"
                  loading="lazy"
                />

                <div className={Styles.solutionShade} />

                <span>01 / PRODUCTS</span>

                <b>↗</b>
              </div>

              <div className={Styles.solutionContent}>
                <div>
                  <small>PRODUCTS</small>

                  <h3>Оборудование</h3>

                  <p>
                    Технические решения и оборудование
                    для нефтегазовых объектов.
                  </p>
                </div>

                <button type="button">
                  Подробнее
                  <span>↗</span>
                </button>
              </div>
            </article>

            <article
              className={Styles.solutionCard}
              onClick={() => handleNavigation('/services')}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handleNavigation('/services');
                }
              }}
            >
              <div className={Styles.solutionImage}>
                <img
                  src="/images/home/services.png"
                  alt="Услуги"
                  loading="lazy"
                />

                <div className={Styles.solutionShade} />

                <span>02 / SERVICES</span>

                <b>↗</b>
              </div>

              <div className={Styles.solutionContent}>
                <div>
                  <small>SERVICES</small>

                  <h3>Услуги</h3>

                  <p>
                    Сервис, сопровождение и инженерная
                    поддержка на протяжении жизненного цикла.
                  </p>
                </div>

                <button type="button">
                  Подробнее
                  <span>↗</span>
                </button>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ADVANTAGES */}

      <section
        className={`${Styles.section} ${Styles.advantagesSection} ${Styles.animateOnScroll}`}
      >
        <div className={Styles.container}>

          <div className={Styles.advantagesHeader}>
            <div>
              <div className={Styles.kicker}>
                <span>05</span>
                <b>Наш подход</b>
              </div>

              <h2 className={Styles.sectionTitle}>
                Четыре принципа,
                <br />
                на которых держится
                <em>работа.</em>
              </h2>
            </div>

            <p>
              Мы строим долгосрочные отношения с заказчиками
              и отвечаем не только за поставку, но и за результат.
            </p>
          </div>

          <div className={Styles.advantages}>
            {ADVANTAGES.map((item) => (
              <article
                className={Styles.advantage}
                key={item.number}
              >
                <div>
                  <span>{item.number}</span>
                  <b>↗</b>
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

                <i />
              </article>
            ))}
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
                <span>06</span>
                <b>Новости</b>
              </div>

              <h2 className={Styles.sectionTitle}>
                Важное —
                <br />
                коротко и
                <em>по делу.</em>
              </h2>
            </div>

            <button
              type="button"
              className={Styles.modernButton}
              onClick={() => handleNavigation('/news')}
            >
              <span>Все новости</span>
              <b>↗</b>
            </button>
          </div>

          <article className={Styles.newsCard}>
            <div className={Styles.newsImage}>
              <img
                src="/images/home/news.webp"
                alt="EGYPES 2026"
                loading="lazy"
              />

              <div className={Styles.newsShade} />

              <span>NEWS / 2026</span>
            </div>

            <div className={Styles.newsContent}>
              <div className={Styles.newsMeta}>
                <span>МАРТ 2026</span>
                <i />
                <span>СОБЫТИЯ</span>
              </div>

              <small>INDUSTRY / EVENT</small>

              <h3>
                ООО ИПП «Новые Технологии»
                <br />
                на EGYPES 2026
              </h3>

              <p>
                Рассказываем о ключевых событиях отраслевой
                выставки, новых контактах и направлениях
                развития компании.
              </p>

              <button
                type="button"
                className={Styles.modernButton}
                onClick={() => handleNavigation('/news')}
              >
                <span>Читать новость</span>
                <b>↗</b>
              </button>
            </div>
          </article>

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
                <span>07</span>
                <b>Клиенты</b>
              </div>

              <h2 className={Styles.sectionTitle}>
                Нам доверяют
                <em>отраслевые компании.</em>
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

          <div className={Styles.clientsBottom}>
            <span>LONG-TERM PARTNERSHIPS</span>
            <span>TRUST / QUALITY / EXPERTISE</span>
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
                <span>08</span>
                <b>FAQ</b>
              </div>

              <h2 className={Styles.sectionTitle}>
                Остались
                <em>вопросы?</em>
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
                <b>↗</b>
              </button>
            </div>

            <div className={Styles.faqList}>
              {FAQ.map((item) => (
                <details
                  className={Styles.faqItem}
                  key={item.question}
                >
                  <summary>
                    <span>{item.question}</span>

                    <b>+</b>
                  </summary>

                  <div className={Styles.faqAnswer}>
                    <p>{item.answer}</p>

                    <a href={item.link}>
                      {item.linkText}
                      <span>↗</span>
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