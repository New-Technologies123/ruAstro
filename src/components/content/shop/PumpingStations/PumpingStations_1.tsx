import Styles from '../products.module.scss'
import { useState, useRef } from 'react'

import product_5 from '../../../../images/products/product_5.webp'

import { BigPhoto } from '../../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../../layout/LayoutBack';

type TProps = {
  onBackPumping: VoidFunction;
  title: string;
};

export const PumpingStations_1 = ({ onBackPumping, title }: TProps) => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)  

  return (
    <LayoutBack onBack={onBackPumping} title={title}>
      <div className={Styles.container}>
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
                        <p>Для обеспечения дальнейшего транспорта нефти в межпромысловые трубопроводы в системах сбора 
                          и подготовки нефти, внутрипарковой и внешней перекачки нефти, нефтепродуктов и конденсата.</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Насосные станции проектируются и изготавливаются на базе центробежных насосных агрегатов российского или зарубежного производства. 
                          В зависимости от марки насосных агрегатов станция может быть выполнена в нескольких исполнениях.</p>
                      </div>
                    </li>                       
                  </ul>                    
                </div>
                <div className={Styles.features}>
                  <h3>Типовой состав:</h3>
                  <ul className={Styles.featuresList}>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Насосные агрегаты;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Приемный и нагнетательный коллекторы с запорной арматурой;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Трубопроводы дренажа и слива утечек;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система пожароохранной сигнализации и контроля загазованности;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система пенного пожаротушения;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Средства автоматизации и КИП;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Грузоподъемные устройства для монтажа и демонтажа арматуры и деталей трубопроводной обвязки;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система управления подпорными насосами;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система передачи информации на верхний уровень;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система электроснабжения насосных агрегатов;</p>
                      </div>
                    </li>
                    <li className={Styles.feature}>
                      <div className={Styles.featureText}>
                        <p>Система жизнеобеспечения блок-бокса.</p>
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





