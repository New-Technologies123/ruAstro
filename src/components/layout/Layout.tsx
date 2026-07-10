import Styles from './layout.module.scss';
import { Title } from '../ui/title/Title';

// Добавляем тип для пропсов
interface LayoutProps {
  title: string;
  description?: string; // делаем опциональным, если может отсутствовать
  children: React.ReactNode;
}

export const Layout = ({ title, description, children }: LayoutProps) => {
  return (
    <>
      <div className={Styles.bloc}>
        <section className={Styles.companyInfo}>
          <Title text={title} />
          {description && <p>{description}</p>}
        </section>

        <section className={Styles.team}>
          {children}
        </section>
      </div>
    </>
  );
};