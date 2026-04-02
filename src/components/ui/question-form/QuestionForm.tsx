import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import Styles from './question-form.module.scss';

interface QuestionFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
    agreement: boolean;
  };
  agreementError: boolean;
  onChange: (field: string, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

// const phoneMasks: Record<string, string> = {
//   RU: '+7 (999) 999-99-99',
//   // US: '+1 (999) 999-9999',
//   // NL: '+31 99 999 9999',
//   // DE: '+49 9999 999999',
//   // FR: '+33 9 99 99 99 99',
// };

export const QuestionForm: React.FC<QuestionFormProps> = ({
  formData,
  agreementError,
  onChange,
  onSubmit,
}) => {
  const [mask, setMask] = useState('+7 (999) 999-9999');

  useEffect(() => {
    const locale = navigator.language || 'ru-RU';
    const country = locale.split('-')[7] || 'RU';

    // if (phoneMasks[country]) {
    //   setMask(phoneMasks[country]);
    // }
  }, []);

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

      <InputMask
        mask={mask}
        value={formData.phone}
        onChange={e => onChange('phone', e.target.value)}
      >
        {(inputProps: any) => (
          <input {...inputProps} type="tel" placeholder="Телефон" required />
        )}
      </InputMask>

      <textarea
        placeholder="Ваш вопрос"
        value={formData.message}
        onChange={e => onChange('message', e.target.value)}
        rows={4}
        required
      />

      <label
        className={`${Styles.checkbox} ${
          agreementError ? Styles.error : ''
        }`}
      >
        <input
          type="checkbox"
          checked={formData.agreement}
          onChange={e => onChange('agreement', e.target.checked)}
        />

        <span className={Styles.customCheckbox}></span>

        <span className={Styles.checkboxText}>
          Я даю согласие на обработку моих персональных данных 
          в целях рассмотрения моего обращения. С 
          <a href="/public/privacy/v_1.docx" target="_blank"> политикой конфиденциальности </a> 
          ознакомлен(а).
        </span>
      </label>

      {agreementError && (
        <div className={Styles.errorText}>
          Пожалуйста, подтвердите согласие
        </div>
      )}

      <button type="submit">Отправить вопрос</button>
    </form>
  );
};