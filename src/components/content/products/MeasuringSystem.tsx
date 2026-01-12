import { useState, useRef } from 'react'
import Styles from './products.module.scss'

import product_3 from '../../../images/products/product_3.webp'
import product_3_1 from '../../../images/products/product_3_1.webp'
import product_3_2 from '../../../images/products/product_3_2.webp'

import { BigPhoto } from '../../ui/big-photo/BigPhoto'
import { useClickToScroll } from '../../../hooks/useClickToScroll'
import { BackToTop } from '../../ui/back-to-top/BackToTop'

export const MeasuringSystem = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const handleClick = useClickToScroll()

  return (
    <div className={Styles.container}>
      <div className={Styles.mainContent}>
        {/* ===== SIDEBAR ===== */}
        <aside className={Styles.sidebar}>
          <div className={Styles.navMenu}>
            <button onClick={() => handleClick('products-1')} className={Styles.navItem}>
              <span className={Styles.navIcon}>🛢️</span>
              <p>Система измерения количества и показателей качества нефти (СИКН)</p>
            </button>

            <button onClick={() => handleClick('products-2')} className={Styles.navItem}>
              <span className={Styles.navIcon}>💨</span>
              <p>Система измерения количества газа (СИКГ)</p>
            </button>

            <button onClick={() => handleClick('products-3')} className={Styles.navItem}>
              <span className={Styles.navIcon}>💧</span>
              <p>Система измерения количества воды (СИКВ)</p>
            </button>
          </div>
        </aside>

        {/* ===== CONTENT ===== */}
        <div className={Styles.content}>
          {/* ===== СИКН ===== */}
          <section id="products-1" ref={el => (sectionsRef.current[0] = el)} className={Styles.section}>
            <h2 className={Styles.sectionHeader}>
              Система измерения количества и показателей качества нефти (СИКН)
            </h2>

            <div className={Styles.card}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div className={Styles.imageCard} onClick={() => setBigPhoto(product_3.src)}>
                  <img src={product_3.src} alt="СИКН" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>

              {/* Текст */}
              <div className={Styles.features}>
                <h3>Назначение:</h3>
                <ul className={Styles.featuresList}>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Автоматизированное измерение количества нефти;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Определение плотности, вязкости, влагосодержания;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Отбор объединённой пробы по ГОСТ 2517;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Архивирование и передача данных на АРМ оператора;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Может изготавливаться на базе различных типов расходомеров.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ===== СИКГ (ШАХМАТКА) ===== */}
          <section id="products-2" ref={el => (sectionsRef.current[1] = el)} className={Styles.section}>
            <h2 className={Styles.sectionHeader}>Система измерения количества газа (СИКГ)</h2>

            <div className={`${Styles.card} ${Styles.reverse}`}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div className={Styles.imageCard} onClick={() => setBigPhoto(product_3_1.src)}>
                  <img src={product_3_1.src} alt="СИКГ" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>

              {/* Текст */}
              <div className={Styles.cardContent}>
                <div className={Styles.features}>
                  <h3>Назначение:</h3>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Коммерческий и технологический учёт газа;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Применяется на УКПГ и узлах передачи газа;</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className={Styles.features}>
                  <h3>Типовой состав:</h3>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Преобразователь расхода;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Вычислитель расхода;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Хроматограф, анализаторы, датчики;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система пробоотбора.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          {/* ===== СИКВ ===== */}
          <section id="products-3" ref={el => (sectionsRef.current[2] = el)} className={Styles.section}>
            <h2 className={Styles.sectionHeader}>Система измерения количества воды (СИКВ)</h2>

            <div className={Styles.card}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div className={Styles.imageCard} onClick={() => setBigPhoto(product_3_2.src)}>
                  <img src={product_3_2.src} alt="СИКВ" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>

              {/* Текст */}
              <div className={Styles.cardContent}>
                <div className={Styles.features}>
                  <h3>Назначение:</h3>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Измерение расхода, давления и температуры воды.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={Styles.features}>
                  <h3>Типовой состав:</h3>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Блок измерительных линий;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система обработки информации;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Трубопроводы и арматура.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div >

      <BackToTop />

      {bigPhoto && <BigPhoto src={bigPhoto} onClose={() => setBigPhoto(null)} />}
    </div >
  )
}
