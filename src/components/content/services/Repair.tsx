import Styles from './services.module.scss'
import { useState } from 'react'

import serves_1 from '../../../images/services/serves_12.png'

import { BigPhoto } from '../../ui/big-photo/BigPhoto'
import { BackToTop } from '../../ui/back-to-top/BackToTop'
import { LayoutBack } from '../../layout/LayoutBack'

export const Repair = () => {
  const [bigPhoto, setBigPhoto] = useState<string | null>(null)

  const onBack = () => {
    window.location.href = '/services'
  }

  return (
    <LayoutBack
      onBack={onBack}
      title="Обслуживание, капитальный ремонт и модернизация АГЗУ"
    >
      <>
        <div className={Styles.card}>
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

          <div className={Styles.content}>
            <h3>Капитальный ремонт АГЗУ «Спутник»</h3>
            <ul>
              {[
                'Ремонт или замена сепарационной ёмкости, фланцев, предохранительного клапана;',
                'Ремонт или замена переключателя скважин ПСМ;',
                'Ремонт или замена счётчика ТОР 1-50;',
                'Ремонт или замена задвижек;',
                'Ремонт технологического помещения и реставрация днища;',
                'Замена технологической линии (трубопровода), регулятора расхода;',
                'Замена гидравлического привода ГП-1М, заслонки, клапана обратного;',
                'Электромонтажные работы.'
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>Обслуживание АГЗУ</h3>
            <ul>
              {[
                'Техническое обслуживание АГЗУ в соответствии с инструкцией по эксплуатации, замена уплотнительных элементов и иных расходных материалов при необходимости;',
                'Проведение тестовых замеров дебитов скважин с выдачей заключения об исправности измерительной установки.'
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>Модернизация АГЗУ</h3>
            <ul>
              {[
                'Модернизация для приведения в соответствие с ГОСТ Р 8.1016-2022 выполняется посредством замены средств измерения, шкафов управления, внесения изменений в существующее оборудование и программное обеспечение.'
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <BackToTop />

        {bigPhoto && (
          <BigPhoto
            src={bigPhoto}
            onClose={() => setBigPhoto(null)}
          />
        )}
      </>
    </LayoutBack>
  )
}