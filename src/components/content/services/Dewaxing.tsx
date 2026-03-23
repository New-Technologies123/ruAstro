import Styles from './services.module.scss'
import { useState } from 'react'
import { motion } from 'framer-motion'
import back from '../../../images/back.svg'
import serves_5 from '../../../images/services/serves_5.webp'

import { BigPhoto } from '../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../ui/back-to-top/BackToTop'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const listItems = (items: string[]) =>
  items.map((item) => (
    <motion.li
      key={item}
      variants={fadeUp}
      transition={{ duration: 0.4 }}
    >
      {item}
    </motion.li>
  ))

export const Dewaxing = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBack = () => {
    window.location.href = '/services'
  }

  return (
    <>
      <button className={Styles.backButton} onClick={onBack}>
        <img src={back.src} alt=""/>
      </button>
      <div className={Styles.wrapper}>

        {/* HERO */}
        <motion.div className={Styles.hero} initial="hidden" animate="visible" variants={fadeUp}>
          <div className={Styles.heroText}>
            <h1>
              Услуги <span>депарафинизации </span> нефтяных скважин
            </h1>
            <p>
              Полное удаление асфальтосмолопарафиновых отложений и обеспечение прохода в скважинах с НКТ с помощью
              специализированной техники и обученного персонала.
            </p>
          </div>
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
        </motion.div>

        {/* CARDS */}
        <div className={Styles.grid}>
          <motion.div
            className={Styles.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3>Скребкование и удаление АСПО</h3>
            <ul>
              {listItems([
                'Использование фрезерных и лезвийных скребков различного диаметра.',
                'Применение неметаллических скребков для НКТ с покрытием.',
                'Скребки-пробойники и парафинорезки при закупоривании.',
                'Глубина спуска скребка: 2000–3000 м.'
              ])}
            </ul>
          </motion.div>

          <motion.div
            className={Styles.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3>Оборудование и техника</h3>
            <ul>
              {listItems([
                'Высокопроходимая специализированная техника для работы на скважинах.',
                'Установка электроцентробежного насоса (УЭЦН) для фонтанных скважин.',
                'Лома-утяжелители с покрытием для предотвращения повреждений НКТ.'
              ])}
            </ul>
          </motion.div>

          <motion.div
            className={Styles.card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3>Персонал и безопасность</h3>
            <ul>
              {listItems([
                'Обученный персонал с опытом работы на нефтяных скважинах.',
                'Использование сертифицированного оборудования собственного производства.',
                'Соблюдение всех правил безопасности в нефтяной и газовой промышленности.'
              ])}
            </ul>
          </motion.div>
        </div>

        <BackToTop />

        {bigPhoto && (
          <BigPhoto
            src={bigPhoto}
            onClose={() => setBigPhoto(null)}
          />
        )}
      </div>
    </>
  )
}