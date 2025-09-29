import Styles from './products.module.scss';
import { useState, useRef } from 'react';
import product_3 from '../../../images/products/product_3.webp';
import product_3_1 from '../../../images/products/product_3_1.webp';
import product_3_2 from '../../../images/products/product_3_2.webp';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { useClickToScroll } from '../../../hooks/useClickToScroll';
import { useTranslation } from 'react-i18next';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

export const MeasuringSystem = () => {
  const { t } = useTranslation('products');

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
              <p>{t('СИКН')}</p>
            </button>
            <button onClick={() => handleClick('products-2')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>💨</span>
              <p>{t('СИКГ')}</p>
            </button>
            <button onClick={() => handleClick('products-3')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>💧</span>
              <p>{t('СИКВ')}</p>
            </button>
            
          </div>
        </aside>

        <div className={Styles.content}>
          <section id="products-1" ref={el => sectionsRef.current[0] = el} className={Styles.section}>
              <div className={Styles.sectionHeader}>
              <h2>{t('СИКН')}</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.imageCard} onClick={() => setOneIsOpen(true)}>
                <img src={product_3.src} alt="Мобильная АГЗУ" className={Styles.mainImage} />
                <div className={Styles.imageOverlay}>
                  <span className={Styles.zoomText}>{t('Увеличение')}</span>
                </div>
              </div>
            </div>
            <div className={Styles.features}>
              <h3>{t('Назначение')}</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>📊</div>
                  <div className={Styles.featureText}>
                    <p>{t('Измерения')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🔍</div>
                  <div className={Styles.featureText}>
                    <p>{t('Определения')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🧪</div>
                  <div className={Styles.featureText}>
                    <p>{t('Отбор')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💻</div>
                  <div className={Styles.featureText}>
                    <p>{t('Выдача')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🏭</div>
                  <div className={Styles.featureText}>
                    <p>{t('Изготавливаться')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-2" ref={el => sectionsRef.current[1] = el} className={Styles.section}>
              <div className={Styles.sectionHeader}>
              <h2>{t('СИКГ')}</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.imageCard} onClick={() => setTwoIsOpen(true)}>
                <img src={product_3_1.src} alt="Мобильная АГЗУ" className={Styles.mainImage} />
                <div className={Styles.imageOverlay}>
                  <span className={Styles.zoomText}>{t('Увеличение')}</span>
                </div>
              </div>
            </div>
            <div className={Styles.features}>
              <h3>{t('Назначение')}</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🤖</div>
                  <div className={Styles.featureText}>
                    <p>{t('Автоматизированного')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🏗️</div>
                  <div className={Styles.featureText}>
                    <p>{t('Входит')}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={Styles.features}>
              <h3>{t('Типовой')}</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🌪️</div>
                  <div className={Styles.featureText}>
                    <p>{t('Преобразователь')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🧮</div>
                  <div className={Styles.featureText}>
                    <p>{t('Вычислитель')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🎛️</div>
                  <div className={Styles.featureText}>
                    <p>{t('Регуляторы')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💾</div>
                  <div className={Styles.featureText}>
                    <p>{t('Аппаратно')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>📊</div>
                  <div className={Styles.featureText}>
                    <p>{t('Газовая')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💧</div>
                  <div className={Styles.featureText}>
                    <p>{t('Анализатор')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🌡️</div>
                  <div className={Styles.featureText}>
                    <p>{t('Преобразователи')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🧪</div>
                  <div className={Styles.featureText}>
                    <p>{t('Система')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🛠️</div>
                  <div className={Styles.featureText}>
                    <p>{t('Комплексов')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="products-3" ref={el => sectionsRef.current[2] = el} className={Styles.section}>
              <div className={Styles.sectionHeader}>
              <h2>{t('СИКВ')}</h2>
            </div>
            <div className={Styles.mainImageContainer}>
              <div className={Styles.imageCard} onClick={() => setThreeIsOpen(true)}>
                <img src={product_3_2.src} alt="Мобильная АГЗУ" className={Styles.mainImage} />
                <div className={Styles.imageOverlay}>
                  <span className={Styles.zoomText}>{t('Увеличение')}</span>
                </div>
              </div>
            </div>
            <div className={Styles.features}>
              <h3>{t('Назначение')}</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💧</div>
                  <div className={Styles.featureText}>
                    <p>{t('Количества')}</p>
                  </div>
                </li>                
              </ul>
            </div>
            <div className={Styles.features}>
              <h3>{t('Типовой')}</h3>
              <ul className={Styles.featuresList}>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>📊</div>
                  <div className={Styles.featureText}>
                    <p>{t('Измерительных')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>💻</div>
                  <div className={Styles.featureText}>
                    <p>{t('Обработки')}</p>
                  </div>
                </li>
                <li className={Styles.feature}>
                  <div className={Styles.featureIcon}>🛠️</div>
                  <div className={Styles.featureText}>
                    <p>{t('Технологические')}</p>
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
