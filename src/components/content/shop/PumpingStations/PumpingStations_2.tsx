import Styles from '../products.module.scss'
import { useState, useRef } from 'react'

import product_5 from '../../../../images/products/product_5_1.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { Title } from '../../../ui/title/Title';


export const PumpingStations_2 = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  return (
    <div className={Styles.container}>
      <Title text="Блочная мультифазная насосная станция"></Title>
        

        {/* ===== CONTENT ===== */}
          <section className={Styles.content}>

            <div className={Styles.card}>
              {/* Фото */}
              <div className={Styles.cardImage}>
                <div className={Styles.imageCard} onClick={() => setBigPhoto(product_5.src)}>
                  <img src={product_5.src} alt="" className={Styles.mainImage}/>
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

      <BackToTop />

      {bigPhoto && (
        <BigPhoto src={bigPhoto} onClose={() => setBigPhoto(null)} />
      )}
    </div>
  )
}





