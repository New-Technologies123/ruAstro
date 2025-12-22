import Styles from './param-card.module.scss';

type Tparam = {
  title: string;
  error?: boolean;
  children: React.ReactNode;
};

export const ParamCard = ({
  title,
  error,
  children
}: Tparam) => {
  return (
    <div className={`${Styles.paramCard} ${error ? Styles.error : ''}`}>
      <h3>{title}</h3>

      <div
        className={Styles.paramContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>

      {error && (
        <div className={Styles.errorText}>
          <p>
            Поле обязательно заполнить
          </p>
        </div>
      )}
    </div>
  );
};
