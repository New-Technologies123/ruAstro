import Styles from './products.module.scss';
import { useState, useRef } from 'react';
import product_5 from '../../../images/products/product_5.webp';
import product_5_1 from '../../../images/products/product_5_1.webp';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { useClickToScroll } from '../../../hooks/useClickToScroll';
import { BackToTop } from '../../ui/back-to-top/BackToTop';


export const PumpingStations = () => {

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
              <p>Блочная насосная станция внутренней и внешней перекачки нефти</p>
            </button>
            <button onClick={() => handleClick('products-2')} className={`${Styles.navItem}`}>
              <span className={Styles.navIcon}>🔄</span>
              <p>Блочная мультифазная насосная станция</p>
            </button>
          </div>
        </aside>

        <div className={Styles.content}>
          <section id="products-1" ref={el => sectionsRef.current[0] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>Блочная насосная станция внутренней и внешней перекачки нефти</h2>
            </div>

            <div className={Styles.card}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div className={Styles.imageCard} onClick={() => setOneIsOpen(true)}>
                  <img src={product_5.src} alt="СИКН" className={Styles.mainImage} />
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
                        <p>Для обеспечения дальнейшего транспорта нефти в межпромысловые трубопроводы в системах сбора и подготовки нефти,
                          внутрипарковой и внешней перекачки нефти, нефтепродуктов и конденсата.</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Насосные станции проектируются и изготавливаются на базе центробежных насосных агрегатов российского или зарубежного
                          производства. В зависимости от марки насосных агрегатов станция может быть выполнена в нескольких исполнениях.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={Styles.features}>
                  <h3>Типовой состав:</h3>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Насосные агрегаты;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Приемный и нагнетательный коллекторы с запорной арматурой;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Трубопроводы дренажа и слива утечек;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система пожароохранной сигнализации и контроля загазованности;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система пенного пожаротушения;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Средства автоматизации и КИП;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Грузоподъемные устройства для монтажа и демонтажа арматуры и деталей трубопроводной обвязки;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система управления подпорными насосами;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система передачи информации на верхний уровень;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система электроснабжения насосных агрегатов;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система жизнеобеспечения блок-бокса.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="products-2" ref={el => sectionsRef.current[1] = el} className={Styles.section}>
            <div className={Styles.sectionHeader}>
              <h2>Блочная мультифазная насосная станция</h2>
            </div>

            <div className={`${Styles.card} ${Styles.reverse}`}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div className={Styles.imageCard} onClick={() => setTwoIsOpen(true)}>
                  <img src={product_5_1.src} alt="СИКГ" className={Styles.mainImage} />
                  <div className={Styles.imageOverlay}>
                    <span className={Styles.zoomText}>Нажмите для увеличения</span>
                  </div>
                </div>
              </div>
              {/* Текст */}
              <div className={Styles.cardContent}>
                <div className={Styles.features}>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <h4>Назначение:</h4>
                        <p>Для перекачивания газожидкостной смеси из скважин без предварительной сепарации газа с содержанием газовой фазы до 100%.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={Styles.features}>
                  <h3>Типовой состав:</h3>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Мультифазные насосные агрегаты;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Блок-бокс насосной станции;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Технологические трубопроводы;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Дренажные трубопроводы;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Комплект КИПиА;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Системы жизнеобеспечения блок-бокса насосной станции (отопление, вентиляция);</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система управления мультифазными насосными агрегатами;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система противоаварийной автоматической защиты ПАЗ;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Блок частотных преобразователей;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система передачи информации на верхний уровень;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система электроснабжения насосных агрегатов.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <BackToTop />
      {oneIsOpen && <BigPhoto src={product_5.src} onClose={() => setOneIsOpen(false)} />}
      {twoIsOpen && <BigPhoto src={product_5_1.src} onClose={() => setTwoIsOpen(false)} />}
    </div>
  );
};
