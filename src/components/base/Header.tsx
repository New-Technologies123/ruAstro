import Styles from './header.module.scss';
import logoRu from '../../images/logo_ru.webp';
import logoEn from '../../images/logo_en.webp';

import menu from '../../images/header/menu.svg';
import cross from '../../images/header/cross.svg';
import location from '../../images/location.svg';
import email from '../../images/email.svg';
import phone from '../../images/phone.svg';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Header = ({ pageType }) => {
  const { t, i18n } = useTranslation('header');

  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);

  const onToggleMobileMenu = () => {
    setIsActiveMobileMenu((prev) => !prev);
  };

  const onToggleLanguage = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const typeFromQuery = queryParams.get('type');

    const newUrl = `${window.location.origin}/${i18n.language === 'ru' ? 'en' : 'ru'}/${pageType}${typeFromQuery ? `?type=${typeFromQuery}` : ''}`;
    window.history.pushState({}, '', newUrl);

    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navElement = document.querySelector(`.${Styles.navMenu}`);
      const menuToggleElement = document.querySelector(`.${Styles.menuToggle}`);

      if (
        isActiveMobileMenu &&
        navElement &&
        !navElement.contains(event.target) &&
        menuToggleElement &&
        !menuToggleElement.contains(event.target)
      ) {
        setIsActiveMobileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);    

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isActiveMobileMenu]);

  // Выбираем логотип в зависимости от текущего языка
  const getLogoByLanguage = (language) => {
    switch(language) {
      case 'en':
        return logoEn;
      case 'ru':
        return logoRu;
    }
  };

  const currentLogo = getLogoByLanguage(i18n.language);

  return (
    <>
      <header>
        <div className={Styles.headerContainer}>
          <img src={currentLogo.src} alt="Новые Технологии" />
          <div className={Styles.contactBloc}>
            <div className={Styles.contactInfo}>
              <p>
                <img src={location.src} alt="Адрес"/>
                {t('Адрес')}
              </p>
              <p>
                <img src={email.src} alt="Email"/>
                Email: nt@tech-new.ru
              </p>
              <p>
                <img src={phone.src} alt="Телефон"/>
                {t('Телефон')}
              </p>
            </div>

            <div className={Styles.languageSwitch}>
              <a className={Styles.buttonMenu} onClick={() => {
                  onToggleLanguage();
                  window.location.reload(); // Перезагружаем страницу
                }}>
                {t('Рус/Eng')}
              </a>
            </div>
            
          </div>
        </div>
      </header>
      <nav className={`${isActiveMobileMenu ? Styles.active : ''} ${Styles.navSticky}`}>
        <div className={Styles.menuToggle} id="mobile-menu" onClick={onToggleMobileMenu}>
          {isActiveMobileMenu ? (
            <img src={cross.src} alt="Крестик" className={Styles.menuIcon} />
          ) : (
            <img src={menu.src} alt="" className={Styles.menuIcon} />
          )}
        </div>

        <ul id="nav-menu" className={`${Styles.navMenu} ${isActiveMobileMenu ? Styles.active : ''}`}>
          <li>
            <a href={`/${i18n.language}/home`} className={pageType === 'home' ? Styles.active : ''}>
              {t('Главная')}
            </a>
          </li>
          <li>
            <a href={`/${i18n.language}/about`} className={pageType === 'about' ? Styles.active : ''}>
              {t('О компании')}
            </a>
          </li>
          <li>
            <a href={`/${i18n.language}/products`} className={pageType === 'products' ? Styles.active : ''}>
              {t('Продукция')}
            </a>
          </li>
          <li>
            <a href={`/${i18n.language}/services`} className={pageType === 'services' ? Styles.active : ''}>
              {t('Сервисные услуги')}
            </a>
          </li>
          <li>
            <a href={`/${i18n.language}/documents`} className={pageType === 'documents' ? Styles.active : ''}>
              {t('Документы')}
            </a>
          </li>
          <li>
            <a href={`/${i18n.language}/news`} className={pageType === 'news' ? Styles.active : ''}>
              {t('Новости')}
            </a>
          </li>
          <li>
            <a href={`/${i18n.language}/careers`} className={pageType === 'careers' ? Styles.active : ''}>
              {t('Карьера')}
            </a>
          </li>
          <li>
            <a href={`/${i18n.language}/contact`} className={pageType === 'contact' ? Styles.active : ''}>
              {t('Контакты')}
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
