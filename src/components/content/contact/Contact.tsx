import { useState, useEffect } from 'react';
import Styles from './contact.module.scss';
import { useTranslation } from 'react-i18next';
import { Title } from '../../ui/title/Title';

export const Contact = () => {
  const { t, i18n } = useTranslation('contact');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const contacts = [
    {
      type: 'office',
      title: t('Офис'),
      text: t('Валиди'),
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M19 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-1 18H6V4h12v16z"/>
        </svg>
      )
    },
    {
      type: 'legal',
      title: t('Юридический'),
      text: t('Менделеева'),
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11V11.99z"/>
        </svg>
      )
    },
    {
      type: 'details',
      title: t('Реквизиты'),
      text: t('ИннОгрн'),
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
        </svg>
      )
    },
    {
      type: 'phone',
      title: t('Вопросы'),
      text: '+7(347) 293-93-33',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
        </svg>
      )
    }
  ];

  return (
    <>
      <Title text={t('Контакты')}/>
      <div className={`${Styles.wrapper} ${loaded ? Styles.loaded : ''}`}> 
        <div className={Styles.content}>
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
                  {contact.type === 'phone' ? (
                    <a href={`tel:${contact.text.replace(/\D/g, '')}`} className={Styles.phone}>
                      {contact.text}
                    </a>
                  ) : (
                    <p>{contact.text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className={Styles.mapContainer}>
            <iframe
              src={i18n.language === 'en' 
                ? "https://yandex.ru/map-widget/v1/?um=constructor%3A7e310988bcfd232d57415d059b582e872e6f9b30a42d2aad2a15aa82885ad21f&amp;source=constructor"
                : "https://yandex.ru/map-widget/v1/?um=constructor%3Af1bd327c32b7c5c037613d0c1228b955362997bce9338237e5b612e6449e8c86&amp;source=constructor"}
              frameBorder="0"
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
              key={i18n.language}
            />
          </div>
        </div>
      </div>
    </>
    
  );
};