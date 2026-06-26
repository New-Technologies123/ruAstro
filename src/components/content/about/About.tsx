// About.tsx
import Styles from './about.module.scss';
import { Title } from '../../ui/title/Title';
import { CountCard } from '../../ui/count-card/CountCard';

export const About = () => {
  return (
    <div className={Styles.aboutPage}>
      {/* ===== HERO-БЛОК ===== */}
      <section className={Styles.heroSection}>
        <div className={Styles.heroOverlay} />
        <div className={Styles.heroContent}>
          <span className={Styles.badge}>С 2005 года</span>
          <h1 className={Styles.heroTitle}>
            Инженерно-Производственное<br />
            Предприятие <span className={Styles.highlight}>«Новые Технологии»</span>
          </h1>
          <p className={Styles.heroText}>
            Мы — ведущий производитель технологического оборудования в блочно-модульном исполнении 
            для обустройства нефтегазовых месторождений. Работаем в условиях Крайнего Севера, 
            обеспечивая бесперебойную работу наших клиентов.
          </p>
          <div className={Styles.heroTags}>
            <span>📍 Красноярский край</span>
            <span>📍 Пермский край</span>
            <span>📍 Иркутская область</span>
            <span>📍 Тюменская область</span>
          </div>
        </div>
      </section>

      {/* ===== БЛОК С ЦИФРАМИ ===== */}
      <section className={Styles.statsSection}>
        <div className={Styles.statsHeader}>
          <span className={Styles.sectionBadge}>Достижения</span>
          <Title text="Компания в цифрах" />
          <p className={Styles.statsSubtitle}>
            Более 15 лет опыта и сотни реализованных проектов
          </p>
        </div>
        <div className={Styles.numberAbout}>
          <CountCard 
            header="300+"
            title="Штатных сотрудников"
            index={0}
          />
          <CountCard
            header="31404"
            number="м²"
            title="Производственная база с Ж/Д путями"
            index={1}
          />
          <CountCard
            header="100+"
            title="Успешных проектов в России и СНГ"
            index={2}
          />
          <CountCard
            header="100%"
            title="Соблюдение стандартов HSE"
            index={3}
          />
          <CountCard
            header="79"
            offer="единиц"
            title="Вездеходной техники"
            index={4}
          />
        </div>
      </section>
    </div>
  );
};