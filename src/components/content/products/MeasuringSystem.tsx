import Styles from './products.module.scss';
import { useState, useRef } from 'react';
import product_3 from '../../../images/products/product_3.webp';
import product_3_1 from '../../../images/products/product_3_1.webp';
import product_3_2 from '../../../images/products/product_3_2.webp';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { useClickToScroll } from '../../../hooks/useClickToScroll';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

export const MeasuringSystem = () => {

  const [oneIsOpen, setOneIsOpen] = useState(false);
  const [twoIsOpen, setTwoIsOpen] = useState(false);
  const [threeIsOpen, setThreeIsOpen] = useState(false);  

  const sectionsRef = useRef([]);
  const handleClick = useClickToScroll();

  return (
    <div className={Styles.container}>
      <div className={Styles.mainContent}>
        <aside className={Styles.sidebar}>
          <div className={Styles.navMenu}>
            <button onClick={() => handleClick('products-1')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🛢️</span>
              <p>Система измерения количества и показателей качества нефти и нефтепродуктов (СИКН)</p>
            </button>
            <button onClick={() => handleClick('products-2')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>💨</span>
              <p>Система измерения количества газа (СИКГ)</p>
            </button>
            <button onClick={() => handleClick('products-3')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>💧</span>
              <p>Система измерения количества воды (СИКВ)</p>
            </button>
            
          </div>
        </aside>

        <div className={Styles.content}>
          <section id="products-1" ref={el => sectionsRef.current[0] = el} className={Styles.section}>
              <div className={Styles.sectionHeader}>
              <h2>Система измерения количества и показателей качества нефти и нефтепродуктов (СИКН)</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.imageCard} onClick={() => setOneIsOpen(true)}>
                <img src={product_3.src} alt="Мобильная АГЗУ" className={Styles.mainImage} />
                <div className={Styles.imageOverlay}>
                  <span className={Styles.zoomText}>Нажмите для увеличения</span>
                </div>
              </div>
            </div>
            <div className={Styles.features}>
              <h3>Назначение:</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>📊</div>
                  <div className={Styles.featureText}>
                    <p>Для измерения в автоматизированном режиме количества нефти/нефтепродуктов;</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🔍</div>
                  <div className={Styles.featureText}>
                    <p>Для определения в автоматизированном режиме показателей качества (плотность, вязкость, влагосодержание) и параметров нефти (давление, температура);"</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🧪</div>
                  <div className={Styles.featureText}>
                    <p>Для отбора объединённой пробы по ГОСТ 2517;</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💻</div>
                  <div className={Styles.featureText}>
                    <p>Для выдачи информации, передаваемой средствами автоматизации, последующего её архивирования и отображения на автоматизированном 
                      рабочем месте оператора (АРМ-оператора).</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🏭</div>
                  <div className={Styles.featureText}>
                    <p>СИКН может изготавливаться на базе объёмных, массовых или ультразвуковых преобразователей расхода.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-2" ref={el => sectionsRef.current[1] = el} className={Styles.section}>
              <div className={Styles.sectionHeader}>
              <h2>Система измерения количества газа (СИКГ)</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.imageCard} onClick={() => setTwoIsOpen(true)}>
                <img src={product_3_1.src} alt="Мобильная АГЗУ" className={Styles.mainImage} />
                <div className={Styles.imageOverlay}>
                  <span className={Styles.zoomText}>Нажмите для увеличения</span>
                </div>
              </div>
            </div>
            <div className={Styles.features}>
              <h3>Назначение:</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🤖</div>
                  <div className={Styles.featureText}>
                    <p>Для автоматизированного оперативного или коммерческого учёта количества и определения качества, 
                      включая компонентный состав, природного или свободного нефтяного газа при хранении, транспортировке, 
                      переработке, а также при проведении расчётно-кассовых операций.</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🏗️</div>
                  <div className={Styles.featureText}>
                    <p>СИКГ в первую очередь входит в состав установок комплексной подготовки газа (УКПГ) газодобывающих 
                      предприятий (газовых месторождений, нефтегазоконденсантных месторождений), на границах между газодобывающим 
                      и газотранспортным предприятием, на границах между газотранспортным и газораспределительным предприятием.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={Styles.features}>
              <h3>Типовой состав:</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🌪️</div>
                  <div className={Styles.featureText}>
                    <p>Преобразователь расхода газа;</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🧮</div>
                  <div className={Styles.featureText}>
                    <p>Вычислитель расхода газа;</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🎛️</div>
                  <div className={Styles.featureText}>
                    <p>Регуляторы давления или расхода;</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💾</div>
                  <div className={Styles.featureText}>
                    <p>Аппаратно-программные средства для управления исполнительными элементами;</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>📊</div>
                  <div className={Styles.featureText}>
                    <p>Газовая хроматографическая система;</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💧</div>
                  <div className={Styles.featureText}>
                    <p>Анализатор “точки росы”;</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🌡️</div>
                  <div className={Styles.featureText}>
                    <p>Преобразователи давления и температуры;</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🧪</div>
                  <div className={Styles.featureText}>
                    <p>Система пробоотбора.</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🛠️</div>
                  <div className={Styles.featureText}>
                    <p>СИКГ может изготавливаться на базе различных типов расходомерных комплексов: вихревые, турбинные, ультразвуковые, 
                      термоанемометрические, многопараметрические и расходомеры на основе стандартных сужающих устройств.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-3" ref={el => sectionsRef.current[2] = el} className={Styles.section}>
              <div className={Styles.sectionHeader}>
              <h2>Система измерения количества воды (СИКВ)</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.imageCard} onClick={() => setThreeIsOpen(true)}>
                <img src={product_3_2.src} alt="Мобильная АГЗУ" className={Styles.mainImage} />
                <div className={Styles.imageOverlay}>
                  <span className={Styles.zoomText}>Нажмите для увеличения</span>
                </div>
              </div>
            </div>
            <div className={Styles.features}>
              <h3>Назначение:</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💧</div>
                  <div className={Styles.featureText}>
                    <p>Система измерения количества воды (СИКВ) представляет собой комплекс измерительных приборов и специального 
                      оборудования, который предназначен для измерения массового или объёмного расхода воды, давления и температуры.</p>
                  </div>
                </li>                
              </ul>
            </div>
            <div className={Styles.features}>
              <h3>Типовой состав:</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>📊</div>
                  <div className={Styles.featureText}>
                    <p>Блок измерительных линий (БИЛ);</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💻</div>
                  <div className={Styles.featureText}>
                    <p>Системы обработки информации (СОИ)</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🛠️</div>
                  <div className={Styles.featureText}>
                    <p>Технологические и дренажные трубопроводы.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <BackToTop/>
      {oneIsOpen && <BigPhoto src={product_3.src} onClose={() => setOneIsOpen(false)} />}
      {twoIsOpen && <BigPhoto src={product_3_1.src} onClose={() => setTwoIsOpen(false)} />}
      {threeIsOpen && <BigPhoto src={product_3_2.src} onClose={() => setThreeIsOpen(false)} />}
    </div>      
  );
};
