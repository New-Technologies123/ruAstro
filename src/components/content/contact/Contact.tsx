import { Breadcrumbs } from '../../ui/breadcrumbs/Breadcrumbs';
import { ArrowRight, ArrowUpRight, Factory, FileText, Mail, MapPin, Phone } from 'lucide-react';
import Styles from './contact.module.scss';

const officeMapUrl = 'https://2gis.ru/ufa/firm/70000001088836817/55.935872%2C54.720355?m=55.935872%2C54.720355%2F16';
const productionMapUrl = 'https://2gis.ru/ufa/search/%D1%83%D0%BB.%20%D0%91%D0%BB%D0%B0%D0%B3%D0%BE%D0%B2%D0%B0%D1%80%D1%81%D0%BA%D0%B0%D1%8F%2016%2F2';

const methods = [
  { label: 'Позвонить нам', value: '+7 (347) 293-93-33', href: 'tel:+73472939333', icon: Phone },
  { label: 'Написать на почту', value: 'nt@tech-new.ru', href: 'mailto:nt@tech-new.ru', icon: Mail },
];

const locations = [
  { label: 'Офис', address: '450076, Республика Башкортостан, г. Уфа, ул. Заки Валиди, 32/2', href: officeMapUrl, icon: MapPin },
  { label: 'Производство', address: '450019, Республика Башкортостан, г. Уфа, ул. Благоварская, 16/2', href: productionMapUrl, icon: Factory },
];

export const Contact = () => (
  <>
    <div className={Styles.page}>
      <div className={Styles.container}>
        <header className={Styles.hero}>
          <div className={Styles.heroContent}>
            <Breadcrumbs path="/contact/" />
            <span className={Styles.heroEyebrow}>Контакты · Новые Технологии</span>
            <h1>Контакты <span>предприятия</span></h1>
            <p>Поможем с подбором оборудования, комплектацией и сервисом.</p>
            <div className={Styles.heroActions}>
              <a className={Styles.heroActionPrimary} href="tel:+73472939333"><Phone size={18} aria-hidden="true" /> Позвонить <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a className={Styles.heroActionSecondary} href="mailto:nt@tech-new.ru"><Mail size={18} aria-hidden="true" /><span className={Styles.actionTextDesktop}>Написать письмо</span><span className={Styles.actionTextMobile}>Написать</span><ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </header>

        <div className={Styles.mainGrid}>
          <div className={Styles.infoColumn}>
            <section className={Styles.section} aria-labelledby="contact-methods-heading">
              <div className={Styles.sectionHeading}><div><span className={Styles.sectionEyebrow}>Связаться с нами</span><h2 id="contact-methods-heading">Удобным способом</h2></div><p>Выберите, как вам удобнее обсудить вопрос.</p></div>
              <div className={Styles.methodGrid}>
                {methods.map(({ label, value, href, icon: Icon }) => (
                  <a className={Styles.methodCard} href={href} key={href}>
                    <span className={Styles.methodIcon}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                    <span className={Styles.methodLabel}>{label}</span><strong>{value}</strong>
                    <ArrowUpRight className={Styles.methodArrow} size={20} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>

            <section className={Styles.section} aria-labelledby="locations-heading">
              <div className={Styles.sectionHeading}><div><span className={Styles.sectionEyebrow}>Где нас найти</span><h2 id="locations-heading">Наши адреса</h2></div></div>
              <div className={Styles.locationList}>
                {locations.map(({ label, address, href, icon: Icon }) => (
                  <article className={Styles.locationCard} key={label}>
                    <span className={Styles.locationIcon}><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
                    <div><h3>{label}</h3><p>{address}</p><a href={href} target="_blank" rel="noopener noreferrer">Открыть в 2ГИС <ArrowUpRight size={16} aria-hidden="true" /></a></div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <section className={Styles.mapSection} aria-labelledby="map-heading">
            <div className={Styles.mapHeading}>
              <div><span className={Styles.sectionEyebrow}>На карте</span><h2 id="map-heading">Офис в Уфе</h2><p>Заки Валиди, 32/2</p></div>
              <a href={officeMapUrl} target="_blank" rel="noopener noreferrer" aria-label="Открыть офис в 2ГИС"><ArrowUpRight size={22} aria-hidden="true" /></a>
            </div>
            <div className={Styles.mapFrame}>
              <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af1bd327c32b7c5c037613d0c1228b955362997bce9338237e5b612e6449e8c86&source=constructor" title="Карта офиса ООО ИПП «Новые Технологии»" loading="lazy" allowFullScreen />
            </div>
            <a className={Styles.mapFooter} href={officeMapUrl} target="_blank" rel="noopener noreferrer">Открыть адрес офиса в 2ГИС <ArrowRight size={18} aria-hidden="true" /></a>
          </section>
        </div>

        <section className={Styles.legal} aria-labelledby="legal-heading">
          <div className={Styles.legalHeading}><span className={Styles.legalIcon}><FileText size={22} strokeWidth={1.8} aria-hidden="true" /></span><div><span className={Styles.sectionEyebrow}>Информация о компании</span><h2 id="legal-heading">Реквизиты</h2></div></div>
          <dl className={Styles.legalGrid}>
            <div><dt>Юридический адрес</dt><dd>450076, Республика Башкортостан, г. Уфа, ул. Заки Валиди, 32/2</dd></div>
            <div><dt>ИНН</dt><dd>0274106520</dd></div>
            <div><dt>ОГРН</dt><dd>1050204014651</dd></div>
          </dl>
        </section>
      </div>
    </div>
  </>
);
