import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import Styles from './documents.module.scss';

import {
  documentsData,
  type TDocument,
  type TDocumentCategory,
} from './documents.data';

import { BackToTop } from '../../ui/back-to-top/BackToTop';

type IndexedDocument = TDocument & {
  categoryId: string;
  categoryTitle: string;
};

/* =========================================================
   Все документы в едином массиве для поиска
========================================================= */

const allDocuments: IndexedDocument[] = documentsData.flatMap(
  (category) =>
    category.documents.map((document) => ({
      ...document,
      categoryId: category.id,
      categoryTitle: category.title,
    })),
);

/* =========================================================
   Короткие названия категорий
========================================================= */

const shortNames: Record<string, string> = {
  'accounting-system': 'АГЗУ',
  accessories: 'Комплектующие',
  'measuring-system': 'Измерительные системы',
  'preparation-systems': 'Подготовка',
  'pumping-stations': 'Перекачка',
};

/* =========================================================
   Склонение слова "документ"
========================================================= */

function documentWord(count: number): string {
  const lastTwo = count % 100;
  const last = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return 'документов';
  }

  if (last === 1) {
    return 'документ';
  }

  if (last >= 2 && last <= 4) {
    return 'документа';
  }

  return 'документов';
}

/* =========================================================
   Работа с URL
========================================================= */

function readLocation() {
  if (typeof window === 'undefined') {
    return {
      categoryId: null as string | null,
      query: '',
    };
  }

  const params = new URLSearchParams(window.location.search);

  const rawCategory = params.get('category');

  return {
    categoryId: documentsData.some(
      (item) => item.id === rawCategory,
    )
      ? rawCategory
      : null,

    query: params.get('q') ?? '',
  };
}

function updateLocation(
  categoryId: string | null,
  query: string,
  mode: 'push' | 'replace',
) {
  const params = new URLSearchParams(window.location.search);

  if (categoryId) {
    params.set('category', categoryId);
  } else {
    params.delete('category');
  }

  if (query.trim()) {
    params.set('q', query.trim());
  } else {
    params.delete('q');
  }

  const search = params.toString();

  const url = `${window.location.pathname}${search ? `?${search}` : ''
    }${window.location.hash}`;

  window.history[
    mode === 'push' ? 'pushState' : 'replaceState'
  ]({}, '', url);
}

/* =========================================================
   Подсветка найденного текста
========================================================= */

