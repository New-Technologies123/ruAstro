import Styles from './products.module.scss'
import { useState, useRef } from 'react'

import product_2 from '../../../images/products/product_2.webp'
import product_2_1 from '../../../images/products/product_2_1.webp'
import product_2_2 from '../../../images/products/product_2_2.webp'
import product_2_3 from '../../../images/products/product_2_3.webp'
import product_2_4 from '../../../images/products/product_2_4.webp'
import product_2_5 from '../../../images/products/product_2_5.webp'

import { BigPhoto } from '../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../ui/back-to-top/BackToTop'
import { useClickToScroll } from '../../../hooks/useClickToScroll'

const products = [
  {
    id: 'products-1',
    title: 'Вихревой расходомер ЭРВИП',
    image: product_2,
    icon: "🌊",
    blocks: [
      {
        subtitle: 'Основное назначение',
        text:
          'Высокая стабильность показаний, точность измерений, простота в эксплуатации, нечувствительность к загрязнениям.',
      },
      {
        subtitle: 'Принцип работы',
        text:
          'Метод измерения основан на формировании вихрей Кармана за телом обтекания. Частота вихрей пропорциональна скорости потока.',
      },
    ],
  },
  {
    id: 'products-2',
    title: 'Устройство регулирования перепада давления (УРПД)',
    image: product_2_1,
    icon: "📉",
    blocks: [
      {
        subtitle: 'Назначение',
        text:
          'Работа в системе регулирования уровня и перепада давления в АГЗУ типа «Спутник».',
      },
    ],
  },
  {
    id: 'products-3',
    title: 'Переключатель скважин многоходовой (ПСМ)',
    image: product_2_2,
    icon: "🔄",
    blocks: [
      {
        subtitle: 'Назначение',
        text:
          'Ручная и автоматическая установка скважин на замер. Повышенная коррозионная стойкость.',
      },
    ],
  },
  {
    id: 'products-4',
    title: 'Магниторегулируемый клапан (КМР)',
    image: product_2_3,
    icon: "🧲",
    blocks: [
      {
        subtitle: 'Назначение',
        text:
          'Работа в системе регулирования уровня и перепада давления вместо регуляторов расхода.',
      },
    ],
  },
  {
    id: 'products-5',
    title: 'Гидропривод (ГП)',
    image: product_2_4,
    icon: "💦",
    blocks: [
      {
        subtitle: 'Назначение',
        text:
          'Создание гидравлического давления для переключения скважин.',
      },
    ],
  },
  {
    id: 'products-6',
    title: 'Сепарационная ёмкость',
    image: product_2_5,
    icon: "⚗️",
    blocks: [
      {
        subtitle: 'Назначение',
        text:
          'Разделение нефтегазовых смесей на жидкость и газ.',
      },
    ],
  },
]

export const Accessories = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const handleClick = useClickToScroll()

  return (
    <div className={Styles.container}>
      <div className={Styles.mainContent}>
        {/* ===== SIDEBAR ===== */}
        <aside className={Styles.sidebar}>
          <div className={Styles.navMenu}>
            {products.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={Styles.navItem}
              >
                <span className={Styles.navIcon}>{item.icon}</span>
                <p>{item.title}</p>
              </button>
            ))}
          </div>
        </aside>

        {/* ===== CONTENT ===== */}
        <div className={Styles.content}>
          {products.map((item, index) => (
            <section
              key={item.id}
              id={item.id}
              ref={(el) => (sectionsRef.current[index] = el)}
              className={Styles.section}
            >
              <h2 className={Styles.sectionHeader}>{item.title}</h2>

              <div
                className={`${Styles.card} ${index % 2 !== 0 ? Styles.reverse : ''
                  }`}
              >
                {/* Фото */}
                <div className={Styles.cardImage}>
                  <div
                    className={Styles.imageCard}
                    onClick={() => setBigPhoto(item.image.src)}
                  >
                    <img
                      src={item.image.src}
                      alt={item.title}
                      className={Styles.mainImage}
                    />
                    <div className={Styles.imageOverlay}>
                      <span className={Styles.zoomText}>
                        Нажмите для увеличения
                      </span>
                    </div>
                  </div>
                </div>

                {/* Текст (НЕСКОЛЬКО БЛОКОВ) */}
                <div className={Styles.cardContent}>
                  {item.blocks.map((block, i) => (
                    <div key={i} className={Styles.features}>
                      <h3>{block.subtitle}</h3>
                      <ul className={Styles.featuresList}>
                        <li className={Styles.feature}>
                          <div className={Styles.featureText}>
                            <p>{block.text}</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <BackToTop />

      {bigPhoto && (
        <BigPhoto src={bigPhoto} onClose={() => setBigPhoto(null)} />
      )}
    </div>
  )
}





