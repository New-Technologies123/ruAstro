import React, { useState } from 'react';
import Styles from './question-form.module.scss';
import { QuestionForm } from './QuestionForm';

export const QuestionFormWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // чат открывается сразу
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <button
        className={`${Styles.chatButton} ${Styles.attention}`} // ✅ всегда пульсирует
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={Styles.shake}>💬</span> {/* трясётся всегда */}
      </button>

      {isOpen && (
        <div className={Styles.chatWindow}>
          <div className={Styles.chatHeader}>
            <span>Задать вопрос</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <QuestionForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />

          {submitted && (
            <div className={`${Styles.successMessage} ${submitted ? '' : Styles['fade-out']}`}>
              ✅ Запрос принят!
            </div>
          )}
        </div>
      )}
    </>
  );
};
