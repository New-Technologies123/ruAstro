import Styles from './products.module.scss';
import { useState, useRef } from 'react';
import product_5 from '../../../images/products/product_5.webp';
import product_5_1 from '../../../images/products/product_5_1.webp';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { useClickToScroll } from '../../../hooks/useClickToScroll';
import { useTranslation } from 'react-i18next';
import { BackToTop } from '../../ui/back-to-top/BackToTop';


export const PumpingStations = () => {
  const { t } = useTranslation('products');

  const [oneIsOpen, setOneIsOpen] = useState(false);
  const [twoIsOpen, setTwoIsOpen] = useState(false);

  const sectionsRef = useRef([]);
  const handleClick = useClickToScroll();

  return (
    <div className={Styles.container}>
      <div className={Styles.mainContent}>
        <aside className={Styles.sidebar}>
          <div className={Styles.navMenu}>
            <button onClick={() => handleClick('products-1')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>⛽</span>
              <p>{t('Насосная')}</p>
            </button>
            <button onClick={() => handleClick('products-2')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🔄</span>
              <p>{t('Мультифазная')}</p>
            </button>
          </div>
        </aside>

        <div className={Styles.content}>
          <section id="products-1"  ref={el => sectionsRef.current[0] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>{t('Насосная')}</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.imageCard} onClick={() => setOneIsOpen(true)}>
                <img src={product_5.src} alt="#" className={Styles.mainImage} />
                <div className={Styles.imageOverlay}>
                  <span className={Styles.zoomText}>{t('Увеличение')}</span>
                </div>
              </div>
            </div>
            <div className={Styles.features}>
              <h3>{t('Назначение')}</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🛢️</div>
                  <div className={Styles.featureText}>
                    <p>{t('Трубопроводы')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🏭</div>
                  <div className={Styles.featureText}>
                    <p>{t('Производства')}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={Styles.features}>
              <h3>{t('Типовой')}</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>⚙️</div>
                  <div className={Styles.featureText}>                    
                    <p>{t('Насосные')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🔄</div>
                  <div className={Styles.featureText}>
                    <p>{t('Приемный')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💧</div>
                  <div className={Styles.featureText}>
                    <p>{t('Дренажа')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🔥</div>
                  <div className={Styles.featureText}>
                    <p>{t('Пожароохранной')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🧯</div>
                  <div className={Styles.featureText}>
                    <p>{t('Пенного')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🤖</div>
                  <div className={Styles.featureText}>
                    <p>{t('Автоматизации')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🏗️</div>
                  <div className={Styles.featureText}>
                    <p>{t('Грузоподъемные')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🎮</div>
                  <div className={Styles.featureText}>
                    <p>{t('Управления')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>📡</div>
                  <div className={Styles.featureText}>
                    <p>{t('Передачи')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>⚡</div>
                  <div className={Styles.featureText}>
                    <p>{t('Электроснабжения')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🏥</div>
                  <div className={Styles.featureText}>
                    <p>{t('Жизнеобеспечения')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-2"  ref={el => sectionsRef.current[1] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>{t('Мультифазная')}</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.imageCard} onClick={() => setTwoIsOpen(true)}>
                <img src={product_5_1.src} alt="#" className={Styles.mainImage} />
                <div className={Styles.imageOverlay}>
                  <span className={Styles.zoomText}>{t('Увеличение')}</span>
                </div>
              </div>
            </div>
            <div className={Styles.features}>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>⚡</div>
                  <div className={Styles.featureText}>
                    <h4 className={Styles.featureTitle}>{t('Назначение')}</h4>
                    <p className={Styles.featureText}>{t('Перекачивания')}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={Styles.features}>
              <h3>{t('Типовой')}</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🔄</div>
                  <div className={Styles.featureText}>                    
                    <p>{t('Мультифазные')}</p> 
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🏗️</div>
                  <div className={Styles.featureText}>                    
                    <p>{t('Насосной')}</p> 
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🛢️</div>
                  <div className={Styles.featureText}>
                    <p>{t('Трубо')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💧</div>
                  <div className={Styles.featureText}>
                    <p>{t('Дренажные')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>📊</div>
                  <div className={Styles.featureText}>
                    <p>{t('Комплект')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🌡️</div>
                  <div className={Styles.featureText}>
                    <p>{t('Отопление')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🤖</div>
                  <div className={Styles.featureText}>
                    <p>{t('Агрегатами')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>⚠️</div>
                  <div className={Styles.featureText}>
                    <p>{t('Противоаварийной')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>⚡</div>
                  <div className={Styles.featureText}>
                    <p>{t('Частотных')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>📡</div>
                  <div className={Styles.featureText}>
                    <p>{t('Информации')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🔌</div>
                  <div className={Styles.featureText}>
                    <p>{t('Электро')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <BackToTop/>
      {oneIsOpen && <BigPhoto src={product_5.src} onClose={() => setOneIsOpen(false)} />}
      {twoIsOpen && <BigPhoto src={product_5_1.src} onClose={() => setTwoIsOpen(false)} />}
    </div>      
  );
};
