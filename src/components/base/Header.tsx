import { useEffect, useMemo, useRef, useState, type Dispatch, type MouseEvent, type SetStateAction, } from 'react';
import Styles from './header.module.scss';
import logoRu from '../../images/logo_fut_ru.webp';
import { menuData } from './menuData';
import { CartButton } from '../ui/cart-button/CartButton';

interface MenuItem {
  title: string;
  url?: string;
  pageType?: string;
  navLabel?: string;
  eyebrow?: string;
  description?: string;
  children?: MenuItem[];
}

interface HeaderProps {
  pageType?: string;
}

/* =========================================================
   HELPERS
========================================================= */

const normalizePath = (path: string): string => {
  if (!path) return '/';

  const clean = path.split('?')[0].split('#')[0];

  if (clean === '/') return '/';

  return clean.replace(/\/+$/, '') + '/';
};

const isPathActive = (
  itemUrl?: string,
  currentPath?: string,
): boolean => {
  if (!itemUrl || !currentPath) return false;

  const itemPath = normalizePath(itemUrl);
  const current = normalizePath(currentPath);

  if (itemPath === '/') {
    return current === '/';
  }

  return (
    current === itemPath ||
    current.startsWith(itemPath)
  );
};

const itemHasActiveChild = (
  item: MenuItem,
  currentPath: string,
  pageType?: string,
): boolean => {
  if (
    isPathActive(item.url, currentPath) ||
    (!!item.pageType && item.pageType === pageType)
  ) {
    return true;
  }

  if (!item.children?.length) {
    return false;
  }

  return item.children.some((child) =>
    itemHasActiveChild(
      child,
      currentPath,
      pageType,
    ),
  );
};

/* =========================================================
   ICONS
========================================================= */

