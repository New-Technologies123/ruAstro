import Styles from '../products.module.scss'
import { useState, useRef } from 'react'

import product_3 from '../../../../images/products/product_3.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { Title } from '../../../ui/title/Title';


export const MeasuringSystem_1 = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  return (
    <div className={Styles.container}>
      <Title text="Система измерения количества и показателей качества нефти (СИКН)"></Title>
        

        {/* ===== CONTENT ===== */}
          <section className={Styles.content}>

            <div className={Styles.card}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div className={Styles.imageCard} onClick={() => setBigPhoto(product_3.src)}>
                  <img src={product_3.src} alt="" className={Styles.mainImage}/>
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
                          <p>Автоматизированное измерение количества нефти;</p>
                        </div>
                      </li>
                      <li className={Styles.feature}>
                        <div className={Styles.featureText}>
                          <p>Определение плотности, вязкости, влагосодержания;</p>
                        </div>
                      </li>
                      <li className={Styles.feature}>
                        <div className={Styles.featureText}>
                          <p>Отбор объединённой пробы по ГОСТ 2517;</p>
                        </div>
                      </li>
                      <li className={Styles.feature}>
                        <div className={Styles.featureText}>
                          <p>Архивирование и передача данных на АРМ оператора;</p>
                        </div>
                      </li>
                      <li className={Styles.feature}>
                        <div className={Styles.featureText}>
                          <p>Может изготавливаться на базе различных типов расходомеров.</p>
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





