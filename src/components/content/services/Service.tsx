import Styles from './services.module.scss'
import { useState } from 'react'
import { motion } from 'framer-motion'
import back from '../../../images/back.svg'
import serves_4 from '../../../images/services/serves_4.webp'

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

export const Service = () => {
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
              Обслуживание устройства очистки <span>колонны УОК-НКТ</span>
            </h1>
            <p>
              Полное техническое обслуживание смонтированного устройства очистки колонны УОК-НКТ с проверкой всех узлов и компонентов.
            </p>
          </div>
          <div
            className={Styles.imageWrapper}
            onClick={() => setBigPhoto(serves_4.src)}
          >
            <img
              src={serves_4.src}
              alt="обслуживание устройства"
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
            <h3>Проверка и обслуживание механических узлов</h3>
            <ul>
              {listItems([
                'Внешний осмотр на предмет изгиба стойки подвижного ролика, состояния сварных швов;',
                'Проверка крепежных соединений;',
                'Проверка и доливка масла в редуктор, при необходимости;',
                'Визуальный осмотр состояния проволоки и замена при износе.'
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
            <h3>Проверка и обслуживание электроники</h3>
            <ul>
              {listItems([
                'Проверка срабатывания датчиков минимального веса;',
                'Калибровка устройства;',
                'Ревизия редуктора и электродвигателя;',
                'Проверка и обслуживание шкафа управления.'
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
            <h3>Безопасность и документация</h3>
            <ul>
              {listItems([
                'Осмотр и проверка заземления устройства;',
                'Обновление знаков заземления;',
                'Проверка работоспособности обогрева шкафа;',
                'Проверка на сбои программного обеспечения.'
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