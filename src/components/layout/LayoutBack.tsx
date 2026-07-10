import Styles from './layoutBack.module.scss';
import { ScrollTopOnRender } from '../base/ScrollTopOnRender';
import back from '../../images/back.svg';
import { type ReactNode } from 'react';

// Добавляем тип для пропсов
interface LayoutBackProps {
  title: string;
  onBack: () => void; // функция без параметров, возвращающая void
  children: ReactNode;
}

export const LayoutBack = ({ title, onBack, children }: LayoutBackProps) => {
  return (
    <ScrollTopOnRender>
      <div className={Styles.hero}>
        <div className={Styles.backButton} onClick={onBack}>
          <img src={back.src} alt="Go back" />
        </div>
        <div className={Styles.heroContent}>
          <h1>{title}</h1>
        </div>      
      </div>

      <div className={Styles.content}>{children}</div>
    </ScrollTopOnRender>
  );
};