import Styles from './services.module.scss'
import { useState } from 'react'
import { motion } from 'framer-motion'
import back from '../../../images/back.svg'
import serves_3 from '../../../images/services/serves_3.webp'

import { BigPhoto } from '../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../ui/back-to-top/BackToTop'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const listItems = (items: string[]) =>
  items.map((item) => (
    <motion.li key={item} variants={fadeUp} transition={{ duration: 0.4 }}>
      {item}
    </motion.li>
  ))

interface MeteringBlock {
  title: string
  points: string[]
}

export const Metering = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBack = () => {
    window.location.href = '/services'
  }

  const blocks: MeteringBlock[] = [
    {
      title: 'Подготовка и доставка установки',
      points: [
        'Доставка измерительной установки к месту проведения замера;',
        'Проверка комплектности оборудования;',
        'Монтаж и подключение трубной обвязки МЗУ к запорной арматуре скважины.'
      ]
    },
    {
      title: 'Проведение замеров и обработка данных',
      points: [
        'Сброс давления и дренирование жидкости из измерительной ёмкости и трубопроводов МЗУ;',
        'Выполнение замера дебита скважины;',
        'Формирование и ведение базы данных по результатам замеров.'
      ]
    },
    {
      title: 'Документация и контроль',
      points: [
        'Оформление результатов замера в круглосуточном режиме;',
        'Контроль корректности данных и калибровки установки;',
        'Обеспечение безопасности персонала при проведении работ.'
      ]
    }
  ]

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
              Замер дебита <span>нефтяных скважин </span>
              с помощью мобильной установки
            </h1>
            <p>
              Мобильная замерная установка обеспечивает полный цикл измерения дебита нефтяных скважин: доставка, монтаж, проведение замеров и оформление результатов.
            </p>
          </div>
          
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

          
        </motion.div>

        {/* CARDS */}
        <div className={Styles.grid}>
          {blocks.map((block) => (
            <motion.div
              key={block.title}
              className={Styles.card}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h3>{block.title}</h3>
              <ul>{listItems(block.points)}</ul>
            </motion.div>
          ))}
        </div>

        <BackToTop />

        {bigPhoto && <BigPhoto src={bigPhoto} onClose={() => setBigPhoto(null)} />}
      </div>
    </>
  )
}