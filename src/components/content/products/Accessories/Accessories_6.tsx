import Styles from '../products.module.scss'
import { useState, useRef } from 'react'

import product_2 from '../../../../images/products/product_2_5.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../../layout/LayoutBack';

type TProps = {
  onBackAccessories: VoidFunction;
  title: string;
};

export const Accessories_6 = ({ onBackAccessories, title }: TProps) => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  return (
    <LayoutBack onBack={onBackAccessories} title={title}>
      <div className={Styles.container}>
        {/* ===== CONTENT ===== */}
        <section className={Styles.content}>

          <div className={Styles.card}>
            {/* Фото */}
            <div className={Styles.cardImage}>
              <div className={Styles.imageCard} onClick={() => setBigPhoto(product_2.src)}>
                <img src={product_2.src} alt="" className={Styles.mainImage} />
                <div className={Styles.imageOverlay}>
                  <span className={Styles.zoomText}>
                    Нажмите для увеличения
                  </span>
                </div>
              </div>
            </div>

            {/* Текст (НЕСКОЛЬКО БЛОКОВ) */}
            <div className={Styles.cardContent}>
              <div className={Styles.features}>
                <h3>Назначение</h3>
                <ul className={Styles.featuresList}>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Разделение нефтегазовых смесей на жидкость и газ.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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





