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
      <div
        className={Styles.employeeCard}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick?.();
          }
        }}
      >
        <div
          className={Styles.system}
          style={{ backgroundImage: `url(${imgSrc})` }}
        />

        <div className={Styles.cardFooter}>
          <p>{title}</p>

          <span className={Styles.openIcon} aria-hidden="true">
            ↗
          </span>
        </div>
      </div>
    </div>
  );
};