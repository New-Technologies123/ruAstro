import Styles from './layout.module.scss';
import { useTranslation } from 'react-i18next';
import { Title } from '../ui/title/Title';


export const Layout = ({ title, description, children }) => {
  const { t } = useTranslation('layout');

  return (
    <>
      <section className={Styles.companyInfo}>
        <Title text={t(title)}></Title>
        <p>
          {t(description)}
        </p>
      </section>

      <section className={Styles.team}>
        {children}
      </section>
    </>
  );
};
