import Styles from '../products.module.scss'
import { useState, useRef } from 'react'

import product_4 from '../../../../images/products/product_4.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../../layout/LayoutBack';

export const Launch = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBackPreparation = () => {
    window.location.href = '/products/preparation-systems';
  };

  return (
    <LayoutBack onBack={onBackPreparation} title="Устройство запуска и приема внутритрубных средств очистки и диагностики УЗПЗ, УЗПП">
      <div className={Styles.container}>
        {/* ===== CONTENT ===== */}
        <section className={Styles.content}>

          <div className={Styles.card}>
            {/* Фото */}
            <div className={Styles.cardImage}>
              <div className={Styles.imageCard} onClick={() => setBigPhoto(product_4.src)}>
                <img src={product_4.src} alt="" className={Styles.mainImage}/>
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
                        <p>Для периодического запуска в трубопровод (с целью его очистки и диагностики) и приёма из него внутритрубных 
                          снарядов — дефектоскопов, очистных скребков и других поточных средств.</p>
                      </div>
                    </li>                     
                  </ul>                    
                </div>
                <div className={Styles.features}>
                  <h3>Область применения:</h3>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Системы сбора и транспорта нефти и газа (нефтепроводы, газопроводы).</p>
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
                <a href="/products/preparation-systems/block">БГ</a>
              </li>
              <li>
                <a href="/products/preparation-systems/cleaning">УОК-НКТ</a>
              </li>
              <li>
                <a href="/products/preparation-systems/dosing">БДР</a>
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





