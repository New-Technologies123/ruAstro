import Styles from './header.module.scss';
import logoRu from '../../images/logo_ru.webp';

import menuIcon from '../../images/header/menu.svg';
import cross from '../../images/header/cross.svg';
import location from '../../images/location.svg';
import email from '../../images/email.svg';
import phone from '../../images/phone.svg';
import { menuData } from './menuData';

import { useState, useEffect } from 'react';

/* ===== RECURSIVE MENU ITEM ===== */
interface MenuItemProps {
  item: any;
  pageType: any;
  isMobile: boolean;
  openItems: any[];
  setOpenItems: any;
  parentId?: string; // ← Made optional
}

const MenuItem = ({ item, pageType, isMobile, openItems, setOpenItems, parentId }: MenuItemProps) => {
  const [open, setOpen] = useState(false);

  // Create a unique ID for the menu item
  const itemId = item.url || item.title;
  
  // Create full path for identification (for nested items)
  const fullId = parentId ? `${parentId}-${itemId}` : itemId;

  // Check if this item is open (mobile only)
  const isOpen = isMobile ? openItems.includes(fullId) : open;

  const hasChildren = item.children && item.children.length > 0;

  // Click handler for the arrow (mobile only)
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!isMobile) return; // Ignore on desktop
    
    if (isOpen) {
      // If already open - close only this item
      setOpenItems((prev: string[]) => prev.filter((id: string) => id !== fullId));
    } else {
      // If closed - open this item and close all others at this level
      const newOpenItems: string[] = [];
      
      // Add all parent items (if any)
      if (parentId) {
        const parentParts = parentId.split('-');
        let currentPath = '';
        for (const part of parentParts) {
          currentPath = currentPath ? `${currentPath}-${part}` : part;
          if (!newOpenItems.includes(currentPath)) {
            newOpenItems.push(currentPath);
          }
        }
      }
      
      // Add the current item
      newOpenItems.push(fullId);
      
      setOpenItems(newOpenItems);
    }
  };

  // 🔹 Check if active: current item OR any child
  const isActive = (() => {
    if (item.pageType === pageType) return true;
    
    if (item.children) {
      for (const child of item.children) {
        if (child.pageType === pageType) return true;
        if (child.children) {
          for (const grandchild of child.children) {
            if (grandchild.pageType === pageType) return true;
          }
        }
      }
    }
    
    return false;
  })();

  // For desktop use hover
  const handleMouseEnter = () => {
    if (!isMobile && hasChildren) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && hasChildren) {
      setOpen(false);
    }
  };

  return (
    <li
      className={Styles.menuItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
            className={`${Styles.arrow} ${isOpen ? Styles.arrowOpen : ''}`}
            onClick={handleToggle}
          >
            ▸
          </button>
        )}
      </div>

      {hasChildren && (
        <ul className={`${Styles.subMenu} ${isOpen ? Styles.open : ''}`}>
          {item.children.map((child: any, index: number) => (
            <MenuItem
              key={index}
              item={child}
              pageType={pageType}
              isMobile={isMobile}
              openItems={openItems}
              setOpenItems={setOpenItems}
              parentId={fullId} // Pass parent ID for child items
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;

/* ===== MAIN HEADER ===== */
export const Header = ({ pageType }: { pageType: string }) => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);
  const [closeAllSubMenus, setCloseAllSubMenus] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]); // Array of open items (mobile only)
  const [isMobile, setIsMobile] = useState(false);

  const onToggleMobileMenu = () => {
     setIsActiveMobileMenu((prev: boolean) => {
      const next = !prev;

      if (!next) {
        setCloseAllSubMenus((prev: boolean) => !prev);
        setOpenItems([]); // Close all submenus when burger is closed
      }

      return next;
    });
  };

  // Detect mobile version
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1000;
      setIsMobile(mobile);
      
      // If desktop - reset openItems
      if (!mobile) {
        setOpenItems([]);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [lang, setLang] = useState('ru');

  // Добавляем тип для параметра newLang
  const changeLanguage = (newLang: string) => {
    setLang(newLang);

    if (newLang === 'en') {
      window.location.href = 'https://eng.tech-new.ru';
    } else {
      window.location.href = 'https://tech-new.ru';
    }
  };

  /* Close menu when clicking outside */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector(`.${Styles.navMenu}`);
      const toggle = document.querySelector(`.${Styles.menuToggle}`);

      if (
        isActiveMobileMenu &&
        nav &&
        !nav.contains(event.target as Node) &&
        toggle &&
        !toggle.contains(event.target as Node)
      ) {
        setIsActiveMobileMenu(false);
        setOpenItems([]); // Close all submenus
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isActiveMobileMenu]);

  return (
    <>
      <header>
        <div className={Styles.headerContainer}>
          <img src={logoRu.src} alt="New Technologies" />

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
              <div className={Styles.langToggle}>
                <div
                  className={Styles.langSlider}
                  style={{
                    transform:
                      lang === 'ru'
                        ? 'translateX(0%)'
                        : 'translateX(100%)'
                  }}
                />

                <button
                  onClick={() => changeLanguage('ru')}
                  className={lang === 'ru' ? Styles.active : ''}
                >
                  RU
                </button>

                <button
                  onClick={() => changeLanguage('en')}
                  className={lang === 'en' ? Styles.active : ''}
                >
                  EN
                </button>

              </div>
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
            <MenuItem 
              key={index} 
              item={item} 
              pageType={pageType}
              isMobile={isMobile}
              openItems={openItems}
              setOpenItems={setOpenItems}
              // parentId не передаем для корневых элементов
            />
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