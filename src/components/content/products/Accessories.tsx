import Styles from './products.module.scss';
import { useState, useRef } from 'react';
import product_2 from '../../../images/products/product_2.webp';
import product_2_1 from '../../../images/products/product_2_1.webp';
import product_2_2 from '../../../images/products/product_2_2.webp';
import product_2_3 from '../../../images/products/product_2_3.webp';
import product_2_4 from '../../../images/products/product_2_4.webp'; 
import product_2_5 from '../../../images/products/product_2_5.webp';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { useClickToScroll } from '../../../hooks/useClickToScroll';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

// Комплектующие для автоматизированной групповой замерной установки
export const Accessories = () => {
  
  const [srcForBigPhoto, setSrcForBigPhoto] = useState<string | null>(null);

  const sectionsRef = useRef([]);
  const handleClick = useClickToScroll();

  return (
    <div className={Styles.container}>
      <div className={Styles.mainContent}>
        <aside className={Styles.sidebar}>
          <div className={Styles.navMenu}>
            <button onClick={() => handleClick('products-1')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🌊</span>
              <p>Вихревой расходомер ЭРВИП</p>
            </button>
            <button onClick={() => handleClick('products-2')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>📉</span>
              <p>Устройство регулирования перепада давления (УРПД)</p>
            </button>
            <button onClick={() => handleClick('products-3')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🔄</span>
              <p>Переключатель скважин многоходовой (ПСМ)</p>
            </button>
            <button onClick={() => handleClick('products-4')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🧲</span>
              <p>Магниторегулируемый клапан (КМР)</p>
            </button>
            <button onClick={() => handleClick('products-5')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>💦</span>
              <p>Гидропривод (ГП)</p>
            </button>
            <button onClick={() => handleClick('products-6')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>⚗️</span>
              <p>Сепарационная ёмкость</p>
            </button>
          </div>
        </aside>

        <div className={Styles.content}>

          <section id="products-1"  ref={el => sectionsRef.current[0] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>Вихревой расходомер ЭРВИП</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.minFoto}>
                <div className={Styles.imageCard} onClick={() => setSrcForBigPhoto(product_2.src)}>
                  <img src={product_2.src} alt="#" className={Styles.mainImage} />                               
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>              
            </div>
            <div className={Styles.features}>
              <h3>Основное назначение</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💎</div>
                  <div className={Styles.featureText}>
                    <h4 className={Styles.featureTitle}>Высокая стабильность</h4>
                    <p className={Styles.featureText}>Высокая стабильность показаний, точность измерений, простота в эксплуатации, 
                      нечувствительность к загрязнениям, отсутствие подвижных частей. Долговечность и неприхотливость приборов.</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🔧</div>
                  <div className={Styles.featureText}>
                    <h4>Гибкость настройки</h4>
                    <p>Гибкая возможность калибровки расходомера (регулирование диапазона измерений) в комплекте с клапаном 
                      регулирования типа КМР с сигнализацией положения для уменьшения погрешности измерения объема среды. 
                      Межповерочный интервал: 4 года. Срок службы: 12 лет.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={Styles.features}>
              <h3>Принцип работы:</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🌪️</div>        
                  <div className={Styles.featureText}>                    
                    <p>Метод измерения расхода включает в себя размещение препятствия (возмущающего барьера) на пути протока среды. 
                      Когда жидкость (газ) проходит этот барьер, в потоке создаются возмущения, называемые вихрями. Вихри оставляют 
                      следы позади барьера. Эти вихревые дорожки принято называть вихревыми дорожками Кармана. Частота образования 
                      вихрей за телом обтекания пропорциональна скорости потока. Детектирование вихрей и определение частоты их 
                      образования позволяет определить скорость и объемный расход среды.</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>⚡</div>            
                  <div className={Styles.featureText}>
                    <p>Внутри возмущающего барьера располагается пьезокристалл, который создает малые, но измеряемые импульсы 
                      напряжения, также пропорциональные расходу жидкости (газа). Величины данных импульсов измеряются электроникой 
                      вихревого расходомера.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-2"  ref={el => sectionsRef.current[1] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>Устройство регулирования перепада давления (УРПД)</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.minFoto}>
                <div className={Styles.imageCard} onClick={() => setSrcForBigPhoto(product_2_1.src)}>
                  <div>
                    <img src={product_2_1.src} alt="#" className={Styles.mainImage} />
                  </div>                
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>              
            </div>
            <div className={Styles.features}>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🛡️</div> 
                  <div className={Styles.featureText}>
                    <h4>Назначение:</h4>
                    <p>Для работы в системе регулирования уровня и перепада давления в АГЗУ типа «Спутник» для установки 
                      вместо обычных газовых заслонок. Герметичность затвора обеспечивается прижатием шибера к уплотнительным 
                      кольцам, обе детали изготавливаются из нержавеющего материала, отсутствие резинотехнических изделий 
                      на месте соприкосновения обеспечивает длительный срок службы и высокий межремонтный период.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-3"  ref={el => sectionsRef.current[2] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>Переключатель скважин многоходовой (ПСМ)</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.minFoto}>
                <div className={Styles.imageCard} onClick={() => setSrcForBigPhoto(product_2_2.src)}>
                  <img src={product_2_2.src} alt="#" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>              
            </div>
            <div className={Styles.features}>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>⛽</div> 
                  <div className={Styles.featureText}>
                    <h4>Назначение:</h4>
                    <p>Для ручной и автоматической установки скважин на замер в АГЗУ типа «Спутник». Для повышения коррозионной 
                      стойкости ПСМ производится наплавка рабочей зоны корпусов коррозионностойкой хромоникельмолибденовой сталью. 
                      Вал и каретка ПСМ подвергаются оксикарбонитрированию.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-4"  ref={el => sectionsRef.current[3] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>Магниторегулируемый клапан (КМР)</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.minFoto}>
                <div className={Styles.imageCard} onClick={() => setSrcForBigPhoto(product_2_3.src)}>
                  <img src={product_2_3.src} alt="#" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>              
            </div>
            <div className={Styles.features}>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🔄</div>
                  <div className={Styles.featureText}>
                    <h4>Назначение:</h4>
                    <p>Для работы в системе регулирования уровня и перепада давления в АГЗУ типа «Спутник» вместо обычных регуляторов расхода типа РР.</p> 
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-5"  ref={el => sectionsRef.current[4] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>Гидропривод (ГП)</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.minFoto}>
                <div className={Styles.imageCard} onClick={() => setSrcForBigPhoto(product_2_4.src)}>
                  <img src={product_2_4.src} alt="#" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>              
            </div>
            <div className={Styles.features}>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>⏲️</div>
                  <div className={Styles.featureText}>
                    <h4>Назначение:</h4>
                    <p>Для создания гидравлического давления в силовом гидравлическом цилиндре переключателя скважин многоходового (ПСМ) для поочередного переключения скважин.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-6"  ref={el => sectionsRef.current[5] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>Сепарационная ёмкость</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.minFoto}>
                <div className={Styles.imageCard} onClick={() => setSrcForBigPhoto(product_2_5.src)}>
                  <img src={product_2_5.src} alt="#" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>              
            </div>
            <div className={Styles.features}>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🔀</div>
                  <div className={Styles.featureText}>
                    <div className={Styles.featureText}>
                      <h4>Назначение:</h4>
                      <p>Для разделения скважинных нефтегазовых смесей на жидкость и газ с целью последующего их измерения.</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>   

      <BackToTop/>
      {srcForBigPhoto && <BigPhoto src={srcForBigPhoto} onClose={() => setSrcForBigPhoto(null)} />}
    </div>
  );
};
