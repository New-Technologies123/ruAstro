import logoRu from '../../images/logo_fut_ru.webp';
import Styles from './footer.module.scss';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t, i18n } = useTranslation('footer');

  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        {/* Контактная информация */}
        <div className={Styles.contactSection}>
          <div className={Styles.logoContainer}>
            <img src={logoRu.src} alt="Новые Технологии"/>
          </div>
          
          <div className={Styles.contactInfo}>
            <p>
              г.Уфа, ул Заки Валиди 32/2
            </p>
            <p>
              <a href="tel:+74951234567">+7(347) 293-93-33</a>
            </p>
            <p>
              <a href="mailto:nt@tech-new.ru">nt@tech-new.ru</a>
            </p>           
          </div>
        </div>

        {/* Навигационные ссылки */}
        <div className={Styles.navSections}>
          <div className={Styles.navColumn}>
            <h3>Каталог</h3>
            <ul>
              <li>
                <a href={`/products`}>Продукция</a>
              </li>
              <li>
                <a href={`/services`}>Сервисные услуги</a>
              </li>
            </ul>
            
            <h3>{t('Карьера')}</h3>
            <ul>
              <li>
                <a href={`/careers`}>Открытые вакансии</a>
              </li>
            </ul>
          </div>

          <div className={Styles.navColumn}>
            <h3>Компания</h3>
            <ul>
              <li>
                <a href={`/about`}>О компании</a>
              </li>
              <li>
                <a href={`/documents`}>Документы</a>
              </li>
              <li>
                <a href={`/news`}>Новости</a>
              </li>
              <li>
                <a href={` /contact`}>Контакты</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className={Styles.footerBottom}>
        <p>
          © {new Date().getFullYear()}  ООО ИПП Новые технологии. Все права защищены.
        </p>
      </div>
    </footer>
  );
};