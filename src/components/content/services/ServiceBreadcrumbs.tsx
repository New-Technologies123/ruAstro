import Styles from './service-breadcrumbs.module.scss';

type Props = {
  current: string;
};

export const ServiceBreadcrumbs = ({ current }: Props) => (
  <nav className={Styles.breadcrumbs} aria-label="Хлебные крошки">
    <a href="/services/">Сервисные услуги</a>
    <span aria-hidden="true">/</span>
    <span aria-current="page" title={current}>{current}</span>
  </nav>
);
