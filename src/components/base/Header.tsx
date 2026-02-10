import Styles from './header.module.scss';
import logoRu from '../../images/logo_ru.webp';

import menuIcon from '../../images/header/menu.svg';
import cross from '../../images/header/cross.svg';
import location from '../../images/location.svg';
import email from '../../images/email.svg';
import phone from '../../images/phone.svg';
import { menuData } from './menuData';

import { useState, useEffect } from 'react';

/* ===== РЕКУРСИВНЫЙ ПУНКТ МЕНЮ ===== */
const MenuItem = ({ item, pageType }) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 🔹 активен ли пункт
  const isActive =
    item.pageType === pageType ||
    item.children?.some(child => child.pageType === pageType);

  return (
    <li
      className={Styles.menuItem}
      onMouseEnter={!isMobile && hasChildren ? () => setOpen(true) : undefined}
      onMouseLeave={!isMobile && hasChildren ? () => setOpen(false) : undefined}
    >
      <div className={Styles.menuRow}>
        <a
          href={item.url}
          className={`${Styles.menuLink} ${isActive ? Styles.active : ''}`}
        >
          {item.title}
        </a>

        {hasChildren && (
          <button
            type="button"
            className={`${Styles.arrow} ${open ? Styles.arrowOpen : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setOpen(prev => !prev);
            }}
          >
            ▸
          </button>
        )}
      </div>

      {hasChildren && (
        <ul className={`${Styles.subMenu} ${open ? Styles.open : ''}`}>
          {item.children.map((child, index) => (
            <MenuItem
              key={index}
              item={child}
              pageType={pageType}
            />
          ))}
        </ul>
      )}
    </li>
  );
};


export default MenuItem;

/* ===== ОСНОВНОЙ ХЭДЕР ===== */
export const Header = ({ pageType }) => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);
  const [closeAllSubMenus, setCloseAllSubMenus] = useState(false);

  const onToggleMobileMenu = () => {
     setIsActiveMobileMenu(prev => {
      const next = !prev;

      // если закрываем бургер → закрываем всё внутри
      if (!next) {
        setCloseAllSubMenus(prev => !prev);
      }

      return next;
    });
  };

  const redirectEngToTechNew = () => {
    window.location.href = 'https://eng.tech-new.ru';
  };

  /* Закрытие меню при клике вне */
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector(`.${Styles.navMenu}`);
      const toggle = document.querySelector(`.${Styles.menuToggle}`);

      if (
        isActiveMobileMenu &&
        nav &&
        !nav.contains(event.target) &&
        toggle &&
        !toggle.contains(event.target)
      ) {
        setIsActiveMobileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isActiveMobileMenu]);

  return (
    <>
      <header>
        <div className={Styles.headerContainer}>
          <img src={logoRu.src} alt="Новые Технологии" />

          <div className={Styles.contactBloc}>
            <div className={Styles.contactInfo}>
              <p>
                <img src={location.src} alt="" />
                Адрес: 450076, г. Уфа, ул Заки Валиди 32/2
              </p>
              <p>
                <img src={email.src} alt="" />
                Email: nt@tech-new.ru
              </p>
              <p>
                <img src={phone.src} alt="" />
                Телефон: +7 (347) 293-93-33
              </p>
            </div>

            <div className={Styles.languageSwitch}>
              <button className={Styles.buttonMenu} onClick={redirectEngToTechNew}>
                Рус / Eng
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className={`${Styles.navSticky} ${isActiveMobileMenu ? Styles.active : ''}`}>
        <div className={Styles.menuToggle} onClick={onToggleMobileMenu}>
          <img
            src={isActiveMobileMenu ? cross.src : menuIcon.src}
            alt=""
          />
        </div>

        <ul className={`${Styles.navMenu} ${isActiveMobileMenu ? Styles.active : ''}`}>
          <li>
            <a href="/home/" className={pageType === 'home' ? Styles.active : ''}>
              Главная
            </a>
          </li>

          <li>
            <a href="/about/" className={pageType === 'about' ? Styles.active : ''}>
              О компании
            </a>
          </li>

          {menuData.map((item, index) => (
            <MenuItem key={index} item={item} pageType={pageType}/>
          ))}

          <li>
            <a href="/documents/" className={pageType === 'documents' ? Styles.active : ''}>
              Документы
            </a>
          </li>

          <li>
            <a href="/news/" className={pageType === 'news' ? Styles.active : ''}>
              Новости
            </a>
          </li>

          <li>
            <a href="/procurement/" className={pageType === 'procurement' ? Styles.active : ''}>
              Закупки
            </a>
          </li>

          <li>
            <a href="/careers/" className={pageType === 'careers' ? Styles.active : ''}>
              Карьера
            </a>
          </li>

          <li>
            <a href="/shop/" className={pageType === 'shop' ? Styles.active : ''}>
              Онлайн магазин
            </a>
          </li>

          <li>
            <a href="/contact/" className={pageType === 'contact' ? Styles.active : ''}>
              Контакты
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
