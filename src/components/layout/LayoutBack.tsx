import Styles from './layoutBack.module.scss';
import { ScrollTopOnRender } from '../base/ScrollTopOnRender';
import back from '../../images/back.svg'

export const LayoutBack = ({ title, onBack, children }) => {
  return (
    <ScrollTopOnRender>
      <div className={Styles.hero}>
        <div className={Styles.backButton} onClick={onBack}>
          <img src={back.src} alt=""/>
        </div>
        <div className={Styles.heroContent}>
          <h1>{title}</h1>
        </div>      
      </div>

      <div className={Styles.content}>{children}</div>
    </ScrollTopOnRender>
  );
};