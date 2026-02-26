import React, { useState, useEffect } from 'react';
import Styles from './question-form.module.scss';
import { QuestionForm } from './QuestionForm';

const REOPEN_DELAY = 30000; // 30 секунд
const STORAGE_KEY = 'questionFormClosedAt';

export const QuestionFormWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Проверяем при загрузке — можно ли открывать форму
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
      setIsOpen(false);

      const timer = setTimeout(() => {
        setIsOpen(true);
      }, REOPEN_DELAY - diff);

      return () => clearTimeout(timer);
    }
  }, []);

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