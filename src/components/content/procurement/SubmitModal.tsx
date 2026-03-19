// SubmitModal.tsx
import React from "react";
import Styles from "./procurement.module.scss";

type Form = {
  fullName: string;
  company: string;
  email: string;
};

type Props = {
  form: Form;
  error: string;
  onChange: (field: keyof Form, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
};

export const SubmitModal: React.FC<Props> = ({
  form,
  error,
  onChange,
  onSubmit,
  onClose
}) => {
  return (
    <div className={Styles.modalBg}>
      <div className={Styles.modal}>
        <h3>Отправить предложения</h3>

        <form onSubmit={onSubmit} className={Styles.form}>
          <input
            placeholder="ФИО"
            value={form.fullName}
            onChange={e => onChange("fullName", e.target.value)}
            required
          />

          <input
            placeholder="Наименование компании"
            value={form.company}
            onChange={e => onChange("company", e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => onChange("email", e.target.value)}
            required
          />

          {error && <p className={Styles.error}>{error}</p>}

          <div className={Styles.buttons}>
            <button type="submit">Отправить</button>
            <button type="button" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};