import Styles from './services.module.scss'
import { useState } from 'react'
import { motion } from 'framer-motion'
import back from '../../../images/back.svg'
import serves_3 from '../../../images/services/serves_3.webp'

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
        'Монтаж и подключение трубной обвязки МЗУ к запорной арматуре скважины.',
      ],
    },
    {
      title: 'Проведение замеров и обработка данных',
      points: [
        'Выполнение замера дебита скважины;',
        'Сброс давления и дренирование жидкости из измерительной ёмкости и трубопроводов МЗУ;',
        'Формирование и ведение базы данных по результатам замеров.',
      ],
    },
    {
      title: 'Документация и контроль',
      points: [
        'Оформление результатов замера в круглосуточном режиме;',
        'Контроль корректности данных и калибровки установки;',
        'Обеспечение безопасности персонала при проведении работ.',
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
              Мобильные измерения
            </div>

            <h1>
              Замер дебита{' '}
              <span>нефтяных скважин</span> с помощью
              мобильной установки
            </h1>

            <p>
              Мобильная замерная установка обеспечивает полный цикл
              измерения дебита нефтяных скважин: доставка, монтаж,
              проведение замеров и оформление результатов.
            </p>

            <div className={Styles.heroMeta}>
              <div className={Styles.metaItem}>
                <span className={Styles.metaDot} />
                <span>Мобильная замерная установка</span>
              </div>

              <div className={Styles.metaItem}>
                <span className={Styles.metaDot} />
                <span>Измерение и обработка данных</span>
              </div>
            </div>
          </div>

          <div
            className={Styles.imageWrapper}
            onClick={() => setBigPhoto(serves_3.src)}
            role="button"
            tabIndex={0}
            aria-label="Открыть изображение мобильной замерной установки"
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                setBigPhoto(serves_3.src)
              }
            }}
          >
            <img
              src={serves_3.src}
              alt="Мобильная замерная установка для измерения дебита нефтяных скважин"
              className={Styles.serviceImage}
            />

            {/* <div className={Styles.imageHint}>
              <span>Увеличить</span>
              <span className={Styles.imageArrow}>↗</span>
            </div> */}
            <div className={Styles.imageHint}>
              <span className={Styles.imageHintIcon}>↗</span>

              <span className={Styles.imageHintText}>
                <span className={Styles.desktopHint}>
                  Увеличить
                </span>

                <span className={Styles.mobileHint}>
                  Нажмите, чтобы увеличить
                </span>
              </span>
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
                ЭТАПЫ РАБОТЫ
              </span>

              <h2>
                Полный цикл
                <br />
                проведения измерений
              </h2>
            </div>

            <p>
              Организуем проведение замеров от доставки и подключения
              мобильной установки до обработки полученных данных
              и оформления результатов.
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