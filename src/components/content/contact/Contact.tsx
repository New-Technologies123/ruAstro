import { useEffect, useState } from 'react';
import Styles from './contact.module.scss';
import { Title } from '../../ui/title/Title';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

export const Contact = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoaded(true);
    }, 40);

    return () => window.clearTimeout(timer);
  }, []);

  const contacts = [
    {
      type: 'office',
      title: 'Офис',
      text: '450076, Россия, Республика Башкортостан, г. Уфа, ул. Заки Валиди 32/2',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      ),
      link: 'https://2gis.ru/ufa/firm/70000001088836817/55.935872%2C54.720355?m=55.935872%2C54.720355%2F16',
      external: true,
    },
    {
      type: 'production',
      title: 'Производство',
      text: '450019, Россия, Республика Башкортостан, г. Уфа, ул. Благоварская 16/2',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 21V9l7-4v4l7-4v4l4-2v14H3zm4-3h2v-5H7v5zm4 0h2v-8h-2v8zm4 0h2v-5h-2v5z" />
        </svg>
      ),
      link: null,
      external: false,
    },
    {
      type: 'legal',
      title: 'Юридический адрес',
      text: '450076, Россия, Республика Башкортостан, г. Уфа, ул. Заки Валиди 32/2',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4.18l6 2.67v3.14c0 3.83-2.47 7.55-6 8.91-3.53-1.36-6-5.08-6-8.91V7.85l6-2.67z" />
        </svg>
      ),
      link: null,
      external: false,
    },
    {
      type: 'phone',
      title: 'Телефон',
      text: '+7 (347) 293-93-33',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
        </svg>
      ),
      link: 'tel:+73472939333',
      external: false,
    },
    {
      type: 'email',
      title: 'Email',
      text: 'nt@tech-new.ru',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      link: 'mailto:nt@tech-new.ru',
      external: false,
    },
  ];

  const details = [
    { label: 'ИНН', value: '0274106520' },
    { label: 'ОГРН', value: '1050204014651' },
  ];

  return (
    <>
      {/* <Title text="Контакты" /> */}

      <main
        className={`${Styles.wrapper} ${loaded ? Styles.loaded : ''}`}
      >
        <header className={Styles.hero}>
          <div className={Styles.heroMeta}>
            <span className={Styles.heroNumber}>01</span>
            <span className={Styles.eyebrow}>Связаться с нами</span>
          </div>

          <div className={Styles.heroGrid}>
            <div className={Styles.heroTitle}>
              <h1>
                Обсудим ваш
                <span> проект</span>
              </h1>
            </div>

            <div className={Styles.heroDescription}>
              <span className={Styles.descriptionLine} />

              <p>
                Свяжитесь с нами удобным способом. Ответим на вопросы,
                обсудим задачу и предложим подходящее решение для вашего
                проекта.
              </p>
            </div>
          </div>
        </header>

        <div className={Styles.content}>
          <section
            className={Styles.leftColumn}
            aria-label="Контактная информация"
          >
            <div className={Styles.sectionHeading}>
              <div>
                <span className={Styles.sectionNumber}>02</span>
                <h2>Контактная информация</h2>
              </div>

              <span className={Styles.sectionHint}>
                Россия · Уфа
              </span>
            </div>

            <div className={Styles.contacts}>
              {contacts.map((contact, index) => {
                const isPrimary =
                  contact.type === 'phone' ||
                  contact.type === 'email';

                return (
                  <div
                    key={contact.type}
                    className={`${Styles.contactCard} ${isPrimary ? Styles.primaryCard : ''
                      }`}
                    style={
                      {
                        '--delay': `${index * 65}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <div className={Styles.iconContainer}>
                      {contact.icon}
                    </div>

                    <div className={Styles.textContainer}>
                      <span className={Styles.contactLabel}>
                        {contact.title}
                      </span>

                      {contact.link ? (
                        <a
                          href={contact.link}
                          className={Styles.contactLink}
                          target={
                            contact.external ? '_blank' : undefined
                          }
                          rel={
                            contact.external
                              ? 'noopener noreferrer'
                              : undefined
                          }
                        >
                          <span>{contact.text}</span>

                          {contact.external && (
                            <svg
                              className={Styles.arrow}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                d="M5 15L15 5M7 5h8v8"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </a>
                      ) : (
                        <p>{contact.text}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={Styles.details}>
              <div className={Styles.detailsTop}>
                <div className={Styles.detailsTitle}>
                  <span className={Styles.detailsEyebrow}>
                    03 · Реквизиты
                  </span>

                  <h2>Юридическая информация</h2>
                </div>

                <div className={Styles.detailsIcon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 2h9l4 4v16H6V2zm8 1.5V7h3.5L14 3.5zM8 10v1.5h8V10H8zm0 3.5V15h8v-1.5H8zm0 3.5v1.5h5v-1.5H8z" />
                  </svg>
                </div>
              </div>

              <div className={Styles.detailsList}>
                {details.map((item) => (
                  <div
                    key={item.label}
                    className={Styles.detailItem}
                  >
                    <span className={Styles.detailLabel}>
                      {item.label}
                    </span>

                    <span className={Styles.detailValue}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            className={Styles.mapSection}
            aria-label="Карта офиса"
          >
            <div className={Styles.mapHeader}>
              <div className={Styles.mapTitleBlock}>
                <div className={Styles.mapMeta}>
                  <span className={Styles.sectionNumber}>04</span>
                  <span className={Styles.mapEyebrow}>
                    Мы на карте
                  </span>
                </div>

                <h2>Офис в Уфе</h2>
              </div>

              <a
                href="https://2gis.ru/ufa/firm/70000001088836817/55.935872%2C54.720355?m=55.935872%2C54.720355%2F16"
                target="_blank"
                rel="noopener noreferrer"
                className={Styles.mapLink}
              >
                <span>Открыть в 2ГИС</span>

                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    d="M5 15L15 5M7 5h8v8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div className={Styles.mapContainer}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Af1bd327c32b7c5c037613d0c1228b955362997bce9338237e5b612e6449e8c86&amp;source=constructor"
                frameBorder="0"
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
                title="Карта офиса ООО ИПП «Новые Технологии»"
                loading="lazy"
              />

              <div className={Styles.mapOverlay} />

              <div className={Styles.mapBadge}>
                <div className={Styles.mapBadgeIcon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
                  </svg>
                </div>

                <div>
                  <strong>ООО ИПП «Новые Технологии»</strong>
                  <span>ул. Заки Валиди, 32/2 · Уфа</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <BackToTop />
    </>
  );
};