import logoRu from '../../images/logo_fut_ru.webp';
import logoEn from '../../images/logo_fut_en.webp';
import Styles from './footer.module.scss';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t, i18n } = useTranslation('footer');

  const getLogoByLanguage = (language) => {
    switch(language) {
      case 'en': return logoEn;
      case 'ru': return logoRu;
      default: return logoRu;
    }
  };

  const currentLogo = getLogoByLanguage(i18n.language);

  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        {/* Контактная информация */}
        <div className={Styles.contactSection}>
          <div className={Styles.logoContainer}>
            <img src={currentLogo.src} alt="Новые Технологии"/>
          </div>
          
          <div className={Styles.contactInfo}>
            <p>
              {t('Адрес')}
            </p>
            <p>
              <a href="tel:+74951234567">{t('Телефон')}</a>
            </p>
            <p>
              <a href="mailto:nt@tech-new.ru">nt@tech-new.ru</a>
            </p>           
          </div>
        </div>

        {/* Навигационные ссылки */}
        <div className={Styles.navSections}>
          <div className={Styles.navColumn}>
            <h3>{t('Каталог')}</h3>
            <ul>
              <li>
                <a href={`/${i18n.language}/products`}>{t('Продукция')}</a>
              </li>
              <li>
                <a href={`/${i18n.language}/services`}>{t('Сервисные услуги')}</a>
              </li>
            </ul>
            
            <h3>{t('Карьера')}</h3>
            <ul>
              <li>
                <a href={`/${i18n.language}/careers`}>{t('Вакансия')}</a>
              </li>
            </ul>
          </div>

          <div className={Styles.navColumn}>
            <h3>{t('Компания')}</h3>
            <ul>
              <li>
                <a href={`/${i18n.language}/about`}>{t('О компании')}</a>
              </li>
              <li>
                <a href={`/${i18n.language}/documents`}>{t('Документы')}</a>
              </li>
              <li>
                <a href={`/${i18n.language}/news`}>{t('Новости')}</a>
              </li>
              <li>
                <a href={`/${i18n.language}/contact`}>{t('Контакты')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className={Styles.footerBottom}>
        <p>
          © {new Date().getFullYear()} {t('Права')}
        </p>
      </div>
    </footer>
  );
};