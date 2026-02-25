import Styles from './services.module.scss'
import { useState } from 'react'

import serves_5 from '../../../images/services/serves_5.webp'

import { BigPhoto } from '../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../layout/LayoutBack'

export const Dewaxing = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBack = () => {
    window.location.href = '/services'
  }

  return (
    <LayoutBack
      onBack={onBack}
      title="Услуги депарафинизации нефтяных скважин"
    >
      <>
        <div className={Styles.card}>
          <div
            className={Styles.imageWrapper}
            onClick={() => setBigPhoto(serves_5.src)}
          >
            <img
              src={serves_5.src}
              alt="депарафинизация"
              className={Styles.serviceImage}
            />
            <div className={Styles.imageOverlay}>
              <p>Увеличить</p>
            </div>
          </div>

          <div className={Styles.content}>
            <ul>
              {[
                'Услуги оказываются экипажами на базе высокопроходимой спецтехники.',
                'Основной задачей является полное удаление асфальтосмолопарафиновых отложений (АСПО) и других отложений механическим способом (скребкованием) в лифте НКТ скважин, а также обеспечение прохода в скважинах с НКТ.',
                'Скребкование проводится с помощью фрезерных и лезвийных скребков различного диаметра в фонтанных нефтяных скважинах и скважинах, оборудованных установкой электроцентробежного насоса (УЭЦН).',
                'Глубина спуска скребка в скважину 2000–3000 м.',
                'Для выявления и удаления отложений на НКТ с внутренним покрытием используются неметаллические скребки/фрезы и лома-утяжелители с покрытием для предотвращения повреждения НКТ. Также применяются скребки-пробойники и «парафинорезки» для удаления АСПО при закупоривании (для НКТ черной и НКТ с покрытием).',
                'Работы выполняются обученным персоналом с применением сертифицированного оборудования собственного производства в соответствии с действующими правилами безопасности в нефтяной и газовой промышленности.'
              ].map((item) => (
                <li key={item}>{item}</li>
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