import { useCallback, useEffect, useRef, useState } from 'react';

import Styles from './scroll.module.scss';

import { BackToTop } from '../../ui/back-to-top/BackToTop';
import { AccountingSystem } from './AccountingSystem';
import { Accessories } from './Accessories';
import { MeasuringSystem } from './MeasuringSystem';
import { PreparationSystems } from './PreparationSystems';
import { PumpingStations } from './PumpingStations';

import {
  ProductCategoryCard,
  type ProductCategory,
  type ProductId,
} from '../../ui/product-category-card/ProductCategoryCard';

import product_1 from '../../../images/products/product_1.webp';
import product_2 from '../../../images/products/product_2.0.webp';
import product_3 from '../../../images/products/product_3.webp';
import product_4 from '../../../images/products/product_4.webp';
import product_5 from '../../../images/products/product_5.webp';

const products: ProductCategory[] = [
  {
    id: 'accounting-system',
    number: '01',
    label: 'Учёт и замер',
    title: 'Автоматизированные групповые замерные установки',
    description:
      'Стационарные и мобильные установки для измерения продукции скважин.',
    image: product_1.src,
    tag: 'АГЗУ',
  },
  {
    id: 'accessories',
    number: '02',
    label: 'Комплектующие',
    title: 'Комплектующие для АГЗУ',
    description:
      'Расходомеры, переключатели, клапаны и другие узлы для замерных установок.',
    image: product_2.src,
    tag: 'АГЗУ',
  },
  {
    id: 'measuring-system',
    number: '03',
    label: 'Измерительные системы',
    title: 'Системы учёта углеводородов и пластовой жидкости',
    description:
      'Решения для измерения количества и показателей качества нефти, газа и воды.',
    image: product_3.src,
    tag: 'Измерение',
  },
  {
    id: 'preparation-systems',
    number: '04',
    label: 'Подготовка',
    title: 'Системы подготовки нефти, газа и воды',
    description:
      'Оборудование для подготовки, очистки и дозирования на промысловых объектах.',
    image: product_4.src,
    tag: 'Подготовка',
  },
  {
    id: 'pumping-stations',
    number: '05',
    label: 'Перекачка',
    title: 'Насосные станции перекачки',
    description:
      'Блочные станции для перекачки нефти, нефтепродуктов и воды.',
    image: product_5.src,
    tag: 'Перекачка',
  },
];

const SELECTED_CARD_KEY = 'products_selected_card';
const FROM_PRODUCT_KEY = 'from_product_page';

function categoryFromPath(pathname: string): ProductId | null {
  const match = pathname.match(
    /^\/products\/(accounting-system|accessories|measuring-system|preparation-systems|pumping-stations)\/?$/
  );

  return match ? (match[1] as ProductId) : null;
}

function currentCategory(): ProductId | null {
  return typeof window === 'undefined'
    ? null
    : categoryFromPath(window.location.pathname);
}

const ArrowUpRight = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M5 15 15 5M6 5h9v9" />
  </svg>
);