function highlightText(
  text: string,
  query: string,
): ReactNode {
  const term = query.trim();

  if (!term) {
    return text;
  }

  const escaped = term.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&',
  );

  const parts = text.split(
    new RegExp(`(${escaped})`, 'gi'),
  );

  return parts.map((part, index) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <mark
        key={index}
        className={Styles.highlight}
      >
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

/* =========================================================
   Иконка стрелки
========================================================= */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   Иконка назад
========================================================= */

function BackArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19 12H5m6-6-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   Иконка поиска
========================================================= */

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="m16 16 4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================================================
   Иконка закрытия
========================================================= */

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================================================
   Мобильное переключение карточек
========================================================= */

function MobileSlider({
  children,
  count,
  className,
  label,
}: {
  children: ReactNode;
  count: number;
  className: string;
  label: string;
}) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const programmaticIndexRef = useRef<number | null>(null);
  const releaseTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    if (programmaticIndexRef.current !== null) return;

    const cards = Array.from(slider.children) as HTMLElement[];
    if (!cards.length) {
      setActiveIndex(0);
      return;
    }

    const sliderLeft = slider.getBoundingClientRect().left;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.getBoundingClientRect().left - sliderLeft,
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let frame = 0;
    const releaseProgrammaticScroll = () => {
      if (releaseTimerRef.current !== null) {
        window.clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = null;
      }
      if (programmaticIndexRef.current === null) return;
      programmaticIndexRef.current = null;
      updateActiveIndex();
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      if (programmaticIndexRef.current !== null) {
        if (releaseTimerRef.current !== null) {
          window.clearTimeout(releaseTimerRef.current);
        }
        releaseTimerRef.current = window.setTimeout(
          releaseProgrammaticScroll,
          260,
        );
        return;
      }
      frame = window.requestAnimationFrame(updateActiveIndex);
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    slider.addEventListener('scrollend', releaseProgrammaticScroll);
    window.addEventListener('resize', updateActiveIndex);
    updateActiveIndex();

    return () => {
      window.cancelAnimationFrame(frame);
      if (releaseTimerRef.current !== null) {
        window.clearTimeout(releaseTimerRef.current);
      }
      slider.removeEventListener('scroll', handleScroll);
      slider.removeEventListener('scrollend', releaseProgrammaticScroll);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [count, updateActiveIndex]);

  const scrollToIndex = (index: number) => {
    const slider = sliderRef.current;
    const target = slider?.children[index] as HTMLElement | undefined;
    if (!slider || !target) return;

    const left =
      slider.scrollLeft +
      target.getBoundingClientRect().left -
      slider.getBoundingClientRect().left;

    programmaticIndexRef.current = index;
    setActiveIndex(index);
    if (releaseTimerRef.current !== null) {
      window.clearTimeout(releaseTimerRef.current);
    }
    releaseTimerRef.current = window.setTimeout(() => {
      programmaticIndexRef.current = null;
      releaseTimerRef.current = null;
      updateActiveIndex();
    }, 2000);

    slider.scrollTo({
      left,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };

  return (
    <div className={Styles.sliderWrapper}>
      <div
        ref={sliderRef}
        className={className}
        role="group"
        aria-label={label}
      >
        {children}
      </div>

      {count > 1 && (
        <div className={Styles.mobileSliderControls}>
          <div className={Styles.sliderControlsRow}>
            <button
              type="button"
              className={Styles.sliderArrow}
              onClick={() => scrollToIndex(activeIndex === 0 ? count - 1 : activeIndex - 1)}
              aria-label="Предыдущая карточка"
            >
              <BackArrowIcon />
            </button>

            {count <= 9 ? (
              <div
                className={Styles.sliderDots}
                role="group"
                aria-label={`Карточка ${activeIndex + 1} из ${count}`}
              >
                {Array.from({ length: count }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${Styles.sliderDot} ${index === activeIndex ? Styles.sliderDotActive : ''}`}
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Перейти к карточке ${index + 1}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            ) : (
              <span className={Styles.sliderCounter} aria-live="polite">
                {activeIndex + 1} / {count}
              </span>
            )}

            <button
              type="button"
              className={Styles.sliderArrow}
              onClick={() => scrollToIndex(activeIndex === count - 1 ? 0 : activeIndex + 1)}
              aria-label="Следующая карточка"
            >
              <ArrowIcon />
            </button>
          </div>
          <span className={Styles.sliderHint}>Листайте карточки свайпом</span>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   Карточка категории
========================================================= */

function CategoryCard({
  category,
  index,
  onClick,
}: {
  category: TDocumentCategory;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={Styles.categoryCard}
      onClick={onClick}
    >
      <span className={Styles.categoryTop}>
        <span className={Styles.categoryNumber}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={Styles.categoryLabel}>
          {shortNames[category.id] ?? category.title}
        </span>
      </span>

      <span className={Styles.categoryMain}>
        <span className={Styles.categoryTitle}>
          {category.title}
        </span>

        {category.description && (
          <span className={Styles.categoryDescription}>
            {category.description}
          </span>
        )}
      </span>

      <span className={Styles.categoryRight}>
        <span className={Styles.categoryCount}>
          {category.documents.length}{' '}
          {documentWord(category.documents.length)}
        </span>

        <span className={Styles.categoryArrow}>
          <ArrowIcon />
        </span>
      </span>
    </button>
  );
}

/* =========================================================
   Карточка документа
========================================================= */

function DocumentCard({
  document,
  query = '',
  categoryLabel,
}: {
  document: TDocument;
  query?: string;
  categoryLabel?: string;
}) {
  const title = document.title || document.fileName;

  const fileType =
    document.fileName
      ?.split('.')
      .pop()
      ?.toUpperCase() || 'PDF';

  return (
    <article className={Styles.documentCard}>
      <div className={Styles.documentTop}>
        <span className={Styles.fileType}>
          {fileType}
        </span>

        {document.fileSize && (
          <span className={Styles.fileSize}>
            {document.fileSize}
          </span>
        )}
      </div>

      <div className={Styles.documentContent}>
        {categoryLabel && (
          <span className={Styles.documentCategory}>
            Категория: {categoryLabel}
          </span>
        )}

        <h3 className={Styles.documentTitle}>
          {highlightText(title, query)}
        </h3>

        <p className={Styles.documentFile}>
          {highlightText(
            document.fileName,
            query,
          )}
        </p>
      </div>

      <div className={Styles.documentActions}>
        <a
          className={Styles.openButton}
          href={document.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Открыть ${title} в новой вкладке`}
        >
          <span>Открыть документ</span>
          <ArrowIcon />
        </a>

        <a
          className={Styles.downloadButton}
          href={document.fileUrl}
          download
          aria-label={`Скачать ${title}`}
          title="Скачать документ"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 3v12m-4-4 4 4 4-4M4 19h16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}

/* =========================================================
   Основная страница
========================================================= */

export function Documents() {
  const [searchQuery, setSearchQuery] =
    useState('');

  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState<string | null>(null);

  /* =======================================================
     Синхронизация с URL
  ======================================================= */

  useEffect(() => {
    const handlePopState = () => {
      const state = readLocation();

      setSearchQuery(state.query);
      setSelectedCategoryId(
        state.categoryId,
      );
    };

    handlePopState();

    window.addEventListener(
      'popstate',
      handlePopState,
    );

    return () => {
      window.removeEventListener(
        'popstate',
        handlePopState,
      );
    };
  }, []);

  /* =======================================================
     Выбранная категория
  ======================================================= */

  const selectedCategory =
    documentsData.find(
      (category) =>
        category.id === selectedCategoryId,
    );

  /* =======================================================
     Поисковый запрос
  ======================================================= */

  const normalizedSearch =
    searchQuery.trim().toLowerCase();

  /* =======================================================
     Результаты поиска
  ======================================================= */

  const searchResults = useMemo(() => {
    if (!normalizedSearch) {
      return [];
    }

    return allDocuments.filter(
      (document) =>
        [
          document.title,
          document.fileName,
          document.categoryTitle,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch),
    );
  }, [normalizedSearch]);

  /* =======================================================
     Изменение поиска

     ВАЖНО:
     поле поиска НЕ скрывается после ввода символа.
  ======================================================= */

  const changeSearch = (value: string) => {
    setSearchQuery(value);

    setSelectedCategoryId(null);

    updateLocation(
      null,
      value,
      'replace',
    );
  };

  /* =======================================================
     Очистка поиска
  ======================================================= */

  const clearSearch = () => {
    changeSearch('');
  };

  /* =======================================================
     Открытие категории
  ======================================================= */

  const openCategory = (
    categoryId: string,
  ) => {
    setSelectedCategoryId(
      categoryId,
    );

    setSearchQuery('');

    updateLocation(
      categoryId,
      '',
      'push',
    );

    requestAnimationFrame(() => {
      document
        .getElementById(
          'documents-back',
        )
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    });
  };

  /* =======================================================
     Закрытие категории
  ======================================================= */

  const closeCategory = () => {
    setSelectedCategoryId(null);

    updateLocation(
      null,
      '',
      'push',
    );

    requestAnimationFrame(() => {
      document
        .getElementById(
          'documents-content',
        )
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    });
  };

  /* =======================================================
     Состояние поиска
  ======================================================= */

  const showSearch =
    Boolean(normalizedSearch);

  /* =======================================================
     Заголовок
  ======================================================= */

  const viewTitle = showSearch
    ? 'Найденные документы'
    : selectedCategory?.title ??
    'Категории документов';

  /* =======================================================
     Количество результатов
  ======================================================= */

  const resultCount = showSearch
    ? searchResults.length
    : selectedCategory
      ? selectedCategory.documents.length
      : documentsData.length;

  return (
    <div className={Styles.page}>
      {/* ===================================================
          HERO
      =================================================== */}

      <header className={Styles.hero}>
        <div className={Styles.heroInner}>
          <div className={Styles.heroMain}>
            <span
              className={
                Styles.eyebrow
              }
            >
              <span
                className={
                  Styles.eyebrowDot
                }
                aria-hidden="true"
              />

              Документальный центр
            </span>

            <h1
              className={
                Styles.heroTitle
              }
            >
              Документы
              {/* <span>.</span> */}
            </h1>

            <p
              className={
                Styles.heroDescription
              }
            >
              Сертификаты, паспорта,
              техническая и
              эксплуатационная
              документация «Новых
              Технологий».
            </p>
          </div>

          <div
            className={
              Styles.heroStats
            }
            aria-label="Состав библиотеки"
          >
            <div
              className={
                Styles.stat
              }
            >
              <strong>
                {documentsData.length}
              </strong>

              <span>
                категорий
              </span>
            </div>

            <span
              className={
                Styles.statDivider
              }
              aria-hidden="true"
            />

            <div
              className={
                Styles.stat
              }
            >
              <strong>
                {allDocuments.length}
              </strong>

              <span>
                {documentWord(
                  allDocuments.length,
                )}
              </span>
            </div>
          </div>
        </div>
      </header>

      {selectedCategory && !showSearch && (
        <nav
          id="documents-back"
          className={Styles.backBar}
          aria-label="Навигация по документам"
        >
          <button
            type="button"
            className={Styles.backButton}
            onClick={closeCategory}
          >
            <span className={Styles.backButtonIcon}>
              <BackArrowIcon />
            </span>
            <span>Все категории</span>
          </button>
        </nav>
      )}

      {/* ===================================================
          CONTENT
      =================================================== */}

      <main
        id="documents-content"
        className={
          Styles.content
        }
      >
        <section
          aria-labelledby="documents-heading"
        >
          {/* ===============================================
              HEADER
          =============================================== */}

          <div
            className={
              Styles.sectionHeader
            }
          >
            <div
              className={
                Styles.sectionHeading
              }
            >
              <span
                className={
                  Styles.sectionEyebrow
                }
              >
                {showSearch
                  ? 'Результаты поиска'
                  : selectedCategory
                    ? 'Категория'
                    : 'Библиотека'}
              </span>

              <h2
                id="documents-heading"
                className={
                  Styles.sectionTitle
                }
              >
                {viewTitle}
              </h2>

              <p
                className={
                  Styles.sectionLead
                }
              >
                {showSearch
                  ? `По запросу «${searchQuery}» найдено ${searchResults.length} ${documentWord(searchResults.length)}.`
                  : selectedCategory
                    ? selectedCategory.description ||
                    'Документы выбранной категории.'
                    : 'Выберите направление, чтобы открыть техническую и эксплуатационную документацию.'}
              </p>
            </div>

            <div className={Styles.sectionTools}>
              <div className={Styles.categorySearch}>
                <label htmlFor="documents-search" className={Styles.searchLabel}>
                  Найти документ
                </label>
                <div className={Styles.searchBox}>
                  <SearchIcon />
                  <input
                    id="documents-search"
                    type="search"
                    value={searchQuery}
                    onChange={(event) => changeSearch(event.target.value)}
                    placeholder="Название, номер или категория"
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className={Styles.clearButton}
                      onClick={clearSearch}
                      aria-label="Очистить поиск"
                    >
                      <CloseIcon />
                    </button>
                  )}
                </div>
              </div>

              <span
                className={Styles.resultCount}
                aria-label={`Всего: ${resultCount}`}
              >
                {resultCount}
              </span>
            </div>
          </div>

          {/* =================================================
              ПОИСК
          ================================================= */}

          {showSearch ? (
            searchResults.length >
              0 ? (
              <MobileSlider
                key={`search-${normalizedSearch}`}
                count={searchResults.length}
                className={Styles.documentsGrid}
                label="Результаты поиска"
              >
                {searchResults.map(
                  (document) => (
                    <DocumentCard
                      key={`${document.categoryId}-${document.id}`}
                      document={
                        document
                      }
                      query={
                        searchQuery
                      }
                      categoryLabel={
                        document.categoryTitle
                      }
                    />
                  ),
                )}
              </MobileSlider>
            ) : (
              <div
                className={
                  Styles.emptyState
                }
              >
                <span
                  className={
                    Styles.emptyIcon
                  }
                  aria-hidden="true"
                >
                  ⌕
                </span>

                <h3>
                  Ничего не найдено
                </h3>

                <p>
                  Попробуйте другой
                  запрос или
                  посмотрите документы
                  по категориям.
                </p>

                <button
                  type="button"
                  className={
                    Styles.emptyButton
                  }
                  onClick={
                    clearSearch
                  }
                >
                  Показать все
                  категории
                </button>
              </div>
            )
          ) : selectedCategory ? (
            /* ===============================================
               ДОКУМЕНТЫ КАТЕГОРИИ
            =============================================== */

            selectedCategory.documents
              .length > 0 ? (
              <MobileSlider
                key={`category-${selectedCategory.id}`}
                count={selectedCategory.documents.length}
                className={Styles.documentsGrid}
                label={`Документы: ${selectedCategory.title}`}
              >
                {selectedCategory.documents.map(
                  (document) => (
                    <DocumentCard
                      key={
                        document.id
                      }
                      document={
                        document
                      }
                    />
                  ),
                )}
              </MobileSlider>
            ) : (
              <div
                className={
                  Styles.emptyState
                }
              >
                <h3>
                  В этой категории
                  пока нет
                  документов
                </h3>

                <button
                  type="button"
                  className={
                    Styles.emptyButton
                  }
                  onClick={
                    closeCategory
                  }
                >
                  Вернуться к
                  категориям
                </button>
              </div>
            )
          ) : (
            /* ===============================================
               КАТЕГОРИИ
            =============================================== */

            <MobileSlider
              count={documentsData.length}
              className={Styles.categoriesList}
              label="Категории документов"
            >
              {documentsData.map(
                (
                  category,
                  index,
                ) => (
                  <CategoryCard
                    key={
                      category.id
                    }
                    category={
                      category
                    }
                    index={
                      index
                    }
                    onClick={() =>
                      openCategory(
                        category.id,
                      )
                    }
                  />
                ),
              )}
            </MobileSlider>
          )}
        </section>
      </main>

      <BackToTop />
    </div>
  );
}

export default Documents;