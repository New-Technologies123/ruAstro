import React, { useEffect, useRef, useState } from 'react';
import Styles from './question-form.module.scss';
import { QuestionForm } from './QuestionForm';
import type { QuestionFormData } from './QuestionForm';

const emptyForm: QuestionFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
  agreement: false,
  privacyAgreement: false,
};

export const QuestionFormWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<QuestionFormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (window.matchMedia('(pointer: coarse)').matches) {
      dialogRef.current?.focus();
    } else {
      dialogRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setSubmitted(false);
        window.requestAnimationFrame(() => toggleRef.current?.focus());
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setSubmitted(false);
    window.requestAnimationFrame(() => toggleRef.current?.focus());
  };

  const handleChange = (field: keyof QuestionFormData, value: string | boolean) => {
    setFormData(previous => ({ ...previous, [field]: value }));
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/send-question.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setSubmitError(result.error || 'Не удалось отправить вопрос. Попробуйте ещё раз.');
        return;
      }

      setFormData(emptyForm);
      setSubmitted(true);
    } catch {
      setSubmitError('Нет соединения с сервером. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={Styles.questionWidget}>
      <button
        ref={toggleRef}
        type="button"
        className={`${Styles.chatButton} ${isOpen ? Styles.chatButtonOpen : ''}`}
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        aria-label={isOpen ? 'Закрыть форму вопроса' : 'Задать вопрос'}
        aria-expanded={isOpen}
        aria-controls="question-dialog"
        title="Задать вопрос"
      >
        <span className={Styles.buttonGlow} />
        <span className={Styles.buttonIcon}>
          {isOpen ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 11.5a7.5 7.5 0 01-8 7.5 8.2 8.2 0 01-3.2-.7L4 20l1.5-4.1A7.4 7.4 0 014 11.5 7.5 7.5 0 0112 4a7.5 7.5 0 018 7.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          )}
        </span>
        {!isOpen && <span className={Styles.buttonDot} />}
      </button>

      {isOpen && (
        <div
          ref={dialogRef}
          id="question-dialog"
          className={Styles.chatWindow}
          role="dialog"
          tabIndex={-1}
          aria-labelledby="question-dialog-title"
          aria-describedby="question-dialog-description"
        >
          <div className={Styles.chatHeader}>
            <div className={Styles.headerIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 15.5v-8Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <path d="m5 7 7 5 7-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={Styles.headerText}>
              <h2 id="question-dialog-title">Задать вопрос</h2>
              <p id="question-dialog-description">Расскажите, чем мы можем помочь</p>
            </div>
            <button type="button" className={Styles.closeButton} onClick={handleClose} aria-label="Закрыть форму">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className={Styles.chatBody}>
            {submitted ? (
              <div className={Styles.successMessage} role="status">
                <span className={Styles.successIcon} aria-hidden="true">✓</span>
                <h3>Вопрос отправлен</h3>
                <p>Спасибо! Мы ответим по указанным контактам.</p>
                <button type="button" className={Styles.successCloseButton} onClick={handleClose}>Закрыть</button>
              </div>
            ) : (
              <QuestionForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
