// header.tsx - с правильной логикой открытия подменю
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Styles from './header.module.scss';
import logoRu from '../../images/logo_ru.webp';
import menuIcon from '../../images/header/menu.svg';
import cross from '../../images/header/cross.svg';
import location from '../../images/location.svg';
import email from '../../images/email.svg';
import phone from '../../images/phone.svg';
import { menuData } from './menuData';
import type { MenuItemType } from './menuData';

// ===== ТИПЫ =====
interface MenuItemProps {
  item: MenuItemType;
  pageType: string;
  isMobile: boolean;
  openItems: string[];
  setOpenItems: React.Dispatch<React.SetStateAction<string[]>>;
  parentId?: string;
}

interface HeaderProps {
  pageType?: string;
}

// ===== КОМПОНЕНТ ПУНКТА МЕНЮ =====
const MenuItem: React.FC<MenuItemProps> = ({ 
  item, 
  pageType, 
  isMobile, 
  openItems, 
  setOpenItems, 
  parentId = '' 
}) => {
  const itemId = item.url || item.title || `item-${Math.random()}`;
  const fullId = parentId ? `${parentId}-${itemId}` : itemId;
  const hasChildren = !!(item.children && item.children.length > 0);
  
  const [isHoverOpen, setIsHoverOpen] = useState(false);
  
  // ✅ На десктопе используем isHoverOpen, на мобилке - openItems
  const isOpen = isMobile ? openItems.includes(fullId) : isHoverOpen;

  const isActive = useMemo(() => {
    if (item.pageType === pageType) return true;
    
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        if (child.pageType === pageType) return true;
        if (child.children && child.children.length > 0) {
          for (const grandchild of child.children) {
            if (grandchild.pageType === pageType) return true;
          }
        }
      }
    }
    return false;
  }, [item, pageType]);

  // ✅ Для десктопа - НЕ БЛОКИРУЕМ переход, только hover
  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Если есть дети и это мобильная версия - предотвращаем переход
    if (hasChildren && isMobile) {
      e.preventDefault();
      e.stopPropagation();
      
      // Переключаем открытие подменю
      if (isOpen) {
        setOpenItems(prev => prev.filter(id => id !== fullId));
      } else {
        const newItems = [fullId];
        if (parentId && !newItems.includes(parentId)) {
          newItems.unshift(parentId);
        }
        setOpenItems(newItems);
      }
    }
    // ✅ На десктопе - ссылка работает как обычно (переход на страницу)
  }, [hasChildren, isMobile, isOpen, fullId, parentId, setOpenItems]);

  // ✅ Обработчик клика по стрелке (только для мобильной версии)
  const handleToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isMobile || !hasChildren) return;

    if (isOpen) {
      setOpenItems(prev => prev.filter(id => id !== fullId));
    } else {
      const newItems = [fullId];
      if (parentId && !newItems.includes(parentId)) {
        newItems.unshift(parentId);
      }
      setOpenItems(newItems);
    }
  }, [isMobile, hasChildren, isOpen, fullId, parentId, setOpenItems]);

  // ✅ Для десктопа - открываем по наведению
  const handleMouseEnter = useCallback(() => {
    if (!isMobile && hasChildren) {
      setIsHoverOpen(true);
    }
  }, [isMobile, hasChildren]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile && hasChildren) {
      setIsHoverOpen(false);
    }
  }, [isMobile, hasChildren]);

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
          onClick={handleLinkClick}
        >
          {item.title}
        </a>
        {hasChildren && (
          <button 
            className={`${Styles.arrow} ${isOpen ? Styles.arrowOpen : ''}`}
            onClick={handleToggle}
            type="button"
          >
            ▸
          </button>
        )}
      </div>
      {hasChildren && item.children && (
        <ul className={`${Styles.subMenu} ${isOpen ? Styles.open : ''}`}>
          {item.children.map((child: MenuItemType, idx: number) => (
            <MenuItem
              key={`${child.title}-${idx}`}
              item={child}
              pageType={pageType}
              isMobile={isMobile}
              openItems={openItems}
              setOpenItems={setOpenItems}
              parentId={fullId}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// ===== ОСНОВНОЙ HEADER =====
export const Header: React.FC<HeaderProps> = ({ pageType = 'home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [lang, setLang] = useState<string>('ru');
  
  const mountedRef = useRef(true);

  const changeLanguage = useCallback((newLang: string) => {
    setLang(newLang);
    if (newLang === 'en') {
      window.location.href = 'https://eng.tech-new.ru';
    } else {
      window.location.href = 'https://tech-new.ru';
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      requestAnimationFrame(() => {
        if (!mountedRef.current) return;
        
        const width = window.innerWidth;
        const mobile = width <= 1070;
        
        setIsMobile(prev => {
          if (prev !== mobile) {
            return mobile;
          }
          return prev;
        });
        
        if (!mobile) {
          setOpenSubmenus([]);
          setIsMobileMenuOpen(false);
        }
      });
    };

    const timer = setTimeout(checkMobile, 0);
    
    window.addEventListener('resize', checkMobile);
    
    return () => {
      mountedRef.current = false;
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => {
      const next = !prev;
      if (!next) {
        setOpenSubmenus([]);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector(`.${Styles.navMenu}`);
      const toggle = document.querySelector(`.${Styles.menuToggle}`);
      
      if (isMobileMenuOpen && nav && toggle) {
        const target = event.target as Node;
        if (!nav.contains(target) && !toggle.contains(target)) {
          setIsMobileMenuOpen(false);
          setOpenSubmenus([]);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

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
                    transform: lang === 'ru' ? 'translateX(0%)' : 'translateX(100%)'
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

      <nav className={`${Styles.navSticky} ${isMobileMenuOpen ? Styles.active : ''}`}>
        <div 
          className={Styles.menuToggle} 
          onClick={toggleMobileMenu}
          role="button"
          aria-label="Toggle menu"
        >
          <img 
            src={isMobileMenuOpen ? cross.src : menuIcon.src} 
            alt={isMobileMenuOpen ? "Close menu" : "Open menu"} 
          />
        </div>

        <ul className={`${Styles.navMenu} ${isMobileMenuOpen ? Styles.active : ''}`}>
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
          
          {menuData.map((item: MenuItemType, idx: number) => (
            <MenuItem
              key={`menu-${idx}`}
              item={item}
              pageType={pageType}
              isMobile={isMobile}
              openItems={openSubmenus}
              setOpenItems={setOpenSubmenus}
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

export default Header;