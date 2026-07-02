import { useState, useEffect } from 'react';
import Styles from './contact.module.scss';
import { Title } from '../../ui/title/Title';
import { BackToTop } from "../../ui/back-to-top/BackToTop";

export const Contact = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const contacts = [
    {
      type: 'office',
      title: 'Офис',
      text: '450076, Россия, Республика Башкортостан, г. Уфа, ул. Заки Валиди 32/2',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      link: 'https://2gis.ru/ufa/firm/70000001088836817/55.935872%2C54.720355?m=55.935872%2C54.720355%2F16'
    },
    {
      type: 'legal',
      title: 'Юридический адрес',
      text: '450106, Россия, Республика Башкортостан, г. Уфа, ул. Менделеева 114',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11V11.99z"/>
        </svg>
      ),
      link: null
    },
    {
      type: 'phone',
      title: 'Телефон',
      text: '+7 (347) 293-93-33',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
        </svg>
      ),
      link: 'tel:+73472939333'
    },
    {
      type: 'email',
      title: 'Email',
      text: 'nt@tech-new.ru',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      link: 'mailto:nt@tech-new.ru'
    }
  ];

  const details = [
    { label: 'ИНН', value: '0274106520' },
    { label: 'ОГРН', value: '1050204014651' },
  ];

  return (
    <>
      <Title text="Контакты" />
      <div className={`${Styles.wrapper} ${loaded ? Styles.loaded : ''}`}>
        <div className={Styles.content}>
          {/* Левая колонка */}
          <div className={Styles.leftColumn}>
            {/* Карточки контактов */}
            <div className={Styles.contacts}>
              {contacts.map((contact, index) => (
                <div
                  key={contact.type}
                  className={Styles.contactCard}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className={Styles.iconContainer}>
                    {contact.icon}
                  </div>
                  <div className={Styles.textContainer}>
                    <h3>{contact.title}</h3>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        className={Styles.contactLink}
                        target={contact.type === 'office' ? '_blank' : undefined}
                        rel={contact.type === 'office' ? 'noopener noreferrer' : undefined}
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <p>{contact.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Реквизиты */}
            <div className={Styles.details}>
              <div className={Styles.detailsHeader}>
                <span className={Styles.detailsIcon}>📋</span>
                <h4>Реквизиты</h4>
              </div>
              <div className={Styles.detailsList}>
                {details.map((item) => (
                  <div key={item.label} className={Styles.detailItem}>
                    <span className={Styles.detailLabel}>{item.label}</span>
                    <span className={Styles.detailValue}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка — карта */}
          <div className={Styles.mapContainer}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Af1bd327c32b7c5c037613d0c1228b955362997bce9338237e5b612e6449e8c86&amp;source=constructor"
              frameBorder="0"
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
              title="Карта офиса"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <BackToTop />
    </>
  );
};