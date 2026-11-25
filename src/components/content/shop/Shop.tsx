import { Breadcrumbs } from '../../ui/breadcrumbs/Breadcrumbs';

import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';

import { Order } from '../../ui/order/Order';
import { ProductPage } from '../../ui/product-page/ProductPage';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

import {
  addToCart,
  changeItemCount,
  getCart,
  getCartKey,
  type CartItem,
} from '../../utils/cartStorage';

import { CatalogCard } from './CatalogCard';

import {
  categoryShortTitles,
  categoryTitles,
  equipmentCatalog,
  matchesCatalogSelection,
  parseCatalogPrice,
  partsCatalog,
  uniquePartsCatalog,
  type CatalogItem,
  type ShopType,
} from './catalog';

import styles from './catalog.module.scss';

type Page = 'shop' | 'equipment' | 'part' | 'order';

type CatalogView = 'all' | 'equipment' | 'parts';

type SortOrder =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'name';

type Detail = {
  kind: 'equipment' | 'part';
  item: CatalogItem;
};

const categories = Object.keys(categoryTitles) as ShopType[];

const completeCatalog = [
  ...equipmentCatalog,
  ...uniquePartsCatalog,
];

const DESKTOP_PAGE_SIZE = 12;
const MOBILE_PAGE_SIZE = 7;

const detailFromPath = (pathname: string): Detail | null => {
  const equipmentId = pathname.match(
    /^\/shop\/equipment\/(\d+)\/?$/
  )?.[1];

  if (equipmentId) {
    const item = equipmentCatalog.find(
      (entry) => String(entry.product.id) === equipmentId
    );

    if (item) {
      return {
        kind: 'equipment',
        item,
      };
    }
  }

  const partPath = pathname.match(
    /^\/shop\/parts\/([^/]+)\/(\d+)\/?$/
  );

  if (partPath) {
    let tem: string;

    try {
      tem = decodeURIComponent(partPath[1]);
    } catch {
      tem = partPath[1];
    }

    const item = partsCatalog.find(
      (entry) =>
        entry.tem === tem &&
        String(entry.product.id) === partPath[2]
    );

    if (item) {
      return {
        kind: 'part',
        item,
      };
    }
  }

  return null;
};

const detailFromUrl = (): Detail | null => {
  const pathDetail = detailFromPath(
    window.location.pathname
  );

  if (pathDetail) return pathDetail;

  const params = new URLSearchParams(
    window.location.search
  );

  const equipmentId = params.get('equipment');

  const equipment = equipmentCatalog.find(
    (item) =>
      String(item.product.id) === equipmentId
  );

  if (equipment) {
    return {
      kind: 'equipment',
      item: equipment,
    };
  }

  const type = params.get('type');
  const tem = params.get('tem');
  const productId = params.get('product');

  const part = partsCatalog.find(
    (item) =>
      item.category === type &&
      item.tem === tem &&
      String(item.product.id) === productId
  );

  return part
    ? {
        kind: 'part',
        item: part,
      }
    : null;
};

const pageFromUrl = (): Page => {
  const params = new URLSearchParams(
    window.location.search
  );

  if (params.get('view') === 'order') {
    return 'order';
  }

  return detailFromUrl()?.kind ?? 'shop';
};

const itemHref = (
  { category, tem, product }: CatalogItem,
  isPart: boolean
): string => {
  // /shop/ is served by the static build, including direct and new-tab links.
  if (!isPart) {
    return `/shop/?equipment=${encodeURIComponent(String(product.id))}`;
  }

  const params = new URLSearchParams({
    type: category,
    tem: tem ?? '',
    product: String(product.id),
  });
  return `/shop/?${params.toString()}`;
};

