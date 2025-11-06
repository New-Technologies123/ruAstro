import Styles from './services.module.scss';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { useState } from 'react';
import serves_4 from '../../../images/services/serves_4.webp';
import dot from '../../../images/dot.svg';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

export const Service = () => {

  const [photoIsOpen, setPhotoIsOpen] = useState(false);

  return (
    <>
      <div className={Styles.card}>
        <div className={Styles.imageWrapper} onClick={() => setPhotoIsOpen(true)}>
          <img src={serves_4.src} alt="сервис" className={Styles.serviceImage}/>
          <div className={Styles.imageOverlay}>
            <p>Увеличить</p>
          </div>        
        </div>

        <div className={Styles.content}>
          <h3>Техническое обслуживание смонтированного устройства включает в себя периодическое проведение следующих работ:</h3>
          <ul>
            {['Внешний осмотр на предмет изгиба стойки подвижного ролика, состояния сварных швов;', 'Проверка крепежных соединений;', 
                'Проверка и доливка масла в редуктор, при необходимости;', 'Визуальный осмотр состояния проволоки. При заметном уменьшении её диаметра или коррозии - заменить проволоку;', 
                'Проверка состояния и, при необходиости, замена сальников, сальникового уплотнения, лубрикатора;', 'Проверка срабатывания датчика минимума веса;', 
                'Проведение калибровки устройства;', 'Ревизия редуктора и электродвигателя;', 'Осмотр и проверка заземления устройства мегомметром;', 
                'Обновление знаков заземления на устройстве;', 'Обслуживание шкафа управления;', 'Проверка работоспособности обогрева шкафа;', 
                'Проверка на сбои программного обеспечения.'].map((item) => (
              <li key={item}>
                <img src={dot.src}/>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BackToTop/>
      {photoIsOpen && <BigPhoto src={serves_4.src} onClose={() => setPhotoIsOpen(false)} />}
    </>
  );
};
