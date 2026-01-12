// QuestionForm.tsx
import React from 'react';
import Styles from './question-form.module.scss';

interface QuestionFormProps {
  formData: { name: string; email: string; message: string };
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  formData,
  onChange,
  onSubmit,
}) => {
  return (
    <form className={Styles.questionForm} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Ваше имя"
        value={formData.name}
        onChange={e => onChange('name', e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email для ответа"
        value={formData.email}
        onChange={e => onChange('email', e.target.value)}
        required
      />
      <textarea
        placeholder="Ваш вопрос"
        value={formData.message}
        onChange={e => onChange('message', e.target.value)}
        rows={4}
        required
      />
      <button type="submit">Отправить вопрос</button>
    </form>
  );
};