const ChevronDown = ({
  className = '',
}: {
  className?: string;
}) => (
  <svg
    className={className}
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = ({
  className = '',
}: {
  className?: string;
}) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5 12h13M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <circle
      cx="12"
      cy="9"
      r="2.3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="m4 7 8 6 8-6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M7.2 3.8 9.8 3a1.5 1.5 0 0 1 1.8.8l1.1 2.7a1.5 1.5 0 0 1-.3 1.6l-1.7 1.7a14 14 0 0 0 3.5 3.5l1.7-1.7a1.5 1.5 0 0 1 1.6-.3l2.7 1.1a1.5 1.5 0 0 1 .8 1.8l-.8 2.6a2 2 0 0 1-2 1.4C10.6 18.2 5.8 13.4 5.8 6.8a2 2 0 0 1 1.4-2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================================================
   LANGUAGE SWITCHER
========================================================= */

interface LanguageSwitcherProps {
  lang: 'ru' | 'en';
  onChange: (language: 'ru' | 'en') => void;
  className?: string;
}

const LanguageSwitcher = ({
  lang,
  onChange,
  className = '',
}: LanguageSwitcherProps) => (
  <div
    className={[
      Styles.languageSwitcher,
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    aria-label="Выбор языка"
  >
    <div className={Styles.langToggle}>
      <div
        className={[
          Styles.langSlider,
          lang === 'en'
            ? Styles.langSliderEn
            : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => onChange('ru')}
        className={
          lang === 'ru'
            ? Styles.languageActive
            : ''
        }
        aria-pressed={lang === 'ru'}
        aria-label="Русский язык"
      >
        RU
      </button>

      <button
        type="button"
        onClick={() => onChange('en')}
        className={
          lang === 'en'
            ? Styles.languageActive
            : ''
        }
        aria-pressed={lang === 'en'}
        aria-label="English language"
      >
        EN
      </button>
    </div>
  </div>
);

/* =========================================================
   DESKTOP MEGA MENU ITEM
========================================================= */

interface DesktopMenuItemProps {
  item: MenuItem;
  currentPath: string;
  pageType?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DesktopMenuItem = ({
  item,
  currentPath,
  pageType,
  isOpen,
  onOpen,
  onClose,
}: DesktopMenuItemProps) => {
  const hasChildren = Boolean(
    item.children && item.children.length,
  );
  const hasNestedColumns = item.children?.some((child) => Boolean(child.children?.length));

  const active = itemHasActiveChild(
    item,
    currentPath,
    pageType,
  );

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      onClose();
    }, 180);
  };

  useEffect(() => cancelClose, []);

  return (
    <div
      className={[
        Styles.desktopNavItem,
        active
          ? Styles.desktopNavItemActive
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') {
          cancelClose();
          onOpen();
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse' && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
          scheduleClose();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          cancelClose();
          onClose();
          event.currentTarget.querySelector<HTMLButtonElement>('button')?.focus();
        }
      }}
    >
      <div className={[Styles.navGroup, active ? Styles.navGroupActive : '', isOpen ? Styles.navGroupOpen : ''].filter(Boolean).join(' ')}>
        <a href={item.url || '#'} className={Styles.navLink}>
          {item.navLabel || item.title}
        </a>
        {hasChildren && (
          <button
            type="button"
            className={Styles.navMenuToggle}
            onClick={isOpen ? onClose : onOpen}
            aria-label={`${isOpen ? 'Закрыть' : 'Открыть'} меню «${item.title}»`}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <ChevronDown className={[Styles.arrowDown, isOpen ? Styles.arrowOpen : ''].filter(Boolean).join(' ')} />
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div
          className={Styles.megaMenu}
          onPointerEnter={cancelClose}
          onPointerLeave={(event) => {
            if (event.pointerType === 'mouse' && event.clientY >= event.currentTarget.getBoundingClientRect().bottom - 1) {
              cancelClose();
              onClose();
            }
          }}
        >
          <div className={Styles.megaInner}>
            <div className={Styles.megaIntro}>
              <div
                className={
                  Styles.megaEyebrow
                }
              >
                {item.eyebrow || 'НАПРАВЛЕНИЯ'}
              </div>

              <h3>{item.title}</h3>

              <p>
                {item.description || 'Узнайте больше о направлении работы предприятия.'}
              </p>

              {item.url && (
                <a
                  href={item.url}
                  className={
                    Styles.megaAllLink
                  }
                >
                  Открыть раздел

                  <ArrowRight
                    className={
                      Styles.arrowRight
                    }
                  />
                </a>
              )}
            </div>

            <div
              className={Styles.megaColumns}
            >
              {(hasNestedColumns ? [0, 1] : [0]).map((columnIndex) => (
                <div
                  className={hasNestedColumns ? Styles.megaColumnStack : Styles.megaColumnGrid}
                  key={columnIndex}
                >
                  {item.children?.map((child, index) => {
                    if (hasNestedColumns && index % 2 !== columnIndex) return null;
                  const childActive =
                    itemHasActiveChild(
                      child,
                      currentPath,
                      pageType,
                    );

                  return (
                    <div
                      className={
                        Styles.megaColumn
                      }
                      key={`${child.title}-${index}`}
                    >
                      <a
                        href={
                          child.url || '#'
                        }
                        className={[
                          Styles.megaColumnTitle,
                          childActive
                            ? Styles.megaColumnActive
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <span
                          className={
                            Styles.megaNumber
                          }
                        >
                          {String(
                            index + 1,
                          ).padStart(2, '0')}
                        </span>

                        <span>
                          {child.title}
                        </span>

                        <ArrowRight
                          className={
                            Styles.arrowRight
                          }
                        />
                      </a>

                      {child.children
                        ?.length ? (
                        <div
                          className={
                            Styles.desktopChildren
                          }
                        >
                          {child.children.map(
                            (
                              grandchild,
                              childIndex,
                            ) => {
                              const grandchildActive =
                                itemHasActiveChild(
                                  grandchild,
                                  currentPath,
                                  pageType,
                                );

                              return (
                                <a
                                  key={`${grandchild.title}-${childIndex}`}
                                  href={
                                    grandchild.url ||
                                    '#'
                                  }
                                  className={[
                                    Styles.desktopChildLink,
                                    grandchildActive
                                      ? Styles.desktopChildActive
                                      : '',
                                  ]
                                    .filter(
                                      Boolean,
                                    )
                                    .join(' ')}
                                >
                                  <span>
                                    {
                                      grandchild.title
                                    }
                                  </span>

                                  <ArrowRight
                                    className={
                                      Styles.arrowRight
                                    }
                                  />
                                </a>
                              );
                            },
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   MOBILE MENU ITEM
========================================================= */

interface MobileMenuItemProps {
  item: MenuItem;
  currentPath: string;
  pageType?: string;
  level?: number;
  openItems: string[];
  setOpenItems: Dispatch<
    SetStateAction<string[]>
  >;
  parentId?: string;
}

const MobileMenuItem = ({
  item,
  currentPath,
  pageType,
  level = 0,
  openItems,
  setOpenItems,
  parentId = '',
}: MobileMenuItemProps) => {
  const itemId =
    parentId +
    (parentId ? '-' : '') +
    (item.url || item.title);

  const hasChildren = Boolean(
    item.children && item.children.length,
  );

  const isOpen =
    openItems.includes(itemId);

  const active = itemHasActiveChild(
    item,
    currentPath,
    pageType,
  );

  const toggleItem = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!hasChildren) return;

    setOpenItems((previous) => {
      if (previous.includes(itemId)) {
        return previous.filter(
          (id) => id !== itemId && !id.startsWith(`${itemId}-`),
        );
      }

      const openAncestors = previous.filter(
        (id) => id === parentId || parentId.startsWith(`${id}-`),
      );

      return [...openAncestors, itemId];
    });
  };

  return (
    <div
      className={[
        Styles.mobileItem,
        active
          ? Styles.mobileItemActive
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-level={level}
    >
      <div
        className={Styles.mobileItemRow}
      >
        <a
          href={item.url || '#'}
          className={Styles.mobileItemLink}
          aria-current={active && !hasChildren ? 'page' : undefined}
        >
          {item.title}
        </a>

        {hasChildren && (
          <button
            type="button"
            className={[
              Styles.mobileArrowButton,
              isOpen
                ? Styles.mobileArrowButtonOpen
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={toggleItem}
            aria-label={
              isOpen
                ? `Свернуть ${item.title}`
                : `Открыть ${item.title}`
            }
            aria-expanded={isOpen}
          >
            <ChevronDown
              className={
                isOpen
                  ? Styles.mobileArrowOpen
                  : ''
              }
            />
          </button>
        )}
      </div>

      {hasChildren && (
        <div
          className={[
            Styles.mobileChildren,
            isOpen ? Styles.mobileChildrenOpen : '',
          ].filter(Boolean).join(' ')}
          aria-hidden={!isOpen}
        >
          <div className={Styles.mobileChildrenInner}>
            <div className={Styles.mobileChildrenContent}>
              {item.children?.map(
                (child, index) => (
                  <MobileMenuItem
                    key={`${child.title}-${index}`}
                    item={child}
                    currentPath={currentPath}
                    pageType={pageType}
                    level={level + 1}
                    openItems={openItems}
                    setOpenItems={setOpenItems}
                    parentId={itemId}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   HEADER
========================================================= */

export const Header = ({
  pageType,
}: HeaderProps) => {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [openDesktopMenu, setOpenDesktopMenu] =
    useState<string | null>(null);

  const [openItems, setOpenItems] =
    useState<string[]>([]);

  const [isScrolled, setIsScrolled] =
    useState(false);

  const [currentPath, setCurrentPath] =
    useState('/');

  const [lang, setLang] =
    useState<'ru' | 'en'>('ru');

  useEffect(() => {
    if (!openDesktopMenu) return;

    const desktopPointer = window.matchMedia('(min-width: 1281px) and (hover: hover) and (pointer: fine)');
    const closeBelowMenu = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !desktopPointer.matches) return;

      const menu = document.querySelector(`.${Styles.megaMenu}`);
      if (menu && event.clientY > menu.getBoundingClientRect().bottom) {
        setOpenDesktopMenu(null);
      }
    };

    window.addEventListener('pointermove', closeBelowMenu);
    return () => window.removeEventListener('pointermove', closeBelowMenu);
  }, [openDesktopMenu]);

  /* =====================================================
     CURRENT PAGE
  ===================================================== */

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updatePath = () => {
      setCurrentPath(
        normalizePath(
          window.location.pathname,
        ),
      );
    };

    updatePath();

    window.addEventListener(
      'popstate',
      updatePath,
    );

    return () => {
      window.removeEventListener(
        'popstate',
        updatePath,
      );
    };
  }, []);

  /* =====================================================
     SCROLL
  ===================================================== */

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(
        window.scrollY > 8,
      );
    };

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      );
    };
  }, []);

  /* =====================================================
     LANGUAGE
  ===================================================== */

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hostname =
      window.location.hostname.toLowerCase();

    setLang(
      hostname.startsWith('eng.')
        ? 'en'
        : 'ru',
    );
  }, []);

  const changeLanguage = (
    newLang: 'ru' | 'en',
  ) => {
    setLang(newLang);

    if (typeof window === 'undefined') {
      return;
    }

    if (newLang === 'en') {
      window.location.href =
        'https://eng.tech-new.ru';
    } else {
      window.location.href =
        'https://tech-new.ru';
    }
  };

  /* =====================================================
     CLOSE MOBILE MENU
  ===================================================== */

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenItems([]);
  };

  /* =====================================================
     CART
  ===================================================== */

  const goToBasket = () => {
    closeMobileMenu();

    if (typeof window === 'undefined') {
      return;
    }

    window.dispatchEvent(
      new CustomEvent(
        'toggleGlobalCart',
      ),
    );
  };

  /* =====================================================
     ESCAPE
  ===================================================== */

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };

    document.addEventListener(
      'keydown',
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        'keydown',
        handleEscape,
      );
    };
  }, [mobileOpen]);

  /* =====================================================
     BODY LOCK
  ===================================================== */

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [mobileOpen]);

  /* =====================================================
     SECONDARY LINKS
  ===================================================== */

  const secondaryLinks = useMemo(
    () => [
      {
        title: 'Онлайн магазин',
        navLabel: 'Магазин',
        url: '/shop/',
        pageType: 'shop',
      },
      {
        title: 'Закупки',
        url: '/procurement/',
        pageType: 'procurement',
      },
    ],
    [],
  );

  const isMainLinkActive = (
    url: string,
    type: string,
  ) => {
    return (
      isPathActive(
        url,
        currentPath,
      ) ||
      pageType === type
    );
  };

  return (
    <>
      <header
        className={[
          Styles.header,
          isScrolled
            ? Styles.headerScrolled
            : '',
          openDesktopMenu ? Styles.headerMenuOpen : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* =================================================
            MAIN HEADER
        ================================================= */}

        <div className={Styles.headerMain}>
          <div
            className={
              Styles.headerInner
            }
          >
            <a
              href="/home/"
              className={Styles.logo}
              aria-label="ИПП «Новые Технологии»"
            >
              <img
                src={logoRu.src}
                alt="ИПП «Новые Технологии»"
              />
            </a>

            {/* =========================================
                DESKTOP NAV
            ========================================= */}

            <nav
              className={
                Styles.desktopNav
              }
              aria-label="Основная навигация"
            >
              {menuData.map(
                (item, index) => {
                  const menuKey =
                    item.url ||
                    item.title ||
                    String(index);

                  return (
                    <DesktopMenuItem
                      key={menuKey}
                      item={
                        item as MenuItem
                      }
                      currentPath={
                        currentPath
                      }
                      pageType={
                        pageType
                      }
                      isOpen={
                        openDesktopMenu ===
                        menuKey
                      }
                      onOpen={() =>
                        setOpenDesktopMenu(
                          menuKey,
                        )
                      }
                      onClose={() =>
                        setOpenDesktopMenu(
                          (current) => current === menuKey ? null : current,
                        )
                      }
                    />
                  );
                },
              )}

              {secondaryLinks.map(
                (link) => {
                  const active =
                    isMainLinkActive(
                      link.url,
                      link.pageType,
                    );

                  return (
                    <div
                      key={link.url}
                      className={
                        Styles.desktopNavItem
                      }
                    >
                      <a
                        href={link.url}
                        className={[
                          Styles.navLink,
                          active
                            ? Styles.navLinkActive
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        aria-current={
                          active
                            ? 'page'
                            : undefined
                        }
                      >
                        {link.navLabel || link.title}
                      </a>
                    </div>
                  );
                },
              )}
            </nav>

            {/* =========================================
                ACTIONS
            ========================================= */}

            <div
              className={
                Styles.headerActions
              }
            >
              {/* DESKTOP LANGUAGE */}

              <LanguageSwitcher
                lang={lang}
                onChange={
                  changeLanguage
                }
              />

              {/* CART */}

              <CartButton
                goToBasket={
                  goToBasket
                }
              />

              {/* MOBILE LANGUAGE */}

              <LanguageSwitcher
                lang={lang}
                onChange={
                  changeLanguage
                }
                className={
                  Styles.languageSwitcherHeaderMobile
                }
              />

              {/* PROJECT BUTTON */}

              <a
                href="/contact/"
                className={
                  Styles.projectButton
                }
              >
                Обсудить проект

                <ArrowRight />
              </a>

              {/* BURGER */}

              <button
                type="button"
                className={[
                  Styles.burger,
                  mobileOpen
                    ? Styles.burgerOpen
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() =>
                  setMobileOpen(
                    (previous) =>
                      !previous,
                  )
                }
                aria-label={
                  mobileOpen
                    ? 'Закрыть меню'
                    : 'Открыть меню'
                }
                aria-expanded={
                  mobileOpen
                }
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* =====================================================
    MOBILE OVERLAY
===================================================== */}

      <div
        className={[
          Styles.mobileOverlay,
          mobileOpen ? Styles.mobileOverlayVisible : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* =====================================================
    MOBILE PANEL
===================================================== */}

      <aside
        className={[
          Styles.mobilePanel,
          mobileOpen ? Styles.mobilePanelVisible : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={!mobileOpen}
      >
        <div className={Styles.mobilePanelHeader}>
          <div>
            <span className={Styles.mobileMenuLabel}>
              МЕНЮ
            </span>

            <span className={Styles.mobileMenuSub}>
              ИПП «Новые Технологии»
            </span>
          </div>

          <button
            type="button"
            className={Styles.mobileClose}
            onClick={closeMobileMenu}
            aria-label="Закрыть меню"
          >
            <span />
            <span />
          </button>
        </div>

        <nav
          className={Styles.mobileNav}
          aria-label="Мобильная навигация"
        >
          {menuData.map(
            (item: MenuItem, index: number) => (
              <MobileMenuItem
                key={`${item.title}-${index}`}
                item={item}
                currentPath={currentPath}
                pageType={pageType}
                openItems={openItems}
                setOpenItems={setOpenItems}
              />
            )
          )}

          {secondaryLinks.map((item) => (
            <a
              key={item.title}
              href={item.url}
              className={[
                Styles.mobileMainLink,
                isMainLinkActive(
                  item.url,
                  item.pageType
                )
                  ? Styles.mobileMainLinkActive
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {item.title}
            </a>
          ))}

          {/* =================================================
        ТОЛЬКО <= 900px

        В 901–1280px этот блок полностью скрыт.
        Он находится ВНУТРИ mobileNav,
        поэтому не фиксируется снизу.
    ================================================= */}

          <div className={Styles.mobileExtra}>
            <div className={Styles.mobileContacts}>
              <span className={Styles.mobileContactsTitle}>
                КОНТАКТЫ
              </span>

              <a
                href="https://yandex.ru/maps/?text=Уфа%2C%20ул.%20Заки%20Валиди%2032%2F2"
                target="_blank"
                rel="noreferrer"
                className={Styles.mobileAddress}
              >
                <span className={Styles.mobileContactIcon}>
                  <LocationIcon />
                </span>

                <span>
                  Уфа, ул. Заки Валиди 32/2
                </span>
              </a>

              <a href="mailto:nt@tech-new.ru">
                <span className={Styles.mobileContactIcon}>
                  <MailIcon />
                </span>

                <span>
                  nt@tech-new.ru
                </span>
              </a>

              <a href="tel:+73472939333">
                <span className={Styles.mobileContactIcon}>
                  <PhoneIcon />
                </span>

                <span>
                  +7 (347) 293-93-33
                </span>
              </a>
            </div>

            <a
              href="/contact/"
              className={Styles.mobileProjectButton}
            >
              <span>Обсудить проект</span>
              <ArrowRight />
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Header;
