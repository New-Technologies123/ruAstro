import React, { useState, useEffect } from 'react';
import Styles from './question-form.module.scss';
import { QuestionForm } from './QuestionForm';

const REOPEN_DELAY = 30000;
const STORAGE_KEY = 'questionFormClosedAt';

export const QuestionFormWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agreement: false,        // согласие на обработку данных
    privacyAgreement: false, // согласие с политикой конфиденциальности
  });

  const [submitted, setSubmitted] = useState(false);
  const [agreementError, setAgreementError] = useState(false);

  useEffect(() => {
    const closedAt = localStorage.getItem(STORAGE_KEY);

    if (!closedAt) {
      setIsOpen(true);
      return;
    }

    const diff = Date.now() - Number(closedAt);

    if (diff >= REOPEN_DELAY) {
      setIsOpen(true);
    } else {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, REOPEN_DELAY - diff);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Сбрасываем ошибку если оба чекбокса отмечены
    if ((field === 'agreement' || field === 'privacyAgreement') && value === true) {
      // Проверяем оба чекбокса после изменения
      const newAgreement = field === 'agreement' ? value : formData.agreement;
      const newPrivacyAgreement = field === 'privacyAgreement' ? value : formData.privacyAgreement;
      
      if (newAgreement && newPrivacyAgreement) {
        setAgreementError(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем оба чекбокса
    if (!formData.agreement || !formData.privacyAgreement) {
      setAgreementError(true);
      return;
    }

    try {
      const response = await fetch('/send-question.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          agreement: false,
          privacyAgreement: false,
        });
        setTimeout(() => setSubmitted(false), 3000);
        
        // Закрываем окно через 1 секунду после успешной отправки
        setTimeout(() => {
          setIsOpen(false);
          localStorage.setItem(STORAGE_KEY, Date.now().toString());
        }, 1000);
      } else {
        alert('Ошибка отправки: ' + result.error);
      }
    } catch {
      alert('Ошибка соединения с сервером');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  };

  return (
    <>
      <button
        className={`${Styles.chatButton} ${Styles.attention}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={Styles.shake}>💬</span>
      </button>

      {isOpen && (
        <div className={Styles.chatWindow}>
          <div className={Styles.chatHeader}>
            <span>Задать вопрос</span>
            <button onClick={handleClose}>✕</button>
          </div>

          <QuestionForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            agreementError={agreementError}
          />

          {submitted && (
            <div className={Styles.successMessage}>
              ✅ Запрос принят! Мы свяжемся с вами в ближайшее время.
            </div>
          )}
        </div>
      )}
    </>
  );
};