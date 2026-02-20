import Styles from '../products.module.scss'
import { useState } from 'react'

import product_3 from '../../../../images/products/product_3_2.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../../layout/LayoutBack';

export const Water = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBackMeasuring = () => {
    window.location.href = '/products/measuring-system';
  };

  return (
    <LayoutBack onBack={onBackMeasuring} title="Система измерения количества воды (СИКВ)">
      <div className={Styles.container}>
        {/* ===== CONTENT ===== */}
        <section className={Styles.content}>

          <div className={Styles.card}>
            {/* Фото */}
            <div className={Styles.cardImage}>
              <div className={Styles.imageCard} onClick={() => setBigPhoto(product_3.src)}>
                <img src={product_3.src} alt="" className={Styles.mainImage} />
                <div className={Styles.imageOverlay}>
                  <span className={Styles.zoomText}>
                    Нажмите для увеличения
                  </span>
                </div>
              </div>
            </div>

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
          <div className={Styles.related}>
            <h3>Смотрите также:</h3>
            <ul className={Styles.relatedList}>
              <li>
                <a href="/products/measuring-system/gas">СИКН</a>
              </li>
              <li>
                <a href="/products/measuring-system/oil">СИКГ</a>
              </li>
            </ul>
          </div>
        </section>

        <BackToTop />

        {bigPhoto && (
          <BigPhoto src={bigPhoto} onClose={() => setBigPhoto(null)} />
        )}
      </div>
    </LayoutBack>
  )
}





