import logoRu from '../../images/logo_fut_ru.webp';
import Styles from './footer.module.scss';

const CATALOG_LINKS = [
  { label: 'Продукция', href: '/products/' },
  { label: 'Сервисные услуги', href: '/services/' },
  { label: 'Онлайн магазин', href: '/shop/' },
];

const COMPANY_LINKS = [
  { label: 'О компании', href: '/about/' },
  { label: 'Документы', href: '/documents/' },
  { label: 'Новости', href: '/news/' },
  { label: 'Закупки', href: '/procurement/' },
  { label: 'Контакты', href: '/contact/' },
];

const DOCUMENT_LINKS = [
  {
    label: 'Соглашение на обработку ПД',
    href: '/file/personal_data_v1.pdf',
  },
  {
    label: 'Политика конфиденциальности',
    href: '/file/privacy_v1.pdf',
  },
  {
    label: 'Договор оферты',
    href: '/file/offer_v1.pdf',
  },
  {
    label: 'Условия возврата товара',
    href: '/file/return_v1.pdf',
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>

        <div className={Styles.footerMain}>

          {/* BRAND */}
          <div className={Styles.brandBlock}>
            <a
              href="/home/"
              className={Styles.logo}
              aria-label="Новые Технологии — главная"
            >
              <img
                src={logoRu.src}
                alt="ООО ИПП «Новые Технологии»"
              />
            </a>

            <p className={Styles.brandText}>
              Инженерно-производственное предприятие,
              создающее технологические решения
              для нефтегазовой отрасли.
            </p>

            <div className={Styles.companyMeta}>
              <span>УФА</span>
              <i />
              <span>РОССИЯ</span>
              <i />
              <span>С 2005 ГОДА</span>
            </div>
          </div>

          {/* CONTACTS */}
          <div className={Styles.contactBlock}>
            <span className={Styles.label}>
              Контакты
            </span>

            <a
              href="tel:+73472939333"
              className={Styles.phone}
            >
              +7 (347) 293-93-33
            </a>

            <a
              href="mailto:nt@tech-new.ru"
              className={Styles.email}
            >
              nt@tech-new.ru
            </a>

            <p className={Styles.address}>
              г. Уфа, ул. Заки Валиди, 32/2
            </p>
          </div>

          {/* NAVIGATION */}
          <nav className={Styles.navigation}>
            <div className={Styles.navColumn}>
              <span className={Styles.label}>
                Каталог
              </span>

              <ul>
                {CATALOG_LINKS.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className={Styles.careerGroup}>
                <span className={Styles.label}>
                  Карьера
                </span>

                <ul>
                  <li>
                    <a href="/careers/">
                      Открытые вакансии
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={Styles.navColumn}>
              <span className={Styles.label}>
                Компания
              </span>

              <ul>
                {COMPANY_LINKS.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* CTA */}
          <div className={Styles.ctaBlock}>
            <span className={Styles.label}>
              Работаем с задачами
            </span>

            <p>
              Обсудим оборудование,
              проект или комплектацию.
            </p>

            <a
              href="/contact/"
              className={Styles.ctaLink}
            >
              Связаться с нами
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* DOCUMENTS */}
        <div className={Styles.documents}>
          <span className={Styles.documentsLabel}>
            Правовая информация
          </span>

          <div className={Styles.documentsList}>
            {DOCUMENT_LINKS.map((document) => (
              <a
                key={document.href}
                href={document.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {document.label}
                <span>↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className={Styles.footerBottom}>
          <p>
            © {currentYear} ООО ИПП «Новые Технологии».
            Все права защищены.
          </p>
        </div>

      </div>
    </footer>
  );
};