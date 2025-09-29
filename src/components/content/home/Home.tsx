import Styles from './home.module.scss';
import { useTranslation } from 'react-i18next';
import { Title } from '../../ui/title/Title';

// Импортируем изображения для русского языка
import item_1_ru from '../../../images/home/ros.webp';
import item_2_ru from '../../../images/home/gas.webp';
import item_3_ru from '../../../images/home/nnk.webp';
import item_4_ru from '../../../images/home/ink.webp';
import item_5_ru from '../../../images/home/sur.webp';
import item_6_ru from '../../../images/home/tat.webp';
import item_7_ru from '../../../images/home/bel.webp';
import item_8_ru from '../../../images/home/cas.webp';
import item_9_ru from '../../../images/home/luc.webp';
import item_10_ru from '../../../images/home/luc_ysb.webp';

import homeItem from '../../../images/home/geography.webp';

export const Home = () => {
  const { t, i18n } = useTranslation('home');

  // Создаем объекты с изображениями для каждого языка
  const imagesByLanguage = {
    ru: [
      item_1_ru, item_2_ru, item_3_ru, item_4_ru, item_5_ru,
      item_6_ru, item_7_ru, item_8_ru, item_9_ru, item_10_ru
    ]
  };

  const currentImages = imagesByLanguage.ru;

  // Функция для рендеринга карусели с логотипами
  const renderBrandsCarousel = () => {
    return currentImages.map((image, index) => (
      <div key={index} className={Styles.slideContent}>
        <a>
          <img src={image.src} alt={`Логотип ${index + 1}`} />
        </a>
      </div>
    ));
  };

  return (
    <>
      <section className={Styles.hero}>
        <div className={Styles.heroOverlay}>
          <h1>Добро пожаловать</h1>
          <p>Мы обеспечиваем качественные поставки</p>
        </div>
      </section>

      <Title text="География поставок"></Title>
      <img src={homeItem.src} alt="Карта поставок" className={Styles.homeImg} />
      <Title text="Заказчики"></Title>      

      <div className={Styles.brandParent}>
        <div className={Styles.brandsCarousel} id="brandsCarousel">
          {renderBrandsCarousel()}
        </div>
        <div className={Styles.brandsCarousel} id="brandsCarousel2">
          {renderBrandsCarousel()}
        </div>
      </div>
    </>
  );
};