import Styles from '../products.module.scss'
import { useState, useRef } from 'react'

import product_1_1 from '../../../../images/products/product_1_2.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../../layout/LayoutBack';

type TProps = {
  onBackAccountingSystem: VoidFunction;
  title: string;
};

export const AccountingSystem_2 = ({ onBackAccountingSystem, title }: TProps) => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  return (
    <LayoutBack onBack={onBackAccountingSystem} title={title}>
      <div className={Styles.container}>
        {/* ===== CONTENT ===== */}
        <section className={Styles.content}>

          <div className={Styles.card}>
            {/* Фото */}
            <div className={Styles.cardImage}>
              <div className={Styles.imageCard} onClick={() => setBigPhoto(product_1_1.src)}>
                <img src={product_1_1.src} alt="" className={Styles.mainImage} />
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
                <ul className={Styles.featuresList}>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Блоки АГЗУ размещаются в кузове автомобиля или на шасси прицепа.</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Измерение массы нефти и газа с учетом и без учета воды, после процесса сепарации.</p>
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





