import Styles from '../products.module.scss';
import { useState } from 'react';

import product_2 from '../../../../images/products/product_2.webp';

import { BigPhoto } from '../../../ui/big-photo/BigPhoto';
import { BackToTop } from '../../../ui/back-to-top/BackToTop';
import { LayoutBack } from '../../../layout/LayoutBack';

export const Accessories_1 = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null);

  const onBackAccessories = () => {
    window.location.href = '/products/accessories';
  };

  return (
    <LayoutBack onBack={onBackAccessories} title="Вихревой расходомер ЭРВИП">
      <div className={Styles.container}>
        {/* ===== CONTENT ===== */}
        <section className={Styles.content}>
          <div className={Styles.card}>
            {/* Фото */}
            <div className={Styles.cardImage}>
              <div className={Styles.imageCard} onClick={() => setBigPhoto(product_2.src)}>
                <img src={product_2.src} alt="" className={Styles.mainImage} />
                <div className={Styles.imageOverlay}>
                  <span className={Styles.zoomText}>Нажмите для увеличения</span>
                </div>
              </div>
            </div>

            {/* Текст (НЕСКОЛЬКО БЛОКОВ) */}
            <div className={Styles.cardContent}>
              <div className={Styles.features}>
                <h3>Основное назначение</h3>
                <ul className={Styles.featuresList}>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Высокая стабильность показаний, точность измерений, простота в эксплуатации, нечувствительность к загрязнениям.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={Styles.features}>
                <h3>Принцип работы</h3>
                <ul className={Styles.featuresList}>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>
                        Метод измерения основан на формировании вихрей Кармана за телом обтекания. Частота вихрей пропорциональна скорости
                        потока.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <BackToTop />

        {bigPhoto && <BigPhoto src={bigPhoto} onClose={() => setBigPhoto(null)} />}
      </div>
    </LayoutBack>
  );
};
