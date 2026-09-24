import { useState } from 'react'
import { motion } from 'framer-motion'

import Styles from './service.module.scss'

import back from '../../../images/back.svg'
import serves_1 from '../../../images/services/serves_12.png'

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
 * Актуальные сервисные услуги.
 *
 * Текущая страница:
 * /services/repair/
 *
 * Поэтому здесь показываем остальные три страницы.
 */
const RELATED_ITEMS = [
  {
    number: '01',
    title: 'Мобильный замер дебита',
    text: 'Проведение замеров дебита скважин с использованием мобильного оборудования на промысловых объектах.',
    href: '/services/metering/',
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

const REPAIR_ITEMS = [
  'Ремонт или замена сепарационной ёмкости',
  'Ремонт или замена фланцев и клапанов',
  'Ремонт или замена переключателя скважин ПСМ',
  'Ремонт или замена счётчика ТОР 1-50',
  'Замена задвижек и трубопроводов',
  'Реставрация днища и корпуса',
  'Замена гидропривода и комплектующих',
  'Электромонтажные работы',
]

const SERVICE_ITEMS = [
  'Регламентное обслуживание по инструкции',
  'Замена расходных материалов',
  'Диагностика и тестовые замеры',
  'Выдача заключения об исправности',
]

const MODERNIZATION_ITEMS = [
  'Приведение к ГОСТ Р 8.1016-2022',
  'Замена средств измерения',
  'Обновление шкафов управления',
  'Модификация программного обеспечения',
  'Модернизация оборудования',
]

export const Repair = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBack = () => {
    window.location.href = '/services/'
  }

  const openPhoto = () => {
    setBigPhoto(serves_1.src)
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
            Сервисное обслуживание
          </div>

          <span className={Styles.heroNumber}>
            01
          </span>
          <h1>
            Обслуживание,
            капитальный ремонт
            и модернизация <em>АГЗУ</em>
          </h1>
          <p className={Styles.heroDescription}>
            Обеспечиваем бесперебойную работу АГЗУ:
            регулярное обслуживание, капитальный ремонт
            и модернизация оборудования в соответствии
            с современными стандартами и ГОСТ.
          </p>

          <div className={Styles.heroFacts}>
            <div>
              <strong>01</strong>
              <span>Диагностика</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Ремонт</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Модернизация</span>
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
            aria-label="Открыть изображение оборудования"
            onKeyDown={handleImageKeyDown}
          >
            <img
              src={serves_1.src}
              alt="Обслуживание и ремонт АГЗУ"
              className={Styles.serviceImage}
            />
            <div className={Styles.imageOverlay} />
            <div className={Styles.imageHint}>
              <span>Увеличить</span>
            </div>
          </div>
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
              Что входит
              в обслуживание
            </h2>
          </div>
          <p>
            Состав работ определяется техническим состоянием
            оборудования и задачами конкретного объекта.
          </p>
        </motion.div>


        <div className={Styles.workList}>
          {/* =================================================
              КАПИТАЛЬНЫЙ РЕМОНТ
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
                Капитальный
                ремонт
              </h3>
            </div>
            <ul>
              {REPAIR_ITEMS.map((item) => (
                <li key={item}>
                  <span />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>


          {/* =================================================
              ТЕХНИЧЕСКОЕ ОБСЛУЖИВАНИЕ
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
                Техническое
                обслуживание
              </h3>
            </div>
            <ul>
              {SERVICE_ITEMS.map((item) => (
                <li key={item}>
                  <span />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>


          {/* =================================================
              МОДЕРНИЗАЦИЯ
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
                Модернизация
                оборудования
              </h3>
            </div>
            <ul>
              {MODERNIZATION_ITEMS.map((item) => (
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
              Оборудование,
              готовое к работе
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
              Исправное оборудование
            </h3>
            <p>
              Восстанавливаем работоспособность
              основных узлов и систем АГЗУ.
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
              Соответствие требованиям
            </h3>
            <p>
              Выполняем работы с учётом действующих
              нормативных требований и стандартов.
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
              Готовность к эксплуатации
            </h3>
            <p>
              Проводим необходимые проверки, диагностику
              и тестовые замеры оборудования.
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
            СЕРВИС И ТЕХНИЧЕСКАЯ ПОДДЕРЖКА
          </span>

          <h2>
            Нужна диагностика
            <br />
            или модернизация АГЗУ?
          </h2>

          <p>
            Опишите задачу — специалисты ИПП «Новые Технологии»
            помогут определить необходимый состав работ.
          </p>

        </div>

        <a href="/contact/" className={Styles.ctaButton}>
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