import Styles from './services.module.scss'
import { useState } from 'react'
import { motion } from 'framer-motion'
import back from '../../../images/back.svg'
import serves_1 from '../../../images/services/serves_12.png'

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

const fadeUpFast = {
  hidden: {
    opacity: 0,
    y: 20,
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
      variants={fadeUpFast}
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

export const Repair = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBack = () => {
    window.location.href = '/services'
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
            Сервисное обслуживание
          </div>

          <h1>
            Обслуживание, капитальный ремонт и модернизация
            <span> АГЗУ</span>
          </h1>

          <p>
            Обеспечиваем бесперебойную работу АГЗУ: регулярное
            обслуживание, капитальный ремонт и модернизация оборудования
            в соответствии с современными стандартами и ГОСТ.
          </p>

          <div className={Styles.heroMeta}>
            <div className={Styles.metaItem}>
              <span className={Styles.metaDot} />
              <span>Диагностика и ремонт</span>
            </div>

            <div className={Styles.metaItem}>
              <span className={Styles.metaDot} />
              <span>Модернизация оборудования</span>
            </div>
          </div>
        </div>

        {/* IMAGE */}
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
              НАПРАВЛЕНИЯ РАБОТ
            </span>

            <h2>
              Полный комплекс
              <br />
              сервисных работ
            </h2>
          </div>

          <p>
            Выполняем техническое обслуживание, капитальный ремонт
            и модернизацию АГЗУ с учётом требований эксплуатации
            оборудования.
          </p>
        </motion.div>

        <div className={Styles.grid}>
          {/* CARD 01 */}
          <motion.article
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
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className={Styles.cardTop}>
              <span className={Styles.cardNumber}>01</span>
              <span className={Styles.cardLine} />
            </div>

            <div className={Styles.cardContent}>
              <h3>Капитальный ремонт</h3>

              <ul>
                {listItems([
                  'Ремонт или замена сепарационной ёмкости, фланцев, клапанов',
                  'Ремонт или замена переключателя скважин ПСМ',
                  'Ремонт или замена счётчика ТОР 1-50',
                  'Замена задвижек и трубопроводов',
                  'Реставрация днища и корпуса',
                  'Замена гидропривода и комплектующих',
                  'Электромонтажные работы',
                ])}
              </ul>
            </div>
          </motion.article>

          {/* CARD 02 */}
          <motion.article
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
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className={Styles.cardTop}>
              <span className={Styles.cardNumber}>02</span>
              <span className={Styles.cardLine} />
            </div>

            <div className={Styles.cardContent}>
              <h3>Обслуживание</h3>

              <ul>
                {listItems([
                  'Регламентное обслуживание по инструкции',
                  'Замена расходных материалов',
                  'Диагностика и тестовые замеры',
                  'Выдача заключения об исправности',
                ])}
              </ul>
            </div>
          </motion.article>

          {/* CARD 03 */}
          <motion.article
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
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className={Styles.cardTop}>
              <span className={Styles.cardNumber}>03</span>
              <span className={Styles.cardLine} />
            </div>

            <div className={Styles.cardContent}>
              <h3>Модернизация</h3>

              <ul>
                {listItems([
                  'Приведение к ГОСТ Р 8.1016-2022',
                  'Замена средств измерения',
                  'Обновление шкафов управления',
                  'Модификация ПО и оборудования',
                ])}
              </ul>
            </div>
          </motion.article>
        </div>
      </section>

      <BackToTop />

      {/* BIG PHOTO */}
      {bigPhoto && (
        <BigPhoto
          src={bigPhoto}
          onClose={() => setBigPhoto(null)}
        />
      )}
    </main>
  )
}