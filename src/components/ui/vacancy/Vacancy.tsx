import { ArrowUpRightIcon } from "../icon/ArrowUpRightIcon";
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
}: TVacancyProps) => (
  <button
    type="button"
    className={Styles.employeeVacancy}
    onClick={onClick}
  >
    <div className={Styles.header}>
      <h3>{header}</h3>
      <span className={Styles.arrow} aria-hidden="true"><ArrowUpRightIcon /></span>
    </div>

    <div className={Styles.details}>
      {title && <span>{title}</span>}
      {experience && <span>{experience}</span>}
      {employmentType && <span>{employmentType}</span>}
    </div>

    {/* <span className={Styles.cardFooter} aria-hidden="true">
      Подробнее о вакансии
    </span> */}
  </button>
);