const CarouselArrow = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d={direction === 'left' ? 'M19 12H5m6-6-6 6 6 6' : 'M4 12h15m-6-6 6 6-6 6'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Products = () => {
  const [category, setCategory] = useState<ProductId | null>(
    currentCategory
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const programmaticIndexRef = useRef<number | null>(null);
  const releaseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onLocationChange = () => {
      setCategory(currentCategory());
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  const handleCarouselScroll = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;
    if (programmaticIndexRef.current !== null) return;

    const targetLeft =
      track.getBoundingClientRect().left +
      parseFloat(getComputedStyle(track).paddingLeft);

    const cards = track.querySelectorAll<HTMLElement>(
      '[data-product-card]'
    );

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.getBoundingClientRect().left - targetLeft
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  const scrollToCard = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const track = trackRef.current;
      const card = track?.querySelector<HTMLElement>(
        `[data-product-card="${index}"]`
      );

      if (!track || !card) return;

      const left =
        card.getBoundingClientRect().left -
        track.getBoundingClientRect().left +
        track.scrollLeft -
        parseFloat(getComputedStyle(track).paddingLeft);

      programmaticIndexRef.current = index;
      setActiveIndex(index);

      if (releaseTimerRef.current !== null) {
        window.clearTimeout(releaseTimerRef.current);
      }

      releaseTimerRef.current = window.setTimeout(() => {
        programmaticIndexRef.current = null;
        releaseTimerRef.current = null;
        handleCarouselScroll();
      }, 2000);

      track.scrollTo({
        left,
        behavior:
          behavior === 'smooth' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : behavior,
      });
    },
    [handleCarouselScroll]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const releaseProgrammaticScroll = () => {
      if (releaseTimerRef.current !== null) {
        window.clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = null;
      }
      if (programmaticIndexRef.current === null) return;
      programmaticIndexRef.current = null;
      handleCarouselScroll();
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      if (programmaticIndexRef.current !== null) {
        if (releaseTimerRef.current !== null) {
          window.clearTimeout(releaseTimerRef.current);
        }
        releaseTimerRef.current = window.setTimeout(
          releaseProgrammaticScroll,
          260
        );
        return;
      }
      frame = window.requestAnimationFrame(handleCarouselScroll);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('scrollend', releaseProgrammaticScroll);
    window.addEventListener('resize', handleCarouselScroll);
    handleCarouselScroll();

    return () => {
      window.cancelAnimationFrame(frame);
      if (releaseTimerRef.current !== null) {
        window.clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = null;
      }
      programmaticIndexRef.current = null;
      track.removeEventListener('scroll', onScroll);
      track.removeEventListener('scrollend', releaseProgrammaticScroll);
      window.removeEventListener('resize', handleCarouselScroll);
    };
  }, [category, handleCarouselScroll]);

  useEffect(() => {
    if (
      category !== null ||
      sessionStorage.getItem(FROM_PRODUCT_KEY) !== 'true'
    ) {
      return;
    }

    const savedIndex = Number(
      sessionStorage.getItem(SELECTED_CARD_KEY)
    );

    sessionStorage.removeItem(FROM_PRODUCT_KEY);
    sessionStorage.removeItem(SELECTED_CARD_KEY);

    if (
      !Number.isInteger(savedIndex) ||
      savedIndex < 0 ||
      savedIndex >= products.length
    ) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      scrollToCard(savedIndex, 'auto');
    });

    return () => cancelAnimationFrame(frame);
  }, [category, scrollToCard]);

  if (category === 'accounting-system') {
    return <AccountingSystem />;
  }

  if (category === 'accessories') {
    return <Accessories />;
  }

  if (category === 'measuring-system') {
    return <MeasuringSystem />;
  }

  if (category === 'preparation-systems') {
    return <PreparationSystems />;
  }

  if (category === 'pumping-stations') {
    return <PumpingStations />;
  }

  return (
    <main className={Styles.products}>
      {/* HERO */}

      <section
        className={Styles.hero}
        aria-labelledby="products-title"
      >
        <div className={Styles.heroGrid} />

        <div className={Styles.heroContent}>
          <div className={Styles.heroTopline}>
            <span className={Styles.eyebrow}>
              Продукция · Собственное производство
            </span>
          </div>

          <div className={Styles.heroMain}>
            <div className={Styles.heroCopy}>
              <h1 id="products-title">
                Оборудование для
                <span> нефтегазовой отрасли</span>
              </h1>

              <p>
                Проектируем и производим оборудование для добычи,
                измерения, подготовки и транспортировки углеводородов.
              </p>

              <div className={Styles.heroActions}>
                <a
                  className={Styles.primaryLink}
                  href="#catalog"
                >
                  <span>Смотреть оборудование</span>
                  <ArrowUpRight />
                </a>

                <a
                  className={Styles.secondaryLink}
                  href="/contact/"
                >
                  <span>Обсудить задачу</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>

          <div className={Styles.heroBottom}>
            <div className={Styles.heroFacts}>
              <div className={Styles.heroFact}>
                <strong>05</strong>
                <span>направлений продукции</span>
              </div>

              <div className={Styles.heroFact}>
                <strong>2005</strong>
                <span>год основания</span>
              </div>

              <div className={Styles.heroFact}>
                <strong>Уфа</strong>
                <span>собственное производство</span>
              </div>
            </div>

            <div className={Styles.heroMeta}>
              <span>НЕФТЬ</span>
              <span>ГАЗ</span>
              <span>ВОДА</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}

      <section
        className={Styles.catalog}
        id="catalog"
        aria-labelledby="catalog-title"
      >
        <div className={Styles.sectionHeading}>
          <div className={Styles.sectionTitle}>
            <span className={Styles.eyebrow}>
              01 / Направления продукции
            </span>

            <h2 id="catalog-title">
              Оборудование под
              <span> задачи промысла</span>
            </h2>
          </div>

          <div className={Styles.sectionIntro}>
            <span className={Styles.sectionLine} />

            <p>
              Выберите направление, чтобы посмотреть оборудование,
              характеристики и доступную техническую документацию.
            </p>
          </div>
        </div>

        <div
          ref={trackRef}
          className={Styles.productsGrid}
          role="region"
          aria-label="Направления продукции"
          tabIndex={0}
        >
          {products.map((product, index) => (
            <ProductCategoryCard
              key={product.id}
              product={product}
              index={index}
              onSelect={(selectedIndex) => {
                sessionStorage.setItem(
                  SELECTED_CARD_KEY,
                  String(selectedIndex)
                );

                sessionStorage.setItem(FROM_PRODUCT_KEY, 'true');
              }}
            />
          ))}
        </div>

        <div className={Styles.catalogFooter}>
          <div
            className={Styles.carouselDots}
            role="group"
            aria-label="Выбрать направление продукции"
          >
            {products.map((product, index) => (
              <button
                key={product.id}
                type="button"
                aria-label={`Показать направление ${index + 1}: ${product.label}`}
                aria-current={
                  activeIndex === index ? 'true' : undefined
                }
                onClick={() => scrollToCard(index)}
              />
            ))}
          </div>

          <div className={Styles.carouselNavigation}>
            <button
              type="button"
              aria-label="Предыдущее направление"
              onClick={() =>
                scrollToCard(activeIndex === 0 ? products.length - 1 : activeIndex - 1)
              }
            >
              <CarouselArrow direction="left" />
            </button>

            <button
              type="button"
              aria-label="Следующее направление"
              onClick={() =>
                scrollToCard(activeIndex === products.length - 1 ? 0 : activeIndex + 1)
              }
            >
              <CarouselArrow direction="right" />
            </button>
          </div>

          <span className={Styles.carouselHint}>Листайте карточки свайпом</span>
        </div>
      </section>

      {/* PROCESS */}

      <section
        className={Styles.approach}
        aria-labelledby="approach-title"
      >
        <div className={Styles.approachHeading}>
          <span className={Styles.eyebrow}>
            02 / Как мы работаем
          </span>

          <h2 id="approach-title">
            От параметров объекта
            <span> до готового решения</span>
          </h2>

          <p>
            Подбираем конфигурацию оборудования с учётом
            условий эксплуатации и технических требований
            проекта.
          </p>
        </div>

        <div className={Styles.approachSteps}>
          <div className={Styles.approachStep}>
            <span className={Styles.stepNumber}>01</span>

            <div>
              <strong>Анализ задачи</strong>

              <p>
                Изучаем параметры объекта и требования
                к оборудованию.
              </p>
            </div>

          </div>

          <div className={Styles.approachStep}>
            <span className={Styles.stepNumber}>02</span>

            <div>
              <strong>Проектирование</strong>

              <p>
                Определяем состав и исполнение
                технического решения.
              </p>
            </div>

          </div>

          <div className={Styles.approachStep}>
            <span className={Styles.stepNumber}>03</span>

            <div>
              <strong>Производство и поставка</strong>

              <p>
                Изготавливаем оборудование и готовим
                его к отгрузке.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA — БЕЗ ЗНАКА NT */}

      <section
        className={Styles.projectCta}
        aria-labelledby="project-title"
      >
        <div className={Styles.ctaContent}>
          <span className={Styles.eyebrow}>
            03 / Техническая задача
          </span>

          <h2 id="project-title">
            Обсудим оборудование для вашего проекта
          </h2>

          <p>
            Опишите условия эксплуатации — специалисты
            помогут подобрать решение.
          </p>
        </div>

        <a href="/contact/">
          <span>Связаться с нами</span>
          <ArrowUpRight />
        </a>
      </section>

      <BackToTop />
    </main>
  );
};
