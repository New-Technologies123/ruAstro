import { useEffect, useState, useRef } from 'react';
import { Layout } from '../../layout/Layout';
import { Card } from '../../ui/card/Card';
import { Order } from '../../ui/order/Order';

import { Shop_1 } from './Shop_1';
import { Shop_2 } from './Shop_2';
import { Shop_3 } from './Shop_3';
import { Shop_4 } from './Shop_4';
import { Shop_5 } from './Shop_5';

import { BackToTop } from '../../ui/back-to-top/BackToTop';

import product_1 from '../../../images/products/product_2.webp';
import product_2 from '../../../images/products/product_2_1.webp';
import product_3 from '../../../images/products/product_2_2.webp';
import product_4 from '../../../images/products/product_2_3.webp';
import product_5 from '../../../images/products/product_2_4.webp';

import styles from '../products/scroll.module.scss';

type TProducts =
  | 'shop_1'
  | 'shop_2'
  | 'shop_3'
  | 'shop_4'
  | 'shop_5';

type Page = 'shop' | TProducts | 'order';

/* =========================================================
   SESSION STORAGE
   ========================================================= */

const SCROLL_POSITION_KEY = 'shop_scroll_position';
const SELECTED_CARD_KEY = 'shop_selected_card';
const FROM_SHOP_KEY = 'from_shop_page';

/* =========================================================
   SHOP
   ========================================================= */

