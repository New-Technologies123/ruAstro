import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react';
import { Order } from '../../ui/order/Order';
import { ProductPage } from '../../ui/product-page/ProductPage';
import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { addToCart, changeItemCount, getCart, getCartKey, type CartItem } from '../../utils/cartStorage';
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
type SortOrder = 'default' | 'price-asc' | 'price-desc' | 'name';
type Detail = { kind: 'equipment' | 'part'; item: CatalogItem };

const categories = Object.keys(categoryTitles) as ShopType[];
const completeCatalog = [...equipmentCatalog, ...uniquePartsCatalog];
const DESKTOP_PAGE_SIZE = 12;
const MOBILE_PAGE_SIZE = 4;

const detailFromPath = (pathname: string): Detail | null => {
  const equipmentId = pathname.match(/^\/shop\/equipment\/(\d+)\/?$/)?.[1];
  if (equipmentId) {
    const item = equipmentCatalog.find((entry) => String(entry.product.id) === equipmentId);
    if (item) return { kind: 'equipment', item };
  }
  const partPath = pathname.match(/^\/shop\/parts\/([^/]+)\/(\d+)\/?$/);
  if (partPath) {
    const item = partsCatalog.find((entry) => entry.tem === partPath[1] && String(entry.product.id) === partPath[2]);
    if (item) return { kind: 'part', item };
  }
  return null;
};

const detailFromUrl = (): Detail | null => {
  const pathDetail = detailFromPath(window.location.pathname);
  if (pathDetail) return pathDetail;
  const params = new URLSearchParams(window.location.search);
  const equipment = equipmentCatalog.find((item) => String(item.product.id) === params.get('equipment'));
  if (equipment) return { kind: 'equipment', item: equipment };
  const part = partsCatalog.find(
    (item) => item.category === params.get('type') && item.tem === params.get('tem') && String(item.product.id) === params.get('product'),
  );
  return part ? { kind: 'part', item: part } : null;
};

const pageFromUrl = (): Page => {
  if (new URLSearchParams(window.location.search).get('view') === 'order') return 'order';
  return detailFromUrl()?.kind ?? 'shop';
};

const itemHref = ({ tem, product }: CatalogItem, isPart: boolean): string => {
  if (!isPart) return `/shop/equipment/${product.id}`;
  return `/shop/parts/${encodeURIComponent(tem ?? '')}/${product.id}`;
};

