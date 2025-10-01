import Styles from './header.module.scss';
import logoRu from '../../images/logo_ru.webp';

import menu from '../../images/header/menu.svg';
import cross from '../../images/header/cross.svg';
import location from '../../images/location.svg';
import email from '../../images/email.svg';
import phone from '../../images/phone.svg';
import { useState, useEffect } from 'react';

export const Header = ({ pageType }) => {

  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);

  const onToggleMobileMenu = () => {
    setIsActiveMobileMenu((prev) => !prev);
  };
   
   // Функция для перехода на сайт tech-new
  const redirectEngToTechNew = () => {
    window.location.href = 'https://eng.tech-new.ru';
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

  return (
    <>
      <header>
        <div className={Styles.headerContainer}>
          <img src={logoRu.src} alt="Новые Технологии" />
          <div className={Styles.contactBloc}>
            <div className={Styles.contactInfo}>
              <p>
                <img src={location.src} alt="Адрес"/>
                Адрес: 450076, г. Уфа, ул Заки Валиди 32/2
              </p>
              <p>
                <img src={email.src} alt="Email"/>
                Email: nt@tech-new.ru
              </p>
              <p>
                <img src={phone.src} alt="Телефон"/>
                Телефон: +7(347) 293-93-33
              </p>
            </div>

            <div className={Styles.languageSwitch}>
              <a className={Styles.buttonMenu} onClick={redirectEngToTechNew}>
                Рус/Eng
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
            <a href={`/home`} className={pageType === 'home' ? Styles.active : ''}>
              Главная
            </a>
          </li>
          <li>
            <a href={`/about`} className={pageType === 'about' ? Styles.active : ''}>
              О компании
            </a>
          </li>
          <li>
            <a href={`/products`} className={pageType === 'products' ? Styles.active : ''}>
              Продукция
            </a>
          </li>
          <li>
            <a href={`/services`} className={pageType === 'services' ? Styles.active : ''}>
              Сервисные услуги
            </a>
          </li>
          <li>
            <a href={`/documents`} className={pageType === 'documents' ? Styles.active : ''}>
              Документы
            </a>
          </li>
          <li>
            <a href={`/news`} className={pageType === 'news' ? Styles.active : ''}>
              Новости
            </a>
          </li>
          <li>
            <a href={`/careers`} className={pageType === 'careers' ? Styles.active : ''}>
              Карьера
            </a>
          </li>
          <li>
            <a href={`/contact`} className={pageType === 'contact' ? Styles.active : ''}>
              Контакты
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
