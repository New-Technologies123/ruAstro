import news_1 from '../../../images/news/news_1.webp';
import news_2 from '../../../images/news/news_2.webp';
import news_3 from '../../../images/news/news_3.webp';
import news_4 from '../../../images/news/news_4.webp';
import news_5 from '../../../images/news/news_5.webp';
import news_6 from '../../../images/news/news_6.webp';
import news_7 from '../../../images/news/news_7.webp';
import news_8 from '../../../images/news/news_8.webp';
import news_9 from '../../../images/news/news_9.webp';
import news_10 from '../../../images/news/news_10.webp';
import Styles from './news.module.scss';
import { Gallery } from '../../ui/gallery/Gallery';
import { useState, useEffect } from 'react';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { Title } from '../../ui/title/Title';
import { BackToTop } from '../../ui/back-to-top/BackToTop'

export const News = () => {
  const [photoIsOpen, setPhotoIsOpen] = useState(false);
  const [photoTwoIsOpen, setPhotoTwoIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Имитация загрузки контента
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Title text="Новости"></Title>
      <div className={`${isLoaded ? Styles.loaded : ''}`}>
        <div className={Styles.newsContent}>
          <div className={Styles.newsItem}>
            <Gallery
              photos={[
                { id: 1, src: news_9.src, alt: '' },
                { id: 2, src: news_10.src, alt: '' },
              ]}
            />
            <p>
              ООО ИПП «Новые Технологии» успешно приняли участие в международной выставке ADIPEC-2025, прошедшей в
              Абу-Даби, ОАЭ с 3 по 6 ноября 2025 года. Наше предприятие успешно провело переговоры с представителями
              ADNOC, Aramco и других глобальных игроков, обсудив потенциальные контракты на поставку оборудования и
              совместные проекты. Участие нашего предприятия позволило укрепить наши позиции в регионе MENA, где спрос
              на российские технологии остаётся неизменно высоким. Участие в данном международном мероприятии открывает
              путь для успешного глобального сотрудничества и экспорта высокотехнологического оборудования, производимого
              нашим предприятием.
            </p>
          </div>
          <div className={Styles.newsItem}>
            <Gallery
              photos={[
                { id: 1, src: news_7.src, alt: '' },
                { id: 2, src: news_8.src, alt: '' },
              ]}
            />
            <p>
              2-4 июня 2025 года ООО ИПП «Новые Технологии» успешно приняли участие в 30-ой Международной Выставке «Нефть
              и Газ Каспия» - Caspian oil & gas 2025, г. Баку. В рамках выставки были проведены несколько десятков переговоров
              и презентаций, в результате которых был выявлен интерес к высокотехнологичной продукции нашего предприятия, что
              открывает нам новые экспортные возможности
            </p>
          </div>
          <div className={Styles.newsItem}>
            <Gallery
              photos={[
                { id: 1, src: news_5.src, alt: '' },
                { id: 2, src: news_6.src, alt: '' },
              ]}
            />
            <p>
              В рамках 30-ой Международной Выставке «Нефть и Газ Каспия» - Caspian oil & gas 2025, г. Баку сотрудники ООО
              ИПП «Новые Технологии» приняли участие в посадке деревьев и цветов на территории Баку Экспо Центра. Эта акция,
              приуроченная к юбилею выставки, направлена на поддержку принципов устойчивого развития и охрану окружающей среды.
            </p>
          </div>
          <div className={Styles.newsItem}>
            <img src={news_4.src} className={Styles.thumbnail} onClick={() => { setPhotoTwoIsOpen(true); }} />
            <p>
              27 марта 2025 года Генеральный директор ООО ИПП  «Новые Технологии» Сафаров Ян Рауфович был награждён Почётной грамотой за заслуги
              в развитии международных, внешнеэкономических и межрегиональных связей Республики Башкортостан с субъектами Российской Федерации
            </p>
          </div>
          <div className={Styles.newsItem}>
            <Gallery
              photos={[
                { id: 1, src: news_1.src, alt: '' },
                { id: 2, src: news_2.src, alt: '' },
              ]}
            />
            <p>
              С 25 по 27 сентября 2024 года ООО ИПП «Новые Технологии» успешно приняло участие в 29-й Казахстанской Международной выставке
              KIOGE «Нефть и газ», где были представлены инновационные технологии и основные тенденции развития мировой нефтегазовой отрасли.
            </p>
          </div>

          <div className={Styles.newsItem}>
            <img src={news_3.src} className={Styles.thumbnail} onClick={() => { setPhotoIsOpen(true); }} />
            <p>
              ООО ИПП «Новые Технологии» заняло 2 место в конкурсе «Экспортер года 2022» в номинации «Прорыв года среди субъектов,
              малого и среднего предпринимательства» по Республике Башкортостан в рамках Международной недели бизнеса.
            </p>
          </div>
        </div>
      </div>
      <BackToTop />
      {photoIsOpen && <BigPhoto src={news_3.src} onClose={() => setPhotoIsOpen(false)} />}
      {photoTwoIsOpen && <BigPhoto src={news_4.src} onClose={() => setPhotoTwoIsOpen(false)} />}
    </>

  );
};