import Styles from '../products.module.scss'
import { useState, useRef } from 'react'

import product_2 from '../../../../images/products/product_2_2.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { useClickToScroll } from '../../../../hooks/useClickToScroll'
import { Title } from '../../../ui/title/Title';


export const Accessories_3 = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const handleClick = useClickToScroll()

  return (
    <div className={Styles.container}>
      <Title text="Переключатель скважин многоходовой (ПСМ)"></Title>
        

        {/* ===== CONTENT ===== */}
          <section className={Styles.content}>

            <div className={Styles.card}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div className={Styles.imageCard} onClick={() => setBigPhoto(product_2.src)}>
                  <img src={product_2.src} alt="" className={Styles.mainImage}/>
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
                          <p>Ручная и автоматическая установка скважин на замер. Повышенная коррозионная стойкость.</p>
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
  )
}





