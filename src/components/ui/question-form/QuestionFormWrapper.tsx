import React, { useEffect, useState } from 'react';
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
    agreement: false,
    privacyAgreement: false,
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
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, REOPEN_DELAY - diff);

    return () => window.clearTimeout(timer);
  }, []);

  const handleChange = (
    field: string,
    value: string | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (
      (field === 'agreement' ||
        field === 'privacyAgreement') &&
      value === true
    ) {
      const newAgreement =
        field === 'agreement'
          ? Boolean(value)
          : formData.agreement;

      const newPrivacyAgreement =
        field === 'privacyAgreement'
          ? Boolean(value)
          : formData.privacyAgreement;

      if (newAgreement && newPrivacyAgreement) {
        setAgreementError(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.agreement ||
      !formData.privacyAgreement
    ) {
      setAgreementError(true);
      return;
    }

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

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          agreement: false,
          privacyAgreement: false,
        });

        window.setTimeout(() => {
          setSubmitted(false);
        }, 3000);

        window.setTimeout(() => {
          setIsOpen(false);

          localStorage.setItem(
            STORAGE_KEY,
            Date.now().toString()
          );
        }, 1000);
      } else {
        alert(
          'Ошибка отправки: ' +
            (result.error || 'Неизвестная ошибка')
        );
      }
    } catch {
      alert('Ошибка соединения с сервером');
    }
  };

  const handleClose = () => {
    setIsOpen(false);

    localStorage.setItem(
      STORAGE_KEY,
      Date.now().toString()
    );
  };

  return (
    <div className={Styles.questionWidget}>

      {/* =====================================================
          FLOATING CHAT BUTTON
      ====================================================== */}

      <button
        type="button"
        className={`${Styles.chatButton} ${
          isOpen ? Styles.chatButtonOpen : ''
        }`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={
          isOpen
            ? 'Закрыть форму вопроса'
            : 'Задать вопрос'
        }
        aria-expanded={isOpen}
      >
        <span className={Styles.buttonGlow} />

        <span className={Styles.buttonIcon}>
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M20 11.5a7.5 7.5 0 01-8 7.5
                   8.2 8.2 0 01-3.2-.7L4 20l1.5-4.1
                   A7.4 7.4 0 014 11.5
                   7.5 7.5 0 0112 4a7.5 7.5 0 018 7.5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              <path
                d="M8 11.5h.01M12 11.5h.01M16 11.5h.01"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>

        {!isOpen && (
          <span className={Styles.buttonDot} />
        )}
      </button>

      {/* =====================================================
          CHAT WINDOW
      ====================================================== */}

      {isOpen && (
        <div
          className={Styles.chatWindow}
          role="dialog"
          aria-label="Задать вопрос"
        >

          {/* HEADER */}

          <div className={Styles.chatHeader}>

            <div className={Styles.headerIcon}>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M20 11.5a7.5 7.5 0 01-8 7.5
                     8.2 8.2 0 01-3.2-.7L4 20l1.5-4.1
                     A7.4 7.4 0 014 11.5
                     7.5 7.5 0 0112 4a7.5 7.5 0 018 7.5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                <path
                  d="M8 11.5h.01M12 11.5h.01M16 11.5h.01"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className={Styles.headerText}>
              <h3>Задать вопрос</h3>

              <p>
                Расскажите, чем мы можем вам помочь
              </p>
            </div>

            <button
              type="button"
              className={Styles.closeButton}
              onClick={handleClose}
              aria-label="Закрыть"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

          </div>

          {/* BODY */}

          <div className={Styles.chatBody}>

            <QuestionForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              agreementError={agreementError}
            />

            {submitted && (
              <div className={Styles.successMessage}>

                <div className={Styles.successIcon}>
                  ✓
                </div>

                <div>
                  <strong>
                    Вопрос отправлен
                  </strong>

                  <span>
                    Мы свяжемся с вами в ближайшее время.
                  </span>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};