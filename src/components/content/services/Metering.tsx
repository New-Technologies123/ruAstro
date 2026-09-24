import { useState } from 'react'
import { motion } from 'framer-motion'

import Styles from './service.module.scss'

import back from '../../../images/back.svg'
import serves_3 from '../../../images/services/serves_3.webp'

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

/*
 * Остальные сервисные услуги.
 *
 * Текущая страница:
 * /services/metering/
 */
const RELATED_ITEMS = [
  {
    number: '01',
    title: 'Обслуживание, капитальный ремонт и модернизация АГЗУ',
    text: 'Техническое обслуживание, ремонт и модернизация оборудования для восстановления и поддержания его работоспособности.',
    href: '/services/repair/',
  },
  {
    number: '02',
    title: 'Обслуживание УОК-НКТ',
    text: 'Комплексное техническое обслуживание устройства очистки колонны УОК-НКТ с проверкой основных узлов и систем.',
    href: '/services/service/',
  },
  {
    number: '03',
    title: 'Депарафинизация скважин',
    text: 'Проведение работ по удалению парафиновых отложений и восстановлению нормальной работы скважин.',
    href: '/services/dewaxing/',
  },
]

const PREPARATION_ITEMS = [
  'Доставка мобильной замерной установки к месту проведения работ',
  'Проверка комплектности и готовности оборудования',
  'Подготовка установки к проведению измерений',
  'Монтаж и подключение трубной обвязки МЗУ',
]

const MEASUREMENT_ITEMS = [
  'Проведение замера дебита нефтяной скважины',
  'Контроль параметров в процессе проведения измерений',
  'Сброс давления и дренирование жидкости',
  'Получение и фиксация результатов измерений',
]

const DATA_ITEMS = [
  'Обработка полученных результатов',
  'Формирование и ведение базы данных замеров',
  'Контроль корректности данных',
  'Оформление результатов проведённых работ',
]

