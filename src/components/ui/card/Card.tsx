import Styles from './card.module.scss';

type TProps = {
  imgSrc: string;
  title: string;
  header?: string;
  onClick?: () => void;
};

export const Card = ({ imgSrc, title, header, onClick }: TProps) => {
  
  return (
    <div className={Styles.employeeCardWrapper}>
      <div className={Styles.employeeCard} onClick={onClick}>
        <div className={Styles.system} style={{ backgroundImage: `url(${imgSrc})` }}></div>
        <p>
          {title}
        </p>
      </div>
    </div>
  );
};