export const Shop = ({ initialPath = '/shop' }: { initialPath?: string }) => {
  const [currentPage, setCurrentPage] = useState<Page>(() => detailFromPath(initialPath)?.kind ?? 'shop');
  const [catalogView, setCatalogView] = useState<CatalogView>('all');
  const [selectedCategories, setSelectedCategories] = useState<ShopType[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [withPhoto, setWithPhoto] = useState(false);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');
  const [catalogPage, setCatalogPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const syncFromUrl = () => {
      const page = pageFromUrl();
      setCurrentPage(page);
      if (page !== 'shop') return;
      const params = new URLSearchParams(window.location.search);
      const category = params.get('type') as ShopType;
      if (!categories.includes(category)) return;
      const model = params.get('tem');
      const validModel = model && equipmentCatalog.some((item) => item.category === category && item.tem === model);
      setSelectedCategories([category]);
      setSelectedModels(validModel ? [`${category}:${model}`] : []);
      setCatalogView(validModel ? 'parts' : 'equipment');
      setCatalogPage(1);
    };
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  useEffect(() => {
    const syncCart = () => setCart(getCart());
    syncCart();
    window.addEventListener('cartUpdated', syncCart);
    window.addEventListener('storage', syncCart);
    return () => {
      window.removeEventListener('cartUpdated', syncCart);
      window.removeEventListener('storage', syncCart);
    };
  }, []);

  useEffect(() => {
    if (!filtersOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFiltersOpen(false);
    };
    window.addEventListener('keydown', onEscape);
    return () => {
      window.removeEventListener('keydown', onEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [filtersOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 650px)');
    const syncViewport = () => {
      setIsMobile(mediaQuery.matches);
      setCatalogPage(1);
    };
    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);
    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, []);

  const allItems = catalogView === 'equipment' ? equipmentCatalog : catalogView === 'parts' ? uniquePartsCatalog : completeCatalog;
  const modelOptions = equipmentCatalog.filter(
    (item) =>
      item.tem &&
      (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
      uniquePartsCatalog.some((part) => part.compatibleModels?.some((model) => model.category === item.category && model.tem === item.tem)),
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('ru');
    const min = priceFrom === '' ? null : Math.max(0, Number(priceFrom));
    const max = priceTo === '' ? null : Math.max(0, Number(priceTo));
    const result = allItems.filter((item) => {
      const { category, product, parentTitle, compatibleModels } = item;
      if (!matchesCatalogSelection(item, selectedCategories, selectedModels)) return false;
      if (withPhoto && !product.image) return false;
      const price = parseCatalogPrice(product.price);
      if (min !== null && price < min) return false;
      if (max !== null && price > max) return false;
      if (!query) return true;
      return `${product.title} ${product.description} ${parentTitle ?? ''} ${categoryTitles[category]} ${compatibleModels?.map((model) => model.parentTitle).join(' ') ?? ''}`
        .toLocaleLowerCase('ru')
        .includes(query);
    });
    if (sortOrder === 'price-asc') result.sort((a, b) => parseCatalogPrice(a.product.price) - parseCatalogPrice(b.product.price));
    if (sortOrder === 'price-desc') result.sort((a, b) => parseCatalogPrice(b.product.price) - parseCatalogPrice(a.product.price));
    if (sortOrder === 'name') result.sort((a, b) => a.product.title.localeCompare(b.product.title, 'ru'));
    return result;
  }, [allItems, selectedCategories, selectedModels, priceFrom, priceTo, withPhoto, search, sortOrder]);

  const cartCounts = useMemo(() => new Map(cart.map((item) => [item.cartKey, item.count])), [cart]);
  const pageSize = isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;
  const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const visiblePage = Math.min(catalogPage, pageCount);
  const pageStart = (visiblePage - 1) * pageSize;
  const pageItems = filteredItems.slice(pageStart, pageStart + pageSize);
  const selectView = (view: CatalogView) => {
    setCatalogView(view);
    setCatalogPage(1);
  };

  const toggleCategory = (category: ShopType) => {
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter((selected) => selected !== category)
      : [...selectedCategories, category];
    setSelectedCategories(next);
    if (next.length > 0) setSelectedModels((models) => models.filter((model) => next.includes(model.split(':')[0] as ShopType)));
    setCatalogPage(1);
  };

  const toggleModel = (model: string) => {
    setSelectedModels((models) => (models.includes(model) ? models.filter((selected) => selected !== model) : [...models, model]));
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

  const activeFilters: { key: string; label: string; onRemove: () => void }[] = [];
  const removeFilter = (update: () => void) => () => {
    update();
    setCatalogPage(1);
  };
  if (catalogView !== 'all')
    activeFilters.push({
      key: 'type',
      label: catalogView === 'equipment' ? 'Оборудование' : 'Комплектующие',
      onRemove: removeFilter(() => selectView('all')),
    });
  selectedCategories.forEach((category) => {
    activeFilters.push({
      key: `category-${category}`,
      label: `Категория: ${categoryShortTitles[category]}`,
      onRemove: removeFilter(() => toggleCategory(category)),
    });
  });
  selectedModels.forEach((model) => {
    activeFilters.push({
      key: `model-${model}`,
      label: `Модель: ${equipmentCatalog.find((item) => `${item.category}:${item.tem}` === model)?.product.title ?? model}`,
      onRemove: removeFilter(() => toggleModel(model)),
    });
  });
  if (priceFrom !== '')
    activeFilters.push({
      key: 'price-from',
      label: `Цена от ${Number(priceFrom).toLocaleString('ru-RU')} ₽`,
      onRemove: removeFilter(() => setPriceFrom('')),
    });
  if (priceTo !== '')
    activeFilters.push({
      key: 'price-to',
      label: `Цена до ${Number(priceTo).toLocaleString('ru-RU')} ₽`,
      onRemove: removeFilter(() => setPriceTo('')),
    });
  if (withPhoto) activeFilters.push({ key: 'photo', label: 'С фотографией', onRemove: removeFilter(() => setWithPhoto(false)) });
  if (search.trim()) activeFilters.push({ key: 'search', label: `Поиск: ${search.trim()}`, onRemove: removeFilter(() => setSearch('')) });
  const activeFilterCount = activeFilters.length;

  const goToPage = (page: number) => {
    setCatalogPage(page);
    document.getElementById('catalog-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const addItem = (item: CatalogItem) => {
    addToCart(item.product, 1);
  };

  const openCart = () => window.dispatchEvent(new Event('toggleGlobalCart'));

  const openItem = (item: CatalogItem, isPart: boolean) => {
    window.history.pushState({}, '', itemHref(item, isPart));
    setCurrentPage(isPart ? 'part' : 'equipment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToShop = () => {
    window.history.pushState({}, '', '/shop');
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'order') return <Order onBack={backToShop} onFinish={backToShop} />;
  const detail = typeof window === 'undefined' ? detailFromPath(initialPath) : detailFromUrl();
  if (currentPage === 'equipment' && detail?.kind === 'equipment')
    return <ProductPage product={detail.item.product} kind="equipment" onBack={backToShop} />;
  if (currentPage === 'part' && detail?.kind === 'part')
    return <ProductPage product={detail.item.product} onBack={backToShop} />;
  return (
    <section className={styles.catalog} aria-label="Каталог товаров">
      <header className={styles.shopHeader}>
        <span className={styles.shopEyebrow}>Каталог</span>
        <h1>Онлайн-магазин</h1>
        <p>Оборудование и комплектующие для вашей модели — в одном каталоге.</p>
      </header>

      <div className={styles.searchRow}>
        <label className={styles.searchField}>
          <Search size={21} aria-hidden="true" />
          <span className={styles.visuallyHidden}>Поиск по названию и артикулу</span>
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
            <button type="button" onClick={() => setSearch('')} aria-label="Очистить поиск">
              <X size={17} />
            </button>
          )}
        </label>
        <button
          type="button"
          className={styles.mobileFilterButton}
          onClick={() => setFiltersOpen(true)}
          aria-label={`Открыть фильтры${activeFilterCount > 0 ? `, выбрано: ${activeFilterCount}` : ''}`}
        >
          <SlidersHorizontal size={19} aria-hidden="true" />
          <span className={styles.mobileFilterLabel}>Фильтры</span>
          {activeFilterCount > 0 && <span className={styles.mobileFilterCount} aria-hidden="true">{activeFilterCount}</span>}
        </button>
      </div>

      <div className={styles.contentLayout}>
        {filtersOpen && (
          <button type="button" className={styles.filterBackdrop} aria-label="Закрыть фильтры" onClick={() => setFiltersOpen(false)} />
        )}
        <aside
          className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`}
          aria-label="Фильтры каталога"
          role={filtersOpen ? 'dialog' : undefined}
          aria-modal={filtersOpen ? true : undefined}
        >
          <div className={styles.sidebarHeader}>
            <h2>Фильтры</h2>
            <button type="button" className={styles.resetButton} onClick={resetFilters}>
              <RotateCcw size={15} /> Сбросить
            </button>
            <button type="button" className={styles.closeFilters} onClick={() => setFiltersOpen(false)} aria-label="Закрыть фильтры">
              <X size={22} />
            </button>
          </div>

          <div className={styles.filterGroup}>
            <h3>Тип товара</h3>
            {(
              [
                ['all', 'Все товары', completeCatalog.length],
                ['equipment', 'Оборудование', equipmentCatalog.length],
                ['parts', 'Комплектующие', uniquePartsCatalog.length],
              ] as const
            ).map(([view, label, count]) => (
              <label key={view} className={styles.radioRow}>
                <input type="radio" name="catalog-type" checked={catalogView === view} onChange={() => selectView(view)} />
                <span>{label}</span>
                <small>{count}</small>
              </label>
            ))}
          </div>

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
                    setPriceFrom(event.target.value);
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
                    setPriceTo(event.target.value);
                    setCatalogPage(1);
                  }}
                  placeholder="Любая"
                />
              </label>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3>Категория</h3>
            <p className={styles.filterHint}>Можно выбрать несколько категорий</p>
            {categories.map((category) => (
              <label key={category} className={styles.radioRow}>
                <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggleCategory(category)} />
                <span>{categoryShortTitles[category]}</span>
                <small>
                  {
                    allItems.filter(
                      (item) => item.category === category || item.compatibleModels?.some((model) => model.category === category),
                    ).length
                  }
                </small>
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h3>Для модели оборудования</h3>
            <p className={styles.filterHint}>Можно выбрать несколько моделей</p>
            <div className={styles.modelOptions}>
              {modelOptions.map((item) => (
                <label key={`${item.category}:${item.tem}`} className={styles.radioRow}>
                  <input
                    type="checkbox"
                    checked={selectedModels.includes(`${item.category}:${item.tem}`)}
                    onChange={() => toggleModel(`${item.category}:${item.tem}`)}
                  />
                  <span title={item.product.title}>{item.product.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={withPhoto}
                onChange={(event) => {
                  setWithPhoto(event.target.checked);
                  setCatalogPage(1);
                }}
              />
              <span>Только с фотографией</span>
            </label>
          </div>
          <button type="button" className={styles.applyFilters} onClick={() => setFiltersOpen(false)}>
            Показать {filteredItems.length} товаров <ArrowRight size={18} />
          </button>
        </aside>

        <div id="catalog-results" className={styles.resultsArea}>
          <div className={styles.resultsHeader}>
            <div>
              <h2>{catalogView === 'equipment' ? 'Оборудование' : catalogView === 'parts' ? 'Комплектующие' : 'Все товары'}</h2>
              <p aria-live="polite">
                {filteredItems.length > 0
                  ? `Показаны ${pageStart + 1}–${pageStart + pageItems.length} из ${filteredItems.length} товаров`
                  : 'Товары не найдены'}
              </p>
            </div>
            <label className={styles.sortField}>
              <span>Сортировка</span>
              <select
                value={sortOrder}
                onChange={(event) => {
                  setSortOrder(event.target.value as SortOrder);
                  setCatalogPage(1);
                }}
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
                <option value="name">По названию</option>
              </select>
            </label>
          </div>

          {activeFilterCount > 0 && (
            <div className={styles.activeFilters} aria-label="Выбранные фильтры">
              {activeFilters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  className={styles.activeFilter}
                  onClick={filter.onRemove}
                  aria-label={`Убрать фильтр: ${filter.label}`}
                >
                  <span>{filter.label}</span> <X size={15} aria-hidden="true" />
                </button>
              ))}
            </div>
          )}

          {filteredItems.length ? (
            <div className={styles.grid}>
              {pageItems.map((item) => {
                const isPart = Boolean(item.compatibleModels);
                const detailItem =
                  item.compatibleModels?.find((model) => selectedModels.includes(`${model.category}:${model.tem}`)) ??
                  item.compatibleModels?.find((model) => selectedCategories.includes(model.category)) ??
                  item;
                return (
                  <CatalogCard
                    key={getCartKey(item.product)}
                    item={item}
                    isPart={isPart}
                    count={cartCounts.get(getCartKey(item.product)) ?? 0}
                    href={itemHref(detailItem, isPart)}
                    onOpen={() => openItem(detailItem, isPart)}
                    onAdd={() => addItem(item)}
                    onIncrease={() => addToCart(item.product, 1)}
                    onDecrease={() => changeItemCount(getCartKey(item.product), -1)}
                    onOpenCart={openCart}
                  />
                );
              })}
            </div>
          ) : (
            <div className={styles.empty}>
              <Search size={32} aria-hidden="true" />
              <h3>Ничего не найдено</h3>
              <p>Попробуйте изменить запрос или параметры фильтра.</p>
              <button type="button" onClick={resetFilters}>
                Сбросить фильтры
              </button>
            </div>
          )}

          {pageCount > 1 && (
            <nav className={styles.pagination} aria-label="Страницы каталога">
              <button type="button" onClick={() => goToPage(visiblePage - 1)} disabled={visiblePage === 1}>
                Назад
              </button>
              <span aria-live="polite">
                Страница {visiblePage} из {pageCount}
              </span>
              <button type="button" onClick={() => goToPage(visiblePage + 1)} disabled={visiblePage === pageCount}>
                Следующая <ArrowRight size={16} aria-hidden="true" />
              </button>
            </nav>
          )}
        </div>
      </div>

      <BackToTop />
    </section>
  );
};