export const Metering = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBack = () => {
    window.location.href = '/services/'
  }

  const openPhoto = () => {
    setBigPhoto(serves_3.src)
  }

  const handleImageKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openPhoto()
    }
  }

  return (
    <main className={Styles.wrapper}>

      {/* =====================================================
          TOP
          ===================================================== */}

      <div className={Styles.topBar}>
        <button
          className={Styles.backButton}
          onClick={onBack}
          aria-label="Вернуться к сервисным услугам"
        >
          <img src={back.src} alt="" />
          {/* <span>Все сервисные услуги</span> */}
        </button>
      </div>


      {/* =====================================================
          HERO
          ===================================================== */}

      <section className={Styles.hero}>

        <motion.div
          className={Styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{
            duration: 0.7,
            ease,
          }}
        >

          <div className={Styles.eyebrow}>
            <span />
            Мобильные измерения
          </div>

          <span className={Styles.heroNumber}>
            02
          </span>

          <h1>
            Замер дебита нефтяных скважин с помощью <em>МЗУ</em>
          </h1>

          <p className={Styles.heroDescription}>
            Выполняем полный цикл работ по измерению дебита
            нефтяных скважин с использованием мобильной
            замерной установки: от доставки и подключения
            оборудования до обработки данных и оформления
            результатов.
          </p>

          <div className={Styles.heroFacts}>

            <div>
              <strong>01</strong>
              <span>Доставка и монтаж</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Проведение замеров</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Обработка данных</span>
            </div>

          </div>

        </motion.div>


        <motion.div
          className={Styles.heroVisual}
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease,
          }}
        >

          <div
            className={Styles.imageWrapper}
            onClick={openPhoto}
            role="button"
            tabIndex={0}
            aria-label="Открыть изображение мобильной замерной установки"
            onKeyDown={handleImageKeyDown}
          >

            <img
              src={serves_3.src}
              alt="Мобильная замерная установка для измерения дебита нефтяных скважин"
              className={Styles.serviceImage}
            />

            <div className={Styles.imageOverlay} />

            <div className={Styles.imageHint}>
              <span>Увеличить</span>
            </div>

          </div>

          {/* <div className={Styles.imageCaption}>
            <span>МЗУ</span>
            <span>ИПП «Новые Технологии» · Уфа</span>
          </div> */}

        </motion.div>

      </section>


      {/* =====================================================
          WORKS
          ===================================================== */}

      <section className={Styles.worksSection}>

        <motion.div
          className={Styles.sectionHeading}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={fadeUp}
          transition={{
            duration: 0.65,
            ease,
          }}
        >

          <div>

            <span className={Styles.sectionLabel}>
              СОСТАВ РАБОТ
            </span>

            <h2>
              Полный цикл
              проведения измерений
            </h2>

          </div>

          <p>
            Организуем проведение замеров от доставки
            и подключения мобильной установки до обработки
            полученных данных и оформления результатов.
          </p>

        </motion.div>


        <div className={Styles.workList}>

          {/* =================================================
              ПОДГОТОВКА
              ================================================= */}

          <motion.div
            className={Styles.workRow}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={fadeUp}
            transition={{
              duration: 0.6,
              ease,
            }}
          >

            <div className={Styles.workTitle}>

              <span>01</span>

              <h3>
                Подготовка и доставка
              </h3>

            </div>

            <ul>

              {PREPARATION_ITEMS.map((item) => (
                <li key={item}>
                  <span />
                  {item}
                </li>
              ))}

            </ul>

          </motion.div>


          {/* =================================================
              ИЗМЕРЕНИЯ
              ================================================= */}

          <motion.div
            className={Styles.workRow}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={fadeUp}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease,
            }}
          >

            <div className={Styles.workTitle}>

              <span>02</span>

              <h3>
                Проведение замеров
              </h3>

            </div>

            <ul>

              {MEASUREMENT_ITEMS.map((item) => (
                <li key={item}>
                  <span />
                  {item}
                </li>
              ))}

            </ul>

          </motion.div>


          {/* =================================================
              ДАННЫЕ
              ================================================= */}

          <motion.div
            className={Styles.workRow}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            variants={fadeUp}
            transition={{
              duration: 0.6,
              delay: 0.16,
              ease,
            }}
          >

            <div className={Styles.workTitle}>

              <span>03</span>

              <h3>
                Обработка результатов
              </h3>

            </div>

            <ul>

              {DATA_ITEMS.map((item) => (
                <li key={item}>
                  <span />
                  {item}
                </li>
              ))}

            </ul>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          RESULT
          ===================================================== */}

      <section className={Styles.resultSection}>

        <motion.div
          className={Styles.resultHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={fadeUp}
          transition={{
            duration: 0.65,
            ease,
          }}
        >

          <div>
            <span className={Styles.sectionLabel}>
              РЕЗУЛЬТАТ
            </span>
            <h2>
              Данные,
              готовые к работе
            </h2>
          </div>

        </motion.div>


        <div className={Styles.resultGrid}>

          <motion.div
            className={Styles.resultItem}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={fadeUp}
            transition={{
              duration: 0.55,
              ease,
            }}
          >

            <span>01</span>

            <h3>
              Проведённые измерения
            </h3>

            <p>
              Получаем фактические данные о дебите
              нефтяной скважины в процессе проведения
              замера мобильной установкой.
            </p>

          </motion.div>


          <motion.div
            className={Styles.resultItem}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={fadeUp}
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease,
            }}
          >

            <span>02</span>

            <h3>
              Обработанные данные
            </h3>

            <p>
              Контролируем корректность полученной
              информации и формируем результаты
              проведённых измерений.
            </p>

          </motion.div>


          <motion.div
            className={Styles.resultItem}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={fadeUp}
            transition={{
              duration: 0.55,
              delay: 0.16,
              ease,
            }}
          >

            <span>03</span>

            <h3>
              Оформленные результаты
            </h3>

            <p>
              Формируем и ведём базу данных по результатам
              замеров и оформляем необходимую документацию.
            </p>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          RELATED SERVICES
          ===================================================== */}

      <section className={Styles.relatedSection}>

        <motion.div
          className={Styles.sectionHeading}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
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
              viewport={{
                once: true,
                amount: 0.15,
              }}
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

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

              </div>

            </motion.a>

          ))}

        </div>

      </section>


      {/* =====================================================
          CTA
          ===================================================== */}

      <motion.section
        className={Styles.cta}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        variants={fadeUp}
        transition={{
          duration: 0.7,
          ease,
        }}
      >

        <div>

          <span className={Styles.ctaLabel}>
            МОБИЛЬНЫЕ ИЗМЕРЕНИЯ
          </span>

          <h2>
            Нужен замер дебита
            <br />
            нефтяной скважины?
          </h2>

          <p>
            Опишите задачу — специалисты ИПП «Новые Технологии»
            помогут организовать проведение измерений
            и определить необходимый состав работ.
          </p>

        </div>

        <a
          href="/contact/"
          className={Styles.ctaButton}
        >
          Обсудить задачу
        </a>

      </motion.section>


      <BackToTop />


      {bigPhoto && (
        <BigPhoto
          src={bigPhoto}
          onClose={() => setBigPhoto(null)}
        />
      )}

    </main>
  )
}