import Styles from './cards.module.scss';

type TProps = {
  title: string;
  onClick?: () => void;
};

export const Cards = ({ title, onClick}: TProps) => {

  return (
    <div className={Styles.certificatesList}>
      <div className={Styles.actionTitle} onClick={onClick}>
        <p>{title}</p>
      </div>
    </div>    
  );
};