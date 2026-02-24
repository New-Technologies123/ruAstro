import React, { useState, useEffect } from 'react';
import Styles from './question-form.module.scss';
import { QuestionForm } from './QuestionForm';

export const QuestionFormWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/send-question.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert('Ошибка отправки: ' + result.error);
      }

    } catch (error) {
      alert('Ошибка соединения с сервером');
    }
  };

  // Авто-открытие через 30 секунд после закрытия
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isOpen) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 30000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

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
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <QuestionForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          {submitted && (
            <div className={Styles.successMessage}>
              ✅ Запрос принят!
            </div>
          )}
        </div>
      )}
    </>
  );
};