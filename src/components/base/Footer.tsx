import logoRu from '../../images/logo_fut_ru.webp';
import Styles from './footer.module.scss';
import { FaVk, FaInstagram, FaTelegram, FaFacebookF } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        {/* Логотип и соцсети */}
        <div className={Styles.topSection}>
          <div className={Styles.leftSection}>
            <div className={Styles.infa}>
              <div className={Styles.logoContainer}>
                <img src={logoRu.src} alt="Новые Технологии" />
              </div>
              {/* Контакты */}
              <div className={Styles.contactInfo}>
                <p>г.Уфа, ул Заки Валиди 32/2</p>
                <p><a href="tel:+73472939333">+7 (347) 293-93-33</a></p>
                <p><a href="mailto:nt@tech-new.ru">nt@tech-new.ru</a></p>
              </div>
            </div>

            {/* Блок с файлами */}
            <div className={Styles.filesBlock}>
              <ul>
                <li>
                  <a href="/file/personal_data_v1.pdf" target="_blank" rel="noopener noreferrer">
                    Соглашение на обработку ПД
                  </a>
                </li>
                <li>
                  <a href="/file/privacy_v1.pdf" target="_blank" rel="noopener noreferrer">
                    Политика конфиденциальности
                  </a>
                </li>
                <li>
                  <a href="/file/offer_v1.pdf" target="_blank" rel="noopener noreferrer">
                    Договор оферты
                  </a>
                </li>
                <li>
                  <a href="/file/return_v1.pdf" target="_blank" rel="noopener noreferrer">
                    Условия возврата товара
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Навигация */}
          <div className={Styles.navSections}>
            <div className={Styles.navColumn}>
              <h3>Каталог</h3>
              <ul>
                <li><a href="/products/">Продукция</a></li>
                <li><a href="/services/">Сервисные услуги</a></li>
                <li><a href="/shop/">Онлайн магазин</a></li>
              </ul>
              <h3>Карьера</h3>
              <ul>
                <li><a href="/careers/">Открытые вакансии</a></li>
              </ul>
            </div>
            <div className={Styles.navColumn}>
              <h3>Компания</h3>
              <ul>
                <li><a href="/about/">О компании</a></li>
                <li><a href="/documents/">Документы</a></li>
                <li><a href="/news/">Новости</a></li>
                <li><a href="/procurement/">Закупки</a></li>
                <li><a href="/contact/">Контакты</a></li>
              </ul>
            </div>
          </div>
        </div>        
      </div>

      {/* Нижняя часть */}
      <div className={Styles.footerBottom}>
        <p>© {new Date().getFullYear()} ООО ИПП Новые технологии. Все права защищены.</p>
      </div>
    </footer>
  );
};