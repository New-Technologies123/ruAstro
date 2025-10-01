import Styles from './home.module.scss';
import { Title } from '../../ui/title/Title';

// Импортируем изображения для русского языка
import item_1 from '../../../images/home/ros.webp';
import item_2 from '../../../images/home/gas.webp';
import item_3 from '../../../images/home/nnk.webp';
import item_4 from '../../../images/home/ink.webp';
import item_5 from '../../../images/home/sur.webp';
import item_6 from '../../../images/home/tat.webp';
import item_7 from '../../../images/home/bel.webp';
import item_8 from '../../../images/home/cas.webp';
import item_9 from '../../../images/home/luc.webp';
import item_10 from '../../../images/home/luc_ysb.webp'; 
import homeItem from '../../../images/home/geography.webp';

export const Home = () => {

  // Создаем объекты с изображениями для каждого языка
  const imagesByLanguage = {
    ru: [
      item_1, item_2, item_3, item_4, item_5,
      item_6, item_7, item_8, item_9, item_10
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