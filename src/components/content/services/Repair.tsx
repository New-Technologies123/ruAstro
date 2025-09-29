import Styles from './services.module.scss';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { useState} from 'react';
import serves_1 from '../../../images/services/serves_12.png'

import { useTranslation } from 'react-i18next';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

export const Repair = () => {
  const { t } = useTranslation('services');

  const [photoIsOpen, setPhotoIsOpen] = useState(false);

  return (
    <>
      <div className={Styles.card}>
        <div className={Styles.imageWrapper} onClick={() => setPhotoIsOpen(true)}>
          <img src={serves_1.src} alt="сервис" className={Styles.serviceImage}/>
          <div className={Styles.imageOverlay}>
            <p>{t('Увеличить')}</p>
          </div>
        </div>

        <div className={Styles.content}>
          <h3>{t('Капитальный')}</h3>
          <ul>
            {['Сепарационной', 'Переключателя', 'Счетчика', 'Задвижек', 'Технологического', 'Линии', 
            'Гидравлического', 'Электромонтажная'].map((item) => (
              <li key={item}>
                {t(item)}
              </li>
            ))}
          </ul>
          <h3 className={Styles.title}>{t('Обслуживать')}</h3>
          <ul>
            {['Инструкций', 'Замеров'].map((item) => (
              <li key={item}>
                {t(item)}
              </li>
            ))}
          </ul>
          <h3>{t('Модерн')}</h3>
          <ul>
            {['Шкафов'].map((item) => (
              <li key={item}>
                {t(item)}
              </li>
            ))}
          </ul>
        </div>
        
      </div>
      <BackToTop/>
      {photoIsOpen && <BigPhoto src={serves_1.src} onClose={() => setPhotoIsOpen(false)} />}
    </>
  );
};
