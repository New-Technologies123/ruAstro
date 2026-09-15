import Styles from './services.module.scss'
import { useState } from 'react'
import { motion } from 'framer-motion'
import back from '../../../images/back.svg'
import serves_4 from '../../../images/services/serves_4.webp'

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

interface ServiceBlock {
  title: string
  points: string[]
}

export const Service = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBack = () => {
    window.location.href = '/services'
  }

  const blocks: ServiceBlock[] = [
    {
      title: 'Проверка и обслуживание механических узлов',
      points: [
        'Внешний осмотр на предмет изгиба стойки подвижного ролика, состояния сварных швов;',
        'Проверка крепежных соединений;',
        'Проверка и доливка масла в редуктор, при необходимости;',
        'Визуальный осмотр состояния проволоки и замена при износе.',
      ],
    },
    {
      title: 'Проверка и обслуживание электроники',
      points: [
        'Проверка срабатывания датчиков минимального веса;',
        'Калибровка устройства;',
        'Ревизия редуктора и электродвигателя;',
        'Проверка и обслуживание шкафа управления.',
      ],
    },
    {
      title: 'Безопасность и документация',
      points: [
        'Осмотр и проверка заземления устройства;',
        'Обновление знаков заземления;',
        'Проверка работоспособности обогрева шкафа;',
        'Проверка на сбои программного обеспечения.',
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
              Техническое обслуживание
            </div>

            <h1>
              Обслуживание устройства очистки{' '}
              <span>колонны УОК-НКТ</span>
            </h1>

            <p>
              Полное техническое обслуживание смонтированного
              устройства очистки колонны УОК-НКТ с проверкой
              всех узлов и компонентов.
            </p>

            <div className={Styles.heroMeta}>
              <div className={Styles.metaItem}>
                <span className={Styles.metaDot} />
                <span>Механические узлы</span>
              </div>

              <div className={Styles.metaItem}>
                <span className={Styles.metaDot} />
                <span>Электронные системы</span>
              </div>

              <div className={Styles.metaItem}>
                <span className={Styles.metaDot} />
                <span>Безопасность</span>
              </div>
            </div>
          </div>

          <div
            className={Styles.imageWrapper}
            onClick={() => setBigPhoto(serves_4.src)}
            role="button"
            tabIndex={0}
            aria-label="Открыть изображение устройства очистки колонны УОК-НКТ"
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                setBigPhoto(serves_4.src)
              }
            }}
          >
            <img
              src={serves_4.src}
              alt="Устройство очистки колонны УОК-НКТ"
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
                ЭТАПЫ ОБСЛУЖИВАНИЯ
              </span>

              <h2>
                Комплексная проверка
                <br />
                всех узлов устройства
              </h2>
            </div>

            <p>
              Проводим комплексное техническое обслуживание
              УОК-НКТ с проверкой механических компонентов,
              электроники, системы управления и элементов
              безопасности.
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