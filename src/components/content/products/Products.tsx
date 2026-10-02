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

export const Products = () => {
  const [category, setCategory] = useState<ProductId | null>(currentCategory);
  const [activeIndex, setActiveIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onLocationChange = () => {
      setCategory(currentCategory());
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
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

      track.scrollTo({
        left,
        behavior,
      });
    },
    []
  );

  const handleCarouselScroll = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    const targetLeft =
      track.getBoundingClientRect().left +
      parseFloat(getComputedStyle(track).paddingLeft);

    const cards = track.querySelectorAll<HTMLElement>('[data-product-card]');

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

            {/* <span className={Styles.heroCode}>
              NT / PRODUCT SYSTEM
            </span> */}
          </div>

          <div className={Styles.heroMain}>
            <div className={Styles.heroCopy}>
              <h1 id="products-title">
                Оборудование
                <span>для нефтегазовой отрасли</span>
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
                  <span aria-hidden="true">↗</span>
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
              Оборудование
              <span>под задачи промысла</span>
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
          onScroll={handleCarouselScroll}
        >
          {products.map((product, index) => (
            <ProductCategoryCard
              key={product.id}
              product={product}
              index={index}
              onSelect={(selectedIndex) => {
                sessionStorage.setItem(SELECTED_CARD_KEY, String(selectedIndex));
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
                aria-current={activeIndex === index ? 'true' : undefined}
                onClick={() => scrollToCard(index)}
              />
            ))}
          </div>

          <div className={Styles.carouselNavigation}>
            <button
              type="button"
              aria-label="Предыдущее направление"
              disabled={activeIndex === 0}
              onClick={() =>
                scrollToCard(activeIndex - 1)
              }
            >
              ←
            </button>

            <button
              type="button"
              aria-label="Следующее направление"
              disabled={
                activeIndex === products.length - 1
              }
              onClick={() =>
                scrollToCard(activeIndex + 1)
              }
            >
              →
            </button>
          </div>
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
            <span>до готового решения</span>
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

            <span className={Styles.stepArrow}>↗</span>
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

            <span className={Styles.stepArrow}>↗</span>
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

            <span className={Styles.stepArrow}>↗</span>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section
        className={Styles.projectCta}
        aria-labelledby="project-title"
      >
        <div className={Styles.ctaMark}>
          <span>NT</span>
        </div>

        <div className={Styles.ctaContent}>
          <span className={Styles.eyebrow}>
            03 / Техническая задача
          </span>

          <h2 id="project-title">
            Обсудим оборудование
            <span>для вашего проекта</span>
          </h2>

          <p>
            Опишите условия эксплуатации — специалисты
            помогут подобрать решение.
          </p>
        </div>

        <a href="/contact/">
          <span>Связаться с нами</span>
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <BackToTop />
    </main>
  );
};
