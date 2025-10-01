import news_1 from '../../../images/news/news_1.webp';
import news_2 from '../../../images/news/news_2.webp';
import news_3 from '../../../images/news/news_3.webp';
import news_4 from '../../../images/news/news_4.webp';
import Styles from './news.module.scss';
import { Gallery } from '../../ui/gallery/Gallery';
import { useState, useEffect } from 'react';
import { BigPhoto } from '../../ui/big-photo/BigPhoto';
import { Title } from '../../ui/title/Title';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

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
            <img src={news_4.src} className={Styles.thumbnail} onClick={() => { setPhotoTwoIsOpen(true); }}/>
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
            <img src={news_3.src} className={Styles.thumbnail} onClick={() => { setPhotoIsOpen(true); }}/>
            <p>
              ООО ИПП «Новые Технологии» заняло 2 место в конкурсе «Экспортер года 2022» в номинации «Прорыв года среди субъектов,
              малого и среднего предпринимательства» по Республике Башкортостан в рамках Международной недели бизнеса.
            </p>
          </div>
        </div>        
      </div>
      {photoIsOpen && <BigPhoto src={news_3.src} onClose={() => setPhotoIsOpen(false)} />}
      {photoTwoIsOpen && <BigPhoto src={news_4.src} onClose={() => setPhotoTwoIsOpen(false)} />}
      <BackToTop/>
    </>
    
  );
};