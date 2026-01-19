import Styles from '../products.module.scss'
import { useState, useRef } from 'react'

import product_4 from '../../../../images/products/product_4_3.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../../layout/LayoutBack';

type TProps = {
  onBackPreparation: VoidFunction;
  title: string;
};


export const PreparationSystems_3 = ({ onBackPreparation, title }: TProps) => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  return (
    <LayoutBack onBack={onBackPreparation} title={title}>
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
                      <p>Для автоматической непрерывной очистки всей внутренней поверхности колонны НКТ нефтяной скважины путём срезания слоя парафина со стенок.</p>
                    </div>
                  </li>
                </ul>                    
              </div>
              <div className={Styles.features}>
                  <h3>Преимущества перед аналогами:</h3>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Сматывание проволоки с барабана предотвращается благодаря применению подпружинного подвижного ролика с датчиком веса;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Полностью автоматизированный процесс ликвидации пробок;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Колибровка положения скребка с точностью до 40 см.;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Скребок имеет несколько основных исполнений: раздвижной, кольцевой,фрезерный, лезвийный, шнековый и др.;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Магниты установлены на ролике, датчики оборотов (герконовые) — на стойке подвижного ролика, на расстоянии, 
                          при котором перекрывается зона взаимодействия их магнитных полей. Такое расположение обеспечивает 
                          последовательное срабатывание герконов по направлению вращения ролика.</p>
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





