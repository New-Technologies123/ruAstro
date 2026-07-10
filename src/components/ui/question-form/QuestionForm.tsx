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
  onChange: (field: string, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  formData,
  agreementError,
  onChange,
  onSubmit,
}) => {
  const [mask] = React.useState('+7 (999) 999-9999');
  const [errors, setErrors] = React.useState({
    agreement: false,
    privacyAgreement: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      agreement: !formData.agreement,
      privacyAgreement: !formData.privacyAgreement
    };
    
    setErrors(newErrors);
    
    if (newErrors.agreement || newErrors.privacyAgreement) {
      return;
    }
    
    onSubmit(e);
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    onChange(field, checked);
    if (checked) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  return (
    <form className={Styles.questionForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ваше имя"
        value={formData.name}
        onChange={e => onChange('name', e.target.value)}
        required
      />

      {/* Контейнер для email и телефона в одну строку */}
      <div className={Styles.contactRow}>
        <input
          type="email"
          placeholder="Email для ответа"
          value={formData.email}
          onChange={e => onChange('email', e.target.value)}
          required
          className={Styles.contactInput}
        />

        <InputMask
          mask={mask}
          value={formData.phone}
          onChange={e => onChange('phone', e.target.value)}
        >
          {(inputProps: any) => (
            <input 
              {...inputProps} 
              type="tel" 
              placeholder="Телефон" 
              required 
              className={Styles.contactInput}
            />
          )}
        </InputMask>
      </div>

      <textarea
        placeholder="Ваш вопрос"
        value={formData.message}
        onChange={e => onChange('message', e.target.value)}
        rows={4}
        required
      />
      
      <div>
        {/* Первый чекбокс - согласие на обработку данных */}
        <div className={Styles.checkboxWrapper}>
          <label className={`${Styles.checkbox} ${errors.agreement ? Styles.error : ''}`}>
            <input
              type="checkbox"
              checked={formData.agreement}
              onChange={e => handleCheckboxChange('agreement', e.target.checked)}
            />
            <span className={Styles.customCheckbox}></span>
            <span className={Styles.checkboxText}>
              Я даю согласие на
              <a href="/file/personal_data_v1.pdf" target="_blank">
                 обработку моих персональных данных
              </a> 
              в целях рассмотрения моего обращения.
            </span>
          </label>
          {errors.agreement && (
            <div className={Styles.errorText}>
              ⚠️ Необходимо дать согласие на обработку персональных данных
            </div>
          )}
        </div>

        {/* Второй чекбокс - согласие с политикой конфиденциальности */}
        <div className={Styles.checkboxWrapper}>
          <label className={`${Styles.checkbox} ${errors.privacyAgreement ? Styles.error : ''}`}>
            <input
              type="checkbox"
              checked={formData.privacyAgreement}
              onChange={e => handleCheckboxChange('privacyAgreement', e.target.checked)}
            />
            <span className={Styles.customCheckbox}></span>
            <span className={Styles.checkboxText}>
              С <a href="/file/privacy_v1.pdf" target="_blank">политикой конфиденциальности</a> 
              ознакомлен(а).
            </span>
          </label>
          {errors.privacyAgreement && (
            <div className={Styles.errorText}>
              ⚠️ Необходимо подтвердить ознакомление с политикой конфиденциальности
            </div>
          )}
        </div>
      </div>

      {agreementError && (errors.agreement || errors.privacyAgreement) && (
        <div className={Styles.errorTextGeneral}>
          Пожалуйста, отметьте все необходимые согласия
        </div>
      )}

      <button type="submit">Отправить вопрос</button>
    </form>
  );
};