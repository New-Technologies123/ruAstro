import Styles from './list.module.scss';
import sign from '../../../images/doc.svg';
import { useEffect, useRef } from 'react';

type TProps = {
  title: string;
  onClick?: () => void;
  index: number;
};

export const List = ({ title, onClick, index }: TProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (listRef.current) {
      const delay = index * 100;
      
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.style.transform = 'translateX(0)';
          listRef.current.style.opacity = '1';
        }
      }, delay);
    }
  }, [index]);

  return (
    <div className={Styles.certificatesList} onClick={onClick} ref={listRef}>
      <div className={Styles.actionTitle}>
        <img src={sign.src} alt="document icon" />
        <p>{title}</p>
      </div>
    </div>
  );
};