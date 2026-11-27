import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import Styles from './checkout-header.module.scss';

type CheckoutHeaderProps = {
  title: string;
  backAction?: ReactNode;
  count?: number;
  onClose?: () => void;
};

export const CheckoutHeader = ({ title, backAction, count, onClose }: CheckoutHeaderProps) => (
  <header className={Styles.header}>
    <div className={Styles.backSlot}>{backAction}</div>
    <h1 className={Styles.title}>
      {title}
      {count !== undefined && count > 0 && <span>{count}</span>}
    </h1>
    <div className={Styles.closeSlot}>
      {onClose && (
        <button type="button" className={Styles.closeButton} onClick={onClose} aria-label="Закрыть оформление заявки">
          <X size={21} aria-hidden="true" />
        </button>
      )}
    </div>
  </header>
);
