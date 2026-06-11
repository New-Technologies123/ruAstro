import Styles from './home.module.scss';
import { Title } from '../../ui/title/Title';

// images
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

const LOGOS = [
  item_1, item_2, item_3, item_4, item_5,
  item_6, item_7, item_8, item_9, item_10,
];

export const Home = () => {
  return (
    <main className={Styles.page}>

      {/* HERO */}
      <section className={Styles.hero}>
        <div className={Styles.heroOverlay}>
          <h1>Добро пожаловать!</h1>
          <p>Мы обеспечиваем качественные поставки по всей России</p>
        </div>
      </section>

      {/* MAP */}
      <section className={Styles.section}>
        <Title text="География поставок" />

        <div className={Styles.mapWrapper}>
          <iframe
            title="Карта поставок"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A1b8f65f94a276e996aad834e0a7f72466019818dd5d59a5f194f1d391a7e68ac&source=constructor"
            className={Styles.map}
            loading="lazy"
          />
        </div>
      </section>

      {/* CLIENTS */}
      <section className={Styles.section}>
        <Title text="Заказчики" />

        <div className={Styles.brandsWrapper}>
          <div className={Styles.brandsTrack}>

            {LOGOS.map((logo, i) => (
              <div key={`logo-${i}`} className={Styles.brandItem}>
                <img src={logo.src} alt={`client-${i}`} loading="lazy" />
              </div>
            ))}

            {LOGOS.map((logo, i) => (
              <div key={`logo-dup-${i}`} className={Styles.brandItem}>
                <img src={logo.src} alt={`client-${i}`} loading="lazy" />
              </div>
            ))}

          </div>
        </div>
      </section>

    </main>
  );
};