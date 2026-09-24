import { useState } from 'react'
import { motion } from 'framer-motion'

import Styles from './service.module.scss'

import back from '../../../images/back.svg'
import serves_4 from '../../../images/services/serves_4.webp'

import { BigPhoto } from '../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../ui/back-to-top/BackToTop'

const ease = [0.22, 1, 0.36, 1] as const

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

const RELATED_ITEMS = [
  {
    number: '01',
    title: 'Обслуживание и ремонт АГЗУ',
    text: 'Техническое обслуживание, капитальный ремонт и модернизация оборудования.',
    href: '/services/repair/',
  },
  {
    number: '02',
    title: 'Мобильный замер дебита',
    text: 'Замер дебита нефтяных скважин с использованием мобильного замерного оборудования.',
    href: '/services/metering/',
  },
  {
    number: '03',
    title: 'Депарафинизация скважин',
    text: 'Удаление асфальтосмолопарафиновых отложений и восстановление рабочего состояния скважин.',
    href: '/services/dewaxing/',
  },
]

const MECHANICAL_ITEMS = [
  'Внешний осмотр на предмет изгиба стойки подвижного ролика и состояния сварных швов',
  'Проверка крепежных соединений',
  'Проверка и доливка масла в редуктор при необходимости',
  'Визуальный осмотр состояния проволоки и замена при износе',
]

const ELECTRONICS_ITEMS = [
  'Проверка срабатывания датчиков минимального веса',
  'Калибровка устройства',
  'Ревизия редуктора и электродвигателя',
  'Проверка и обслуживание шкафа управления',
]

const SAFETY_ITEMS = [
  'Осмотр и проверка заземления устройства',
  'Обновление знаков заземления',
  'Проверка работоспособности обогрева шкафа',
  'Проверка на сбои программного обеспечения',
]

