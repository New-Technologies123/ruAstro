import Styles from './layout.module.scss';
import { Title } from '../ui/title/Title';


export const Layout = ({ title, description, children }) => {

  return (
    <>
    <div className={Styles.bloc}>
      <section className={Styles.companyInfo}>
        <Title text={title}></Title>
        <p>
          {description}
        </p>
      </section>

      <section className={Styles.team}>
        {children}
      </section>
    </div>
      
    </>
  );
};
