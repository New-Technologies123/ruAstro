import Styles from './services.module.scss';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { useState } from 'react';
import serves_3 from '../../../images/services/serves_3.png';
import dot from '../../../images/dot.svg';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

export const Metering = () => {
  const [photoIsOpen, setPhotoIsOpen] = useState(false);

  return (
    <>
      <div className={Styles.card}>
        <div className={Styles.imageWrapper} onClick={() => setPhotoIsOpen(true)}>
          <img 
            src={serves_3.src} 
            alt="сервис" 
            className={Styles.serviceImage}
          />
          <div className={Styles.imageOverlay}>
            <p>Увеличить</p>
          </div>
        </div>

        <div className={Styles.content}>
          <h3>Включает в себя следующие виды услуг:</h3>
          <ul>
            {['Доставку измерительной установки к месту проведения замера;', 'Монтаж/демонтаж трубной обвязки МЗУ к запорной арматуре скважины и выкидной линии;', 
                'Сброс давления и дренирование жидкости из измерительной ёмкости и трубопроводов МЗУ;', 
                'Формирование и ведение накопительной базы данных по результатам замеров дебита продукции скважин и динамике изменения этих показателей;', 
                'Опрессовку измерительной установки продукцией замеряемой скважины, выполнение замера дебита скважины, оформление результатов замера в круглосуточном режиме.']
            .map((item) => (
              <li key={item}>
                <img src={dot.src}/>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BackToTop/>
      {photoIsOpen && <BigPhoto src={serves_3.src} onClose={() => setPhotoIsOpen(false)} />}
    </>
  );
};