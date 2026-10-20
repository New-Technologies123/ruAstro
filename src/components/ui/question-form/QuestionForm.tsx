import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import Styles from './question-form.module.scss';

export interface QuestionFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  agreement: boolean;
  privacyAgreement: boolean;
}

interface QuestionFormProps {
  formData: QuestionFormData;
  onChange: (field: keyof QuestionFormData, value: string | boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  submitError: string;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  submitError,
}) => {
  const [showConsentErrors, setShowConsentErrors] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);

  const phoneIsValid = formData.phone.replace(/\D/g, '').length === 11;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowConsentErrors(true);
    setShowPhoneError(!phoneIsValid);

    if (!phoneIsValid || !formData.agreement || !formData.privacyAgreement) {
      return;
    }

    onSubmit(event);
  };

  return (
    <form className={Styles.questionForm} onSubmit={handleSubmit}>
      <div className={Styles.fieldGroup}>
        <label htmlFor="question-name" className={Styles.fieldLabel}>Ваше имя</label>
        <input
          id="question-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Как к вам обращаться"
          value={formData.name}
          onChange={event => onChange('name', event.target.value)}
          required
        />
      </div>

      <div className={Styles.contactRow}>
        <div className={Styles.fieldGroup}>
          <label htmlFor="question-email" className={Styles.fieldLabel}>Электронная почта</label>
          <input
            id="question-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.ru"
            value={formData.email}
            onChange={event => onChange('email', event.target.value)}
            required
          />
        </div>

        <div className={Styles.fieldGroup}>
          <label htmlFor="question-phone" className={Styles.fieldLabel}>Телефон</label>
          <InputMask
            mask="+7 (999) 999-99-99"
            maskChar={null}
            value={formData.phone}
            onChange={event => {
              onChange('phone', event.target.value);
              if (showPhoneError) setShowPhoneError(false);
            }}
          >
            {(inputProps: any) => (
              <input
                {...inputProps}
                id="question-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7 (999) 999-99-99"
                aria-invalid={showPhoneError}
                aria-describedby={showPhoneError ? 'question-phone-error' : undefined}
                required
              />
            )}
          </InputMask>
          {showPhoneError && (
            <span id="question-phone-error" className={Styles.errorText} role="alert">
              Проверьте номер телефона
            </span>
          )}
        </div>
      </div>

      <div className={Styles.fieldGroup}>
        <label htmlFor="question-message" className={Styles.fieldLabel}>Ваш вопрос</label>
        <textarea
          id="question-message"
          name="message"
          placeholder="Коротко опишите вопрос или задачу"
          value={formData.message}
          onChange={event => onChange('message', event.target.value)}
          rows={3}
          required
        />
      </div>

      <div className={Styles.agreements}>
        <div className={Styles.checkboxWrapper}>
          <label className={Styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.agreement}
              onChange={event => onChange('agreement', event.target.checked)}
              aria-invalid={showConsentErrors && !formData.agreement}
              aria-describedby={showConsentErrors && !formData.agreement ? 'question-agreement-error' : undefined}
            />
            <span className={Styles.customCheckbox} aria-hidden="true" />
            <span className={Styles.checkboxText}>
              Я даю согласие на{' '}
              <a href="/file/personal_data_v1.pdf" target="_blank" rel="noopener noreferrer">
                обработку моих персональных данных
              </a>{' '}
              в целях рассмотрения моего обращения.
            </span>
          </label>
          {showConsentErrors && !formData.agreement && (
            <span id="question-agreement-error" className={Styles.errorText} role="alert">
              Необходимо дать согласие
            </span>
          )}
        </div>

        <div className={Styles.checkboxWrapper}>
          <label className={Styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.privacyAgreement}
              onChange={event => onChange('privacyAgreement', event.target.checked)}
              aria-invalid={showConsentErrors && !formData.privacyAgreement}
              aria-describedby={showConsentErrors && !formData.privacyAgreement ? 'question-privacy-error' : undefined}
            />
            <span className={Styles.customCheckbox} aria-hidden="true" />
            <span className={Styles.checkboxText}>
              С{' '}
              <a href="/file/privacy_v1.pdf" target="_blank" rel="noopener noreferrer">
                политикой конфиденциальности
              </a>{' '}
              ознакомлен(а).
            </span>
          </label>
          {showConsentErrors && !formData.privacyAgreement && (
            <span id="question-privacy-error" className={Styles.errorText} role="alert">
              Подтвердите ознакомление с политикой
            </span>
          )}
        </div>
      </div>

      {submitError && <div className={Styles.submitError} role="alert">{submitError}</div>}

      <button type="submit" className={Styles.submitButton} disabled={isSubmitting}>
        <span>{isSubmitting ? 'Отправляем…' : 'Отправить вопрос'}</span>
        {!isSubmitting && (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </form>
  );
};
