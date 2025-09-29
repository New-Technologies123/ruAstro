import Styles from './vacancy.module.scss';

type TVacancyProps = {
  title: string;
  header?: string;
  experience?: string;
  employmentType?: string;
  onClick?: () => void;
};

export const Vacancy = ({ title, header, experience, employmentType, onClick,}: TVacancyProps) => {

  return (
    <div className={Styles.employeeVacancy} onClick={onClick}>
      <h3>{header}</h3>
      <p>{title}</p>
      <p>{experience}</p>
      <p>{employmentType}</p>
    </div>
  );
};
