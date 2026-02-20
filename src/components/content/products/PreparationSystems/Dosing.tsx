import Styles from '../products.module.scss'
import { useState, useRef } from 'react'

import product_3 from '../../../../images/products/product_3_2.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../../layout/LayoutBack';

export const Dosing = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBackPreparation = () => {
    window.location.href = '/products/preparation-systems';
  };

  return (
    <LayoutBack onBack={onBackPreparation} title="Установка дозирования химического реагента (БДР)">
      <div className={Styles.container}>
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
                        <p>Установка дозирования реагента УДХ (БДР) предназначена для дозированного ввода различных жидких химреагентов 
                          (деэмульгаторов и ингибиторов коррозии и т.п.) в трубопроводы системы сбора, транспорта и подготовки нефти с 
                          целью осуществления внутритрубопроводной деэмульгации нефти, а также защиты трубопроводов и оборудования от 
                          коррозии, парафиноотложений и др.</p>
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
                  <a href="/products/preparation-systems/launch">УЗПЗ, УЗПП</a>
                </li>
                <li>
                  <a href="/products/preparation-systems/block">БГ</a>
                </li>
                <li>
                  <a href="/products/preparation-systems/cleaning">УОК-НКТ</a>
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





