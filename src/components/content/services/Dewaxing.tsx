import Styles from './services.module.scss'
import { useState } from 'react'
import { motion } from 'framer-motion'
import back from '../../../images/back.svg'
import serves_5 from '../../../images/services/serves_5.webp'

import { BigPhoto } from '../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../ui/back-to-top/BackToTop'

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const listItems = (items: string[]) =>
  items.map((item, index) => (
    <motion.li
      key={item}
      variants={fadeUp}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className={Styles.listMarker} />
      <span>{item}</span>
    </motion.li>
  ))

interface DewaxingBlock {
  title: string
  points: string[]
}

export const Dewaxing = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBack = () => {
    window.location.href = '/services'
  }

  const blocks: DewaxingBlock[] = [
    {
      title: 'Скребкование и удаление АСПО',
      points: [
        'Использование фрезерных и лезвийных скребков различного диаметра.',
        'Применение неметаллических скребков для НКТ с покрытием.',
        'Скребки-пробойники и парафинорезки при закупоривании.',
        'Глубина спуска скребка: 2000–3000 м.',
      ],
    },
    {
      title: 'Оборудование и техника',
      points: [
        'Высокопроходимая специализированная техника для работы на скважинах.',
        'Установка электроцентробежного насоса (УЭЦН) для фонтанных скважин.',
        'Лома-утяжелители с покрытием для предотвращения повреждений НКТ.',
      ],
    },
    {
      title: 'Персонал и безопасность',
      points: [
        'Обученный персонал с опытом работы на нефтяных скважинах.',
        'Использование сертифицированного оборудования собственного производства.',
        'Соблюдение всех правил безопасности в нефтяной и газовой промышленности.',
      ],
    },
  ]

  return (
    <>
      <main className={Styles.wrapper}>
        <button
          className={Styles.backButton}
          onClick={onBack}
          aria-label="Вернуться к услугам"
        >
          <img src={back.src} alt="" />
          {/* <span>Назад к услугам</span> */}
        </button>

        {/* HERO */}
        <motion.section
          className={Styles.hero}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={Styles.heroText}>
            <div className={Styles.eyebrow}>
              Сервис нефтяных скважин
            </div>

            <h1>
              Услуги <span>депарафинизации</span> нефтяных
              скважин
            </h1>

            <p>
              Полное удаление асфальтосмолопарафиновых отложений
              и обеспечение прохода в скважинах с НКТ с помощью
              специализированной техники и обученного персонала.
            </p>

            <div className={Styles.heroMeta}>
              <div className={Styles.metaItem}>
                <span className={Styles.metaDot} />
                <span>Удаление АСПО</span>
              </div>

              <div className={Styles.metaItem}>
                <span className={Styles.metaDot} />
                <span>Работа с НКТ</span>
              </div>
            </div>
          </div>

          <div
            className={Styles.imageWrapper}
            onClick={() => setBigPhoto(serves_5.src)}
            role="button"
            tabIndex={0}
            aria-label="Открыть изображение оборудования для депарафинизации"
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                setBigPhoto(serves_5.src)
              }
            }}
          >
            <img
              src={serves_5.src}
              alt="Оборудование для депарафинизации нефтяных скважин"
              className={Styles.serviceImage}
            />

            <div className={Styles.imageHint}>
              <span>Увеличить</span>
              <span className={Styles.imageArrow}>↗</span>
            </div>
          </div>
        </motion.section>

        {/* SERVICES */}
        <section className={Styles.servicesSection}>
          <motion.div
            className={Styles.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={fadeUp}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div>
              <span className={Styles.sectionLabel}>
                НАПРАВЛЕНИЯ РАБОТ
              </span>

              <h2>
                Комплексный подход
                <br />
                к депарафинизации
              </h2>
            </div>

            <p>
              Используем специализированное оборудование,
              высокопроходимую технику и подготовленный персонал
              для эффективного удаления АСПО и безопасного
              проведения работ на нефтяных скважинах.
            </p>
          </motion.div>

          <div className={Styles.grid}>
            {blocks.map((block, index) => (
              <motion.article
                key={block.title}
                className={Styles.card}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                variants={fadeUp}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={Styles.cardTop}>
                  <span className={Styles.cardNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className={Styles.cardLine} />
                </div>

                <div className={Styles.cardContent}>
                  <h3>{block.title}</h3>

                  <ul>
                    {listItems(block.points)}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <BackToTop />

        {bigPhoto && (
          <BigPhoto
            src={bigPhoto}
            onClose={() => setBigPhoto(null)}
          />
        )}
      </main>
    </>
  )
}