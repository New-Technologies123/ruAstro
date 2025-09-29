import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import Styles from './count-card.module.scss';

type TVacancyProps = {
  header: string;
  title?: string;
  offer?: string;
  number?: string;
  index?: number;
};

export const CountCard = ({ header, number, title, offer, index = 0}: TVacancyProps) => {
  const { ref, isVisible } = useScrollAnimation(index * 100);

  return (
    <div 
      ref={ref} 
      className={`${Styles.bloc} ${isVisible ? Styles.visible : Styles.hidden}`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms' // Задержка только для появления
      }}
    >
      <div className={Styles.headerText}>
        <h3>{header}</h3>
        <div className={Styles.explanationText}>
          <h4>{number}</h4>
          <h5>{offer}</h5>
        </div>                
      </div>
      <p>{title}</p>
    </div>
  );
};