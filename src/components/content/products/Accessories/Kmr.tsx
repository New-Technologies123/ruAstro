import Styles from '../products.module.scss'
import { useState, useRef } from 'react'

import product_2 from '../../../../images/products/product_2_3.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../../layout/LayoutBack';

export const Kmr = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBackAccessories = () => {
    window.location.href = '/products/accessories';
  };

  return (
    <LayoutBack onBack={onBackAccessories} title="Магниторегулируемый клапан (КМР)">
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
                      <p>Работа в системе регулирования уровня и перепада давления вместо регуляторов расхода.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* ===== СМОТРИТЕ ТАКЖЕ ===== */}
          <div className={Styles.related}>
            <h3>Смотрите также:</h3>
            <ul className={Styles.relatedList}>
              <li>
                <a href="/products/accessories/ervip">ЭРВИП</a>
              </li>
              <li>
                <a href="/products/accessories/urpd">УРПД</a>
              </li>
              <li>
                <a href="/products/accessories/psm">ПСМ</a>
              </li>
              <li>
                <a href="/products/accessories/gidroprivod">Гидропривод</a>
              </li>
              <li>
                <a href="/products/accessories/separation">Сепарационная емкость</a>
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





