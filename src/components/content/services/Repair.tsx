import Styles from './services.module.scss'
import { useState } from 'react'
import { motion } from 'framer-motion'
import back from '../../../images/back.svg'
import serves_1 from '../../../images/services/serves_12.png'

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

export const Repair = () => {
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
              Обслуживание, капитальный ремонт и модернизация
              <span> АГЗУ</span>
            </h1>
            <p>
              Обеспечиваем бесперебойную работу АГЗУ: регулярное обслуживание, капитальный ремонт и модернизация
              оборудования в соответствии с современными стандартами и ГОСТ.
            </p>
          </div>
          <div
            className={Styles.imageWrapper}
            onClick={() => setBigPhoto(serves_1.src)}
          >
            <img
              src={serves_1.src}
              alt="сервис"
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
            <h3>Капитальный ремонт</h3>
            <ul>
              {listItems([
                'Ремонт или замена сепарационной ёмкости, фланцев, клапанов',
                'Ремонт или замена переключателя скважин ПСМ',
                'Ремонт или замена счётчика ТОР 1-50',
                'Замена задвижек и трубопроводов',
                'Реставрация днища и корпуса',
                'Замена гидропривода и комплектующих',
                'Электромонтажные работы'
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
            <h3>Обслуживание</h3>
            <ul>
              {listItems([
                'Регламентное обслуживание по инструкции',
                'Замена расходных материалов',
                'Диагностика и тестовые замеры',
                'Выдача заключения об исправности'
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
            <h3>Модернизация</h3>
            <ul>
              {listItems([
                'Приведение к ГОСТ Р 8.1016-2022',
                'Замена средств измерения',
                'Обновление шкафов управления',
                'Модификация ПО и оборудования'
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
