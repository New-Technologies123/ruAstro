import Styles from './vacancy.module.scss';

type TVacancyProps = {
  title: string;
  header?: string;
  experience?: string;
  employmentType?: string;
  onClick?: () => void;
};

export const Vacancy = ({
  title,
  header,
  experience,
  employmentType,
  onClick,
}: TVacancyProps) => {
  const handleClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    onClick?.();
  };

  return (
    <button
      type="button"
      className={Styles.employeeVacancy}
      onClick={handleClick}
    >
      <div className={Styles.header}>
        <h3>{header}</h3>

        <span
          className={Styles.arrow}
          aria-hidden="true"
        >
          ↗
        </span>
      </div>

      <div className={Styles.details}>
        {title && <span>{title}</span>}

        {experience && <span>{experience}</span>}

        {employmentType && <span>{employmentType}</span>}
      </div>
    </button>
  );
};