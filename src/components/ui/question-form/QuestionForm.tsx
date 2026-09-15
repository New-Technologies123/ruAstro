import React from 'react';
import InputMask from 'react-input-mask';
import Styles from './question-form.module.scss';

interface QuestionFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
    agreement: boolean;
    privacyAgreement: boolean;
  };

  agreementError: boolean;

  onChange: (
    field: string,
    value: string | boolean
  ) => void;

  onSubmit: (
    e: React.FormEvent
  ) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  formData,
  agreementError,
  onChange,
  onSubmit,
}) => {
  const mask = '+7 (999) 999-9999';

  const [errors, setErrors] = React.useState({
    agreement: false,
    privacyAgreement: false,
  });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const newErrors = {
      agreement: !formData.agreement,
      privacyAgreement: !formData.privacyAgreement,
    };

    setErrors(newErrors);

    if (
      newErrors.agreement ||
      newErrors.privacyAgreement
    ) {
      return;
    }

    onSubmit(e);
  };

  const handleCheckboxChange = (
    field:
      | 'agreement'
      | 'privacyAgreement',
    checked: boolean
  ) => {
    onChange(field, checked);

    if (checked) {
      setErrors(prev => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  return (
    <form
      className={Styles.questionForm}
      onSubmit={handleSubmit}
    >

      {/* ИМЯ */}

      <div className={Styles.fieldGroup}>
        <label
          htmlFor="question-name"
          className={Styles.fieldLabel}
        >
          Ваше имя
        </label>

        <input
          id="question-name"
          type="text"
          placeholder="Введите ваше имя"
          value={formData.name}
          onChange={e =>
            onChange(
              'name',
              e.target.value
            )
          }
          required
        />
      </div>


      {/* EMAIL + ТЕЛЕФОН */}

      <div className={Styles.contactRow}>

        <div className={Styles.fieldGroup}>
          <label
            htmlFor="question-email"
            className={Styles.fieldLabel}
          >
            Email
          </label>

          <input
            id="question-email"
            type="email"
            placeholder="name@email.ru"
            value={formData.email}
            onChange={e =>
              onChange(
                'email',
                e.target.value
              )
            }
            required
            className={Styles.contactInput}
          />
        </div>


        <div className={Styles.fieldGroup}>
          <label
            htmlFor="question-phone"
            className={Styles.fieldLabel}
          >
            Телефон
          </label>

          <InputMask
            mask={mask}
            value={formData.phone}
            onChange={e =>
              onChange(
                'phone',
                e.target.value
              )
            }
          >
            {(inputProps: any) => (
              <input
                {...inputProps}
                id="question-phone"
                type="tel"
                placeholder="+7 (___) ___-____"
                required
                className={
                  Styles.contactInput
                }
              />
            )}
          </InputMask>
        </div>

      </div>


      {/* ВОПРОС */}

      <div className={Styles.fieldGroup}>

        <label
          htmlFor="question-message"
          className={Styles.fieldLabel}
        >
          Ваш вопрос
        </label>

        <textarea
          id="question-message"
          placeholder="Коротко опишите ваш вопрос или задачу..."
          value={formData.message}
          onChange={e =>
            onChange(
              'message',
              e.target.value
            )
          }
          rows={4}
          required
        />

      </div>


      {/* СОГЛАСИЯ */}

      <div className={Styles.agreements}>

        {/* СОГЛАСИЕ 1 */}

        <div className={Styles.checkboxWrapper}>

          <label
            className={`${Styles.checkbox} ${
              errors.agreement
                ? Styles.error
                : ''
            }`}
          >

            <input
              type="checkbox"
              checked={formData.agreement}
              onChange={e =>
                handleCheckboxChange(
                  'agreement',
                  e.target.checked
                )
              }
            />

            <span
              className={
                Styles.customCheckbox
              }
            />

            <span
              className={
                Styles.checkboxText
              }
            >
              Я даю согласие на{' '}

              <a
                href="/file/personal_data_v1.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                обработку моих персональных данных
              </a>{' '}

              в целях рассмотрения моего обращения.
            </span>

          </label>

          {errors.agreement && (
            <div
              className={
                Styles.errorText
              }
            >
              Необходимо дать согласие
              на обработку персональных данных
            </div>
          )}

        </div>


        {/* СОГЛАСИЕ 2 */}

        <div className={Styles.checkboxWrapper}>

          <label
            className={`${Styles.checkbox} ${
              errors.privacyAgreement
                ? Styles.error
                : ''
            }`}
          >

            <input
              type="checkbox"
              checked={
                formData.privacyAgreement
              }
              onChange={e =>
                handleCheckboxChange(
                  'privacyAgreement',
                  e.target.checked
                )
              }
            />

            <span
              className={
                Styles.customCheckbox
              }
            />

            <span
              className={
                Styles.checkboxText
              }
            >
              С{' '}

              <a
                href="/file/privacy_v1.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                политикой конфиденциальности
              </a>{' '}

              ознакомлен(а).
            </span>

          </label>

          {errors.privacyAgreement && (
            <div
              className={
                Styles.errorText
              }
            >
              Необходимо подтвердить
              ознакомление с политикой
              конфиденциальности
            </div>
          )}

        </div>

      </div>


      {/* ОБЩАЯ ОШИБКА */}

      {agreementError &&
        (errors.agreement ||
          errors.privacyAgreement) && (
          <div
            className={
              Styles.errorTextGeneral
            }
          >
            Пожалуйста, отметьте
            все необходимые согласия
          </div>
        )}


      {/* ОТПРАВИТЬ */}

      <button
        type="submit"
        className={Styles.submitButton}
      >
        <span>Отправить вопрос</span>

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M5 12h13M13 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

    </form>
  );
};