const parseFilterPrice = (
  value: string
): number | null => {
  if (value.trim() === '') {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return Math.max(0, parsed);
};

const formatPrice = (value: string): string => {
  const parsed = parseFilterPrice(value);

  if (parsed === null) {
    return value;
  }

  return parsed.toLocaleString('ru-RU');
};

export const Shop = ({
  initialPath = '/shop',
}: {
  initialPath?: string;
}) => {
  const [currentPage, setCurrentPage] = useState<Page>(
    () => detailFromPath(initialPath)?.kind ?? 'shop'
  );

  const [catalogView, setCatalogView] =
    useState<CatalogView>('all');

  const [selectedCategories, setSelectedCategories] =
    useState<ShopType[]>([]);

  const [selectedModels, setSelectedModels] =
    useState<string[]>([]);

  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const [withPhoto, setWithPhoto] = useState(false);
  const [search, setSearch] = useState('');

  const [sortOrder, setSortOrder] =
    useState<SortOrder>('default');

  const [catalogPage, setCatalogPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);

  const filterButtonRef =
    useRef<HTMLButtonElement | null>(null);

  const filterCloseRef =
    useRef<HTMLButtonElement | null>(null);

  const sidebarRef =
    useRef<HTMLElement | null>(null);

  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleFilterTouchStart = (event: TouchEvent<HTMLElement>) => {
    if (!filtersOpen || event.touches.length !== 1) {
      swipeStartRef.current = null;
      return;
    }

    swipeStartRef.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const handleFilterTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start || event.changedTouches.length !== 1) return;

    const deltaX = event.changedTouches[0].clientX - start.x;
    const deltaY = event.changedTouches[0].clientY - start.y;
    if (deltaX > 80 && deltaX > Math.abs(deltaY) * 1.5) {
      setFiltersOpen(false);
    }
  };

  // ---------------------------------------------------------
  // URL AND PAGE SYNCHRONIZATION
  // ---------------------------------------------------------

  useEffect(() => {
    const syncFromUrl = () => {
      const page = pageFromUrl();

      setCurrentPage(page);

      if (page !== 'shop') {
        return;
      }

      const params = new URLSearchParams(
        window.location.search
      );

      const categoryParam = params.get('type');

      if (!categoryParam) {
        return;
      }

      const category = categoryParam as ShopType;

      if (!categories.includes(category)) {
        setSelectedCategories([]);
        setSelectedModels([]);
        setCatalogView('all');
        setCatalogPage(1);
        return;
      }

      const model = params.get('tem');

      const validModel =
        model &&
        equipmentCatalog.some(
          (item) =>
            item.category === category &&
            item.tem === model
        );

      setSelectedCategories([category]);

      setSelectedModels(
        validModel
          ? [`${category}:${model}`]
          : []
      );

      setCatalogView(
        validModel ? 'parts' : 'equipment'
      );

      setCatalogPage(1);
    };

    syncFromUrl();

    window.addEventListener(
      'popstate',
      syncFromUrl
    );

    return () => {
      window.removeEventListener(
        'popstate',
        syncFromUrl
      );
    };
  }, []);

  // ---------------------------------------------------------
  // CART SYNCHRONIZATION
  // ---------------------------------------------------------

  useEffect(() => {
    const syncCart = () => {
      setCart(getCart());
    };

    syncCart();

    window.addEventListener(
      'cartUpdated',
      syncCart
    );

    window.addEventListener(
      'storage',
      syncCart
    );

    return () => {
      window.removeEventListener(
        'cartUpdated',
        syncCart
      );

      window.removeEventListener(
        'storage',
        syncCart
      );
    };
  }, []);

  // ---------------------------------------------------------
  // MOBILE FILTERS: BODY LOCK, ESCAPE AND FOCUS
  // ---------------------------------------------------------

  useEffect(() => {
    if (!filtersOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      filterCloseRef.current?.focus();
    }, 0);

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        setFiltersOpen(false);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements =
        sidebarRef.current?.querySelectorAll<HTMLElement>(
          [
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])',
          ].join(',')
        );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];

      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.clearTimeout(focusTimer);

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;

      filterButtonRef.current?.focus();
    };
  }, [filtersOpen]);

  // ---------------------------------------------------------
  // RESPONSIVE VIEWPORT
  // ---------------------------------------------------------

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(max-width: 650px)'
    );

    const syncViewport = () => {
      setIsMobile(mediaQuery.matches);
      setCatalogPage(1);
    };

    syncViewport();

    mediaQuery.addEventListener(
      'change',
      syncViewport
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        syncViewport
      );
    };
  }, []);

  // ---------------------------------------------------------
  // CATALOG DATA
  // ---------------------------------------------------------

  const allItems =
    catalogView === 'equipment'
      ? equipmentCatalog
      : catalogView === 'parts'
        ? uniquePartsCatalog
        : completeCatalog;

  // Счётчики категорий считаются по всему каталогу,
  // а не по текущему выбранному типу товаров.

  const categoryCounts = useMemo(() => {
    return categories.reduce(
      (result, category) => {
        result[category] = completeCatalog.filter(
          (item) =>
            item.category === category ||
            item.compatibleModels?.some(
              (model) =>
                model.category === category
            )
        ).length;

        return result;
      },
      {} as Record<ShopType, number>
    );
  }, []);

  // ---------------------------------------------------------
  // MODEL FILTER OPTIONS
  // ---------------------------------------------------------

  const modelOptions = useMemo(() => {
    return equipmentCatalog.filter(
      (item) => {
        if (!item.tem) {
          return false;
        }

        if (
          selectedCategories.length > 0 &&
          !selectedCategories.includes(item.category)
        ) {
          return false;
        }

        return uniquePartsCatalog.some(
          (part) =>
            part.compatibleModels?.some(
              (model) =>
                model.category === item.category &&
                model.tem === item.tem
            )
        );
      }
    );
  }, [selectedCategories]);

  // ---------------------------------------------------------
  // PRICE VALIDATION
  // ---------------------------------------------------------

  const minPrice = parseFilterPrice(priceFrom);
  const maxPrice = parseFilterPrice(priceTo);

  const invalidPriceRange =
    minPrice !== null &&
    maxPrice !== null &&
    minPrice > maxPrice;

  // ---------------------------------------------------------
  // FILTERED AND SORTED PRODUCTS
  // ---------------------------------------------------------

  const filteredItems = useMemo(() => {
    const query = search
      .trim()
      .toLocaleLowerCase('ru');

    if (invalidPriceRange) {
      return [];
    }

    const result = allItems.filter((item) => {
      const {
        category,
        product,
        parentTitle,
        compatibleModels,
      } = item;

      if (
        !matchesCatalogSelection(
          item,
          selectedCategories,
          selectedModels
        )
      ) {
        return false;
      }

      if (withPhoto && !product.image) {
        return false;
      }

      const price = parseCatalogPrice(
        product.price
      );

      if (
        minPrice !== null &&
        price < minPrice
      ) {
        return false;
      }

      if (
        maxPrice !== null &&
        price > maxPrice
      ) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchableText = [
        product.title,
        product.description,
        parentTitle ?? '',
        categoryTitles[category],
        ...(compatibleModels?.map(
          (model) => model.parentTitle
        ) ?? []),
      ]
        .join(' ')
        .toLocaleLowerCase('ru');

      return searchableText.includes(query);
    });

    if (sortOrder === 'price-asc') {
      result.sort(
        (a, b) =>
          parseCatalogPrice(a.product.price) -
          parseCatalogPrice(b.product.price)
      );
    }

    if (sortOrder === 'price-desc') {
      result.sort(
        (a, b) =>
          parseCatalogPrice(b.product.price) -
          parseCatalogPrice(a.product.price)
      );
    }

    if (sortOrder === 'name') {
      result.sort((a, b) =>
        a.product.title.localeCompare(
          b.product.title,
          'ru'
        )
      );
    }

    return result;
  }, [
    allItems,
    selectedCategories,
    selectedModels,
    minPrice,
    maxPrice,
    invalidPriceRange,
    withPhoto,
    search,
    sortOrder,
  ]);

  // ---------------------------------------------------------
  // PAGINATION
  // ---------------------------------------------------------

  const cartCounts = useMemo(
    () =>
      new Map(
        cart.map((item) => [
          item.cartKey,
          item.count,
        ])
      ),
    [cart]
  );

  const pageSize = isMobile
    ? MOBILE_PAGE_SIZE
    : DESKTOP_PAGE_SIZE;

  const pageCount = Math.max(
    1,
    Math.ceil(filteredItems.length / pageSize)
  );

  const visiblePage = Math.min(
    catalogPage,
    pageCount
  );

  const pageStart =
    (visiblePage - 1) * pageSize;

  const pageItems = filteredItems.slice(
    pageStart,
    pageStart + pageSize
  );

  // ---------------------------------------------------------
  // FILTER ACTIONS
  // ---------------------------------------------------------

  const selectView = (
    view: CatalogView
  ) => {
    setCatalogView(view);
    setCatalogPage(1);
  };

  const toggleCategory = (
    category: ShopType
  ) => {
    const next = selectedCategories.includes(
      category
    )
      ? selectedCategories.filter(
          (selected) => selected !== category
        )
      : [...selectedCategories, category];

    setSelectedCategories(next);

    if (next.length > 0) {
      setSelectedModels((models) =>
        models.filter((model) =>
          next.includes(
            model.split(':')[0] as ShopType
          )
        )
      );
    }

    setCatalogPage(1);
  };

  const toggleModel = (model: string) => {
    setSelectedModels((models) =>
      models.includes(model)
        ? models.filter(
            (selected) => selected !== model
          )
        : [...models, model]
    );

    setCatalogPage(1);
  };

  const resetFilters = () => {
    setCatalogView('all');

    setSelectedCategories([]);
    setSelectedModels([]);

    setPriceFrom('');
    setPriceTo('');

    setWithPhoto(false);
    setSearch('');

    setSortOrder('default');
    setCatalogPage(1);
  };

  // ---------------------------------------------------------
  // ACTIVE FILTER CHIPS
  // ---------------------------------------------------------

  const activeFilters: {
    key: string;
    label: string;
    onRemove: () => void;
  }[] = [];

  const removeFilter =
    (update: () => void) => () => {
      update();
      setCatalogPage(1);
    };

  if (catalogView !== 'all') {
    activeFilters.push({
      key: 'type',
      label:
        catalogView === 'equipment'
          ? 'Оборудование'
          : 'Комплектующие',
      onRemove: removeFilter(() =>
        selectView('all')
      ),
    });
  }

  selectedCategories.forEach((category) => {
    activeFilters.push({
      key: `category-${category}`,
      label: `Категория: ${categoryShortTitles[category]}`,
      onRemove: removeFilter(() =>
        toggleCategory(category)
      ),
    });
  });

  selectedModels.forEach((model) => {
    const modelItem = equipmentCatalog.find(
      (item) =>
        `${item.category}:${item.tem}` === model
    );

    activeFilters.push({
      key: `model-${model}`,
      label: `Модель: ${
        modelItem?.product.title ?? model
      }`,
      onRemove: removeFilter(() =>
        toggleModel(model)
      ),
    });
  });

  if (priceFrom !== '') {
    activeFilters.push({
      key: 'price-from',
      label: `Цена от ${formatPrice(priceFrom)} ₽`,
      onRemove: removeFilter(() =>
        setPriceFrom('')
      ),
    });
  }

  if (priceTo !== '') {
    activeFilters.push({
      key: 'price-to',
      label: `Цена до ${formatPrice(priceTo)} ₽`,
      onRemove: removeFilter(() =>
        setPriceTo('')
      ),
    });
  }

  if (withPhoto) {
    activeFilters.push({
      key: 'photo',
      label: 'С фотографией',
      onRemove: removeFilter(() =>
        setWithPhoto(false)
      ),
    });
  }

  if (search.trim()) {
    activeFilters.push({
      key: 'search',
      label: `Поиск: ${search.trim()}`,
      onRemove: removeFilter(() =>
        setSearch('')
      ),
    });
  }

  const activeFilterCount =
    activeFilters.length;

  // ---------------------------------------------------------
  // NAVIGATION
  // ---------------------------------------------------------

  const goToPage = (page: number) => {
    const nextPage = Math.max(
      1,
      Math.min(page, pageCount)
    );

    setCatalogPage(nextPage);

    document
      .getElementById('catalog-results')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  };

  const addItem = (item: CatalogItem) => {
    addToCart(item.product, 1);
  };

  const openCart = () => {
    window.dispatchEvent(
      new Event('toggleGlobalCart')
    );
  };

  const openItem = (
    item: CatalogItem,
    isPart: boolean
  ) => {
    window.history.pushState(
      {},
      '',
      itemHref(item, isPart)
    );

    setCurrentPage(
      isPart ? 'part' : 'equipment'
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const backToShop = () => {
    window.history.pushState(
      {},
      '',
      '/shop/'
    );

    setCurrentPage('shop');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // ---------------------------------------------------------
  // DETAIL PAGES
  // ---------------------------------------------------------

  if (currentPage === 'order') {
    return (
      <Order
        onBack={backToShop}
        onFinish={backToShop}
      />
    );
  }

  const detail =
    typeof window === 'undefined'
      ? detailFromPath(initialPath)
      : detailFromUrl();

  if (
    currentPage === 'equipment' &&
    detail?.kind === 'equipment'
  ) {
    return (
      <ProductPage
        product={detail.item.product}
        kind="equipment"
        onBack={backToShop}
      />
    );
  }

  if (
    currentPage === 'part' &&
    detail?.kind === 'part'
  ) {
    return (
      <ProductPage
        product={detail.item.product}
        onBack={backToShop}
      />
    );
  }

  // ---------------------------------------------------------
  // CATALOG
  // ---------------------------------------------------------

  return (
    <section
      className={styles.catalog}
      aria-label="Каталог товаров"
    >
      <header className={styles.shopHeader}>
        <div className={styles.shopHeaderContent}>
          <Breadcrumbs path="/shop/" />
          <span className={styles.shopEyebrow}>Каталог производителя</span>
          <h1>Оборудование и комплектующие</h1>
          <p>Оборудование и запчасти с подбором по модели, артикулу или категории.</p>
        </div>
        <div className={styles.shopHeaderStats} aria-label="Состав каталога">
          <div><strong>{equipmentCatalog.length}</strong><span>позиций оборудования</span></div>
          <div><strong>{uniquePartsCatalog.length}</strong><span>комплектующих</span></div>
        </div>
      </header>

      {/* SEARCH */}

      <div className={styles.searchRow}>
        <label className={styles.searchField}>
          <Search
            size={21}
            aria-hidden="true"
          />

          <span className={styles.visuallyHidden}>
            Поиск по названию и артикулу
          </span>

          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCatalogPage(1);
            }}
            placeholder="Поиск по названию, модели или артикулу"
          />

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setCatalogPage(1);
              }}
              aria-label="Очистить поиск"
            >
              <X size={17} />
            </button>
          )}
        </label>

        <button
          ref={filterButtonRef}
          type="button"
          className={styles.mobileFilterButton}
          onClick={() => setFiltersOpen(true)}
          aria-label={`Открыть фильтры${
            activeFilterCount > 0
              ? `, выбрано: ${activeFilterCount}`
              : ''
          }`}
          aria-expanded={filtersOpen}
          aria-haspopup="dialog"
        >
          <SlidersHorizontal
            size={19}
            aria-hidden="true"
          />

          <span className={styles.mobileFilterLabel}>
            Фильтры
          </span>

          {activeFilterCount > 0 && (
            <span
              className={styles.mobileFilterCount}
              aria-hidden="true"
            >
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className={styles.contentLayout}>
        {/* MOBILE BACKDROP */}

        {filtersOpen && (
          <button
            type="button"
            className={styles.filterBackdrop}
            aria-label="Закрыть фильтры"
            onClick={() =>
              setFiltersOpen(false)
            }
          />
        )}

        {/* FILTER SIDEBAR */}

        <aside
          ref={sidebarRef}
          className={`${styles.sidebar} ${
            filtersOpen ? styles.sidebarOpen : ''
          }`}
          aria-label="Фильтры каталога"
          role={filtersOpen ? 'dialog' : undefined}
          aria-modal={
            filtersOpen ? true : undefined
          }
          aria-labelledby="catalog-filters-title"
          onTouchStart={handleFilterTouchStart}
          onTouchEnd={handleFilterTouchEnd}
          onTouchCancel={() => { swipeStartRef.current = null; }}
        >
          <div className={styles.sidebarHeader}>
            <div className={styles.sidebarHeading}>
              <span className={styles.sidebarHeadingIcon} aria-hidden="true">
                <SlidersHorizontal size={18} />
              </span>
              <div className={styles.sidebarHeadingText}>
                <h2 id="catalog-filters-title">Фильтры</h2>
                <p className={styles.sidebarSummary} aria-live="polite">
                  {activeFilterCount > 0
                    ? 'Выбрано: ' + activeFilterCount
                    : 'Настройте подбор'}
                </p>
              </div>
            </div>



            <button
              ref={filterCloseRef}
              type="button"
              className={styles.closeFilters}
              onClick={() =>
                setFiltersOpen(false)
              }
              aria-label="Закрыть фильтры"
            >
              <X size={22} />
            </button>
          </div>

          <div className={styles.filterContent}>
          {/* TYPE */}
          <div className={styles.filterGroup}>
            <h3>Тип товара</h3>
            <div className={styles.typeOptions} role="group" aria-label="Тип товара">
              {([
                ['all', 'Все товары', completeCatalog.length],
                ['equipment', 'Оборудование', equipmentCatalog.length],
                ['parts', 'Комплектующие', uniquePartsCatalog.length],
              ] as const).map(([view, label, count]) => (
                <button
                  key={view}
                  type="button"
                  className={catalogView === view ? styles.typeOptionActive : styles.typeOption}
                  aria-pressed={catalogView === view}
                  onClick={() => selectView(view)}
                >
                  <span>{label}</span>
                  <small>{count}</small>
                </button>
              ))}
            </div>
          </div>

          {/* PRICE */}

          <div className={styles.filterGroup}>
            <h3>Цена, ₽</h3>

            <div className={styles.priceInputs}>
              <label>
                <span>От</span>

                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={priceFrom}
                  onChange={(event) => {
                    setPriceFrom(
                      event.target.value
                    );

                    setCatalogPage(1);
                  }}
                  placeholder="0"
                />
              </label>

              <label>
                <span>До</span>

                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={priceTo}
                  onChange={(event) => {
                    setPriceTo(
                      event.target.value
                    );

                    setCatalogPage(1);
                  }}
                  placeholder="Любая"
                />
              </label>
            </div>

            {invalidPriceRange && (
              <p
                className={styles.filterHint}
                role="alert"
              >
                Минимальная цена не может быть
                больше максимальной.
              </p>
            )}
          </div>

          {/* CATEGORIES */}

          <div className={styles.filterGroup}>
            <h3>Категория</h3>

            <p className={styles.filterHint}>
              Можно выбрать несколько категорий
            </p>

            {categories.map((category) => (
              <label
                key={category}
                className={styles.radioRow}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(
                    category
                  )}
                  onChange={() =>
                    toggleCategory(category)
                  }
                />

                <span>
                  {categoryShortTitles[category]}
                </span>

                <small>
                  {categoryCounts[category]}
                </small>
              </label>
            ))}
          </div>

          {/* MODELS */}

          <div className={styles.filterGroup}>
            <h3>Для модели оборудования</h3>

            <p className={styles.filterHint}>
              Можно выбрать несколько моделей
            </p>

            <div className={styles.modelOptions}>
              {modelOptions.map((item) => {
                const modelKey =
                  `${item.category}:${item.tem}`;

                return (
                  <label
                    key={modelKey}
                    className={styles.radioRow}
                  >
                    <input
                      type="checkbox"
                      checked={selectedModels.includes(
                        modelKey
                      )}
                      onChange={() =>
                        toggleModel(modelKey)
                      }
                    />

                    <span title={item.product.title}>
                      {item.product.title}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* PHOTO */}

          <div className={styles.filterGroup}>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={withPhoto}
                onChange={(event) => {
                  setWithPhoto(
                    event.target.checked
                  );

                  setCatalogPage(1);
                }}
              />

              <span>Только с фотографией</span>
            </label>
          </div>

          </div>

          <div className={styles.filterActions}>
            <button type="button" className={styles.resetButton} onClick={resetFilters}>
              <RotateCcw size={15} aria-hidden="true" />
              Сбросить фильтры
            </button>
            <button
              type="button"
              className={styles.applyFilters}
              onClick={() => setFiltersOpen(false)}
            >
              Показать товары ({filteredItems.length})
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </aside>

        {/* RESULTS */}

        <div
          id="catalog-results"
          className={styles.resultsArea}
        >
          <div className={styles.resultsHeader}>
            <div>
              <h2>
                {catalogView === 'equipment'
                  ? 'Оборудование'
                  : catalogView === 'parts'
                    ? 'Комплектующие'
                    : 'Все товары'}
              </h2>

              <p aria-live="polite">
                {filteredItems.length > 0
                  ? `Показаны ${
                      pageStart + 1
                    }–${
                      pageStart + pageItems.length
                    } из ${
                      filteredItems.length
                    } товаров`
                  : 'Товары не найдены'}
              </p>
            </div>

            <label className={styles.sortField}>
              <span>Сортировка</span>

              <select
                value={sortOrder}
                onChange={(event) => {
                  setSortOrder(
                    event.target.value as SortOrder
                  );

                  setCatalogPage(1);
                }}
              >
                <option value="default">
                  По умолчанию
                </option>

                <option value="price-asc">
                  Сначала дешевле
                </option>

                <option value="price-desc">
                  Сначала дороже
                </option>

                <option value="name">
                  По названию
                </option>
              </select>
            </label>
          </div>

          {/* ACTIVE FILTERS */}

          {activeFilterCount > 0 && (
            <div
              className={styles.activeFilters}
              aria-label="Выбранные фильтры"
            >
              {activeFilters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  className={styles.activeFilter}
                  onClick={filter.onRemove}
                  aria-label={`Убрать фильтр: ${filter.label}`}
                >
                  <span>{filter.label}</span>

                  <X
                    size={15}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          )}

          {/* PRODUCT GRID */}

          {filteredItems.length > 0 ? (
            <div className={styles.grid}>
              {pageItems.map((item) => {
                const isPart = Boolean(
                  item.compatibleModels
                );

                const detailItem =
                  item.compatibleModels?.find(
                    (model) =>
                      selectedModels.includes(
                        `${model.category}:${model.tem}`
                      )
                  ) ??
                  item.compatibleModels?.find(
                    (model) =>
                      selectedCategories.includes(
                        model.category
                      )
                  ) ??
                  item;

                const cartKey = getCartKey(
                  item.product
                );

                return (
                  <CatalogCard
                    key={cartKey}
                    item={item}
                    isPart={isPart}
                    count={
                      cartCounts.get(cartKey) ?? 0
                    }
                    href={itemHref(
                      detailItem,
                      isPart
                    )}
                    onOpen={() =>
                      openItem(
                        detailItem,
                        isPart
                      )
                    }
                    onAdd={() =>
                      addItem(item)
                    }
                    onIncrease={() =>
                      addToCart(
                        item.product,
                        1
                      )
                    }
                    onDecrease={() =>
                      changeItemCount(
                        cartKey,
                        -1
                      )
                    }
                    onOpenCart={openCart}
                  />
                );
              })}
            </div>
          ) : (
            <div className={styles.empty}>
              <Search
                size={32}
                aria-hidden="true"
              />

              <h3>
                {invalidPriceRange
                  ? 'Проверьте диапазон цен'
                  : 'Ничего не найдено'}
              </h3>

              <p>
                {invalidPriceRange
                  ? 'Минимальная цена должна быть меньше максимальной.'
                  : 'Попробуйте изменить запрос или параметры фильтра.'}
              </p>

              <button
                type="button"
                onClick={resetFilters}
              >
                Сбросить фильтры
              </button>
            </div>
          )}

          {/* PAGINATION */}

          {pageCount > 1 && (
            <nav
              className={styles.pagination}
              aria-label="Страницы каталога"
            >
              <button
                type="button"
                onClick={() =>
                  goToPage(visiblePage - 1)
                }
                disabled={visiblePage === 1}
                aria-label="Предыдущая страница"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>

              <span aria-live="polite">
                Страница {visiblePage} из {pageCount}
              </span>

              <button
                type="button"
                onClick={() =>
                  goToPage(visiblePage + 1)
                }
                disabled={
                  visiblePage === pageCount
                }
                aria-label="Следующая страница"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </nav>
          )}
        </div>
      </div>

      <BackToTop />
    </section>
  );
};
