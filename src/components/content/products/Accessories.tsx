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
import { useTranslation } from 'react-i18next';
import { BackToTop } from '../../ui/back-to-top/BackToTop';


// Комплектующие для автоматизированной групповой замерной установки
export const Accessories = () => {
  const { t } = useTranslation('products');
  
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
              <p>{t('Расходомер')}</p>
            </button>
            <button onClick={() => handleClick('products-2')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>📉</span>
              <p>{t('УРПД')}</p>
            </button>
            <button onClick={() => handleClick('products-3')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🔄</span>
              <p>{t('ПСМ')}</p>
            </button>
            <button onClick={() => handleClick('products-4')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🧲</span>
              <p>{t('КМР')}</p>
            </button>
            <button onClick={() => handleClick('products-5')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>💦</span>
              <p>{t('Гидропривод')}</p>
            </button>
            <button onClick={() => handleClick('products-6')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>⚗️</span>
              <p>{t('Емкость')}</p>
            </button>
          </div>
        </aside>

        <div className={Styles.content}>

          <section id="products-1"  ref={el => sectionsRef.current[0] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>{t('Расходомер')}</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.minFoto}>
                <div className={Styles.imageCard} onClick={() => setSrcForBigPhoto(product_2.src)}>
                  <img src={product_2.src} alt="#" className={Styles.mainImage} />                               
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>{t('Увеличение')}</span>
                  </div>
                </div>
              </div>              
            </div>
            <div className={Styles.features}>
              <h3>{t('Основное')}</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💎</div>
                  <div className={Styles.featureText}>
                    <h4 className={Styles.featureTitle}>{t('стабильность')}</h4>
                    <p className={Styles.featureText}>{t('Стабильность')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🔧</div>
                  <div className={Styles.featureText}>
                    <h4>{t('Гибкость')}</h4>
                    <p>{t('Колибровка')}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={Styles.features}>
              <h3>{t('Принцип')}</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🌪️</div>        
                  <div className={Styles.featureText}>                    
                    <p>{t('Метод')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>⚡</div>            
                  <div className={Styles.featureText}>
                    <p>{t('Внутри')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-2"  ref={el => sectionsRef.current[1] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>{t('УРПД')}</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.minFoto}>
                <div className={Styles.imageCard} onClick={() => setSrcForBigPhoto(product_2_1.src)}>
                  <div>
                    <img src={product_2_1.src} alt="#" className={Styles.mainImage} />
                  </div>                
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>{t('Увеличение')}</span>
                  </div>
                </div>
              </div>              
            </div>
            <div className={Styles.features}>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🛡️</div> 
                  <div className={Styles.featureText}>
                    <h4>{t('Назначение')}</h4>
                    <p>{t('Регулирование')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-3"  ref={el => sectionsRef.current[2] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>{t('ПСМ')}</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.minFoto}>
                <div className={Styles.imageCard} onClick={() => setSrcForBigPhoto(product_2_2.src)}>
                  <img src={product_2_2.src} alt="#" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>{t('Увеличение')}</span>
                  </div>
                </div>
              </div>              
            </div>
            <div className={Styles.features}>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>⛽</div> 
                  <div className={Styles.featureText}>
                    <h4>{t('Назначение')}</h4>
                    <p>{t('Скважина')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-4"  ref={el => sectionsRef.current[3] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>{t('КМР')}</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.minFoto}>
                <div className={Styles.imageCard} onClick={() => setSrcForBigPhoto(product_2_3.src)}>
                  <img src={product_2_3.src} alt="#" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>{t('Увеличение')}</span>
                  </div>
                </div>
              </div>              
            </div>
            <div className={Styles.features}>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🔄</div>
                  <div className={Styles.featureText}>
                    <h4>{t('Назначение')}</h4>
                    <p>{t('Расход')}</p> 
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-5"  ref={el => sectionsRef.current[4] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>{t('Гидропривод')}</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.minFoto}>
                <div className={Styles.imageCard} onClick={() => setSrcForBigPhoto(product_2_4.src)}>
                  <img src={product_2_4.src} alt="#" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>{t('Увеличение')}</span>
                  </div>
                </div>
              </div>              
            </div>
            <div className={Styles.features}>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>⏲️</div>
                  <div className={Styles.featureText}>
                    <h4>{t('Назначение')}</h4>
                    <p>{t('Давление')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-6"  ref={el => sectionsRef.current[5] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>{t('Емкость')}</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.minFoto}>
                <div className={Styles.imageCard} onClick={() => setSrcForBigPhoto(product_2_5.src)}>
                  <img src={product_2_5.src} alt="#" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>{t('Увеличение')}</span>
                  </div>
                </div>
              </div>              
            </div>
            <div className={Styles.features}>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🔀</div>
                  <div className={Styles.featureText}>
                    <h4 className={Styles.featureTitle}>{t('Назначение')}</h4>
                    <p className={Styles.featureText}>{t('Нефтегазовых')}</p>
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
