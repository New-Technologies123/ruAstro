import Styles from './content.module.scss';

export const Content = ({ children }) => {
  return <main className={Styles.contentWrap}>{children}</main>;
};