export const Shop = () => {
  const cardTitle: Record<TProducts, string> = {
    shop_1: 'Вихревой расходомер ЭРВИП',
    shop_2: 'Устройство регулирования перепада давления (УРПД)',
    shop_3: 'Переключатель скважин многоходовой (ПСМ)',
    shop_4: 'Магниторегулируемый клапан (КМР)',
    shop_5: 'Гидропривод (ГП)',
  };

  const [currentPage, setCurrentPage] = useState<Page>('shop');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  /* =========================================================
     PRODUCTS
     ========================================================= */

  const products = [
    {
      img: product_1.src,
      title: cardTitle.shop_1,
      type: 'shop_1' as TProducts,
    },
    {
      img: product_2.src,
      title: cardTitle.shop_2,
      type: 'shop_2' as TProducts,
    },
    {
      img: product_3.src,
      title: cardTitle.shop_3,
      type: 'shop_3' as TProducts,
    },
    {
      img: product_4.src,
      title: cardTitle.shop_4,
      type: 'shop_4' as TProducts,
    },
    {
      img: product_5.src,
      title: cardTitle.shop_5,
      type: 'shop_5' as TProducts,
    },
  ];

  /* =========================================================
     MOBILE CHECK
     ========================================================= */

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  /* =========================================================
     URL → PAGE
     ========================================================= */

  const syncFromUrl = () => {
    const params = new URLSearchParams(window.location.search);

    const view = params.get('view');
    const type = params.get('type') as TProducts | null;

    /*
     * Оформление заказа.
     * Корзина здесь НЕ обрабатывается:
     * она открывается через GlobalCart.
     */
    if (view === 'order') {
      setCurrentPage('order');
      return;
    }

    if (
      type === 'shop_1' ||
      type === 'shop_2' ||
      type === 'shop_3' ||
      type === 'shop_4' ||
      type === 'shop_5'
    ) {
      setCurrentPage(type);
      return;
    }

    setCurrentPage('shop');
  };

  useEffect(() => {
    syncFromUrl();

    window.addEventListener('popstate', syncFromUrl);

    return () => {
      window.removeEventListener('popstate', syncFromUrl);
    };
  }, []);

  /* =========================================================
     MOBILE CAROUSEL
     ========================================================= */

  useEffect(() => {
    if (currentPage !== 'shop') {
      return;
    }

    const track = trackRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!track || !prevBtn || !nextBtn) {
      return;
    }

    const cards = track.querySelectorAll('.card');

    if (!cards.length) {
      return;
    }

    let current = 0;

    /* -------------------------------------------------------
       ARROWS
    ------------------------------------------------------- */

    const updateArrows = () => {
      if (current <= 0) {
        prevBtn.classList.remove(styles.visible);
        prevBtn.style.visibility = 'hidden';
      } else {
        prevBtn.classList.add(styles.visible);
        prevBtn.style.visibility = 'visible';
      }

      if (current >= cards.length - 1) {
        nextBtn.classList.remove(styles.visible);
        nextBtn.style.visibility = 'hidden';
      } else {
        nextBtn.classList.add(styles.visible);
        nextBtn.style.visibility = 'visible';
      }
    };

    /* -------------------------------------------------------
       DOTS
    ------------------------------------------------------- */

    const updateDots = (index: number) => {
      setCurrentCardIndex(index);
    };

    /* -------------------------------------------------------
       CARD STEP
    ------------------------------------------------------- */

    const cardStep = () => {
      if (cards.length <= 1) {
        return (cards[0] as HTMLElement).offsetWidth;
      }

      return (
        (cards[1] as HTMLElement).offsetLeft -
        (cards[0] as HTMLElement).offsetLeft
      );
    };

    /* -------------------------------------------------------
       GO TO CARD
    ------------------------------------------------------- */

    const goToCard = (
      index: number,
      smooth = true,
    ) => {
      current = Math.max(
        0,
        Math.min(cards.length - 1, index),
      );

      const card = cards[current] as HTMLElement;

      const left =
        card.offsetLeft -
        (track.clientWidth - card.clientWidth) / 2;

      track.scrollTo({
        left,
        behavior: smooth ? 'smooth' : 'auto',
      });

      updateArrows();
      updateDots(current);
    };

    /* -------------------------------------------------------
       SCROLL
    ------------------------------------------------------- */

    const handleScroll = () => {
      const step = cardStep();

      if (step <= 0) {
        return;
      }

      current = Math.round(
        track.scrollLeft / step,
      );

      current = Math.max(
        0,
        Math.min(cards.length - 1, current),
      );

      updateArrows();
      updateDots(current);

      sessionStorage.setItem(
        SCROLL_POSITION_KEY,
        String(track.scrollLeft),
      );
    };

    /* -------------------------------------------------------
       RESTORE CARD
    ------------------------------------------------------- */

    const getTargetCardIndex = () => {
      const fromShop =
        sessionStorage.getItem(FROM_SHOP_KEY);

      if (fromShop === 'true') {
        const savedCardIndex =
          sessionStorage.getItem(
            SELECTED_CARD_KEY,
          );

        sessionStorage.removeItem(
          FROM_SHOP_KEY,
        );

        sessionStorage.removeItem(
          SELECTED_CARD_KEY,
        );

        sessionStorage.removeItem(
          SCROLL_POSITION_KEY,
        );

        if (savedCardIndex !== null) {
          const index = parseInt(
            savedCardIndex,
            10,
          );

          if (
            !Number.isNaN(index) &&
            index >= 0 &&
            index < cards.length
          ) {
            return index;
          }
        }

        return 0;
      }

      sessionStorage.removeItem(
        SELECTED_CARD_KEY,
      );

      sessionStorage.removeItem(
        SCROLL_POSITION_KEY,
      );

      return 0;
    };

    /* -------------------------------------------------------
       INITIAL POSITION
    ------------------------------------------------------- */

    const targetIndex =
      getTargetCardIndex();

    goToCard(
      targetIndex,
      false,
    );

    setIsInitialized(true);

    /* -------------------------------------------------------
       NEXT
    ------------------------------------------------------- */

    const handleNextClick = () => {
      goToCard(current + 1);

      window.setTimeout(() => {
        if (trackRef.current) {
          sessionStorage.setItem(
            SCROLL_POSITION_KEY,
            String(
              trackRef.current.scrollLeft,
            ),
          );
        }
      }, 100);
    };

    /* -------------------------------------------------------
       PREVIOUS
    ------------------------------------------------------- */

    const handlePrevClick = () => {
      goToCard(current - 1);

      window.setTimeout(() => {
        if (trackRef.current) {
          sessionStorage.setItem(
            SCROLL_POSITION_KEY,
            String(
              trackRef.current.scrollLeft,
            ),
          );
        }
      }, 100);
    };

    /* -------------------------------------------------------
       EVENTS
    ------------------------------------------------------- */

    nextBtn.addEventListener(
      'click',
      handleNextClick,
    );

    prevBtn.addEventListener(
      'click',
      handlePrevClick,
    );

    track.addEventListener(
      'scroll',
      handleScroll,
      { passive: true },
    );

    return () => {
      nextBtn.removeEventListener(
        'click',
        handleNextClick,
      );

      prevBtn.removeEventListener(
        'click',
        handlePrevClick,
      );

      track.removeEventListener(
        'scroll',
        handleScroll,
      );
    };
  }, [currentPage]);

  /* =========================================================
     OPEN CATEGORY
     ========================================================= */

  const openCategory = (
    type: TProducts,
    cardIndex?: number,
  ) => {
    if (cardIndex !== undefined) {
      sessionStorage.setItem(
        SELECTED_CARD_KEY,
        String(cardIndex),
      );

      sessionStorage.setItem(
        FROM_SHOP_KEY,
        'true',
      );
    }

    if (trackRef.current) {
      sessionStorage.setItem(
        SCROLL_POSITION_KEY,
        String(
          trackRef.current.scrollLeft,
        ),
      );
    }

    const url = new URL(
      window.location.href,
    );

    url.searchParams.set(
      'type',
      type,
    );

    url.searchParams.delete(
      'view',
    );

    window.history.pushState(
      {},
      '',
      url.toString(),
    );

    setCurrentPage(type);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /* =========================================================
     BACK TO SHOP
     ========================================================= */

  const backToShop = () => {
    const url = new URL(
      window.location.href,
    );

    url.searchParams.delete(
      'type',
    );

    url.searchParams.delete(
      'view',
    );

    window.history.pushState(
      {},
      '',
      url.toString(),
    );

    setCurrentPage('shop');
  };

  /* =========================================================
     ORDER
     ========================================================= */

  const openOrder = () => {
    const url = new URL(
      window.location.href,
    );

    url.searchParams.set(
      'view',
      'order',
    );

    url.searchParams.delete(
      'type',
    );

    window.history.pushState(
      {},
      '',
      url.toString(),
    );

    setCurrentPage('order');
  };

  const closeOrder = () => {
    /*
     * Возвращаемся в магазин.
     * Не используем history.back(),
     * чтобы не было неожиданных возвратов
     * на предыдущую страницу сайта.
     */

    const url = new URL(
      window.location.href,
    );

    url.searchParams.delete(
      'view',
    );

    url.searchParams.delete(
      'type',
    );

    window.history.pushState(
      {},
      '',
      url.toString(),
    );

    setCurrentPage('shop');
  };

  /* =========================================================
     PAGE STATE
     ========================================================= */

  const isOrder =
    currentPage === 'order';

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <>
      {/* =====================================================
          ORDER
          ===================================================== */}

      {isOrder && (
        <Order
          onBack={closeOrder}
        />
      )}

      {/* =====================================================
          SHOP
          ===================================================== */}

      {currentPage === 'shop' && (
        <Layout
          title="Онлайн магазин"
          description="Качество продукции ООО ИПП «Новые Технологии» соответствует всем стандартам в области безопасности и качества."
        >
          <>
            <div className={styles.shopWrapper}>
              <div
                className={styles.cardsTrack}
                ref={trackRef}
              >
                {products.map(
                  (
                    product,
                    index,
                  ) => (
                    <div
                      className="card"
                      key={product.type}
                    >
                      <Card
                        imgSrc={
                          product.img
                        }
                        title={
                          product.title
                        }
                        onClick={() =>
                          openCategory(
                            product.type,
                            index,
                          )
                        }
                      />
                    </div>
                  ),
                )}
              </div>

              {/* =================================================
                  MOBILE NAVIGATION
                  ================================================= */}

              <div
                className={
                  styles.mobileNav
                }
              >
                <button
                  type="button"
                  className={
                    styles.prevBtn
                  }
                  ref={
                    prevBtnRef
                  }
                  aria-label="Предыдущий товар"
                >
                  ←
                </button>

                <button
                  type="button"
                  className={
                    styles.nextBtn
                  }
                  ref={
                    nextBtnRef
                  }
                  aria-label="Следующий товар"
                >
                  →
                </button>
              </div>

              {/* =================================================
                  MOBILE PAGINATION
                  ================================================= */}

              {isMobile && (
                <div
                  className={
                    styles.paginationDots
                  }
                  role="tablist"
                  aria-label="Навигация по товарам"
                >
                  {products.map(
                    (
                      product,
                      index,
                    ) => (
                      <button
                        type="button"
                        key={
                          product.type
                        }
                        className={[
                          styles.dot,
                          currentCardIndex ===
                            index
                            ? styles.active
                            : '',
                        ]
                          .filter(
                            Boolean,
                          )
                          .join(' ')}
                        onClick={() => {
                          const track =
                            trackRef.current;

                          const cards =
                            track?.querySelectorAll(
                              '.card',
                            );

                          if (
                            !track ||
                            !cards ||
                            !cards[index]
                          ) {
                            return;
                          }

                          const card =
                            cards[
                            index
                            ] as HTMLElement;

                          const left =
                            card.offsetLeft -
                            (
                              track.clientWidth -
                              card.clientWidth
                            ) /
                            2;

                          track.scrollTo({
                            left,
                            behavior:
                              'smooth',
                          });

                          setCurrentCardIndex(
                            index,
                          );
                        }}
                        role="tab"
                        aria-selected={
                          currentCardIndex ===
                          index
                        }
                        aria-label={`Перейти к товару ${index + 1}`}
                      />
                    ),
                  )}
                </div>
              )}
            </div>
          </>

          <BackToTop />
        </Layout>
      )}

      {/* =====================================================
          SHOP 1
          ===================================================== */}

      {currentPage ===
        'shop_1' && (
          <Shop_1
            title={
              cardTitle.shop_1
            }
            onBackProducts={
              backToShop
            }
          />
        )}

      {/* =====================================================
          SHOP 2
          ===================================================== */}

      {currentPage ===
        'shop_2' && (
          <Shop_2
            title={
              cardTitle.shop_2
            }
            onBackProducts={
              backToShop
            }
          />
        )}

      {/* =====================================================
          SHOP 3
          ===================================================== */}

      {currentPage ===
        'shop_3' && (
          <Shop_3
            title={ cardTitle.shop_3 }
            onBackProducts={ backToShop }
          />
        )}

      {/* =====================================================
          SHOP 4
          ===================================================== */}

      {currentPage ===
        'shop_4' && (
          <Shop_4
            title={ cardTitle.shop_4 }
            onBackProducts={ backToShop }
          />
        )}

      {/* =====================================================
          SHOP 5
          ===================================================== */}

      {currentPage === 'shop_5' && (
          <Shop_5 
            title={ cardTitle.shop_5 }
            onBackProducts={ backToShop }
          />
        )}
    </>
  );
};