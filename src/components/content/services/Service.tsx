import Styles from './services.module.scss'
import { useState } from 'react'

import serves_4 from '../../../images/services/serves_4.webp'
import dot from '../../../images/dot.svg'

import { BigPhoto } from '../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../layout/LayoutBack'

export const Service = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBack = () => {
    window.location.href = '/services'
  }

  return (
    <LayoutBack
      onBack={onBack}
      title="Обслуживание устройства очистки колонны УОК-НКТ"
    >
      <>
        <div className={Styles.card}>
          <div
            className={Styles.imageWrapper}
            onClick={() => setBigPhoto(serves_4.src)}
          >
            <img
              src={serves_4.src}
              alt="сервис"
              className={Styles.serviceImage}
            />
            <div className={Styles.imageOverlay}>
              <p>Увеличить</p>
            </div>
          </div>

          <div className={Styles.content}>
            <h3>
              Техническое обслуживание смонтированного устройства включает
              в себя периодическое проведение следующих работ:
            </h3>

            <ul>
              {[
                'Внешний осмотр на предмет изгиба стойки подвижного ролика, состояния сварных швов;',
                'Проверка крепежных соединений;',
                'Проверка и доливка масла в редуктор, при необходимости;',
                'Визуальный осмотр состояния проволоки. При заметном уменьшении её диаметра или коррозии — заменить проволоку;',
                'Проверка состояния и, при необходимости, замена сальников, сальникового уплотнения, лубрикатора;',
                'Проверка срабатывания датчика минимума веса;',
                'Проведение калибровки устройства;',
                'Ревизия редуктора и электродвигателя;',
                'Осмотр и проверка заземления устройства мегомметром;',
                'Обновление знаков заземления на устройстве;',
                'Обслуживание шкафа управления;',
                'Проверка работоспособности обогрева шкафа;',
                'Проверка на сбои программного обеспечения.'
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