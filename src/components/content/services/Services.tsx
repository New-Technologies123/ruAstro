import { Layout } from '../../layout/Layout';
import { Card } from '../../ui/card/Card';
import { useEffect, useState, useRef } from 'react';

import { Repair } from './Repair';
import { Metering } from './Metering';
import { Service } from './Service';
import { Dewaxing } from './Dewaxing';

import serves_12 from '../../../images/services/serves_12.png';
import serves_3 from '../../../images/services/serves_3.webp';
import serves_4 from '../../../images/services/serves_4.webp';
import serves_5 from '../../../images/services/serves_5.webp';

import { BackToTop } from '../../ui/back-to-top/BackToTop';
import styles from '../products/scroll.module.scss';

type TServices = | 'repair' | 'metering' | 'service' | 'dewaxing';

const pathnameToService = (pathname: string): TServices | null => {
  const parts = pathname.split('/').filter(Boolean);

  if (parts.length === 2 && parts[0] === 'services') {
    return parts[1] as TServices;
  }

  return null;
};

export const Services = () => {
  const [currentPage, setCurrentPage] = useState<TServices | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const goTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPage(pathnameToService(path));
    window.scrollTo({ top: 0, behavior: 'smooth', });
  };

  useEffect(() => {
    const track = trackRef.current;
    const cards = track?.querySelectorAll('.card');
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!track || !cards?.length || !prevBtn || !nextBtn) return;

    let current = 0;

    const updateArrows = () => {
      prevBtn.style.visibility = current <= 0 ? 'hidden' : 'visible';
      nextBtn.style.visibility = current >= cards.length - 1 ? 'hidden' : 'visible';
    };

    const cardStep = () => {
      return cards.length > 1
        ? (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft
        : (cards[0] as HTMLElement).offsetWidth;
    };

    const goToCard = (index: number) => {
      current = Math.max(0, Math.min(cards.length - 1, index));
      const card = cards[current] as HTMLElement;
      const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
      track.scrollTo({ left, behavior: 'smooth' });
      updateArrows();
    };

    const handleScroll = () => {
      current = Math.round(track.scrollLeft / cardStep());
      current = Math.max(0, Math.min(cards.length - 1, current));
      updateArrows();
    };

    nextBtn.addEventListener('click', () => goToCard(current + 1));
    prevBtn.addEventListener('click', () => goToCard(current - 1));
    track.addEventListener('scroll', handleScroll, { passive: true });

    updateArrows();

    return () => {
      nextBtn.removeEventListener('click', () => goToCard(current + 1));
      prevBtn.removeEventListener('click', () => goToCard(current - 1));
      track.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const sync = () => setCurrentPage(pathnameToService(window.location.pathname));
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  if (currentPage === 'repair') {
    return <Repair />;
  }

  if (currentPage === 'metering') {
    return <Metering />;
  }

  if (currentPage === 'service') {
    return <Service />;
  }

  if (currentPage === 'dewaxing') {
    return <Dewaxing />;
  }

  return (
    <Layout
      title="Сервисные услуги"
      description="ООО Инженерно-Производственное предприятие «Новые Технологии» имеет многолетний опыт оказания услуг по ремонту нефтепромыслового оборудования, а также по депарафинизации и замеру дебита скважин"
    >
      <>
        <div className={styles.servicesWrapper}>
          <div className={styles.cardsTrack} ref={trackRef}>
            <div className="card">
              <Card
                imgSrc={serves_12.src}
                title="Обслуживание, капитальный ремонт и модернизация АГЗУ"
                onClick={() => goTo('/services/repair')}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={serves_3.src}
                title="Замер дебита нефтяных скважин с помощью мобильной замерной установки"
                onClick={() => goTo('/services/metering')}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={serves_4.src}
                title="Обслуживание устройства очистки колонны УОК-НКТ"
                onClick={() => goTo('/services/service')}
              />
            </div>
            <div className="card">
              <Card
                imgSrc={serves_5.src}
                title="Услуги депарафинизации нефтяных скважин"
                onClick={() => goTo('/services/dewaxing')}
              />
            </div>
          </div>
          
          <div className={styles.mobileNav}>
            <button className={styles.prevBtn} ref={prevBtnRef}>←</button>
            <button className={styles.nextBtn} ref={nextBtnRef}>→</button>
          </div>
        </div>
      </>
      <BackToTop />
    </Layout>
  );
};