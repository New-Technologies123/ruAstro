import Styles from '../products.module.scss'
import { useState, useRef } from 'react'

import product_4 from '../../../../images/products/product_4_2.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../../layout/LayoutBack';

type TProps = {
  onBackPreparation: VoidFunction;
  title: string;
};

export const PreparationSystems_2 = ({ onBackPreparation, title }: TProps) => {
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
                      <p>Для распределения потоков подаваемой блочными кустовыми насосными станциями пластовой или чистой 
                        воды под высоким давлением в нагнетательные скважины с целью поддержания пластового давления.</p>
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





