import { useState, useRef } from 'react'
import product_1 from '../../../images/products/product_1.webp'
import product_1_1 from '../../../images/products/product_1_1.webp'
import product_1_2 from '../../../images/products/product_1_2.webp'

import { BigPhoto } from '../../ui/big-photo/BigPhoto'
import Styles from './products.module.scss'
import { useClickToScroll } from '../../../hooks/useClickToScroll'
import { BackToTop } from '../../ui/back-to-top/BackToTop'

export const AccountingSystem = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const handleClick = useClickToScroll()

  return (
    <div className={Styles.container}>
      {/* ===== КНОПКА ЦЕН ===== */}
      <div className={Styles.price}>
        <a className={Styles.buttonPrice} href="/calculator">
          Калькулятор для расчета цен
        </a>
      </div>

      <div className={Styles.mainContent}>
        {/* ===== SIDEBAR ===== */}
        <aside className={Styles.sidebar}>
          <div className={Styles.navMenu}>
            <button
              onClick={() => handleClick('products-1')}
              className={Styles.navItem}
            >
              <span className={Styles.navIcon}>🏢</span>
              <p>
                АГЗУ «Спутник — массомер НТ.1»
                <br />
                (стационарная)
              </p>
            </button>

            <button
              onClick={() => handleClick('products-2')}
              className={Styles.navItem}
            >
              <span className={Styles.navIcon}>🚚</span>
              <p>
                АГЗУ «Спутник — массомер НТ.1»
                <br />
                (мобильная)
              </p>
            </button>
          </div>
        </aside>

        {/* ===== CONTENT ===== */}
        <div className={Styles.content}>
          {/* ===== СТАЦИОНАРНАЯ ===== */}
          <section
            id="products-1"
            ref={(el) => (sectionsRef.current[0] = el)}
            className={Styles.section}
          >
            <h2 className={Styles.sectionHeader}>Стационарная система</h2>

            <div className={Styles.card}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div
                  className={Styles.imageCard}
                  onClick={() => setBigPhoto(product_1.src)}
                >
                  <img
                    src={product_1.src}
                    alt="Стационарная АГЗУ"
                    className={Styles.mainImage}
                  />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>
                      Нажмите для увеличения
                    </span>
                  </div>
                </div>
              </div>

              {/* Текст */}
              <div className={Styles.features}>
                <h3>Назначение:</h3>
                <ul className={Styles.featuresList}>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>
                        Для измерения массы и массового расхода скважинной
                        жидкости в составе нефтегазовой смеси.
                      </p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>
                        Для определения массы и массового расхода сырой нефти
                        без учета воды.
                      </p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>
                        Для измерения объема и расхода свободного нефтяного газа
                        после сепарации.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ===== МОБИЛЬНАЯ (ШАХМАТКА) ===== */}
          <section
            id="products-2"
            ref={(el) => (sectionsRef.current[1] = el)}
            className={Styles.section}
          >
            <h2 className={Styles.sectionHeader}>Мобильная система</h2>

            <div className={`${Styles.card} ${Styles.reverse}`}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div
                  className={Styles.imageCard}
                  onClick={() => setBigPhoto(product_1_2.src)}
                >
                  <img
                    src={product_1_2.src}
                    alt="Мобильная АГЗУ"
                    className={Styles.mainImage}
                  />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>
                      Нажмите для увеличения
                    </span>
                  </div>
                </div>
              </div>

              {/* Текст */}
              <div className={Styles.features}>
                <ul className={Styles.featuresList}>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>
                        Блоки АГЗУ размещаются в кузове автомобиля или на шасси
                        прицепа.
                      </p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>
                        Измерение массы нефти и газа с учетом и без учета воды,
                        после процесса сепарации.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <BackToTop />

      {bigPhoto && (
        <BigPhoto src={bigPhoto} onClose={() => setBigPhoto(null)} />
      )}
    </div>
  )
}
