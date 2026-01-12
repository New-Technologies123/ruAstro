import Styles from './products.module.scss';
import { useState, useRef } from 'react';

import product_4 from '../../../images/products/product_4.webp';
import product_4_1 from '../../../images/products/product_4_2.webp';
import product_4_3 from '../../../images/products/product_4_3.webp';
import product_4_4 from '../../../images/products/product_4_4.webp';

import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { useClickToScroll } from '../../../hooks/useClickToScroll';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

export const PreparationSystems = () => {

  const [oneIsOpen, setOneIsOpen] = useState(false);
  const [twoIsOpen, setTwoIsOpen] = useState(false);
  const [threeIsOpen, setThreeIsOpen] = useState(false);
  const [fourIsOpen, setFourIsOpen] = useState(false);

  const sectionsRef = useRef([]);
  const handleClick = useClickToScroll();

  return (
    <div className={Styles.container}>
      <div className={Styles.mainContent}>
        <aside className={Styles.sidebar}>
          <div className={Styles.navMenu}>
            <button onClick={() => handleClick('products-1')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🚀</span>
              <p>Устройство запуска и приема внутритрубных средств очистки и диагностики УЗПЗ, УЗПП</p>
            </button>
            <button onClick={() => handleClick('products-2')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🔘</span>
              <p>Блок гребенки (БГ)</p>
            </button>
            <button onClick={() => handleClick('products-3')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🧹</span>
              <p>Устройство очистки колонны УОК-НКТ</p>
            </button>
            <button onClick={() => handleClick('products-4')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🧪</span>
              <p>Установка дозирования химического реагента (БДР)</p>
            </button>
          </div>
        </aside>
        <div className={Styles.content}>
          <section id="products-1" ref={el => sectionsRef.current[0] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>Устройство запуска и приема внутритрубных средств очистки и диагностики УЗПЗ, УЗПП</h2>
            </div>

            <div className={Styles.card}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div className={Styles.imageCard} onClick={() => setOneIsOpen(true)}>
                  <img src={product_4.src} alt="" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>
              <div className={Styles.cardContent}>
                <div className={Styles.features}>
                  <h3>Назначение:</h3>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Для периодического запуска в трубопровод (с целью его очистки и диагностики) и приёма из него внутритрубных
                          снарядов — дефектоскопов, очистных скребков и других поточных средств.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={Styles.features}>
                  <h3>Область применения:</h3>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Системы сбора и транспорта нефти и газа (нефтепроводы, газопроводы).</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="products-2" ref={el => sectionsRef.current[1] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>Блок гребенки (БГ)</h2>
            </div>

            <div className={`${Styles.card} ${Styles.reverse}`}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div className={Styles.imageCard} onClick={() => setTwoIsOpen(true)}>
                  <img src={product_4_1.src} alt="СИКГ" className={Styles.mainImage} />
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
                      <p>Для распределения потоков подаваемой блочными кустовыми насосными станциями пластовой или чистой
                        воды под высоким давлением в нагнетательные скважины с целью поддержания пластового давления.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="products-3" ref={el => sectionsRef.current[2] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>Устройство очистки колонны УОК-НКТ</h2>
            </div>

            <div className={Styles.card}>
              <div className={Styles.cardImage}>
                <div className={Styles.imageCard} onClick={() => setThreeIsOpen(true)}>
                  <img src={product_4_3.src} alt="СИКВ" className={Styles.mainImage} />
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
                        <p>Для автоматической непрерывной очистки всей внутренней поверхности колонны НКТ нефтяной
                          скважины путём срезания слоя парафина со стенок.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={Styles.features}>
                  <h3>Преимущества перед аналогами:</h3>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Сматывание проволоки с барабана предотвращается благодаря применению подпружинного подвижного ролика с датчиком веса;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Полностью автоматизированный процесс ликвидации пробок;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Колибровка положения скребка с точностью до 40 см.;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Скребок имеет несколько основных исполнений: раздвижной, кольцевой,фрезерный, лезвийный, шнековый и др.;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Магниты установлены на ролике, датчики оборотов (герконовые) — на стойке подвижного ролика, на расстоянии,
                          при котором перекрывается зона взаимодействия их магнитных полей. Такое расположение обеспечивает последовательное
                          срабатывание герконов по направлению вращения ролика.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="products-4" ref={el => sectionsRef.current[3] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>Установка дозирования химического реагента (БДР)</h2>
            </div>

            <div className={`${Styles.card} ${Styles.reverse}`}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div className={Styles.imageCard} onClick={() => setFourIsOpen(true)}>
                  <img src={product_4_4.src} alt="СИКГ" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>
              <div className={Styles.features}>
                <h3>Назначение:</h3>
                <ul className={Styles.featuresList}>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Установка дозирования реагента УДХ (БДР) предназначена для дозированного ввода различных жидких химреагентов (деэмульгаторов
                        и ингибиторов коррозии и т.п.) в трубопроводы системы сбора, транспорта и подготовки нефти с целью осуществления
                        внутритрубопроводной деэмульгации нефти, а также защиты трубопроводов и оборудования от коррозии, парафиноотложений и др.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <BackToTop />
      {oneIsOpen && <BigPhoto src={product_4.src} onClose={() => setOneIsOpen(false)} />}
      {twoIsOpen && <BigPhoto src={product_4_1.src} onClose={() => setTwoIsOpen(false)} />}
      {threeIsOpen && <BigPhoto src={product_4_3.src} onClose={() => setThreeIsOpen(false)} />}
      {fourIsOpen && <BigPhoto src={product_4_4.src} onClose={() => setFourIsOpen(false)} />}
    </div>
  );
};