const listItems = (items: string[]) =>
  items.map((item, index) => (
    <motion.li
      key={`${item}-${index}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease,
      }}
    >
      <span />
      {item}
    </motion.li>
  ))

export const Service = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBack = () => {
    window.location.href = '/services/'
  }

  const openPhoto = () => {
    setBigPhoto(serves_4.src)
  }

  const closePhoto = () => {
    setBigPhoto(null)
  }

  return (
    <>
      <main className={Styles.wrapper}>
        {/* =========================================================
            TOP BAR
        ========================================================= */}

        <div className={Styles.topBar}>
          <button
            type="button"
            className={Styles.backButton}
            onClick={onBack}
            aria-label="Вернуться ко всем сервисным услугам"
          >
            <img src={back.src} alt="" />
          </button>
        </div>

        {/* =========================================================
            HERO
        ========================================================= */}

        <motion.section
          className={Styles.hero}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {},
          }}
        >
          <motion.div
            className={Styles.heroContent}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.7,
              ease,
            }}
          >
            <div className={Styles.eyebrow}>
              <span />
              Техническое обслуживание
            </div>

            <div className={Styles.heroNumber}>03</div>

            <h1>
              Обслуживание устройства очистки{' '}
              <em>колонны УОК-НКТ</em>
            </h1>

            <p className={Styles.heroDescription}>
              Полное техническое обслуживание смонтированного устройства
              очистки колонны УОК-НКТ с проверкой всех узлов и компонентов.
            </p>

            <div className={Styles.heroFacts}>
              <div>
                <span>01</span>
                <strong>Механические узлы</strong>
              </div>

              <div>
                <span>02</span>
                <strong>Электронные системы</strong>
              </div>

              <div>
                <span>03</span>
                <strong>Безопасность</strong>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={Styles.heroVisual}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease,
            }}
          >
            <div
              className={Styles.imageWrapper}
              onClick={openPhoto}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  openPhoto()
                }
              }}
              aria-label="Увеличить изображение"
            >
              <img
                src={serves_4.src}
                alt="Устройство очистки колонны УОК-НКТ"
                className={Styles.serviceImage}
              />

              <div className={Styles.imageOverlay}>
                <div className={Styles.imageHint}>
                  <span>Увеличить</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* =========================================================
            WORKS
        ========================================================= */}

        <section className={Styles.worksSection}>
          <motion.div
            className={Styles.sectionHeading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{
              duration: 0.65,
              ease,
            }}
          >
            <div>
              <span className={Styles.sectionLabel}>
                ЭТАПЫ ОБСЛУЖИВАНИЯ
              </span>

              <h2>
                Комплексная проверка
                всех систем
              </h2>
            </div>

            <p>
              Техническое обслуживание включает последовательную проверку
              механической части, электронных компонентов и систем
              безопасности устройства.
            </p>
          </motion.div>

          <div className={Styles.workList}>
            {/* 01 */}

            <motion.article
              className={Styles.workRow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              transition={{
                duration: 0.6,
                ease,
              }}
            >
              <div className={Styles.workTitle}>
                <span className={Styles.workNumber}>01</span>

                <h3>Механические узлы</h3>
              </div>

              <ul>{listItems(MECHANICAL_ITEMS)}</ul>
            </motion.article>

            {/* 02 */}

            <motion.article
              className={Styles.workRow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              transition={{
                duration: 0.6,
                delay: 0.08,
                ease,
              }}
            >
              <div className={Styles.workTitle}>
                <span className={Styles.workNumber}>02</span>

                <h3>Электронные системы</h3>
              </div>

              <ul>{listItems(ELECTRONICS_ITEMS)}</ul>
            </motion.article>

            {/* 03 */}

            <motion.article
              className={Styles.workRow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              transition={{
                duration: 0.6,
                delay: 0.16,
                ease,
              }}
            >
              <div className={Styles.workTitle}>
                <span className={Styles.workNumber}>03</span>

                <h3>Безопасность</h3>
              </div>

              <ul>{listItems(SAFETY_ITEMS)}</ul>
            </motion.article>
          </div>
        </section>

        {/* =========================================================
            RESULT
        ========================================================= */}

        <section className={Styles.resultSection}>
          <motion.div
            className={Styles.resultHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{
              duration: 0.65,
              ease,
            }}
          >
            <div>
              <span className={Styles.sectionLabel}>РЕЗУЛЬТАТ</span>
              <h2>
                Оборудование готово
                к дальнейшей эксплуатации
              </h2>
            </div>
            
          </motion.div>

          <div className={Styles.resultGrid}>
            <motion.div
              className={Styles.resultItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{
                duration: 0.55,
                ease,
              }}
            >
              <span>01</span>

              <h3>Надёжность</h3>

              <p>
                Проверка основных узлов позволяет своевременно выявить
                неисправности и предотвратить внеплановые остановки.
              </p>
            </motion.div>

            <motion.div
              className={Styles.resultItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{
                duration: 0.55,
                delay: 0.08,
                ease,
              }}
            >
              <span>02</span>

              <h3>Точность</h3>

              <p>
                Калибровка и проверка измерительных компонентов обеспечивают
                корректную работу устройства.
              </p>
            </motion.div>

            <motion.div
              className={Styles.resultItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{
                duration: 0.55,
                delay: 0.16,
                ease,
              }}
            >
              <span>03</span>

              <h3>Безопасность</h3>

              <p>
                Проверка заземления, шкафа управления и вспомогательных систем
                снижает эксплуатационные риски.
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            RELATED SERVICES
        ========================================================= */}

        <section className={Styles.relatedSection}>
          <motion.div
            className={Styles.sectionHeading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{
              duration: 0.65,
              ease,
            }}
          >
            <div>
              <span className={Styles.sectionLabel}>
                СМОТРИТЕ ТАКЖЕ
              </span>

              <h2>
                Другие сервисные
                услуги
              </h2>
            </div>

            <p>
              Другие виды сервисного обслуживания
              и технической поддержки оборудования.
            </p>
          </motion.div>

          <div className={Styles.relatedList}>
            {RELATED_ITEMS.map((item, index) => (
              <motion.a
                key={item.number}
                href={item.href}
                className={Styles.relatedItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                  ease,
                }}
              >
                <span className={Styles.relatedNumber}>
                  {item.number}
                </span>

                <div className={Styles.relatedContent}>
                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* =========================================================
            CTA
        ========================================================= */}

        <motion.section
          className={Styles.cta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{
            duration: 0.7,
            ease,
          }}
        >
          <div>
            <div className={Styles.ctaLabel}>
              СЕРВИСНОЕ ОБСЛУЖИВАНИЕ
            </div>

            <h2>
              Поддерживаем оборудование
              <br />
              в рабочем состоянии
            </h2>

            <p>
              Выполняем техническое обслуживание и ремонт оборудования
              для промысловых объектов нефтегазовой отрасли.
            </p>
          </div>         

          <a
            href="/contact/"
            className={Styles.ctaButton}
          >
            Обсудить обслуживание
            <span>↗</span>
          </a>
        </motion.section>

        <BackToTop />

        {/* =========================================================
            BIG PHOTO
        ========================================================= */}

        {bigPhoto && (
          <BigPhoto
            src={bigPhoto}
            onClose={closePhoto}
          />
        )}
      </main>
    </>
  )
}