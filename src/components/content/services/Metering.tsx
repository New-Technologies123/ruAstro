import Styles from './services.module.scss'
import { useState } from 'react'

import serves_3 from '../../../images/services/serves_3.png'
import dot from '../../../images/dot.svg'

import { BigPhoto } from '../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../layout/LayoutBack'

export const Metering = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBack = () => {
    window.location.href = '/services'
  }

  return (
    <LayoutBack
      onBack={onBack}
      title="Замер дебита нефтяных скважин с помощью мобильной замерной установки"
    >
      <>
        <div className={Styles.card}>
          <div
            className={Styles.imageWrapper}
            onClick={() => setBigPhoto(serves_3.src)}
          >
            <img
              src={serves_3.src}
              alt="замер дебита"
              className={Styles.serviceImage}
            />
            <div className={Styles.imageOverlay}>
              <p>Увеличить</p>
            </div>
          </div>

          <div className={Styles.content}>
            <h3>Включает в себя следующие виды услуг:</h3>
            <ul>
              {[
                'Доставку измерительной установки к месту проведения замера;',
                'Монтаж/демонтаж трубной обвязки МЗУ к запорной арматуре скважины и выкидной линии;',
                'Сброс давления и дренирование жидкости из измерительной ёмкости и трубопроводов МЗУ;',
                'Формирование и ведение накопительной базы данных по результатам замеров дебита продукции скважин и динамике изменения этих показателей;',
                'Опрессовку измерительной установки продукцией замеряемой скважины, выполнение замера дебита скважины, оформление результатов замера в круглосуточном режиме.'
              ].map((item) => (
                <li key={item}>
                  <img src={dot.src} alt="" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <BackToTop />

        {bigPhoto && (
          <BigPhoto
            src={bigPhoto}
            onClose={() => setBigPhoto(null)}
          />
        )}
      </>
    </LayoutBack>
  )
}