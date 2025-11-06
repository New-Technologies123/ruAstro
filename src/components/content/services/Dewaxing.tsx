import Styles from './services.module.scss';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { useState } from 'react';
import serves_5 from '../../../images/services/serves_5.webp';
import { BackToTop } from '../../ui/back-to-top/BackToTop';


export const Dewaxing = () => {
  const [photoIsOpen, setPhotoIsOpen] = useState(false);

  return (
    <>
      <div className={Styles.card}>
        <div className={Styles.imageWrapper} onClick={() => setPhotoIsOpen(true)}>
          <img src={serves_5.src} alt="сервис" className={Styles.serviceImage}/>
          <div className={Styles.imageOverlay}>
            <p>Увеличить</p>
          </div>
        </div>

        <div className={Styles.content}>
          <ul>
            {['Услуги оказываются экипажами на базе высокопроходимой спецтехники.', 
                'Основной задачей оказываемых услуг является полное удаление асфальтосмолопарафиновых отложений (АСПО) и других отложений механическим способом (скребкованием) в лифте НКТ скважин, определение и обеспечение прохода в скважинах с НКТ.', 
                'Скребкование проводится с помощью фрезерных и лезвийных скребков различного диаметра АСПО в фонтанных нефтяных скважинах и скважинах, оборудованных установкой электроцентробежного насоса (УЭЦН).', 
                'Глубина спуска скребка в скважину 2000 - 3000 м.', 
                'Для выявления отложений и их удаления на НКТ с внутренним покрытием мы используем неметаллические скребки/фрезы и лома-утяжелители с покрытием для предотвращения нарушения покрытия НКТ. Компания также обеспечивает наличие скребков-пробойников и «парафинорезок» для удаления АСПО в НКТ в случае их закупоривания (для НКТ черной и НКТ с покрытием).', 
                'Работы выполняются обученным персоналом, с применением сертифицированного оборудования нашего производства, в соответствии с действующими правилами безопасности производства в нефтяной и газовой промышленности.']
              .map((item) => (
              <li key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BackToTop/>
      {photoIsOpen && <BigPhoto src={serves_5.src} onClose={() => setPhotoIsOpen(false)} />}
    </>
  );
};
