import Styles from './company-breadcrumbs.module.scss';

type Props = {
  current: string;
  tone?: 'dark' | 'light';
};

export const CompanyBreadcrumbs = ({ current, tone = 'dark' }: Props) => (
  <nav className={`${Styles.breadcrumbs} ${tone === 'light' ? Styles.light : ''}`} aria-label="Хлебные крошки">
    <a href="/about/">О компании</a>
    <span aria-hidden="true">/</span>
    <span aria-current="page" title={current}>{current}</span>
  </nav>
);
