import { useState, useRef } from 'react';
import product_1 from '../../../images/products/product_1.webp';
import product_1_1 from '../../../images/products/product_1_1.webp';
import product_1_2 from '../../../images/products/product_1_2.webp';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import Styles from './products.module.scss';
import { useClickToScroll } from '../../../hooks/useClickToScroll';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

export const AccountingSystem = () => {

  const [firstIsOpen, setFirstIsOpen] = useState(false);
  const [secondIsOpen, setSecondIsOpen] = useState(false);
  const [thirdIsOpen, setThirdIsOpen] = useState(false);

  const sectionsRef = useRef([]);
  const handleClick = useClickToScroll();

  return (
    <div className={Styles.container}>

      <div className={Styles.price}>
        <a className={Styles.buttonPrice} href={`/calculator`}>
          Калькулятор для расчета цен
        </a>
      </div>

      <div className={Styles.mainContent}>
        <aside className={Styles.sidebar}>
          <div className={Styles.navMenu}>
            <button onClick={() => handleClick('products-1')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🏢</span>
              <p>Автоматизированная замерная установка (АГЗУ) «Спутник — массомер НТ.1» стационарная</p>
            </button>
            <button onClick={() => handleClick('products-2')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🚚</span>
              <p>Автоматизированная замерная установка (АГЗУ) «Спутник — массомер НТ.1» мобильная</p>
            </button>
          </div>
        </aside>

        <div className={Styles.content}>
          <section id="products-1" ref={el => sectionsRef.current[0] = el} className={Styles.section}>
            <h2 className={Styles.sectionHeader}>Стационарная система</h2>
            <div className={Styles.fotoText}>
              <div className={Styles.mainImageContainer}>
                <div className={Styles.imageCard} onClick={() => setThirdIsOpen(true)}>
                  <img src={product_1.src} alt="Стационарная АГЗУ" className={Styles.mainImage} />
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
                      <p>Для измерения массы и массового расхода скважинной жидкости (сырой нефти) в составе нефтегазовой
                        смеси, добываемой из нефтяных скважин.</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Для определения массы и массового расхода сырой нефти без учёта воды.</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Для измерения объёма и объёмного расхода свободного нефтяного газа, приведённого к стандартным
                        условиям, после процесса сепарации.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="products-2" ref={el => sectionsRef.current[1] = el} className={Styles.section}>
            <h2 className={Styles.sectionHeader}>Мобильная система</h2>
            <div className={Styles.fotoText}>
              <div className={Styles.features}>
                <ul className={Styles.featuresList}>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>При изготовлении установок в мобильном варианте блоки АГЗУ устанавливаются в кузове или на шасси прицепа или автомобиля.</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Принцип действия установок основан на измерениях массы и массового расхода сырой нефти с учетом и без
                        учета воды, объема и объемного расхода свободного нефтяного газа, приведенного к стандартным условиям,
                        после процесса сепарации.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={Styles.mainImageContainer}>
                <div className={Styles.imageCard} onClick={() => setThirdIsOpen(true)}>
                  <img src={product_1_2.src} alt="Мобильная АГЗУ" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <BackToTop />
      {firstIsOpen && <BigPhoto src={product_1.src} onClose={() => setFirstIsOpen(false)} />}
      {secondIsOpen && <BigPhoto src={product_1_1.src} onClose={() => setSecondIsOpen(false)} />}
      {thirdIsOpen && <BigPhoto src={product_1_2.src} onClose={() => setThirdIsOpen(false)} />}
    </div>
  );
};