import Styles from '../products.module.scss'
import { useState, useRef } from 'react'

import product_1 from '../../../../images/products/product_1.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../../layout/LayoutBack';

export const Stationary = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBackAccounting = () => {
    window.location.href = '/products/accounting-system';
  };

  return (
    <LayoutBack onBack={onBackAccounting} title="АГЗУ «Спутник — массомер НТ.1» (стационарный)">
      <div className={Styles.container}>
        {/* ===== CONTENT ===== */}
        <section className={Styles.content}>

          <div className={Styles.card}>
            {/* Фото */}
            <div className={Styles.cardImage}>
              <div className={Styles.imageCard} onClick={() => setBigPhoto(product_1.src)}>
                <img src={product_1.src} alt="" className={Styles.mainImage} />
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
                <h3>Назначение:</h3>
                <ul className={Styles.featuresList}>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Для измерения массы и массового расхода скважинной жидкости в составе нефтегазовой смеси.</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Для определения массы и массового расхода сырой нефти без учета воды.</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Для измерения объема и расхода свободного нефтяного газа после сепарации.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={Styles.features}>
                <h3>Состав блока технологического:</h3>
                <ul className={Styles.featuresList}>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Для измерения массы и массового расхода скважинной жидкости в составе нефтегазовой смеси.</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Сепарационная емкость с гидроциклоном;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Переключатель скважин многоходовой (ПСМ);</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Запорная арматура (задвижки, шаровые краны, вентиля);</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Регулятор расхода;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Газовая заслонка;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Датчики;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Клапана регулирующие;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Клапан предохранительный;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Линия дренажа;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Линия коллектора;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Линия байпасная;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Термометры (термопреобразователи);</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Расходомеры типа «ЭМИС-МАСС 260» или аналог;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Счетчик жидкостной турбинный с электромагнитным датчиком «ТОР-1» или аналог;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Влагомер ВСН-2 или аналог;</p>
                    </div>
                  </li>
                  <li className={Styles.feature}>
                    <div className={Styles.featureText}>
                      <p>Манометры.</p>
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