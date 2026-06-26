import Styles from './header.module.scss';
import logoRu from '../../images/logo_ru.webp';

import menuIcon from '../../images/header/menu.svg';
import cross from '../../images/header/cross.svg';
import location from '../../images/location.svg';
import email from '../../images/email.svg';
import phone from '../../images/phone.svg';
import { menuData } from './menuData';
import { CartButton } from '../ui/cart-button/CartButton';

import { useState, useEffect } from 'react';

/* ===== РЕКУРСИВНЫЙ ПУНКТ МЕНЮ ===== */
interface MenuItemProps {
  item: any;
  pageType: any;
  isMobile: boolean;
  openItems: any[];
  setOpenItems: any;
  parentId?: string; // ← Сделали опциональным
}

const MenuItem = ({ item, pageType, isMobile, openItems, setOpenItems, parentId }: MenuItemProps) => {
  const [open, setOpen] = useState(false);

  // Создаем уникальный ID для пункта меню
  const itemId = item.url || item.title;
  
  // Создаем полный путь для идентификации (для вложенных пунктов)
  const fullId = parentId ? `${parentId}-${itemId}` : itemId;

  // Проверяем, открыт ли этот пункт (только для мобильной версии)
  const isOpen = isMobile ? openItems.includes(fullId) : open;

  const hasChildren = item.children && item.children.length > 0;

  // Обработчик клика по стрелке (только для мобильной версии)
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!isMobile) return; // Игнорируем на десктопе
    
    if (isOpen) {
      // Если уже открыт - закрываем только этот пункт
      setOpenItems((prev: string[]) => prev.filter((id: string) => id !== fullId));
    } else {
      // Если закрыт - открываем и закрываем все остальные на этом уровне
      const newOpenItems: string[] = [];
      
      // Добавляем все родительские пункты (если есть)
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
      
      // Добавляем текущий пункт
      newOpenItems.push(fullId);
      
      setOpenItems(newOpenItems);
    }
  };

  // 🔹 Проверяем активность: текущий пункт ИЛИ любой потомок
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

  // Для десктопа используем hover
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
              parentId={fullId} // Передаем ID родителя для дочерних элементов
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;

/* ===== ОСНОВНОЙ ХЭДЕР ===== */
export const Header = ({ pageType }: { pageType: string }) => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);
  const [closeAllSubMenus, setCloseAllSubMenus] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]); // Массив открытых пунктов (только для мобильной версии)
  const [isMobile, setIsMobile] = useState(false);

  const onToggleMobileMenu = () => {
     setIsActiveMobileMenu((prev: boolean) => {
      const next = !prev;

      if (!next) {
        setCloseAllSubMenus((prev: boolean) => !prev);
        setOpenItems([]); // Закрываем все подменю при закрытии бургера
      }

      return next;
    });
  };

  // Определяем мобильную версию
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1000;
      setIsMobile(mobile);
      
      // Если десктоп - сбрасываем openItems
      if (!mobile) {
        setOpenItems([]);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [lang, setLang] = useState('ru');

  const changeLanguage = (newLang: string) => {
    setLang(newLang);

    if (newLang === 'en') {
      window.location.href = 'https://eng.tech-new.ru';
    } else {
      window.location.href = 'https://tech-new.ru';
    }
  };

  /* Закрытие меню при клике вне */
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
        setOpenItems([]); // Закрываем все подменю
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
      <CartButton goToBasket={() => window.dispatchEvent(new Event('toggleGlobalCart'))} />
    </>
  );
};