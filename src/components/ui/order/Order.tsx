import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Styles from './order.module.scss';
import { ArrowLeft, ChevronDown, Download, LockKeyhole, MessageSquareText, ShoppingBag } from 'lucide-react';
import { CheckoutHeader } from '../checkout-header/CheckoutHeader';
import { formatCartPrice, getProductWord } from '../../utils/cartPresentation';

import { getCart, MAX_CART_ITEMS, CART_LIMIT_MESSAGE, removeOrderedItems, type CartItem } from '../../utils/cartStorage';

import { finishOrderRequest, getOrderRequestId } from '../../utils/orderRequest';
import type { OrderPdfData, OrderReceipt } from '../../utils/orderPdf';
import { useFormDraft } from '../../../hooks/useFormDraft';

const emptyForm = {
  name: '',
  position: '',
  company: '',
  email: '',
  phone: '',
  comment: '',
  consent: false,
  offerAgreement: false,
};

type OrderProps = {
  onBack: () => void;
  onFinish?: () => void;
  onClose?: () => void;
  active?: boolean;
};

type Errors = {
  name?: string;
  position?: string;
  company?: string;
  email?: string;
  phone?: string;
  consent?: string;
  offerAgreement?: string;
};

type FieldConfig = {
  key: 'name' | 'position' | 'company' | 'email' | 'phone';
  label: string;
  type?: 'text' | 'email' | 'tel';
  autocomplete?: string;
};

const FIELDS: FieldConfig[] = [
  {
    key: 'name',
    label: 'ФИО',
    type: 'text',
    autocomplete: 'name',
  },
  {
    key: 'company',
    label: 'Компания',
    type: 'text',
    autocomplete: 'organization',
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    autocomplete: 'email',
  },
  {
    key: 'phone',
    label: 'Телефон',
    type: 'tel',
    autocomplete: 'tel',
  },
];

/* =========================================================
   ICONS
   ========================================================= */

const UserIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 21a8 8 0 0 0-16 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="7" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18M10 12v2h4v-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M7.2 3.5 5 4.4a2 2 0 0 0-1.2 2.3c1.2 6.2 7.3 12.3 13.5 13.5a2 2 0 0 0 2.3-1.2l.9-2.2a1.5 1.5 0 0 0-.7-1.9l-2.7-1.4a1.5 1.5 0 0 0-1.8.3l-1.2 1.2a13.6 13.6 0 0 1-4.4-4.4l1.2-1.2a1.5 1.5 0 0 0 .3-1.8L9.1 4.2a1.5 1.5 0 0 0-1.9-.7Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.2-.6L4 20l1.4-3.5A7.2 7.2 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.4 8 7.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 5h2l1.5 10h10.7L20 8H7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="19" r="1.2" fill="currentColor" />
    <circle cx="17" cy="19" r="1.2" fill="currentColor" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m6 12.5 4 4L18.5 8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* =========================================================
   ORDER
   ========================================================= */

export const Order = ({ onBack, onFinish = onBack, onClose = onFinish, active = true }: OrderProps) => {
  const formId = useId();
  const [cart, setCart] = useState<CartItem[]>([]);

  const [form, setForm, clearDraft] = useFormDraft('order', emptyForm);
  const { name, position, company, email, phone, comment, consent, offerAgreement } = form;
  const setField = <K extends keyof typeof emptyForm,>(field: K, value: (typeof emptyForm)[K]) => {
    setForm(previous => ({ ...previous, [field]: value }));
  };
  const [acceptedDocument, setAcceptedDocument] = useState<OrderPdfData | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const pdfPendingRef = useRef(false);

  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const submitErrorRef = useRef<HTMLParagraphElement | null>(null);

  const consentRef = useRef<HTMLDivElement | null>(null);

  const offerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (active && getCart().length > 0) {
      setSuccessMessage('');
      setAcceptedDocument(null);
      setPdfError('');
    }
  }, [active]);

  useEffect(() => {
    if (active && submitError) submitErrorRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [active, submitError]);

  /* =========================================================
     CART
     ========================================================= */

  useEffect(() => {
    const updateCart = () => {
      setCart(getCart());
    };

    updateCart();

    window.addEventListener('cartUpdated', updateCart);

    return () => {
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  /* =========================================================
     PRICE
     ========================================================= */

  const parsePrice = (price: string) => {
    const normalized = price
      .replace(/\s/g, '')
      .replace(/[^\d.,-]/g, '')
      .replace(',', '.');

    const result = Number(normalized);

    return Number.isFinite(result) ? result : 0;
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + parsePrice(item.price) * item.count, 0);
  }, [cart]);

  const totalCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.count, 0);
  }, [cart]);

  /* =========================================================
     VALIDATION
     ========================================================= */

  const validateField = (key: keyof Errors, value: string): string | undefined => {
    const trimmed = value.trim();

    switch (key) {
      case 'position':
        return undefined;
      case 'email':
        if (!trimmed) {
          return 'Обязательно заполнить';
        }

        return /^\S+@\S+\.\S+$/.test(trimmed) ? undefined : 'Введите корректный email';

      case 'phone': {
        if (!trimmed) {
          return 'Обязательно заполнить';
        }

        const normalizedPhone = trimmed.replace(/[\s()-]/g, '');

        return /^\+?\d{10,15}$/.test(normalizedPhone) ? undefined : 'Введите корректный номер телефона';
      }

      default:
        return trimmed ? undefined : 'Обязательно заполнить';
    }
  };

  const updateField = (key: keyof Errors, value: string, setter: (value: string) => void) => {
    setter(value);

    /*
     * Важно:
     * если пользователь начал редактировать поле,
     * ошибка сразу пересчитывается.
     */
    setErrors((prev) => ({
      ...prev,
      [key]: prev[key] ? validateField(key, value) : undefined,
    }));
  };

  /* =========================================================
     SCROLL TO ERROR
     ========================================================= */

  const scrollToElement = (element: HTMLElement | null) => {
    if (!element || !contentRef.current) {
      return;
    }

    const container = contentRef.current;

    const elementTop = element.getBoundingClientRect().top;

    const containerTop = container.getBoundingClientRect().top;

    const offset = 24;

    container.scrollTo({
      top: container.scrollTop + elementTop - containerTop - offset,
      behavior: 'smooth',
    });
  };

  const handlePdfDownload = async () => {
    if (!acceptedDocument || pdfPendingRef.current) return;
    pdfPendingRef.current = true;
    setIsGeneratingPdf(true);
    setPdfError('');
    try {
      const { downloadOrderPdf } = await import('../../utils/orderPdf');
      await downloadOrderPdf(acceptedDocument);
    } catch {
      setPdfError('Не удалось подготовить PDF. Попробуйте скачать ещё раз.');
    } finally {
      pdfPendingRef.current = false;
      setIsGeneratingPdf(false);
    }
  };

  /* =========================================================
     SUBMIT
     ========================================================= */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submittingRef.current) {
      return;
    }

    setSubmitError('');

    if (!cart.length) {
      return;
    }
    if (cart.length > MAX_CART_ITEMS) {
      setSubmitError(CART_LIMIT_MESSAGE);
      return;
    }

    /*
     * Формируем ошибки заново.
     * Поэтому после нажатия кнопки ВСЕ
     * пустые обязательные поля подсветятся.
     */
    const newErrors: Errors = {
      name: validateField('name', name),
      position: validateField('position', position),
      company: validateField('company', company),
      email: validateField('email', email),
      phone: validateField('phone', phone),
      consent: consent ? undefined : 'Необходимо дать согласие на обработку персональных данных',
      offerAgreement: offerAgreement ? undefined : 'Необходимо подтвердить ознакомление с офертой и условиями возврата',
    };

    setErrors(newErrors);

    /*
     * Находим первое обязательное поле
     * с ошибкой.
     */
    const firstInvalidKey = FIELDS.find(({ key }) => newErrors[key])?.key;
    if (firstInvalidKey) {
      const field = document.getElementById(`${formId}-${firstInvalidKey}`);
      field?.focus({ preventScroll: true });
      scrollToElement(field);
      return;
    }

    if (newErrors.consent) {
      consentRef.current?.querySelector('input')?.focus({ preventScroll: true });
      scrollToElement(consentRef.current);

      return;
    }

    if (newErrors.offerAgreement) {
      offerRef.current?.querySelector('input')?.focus({ preventScroll: true });
      scrollToElement(offerRef.current);

      return;
    }

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    const orderData = {
      name: name.trim(),
      position: position.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      comment: comment.trim(),
      cart: cart.map((item) => ({ sku: item.cartKey, count: item.count })),
      consent,
      offerAgreement,
    };

    const orderedItems = cart.map(({ cartKey, count, lineId }) => ({ cartKey, count, lineId }));

    submittingRef.current = true;
    try {
      setIsSubmitting(true);
      const requestId = await getOrderRequestId(orderData);
      const requestData = { ...orderData, requestId };

      const response = await fetch('/sendOrder.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
        orderId?: string;
        confirmationSent?: boolean;
        receipt?: OrderReceipt;
      };

      if (response.ok && result.success) {
        setSuccessMessage('Спасибо за заказ!');
        setConfirmedOrderId(result.orderId || '');
        setConfirmationSent(result.confirmationSent === true);
        setConfirmationEmail(email.trim());
        setAcceptedDocument(
          result.receipt
            ? {
                receipt: result.receipt,
                contact: {
                  name: orderData.name,
                  company: orderData.company,
                  position: orderData.position,
                  email: orderData.email,
                  phone: orderData.phone,
                  comment: orderData.comment,
                },
              }
            : null,
        );
        setPdfError('');

        removeOrderedItems(orderedItems, requestId);
        finishOrderRequest(requestId);

        clearDraft();
        setErrors({});

        contentRef.current?.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        setSubmitError(result.error || 'Не удалось отправить заказ. Попробуйте ещё раз.');
      }
    } catch (error) {
      console.error(error);

      setSubmitError('Ошибка сети. Проверьте подключение и попробуйте ещё раз.');
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     FIELD VALUES
     ========================================================= */

  const fieldValues: Record<FieldConfig['key'], string> = {
    name,
    position,
    company,
    email,
    phone,
  };

  const fieldSetters: Record<FieldConfig['key'], (value: string) => void> = {
    name: value => setField('name', value),
    position: value => setField('position', value),
    company: value => setField('company', value),
    email: value => setField('email', value),
    phone: value => setField('phone', value),
  };

  const fieldIcons: Record<FieldConfig['key'], React.ReactNode> = {
    name: <UserIcon />,
    position: <BriefcaseIcon />,
    company: <BriefcaseIcon />,
    email: <MailIcon />,
    phone: <PhoneIcon />,
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className={Styles.orderPage}>
      {/* HEADER */}

      <CheckoutHeader
        title={successMessage ? 'Заявка отправлена' : 'Оформление заявки'}
        onClose={onClose}
        backAction={
          !successMessage && (
            <button type="button" onClick={onBack} aria-label="Вернуться в корзину" title="Назад в корзину">
              <ArrowLeft size={18} aria-hidden="true" />
              <span>Назад в корзину</span>
            </button>
          )
        }
      />

      {/* CONTENT */}

      <div ref={contentRef} className={Styles.content}>
        <AnimatePresence mode="wait">
          {successMessage ? (
            <motion.div
              key="success"
              className={Styles.successWrapper}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <div className={Styles.successCard} role="status">
                <div className={Styles.successIcon}>
                  <CheckIcon />
                </div>

                <div className={Styles.successContent}>
                  <span className={Styles.successEyebrow}>Заявка отправлена</span>

                  <h2>Заявка успешно отправлена</h2>

                  <p>Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.</p>

                  {confirmedOrderId && (
                    <p className={Styles.successReference}>
                      Номер заявки: <strong>{confirmedOrderId}</strong>
                    </p>
                  )}
                  <p>
                    {confirmationSent
                      ? `Состав заказа и номер заявки отправлены на ${confirmationEmail}.`
                      : 'Заявка принята, но письмо с подтверждением отправить не удалось. Сохраните номер заявки.'}
                  </p>

                  <div className={Styles.successActions}>
                    {acceptedDocument && (
                      <button
                        type="button"
                        className={Styles.pdfButton}
                        onClick={handlePdfDownload}
                        disabled={isGeneratingPdf}
                        aria-busy={isGeneratingPdf}
                      >
                        <Download size={18} aria-hidden="true" />
                        {isGeneratingPdf ? 'Готовим PDF…' : 'Скачать заявку в PDF'}
                      </button>
                    )}
                    <button type="button" className={Styles.successButton} onClick={onFinish}>
                      Закрыть
                    </button>
                  </div>
                  {pdfError && (
                    <p className={Styles.pdfError} role="alert">
                      {pdfError}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ) : !cart.length ? (
            <motion.div
              key="empty"
              className={Styles.emptyState}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <div className={Styles.emptyIcon}>
                <CartIcon />
              </div>

              <h2>Корзина пуста</h2>

              <p>Добавьте товары в корзину, чтобы оформить заказ.</p>

              <button type="button" className={Styles.emptyButton} onClick={onBack}>
                Вернуться в корзину
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="order"
              className={Styles.checkoutLayout}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.22,
              }}
            >
              {/* LEFT — FORM */}

              <form className={Styles.formCard} onSubmit={handleSubmit} noValidate id={formId} aria-busy={isSubmitting}>
                <div className={Styles.formHeader}>
                  <h2>Кто оформляет заявку</h2>
                  <p>Укажите контакты для связи с менеджером. Поля со звёздочкой * обязательны.</p>
                </div>

                {/* FIELDS */}

                <div className={Styles.fields}>
                  {FIELDS.map((field) => {
                    const value = fieldValues[field.key];

                    const error = errors[field.key];

                    return (
                      <div key={field.key} className={`${Styles.field} ${error ? Styles.fieldError : ''}`}>
                        <div className={Styles.inputWrapper}>
                          <span className={Styles.fieldIcon} aria-hidden="true">
                            {fieldIcons[field.key]}
                          </span>

                          <input
                            id={`${formId}-${field.key}`}
                            name={field.key}
                            type={field.type || 'text'}
                            value={value}
                            autoComplete={field.autocomplete}
                            placeholder=" "
                            required
                            maxLength={field.key === 'company' ? 300 : field.key === 'email' ? 254 : field.key === 'phone' ? 30 : 200}
                            aria-invalid={Boolean(error)}
                            aria-describedby={error ? `${formId}-error-${field.key}` : undefined}
                            onChange={(event) => updateField(field.key, event.target.value, fieldSetters[field.key])}
                            onBlur={(event) => {
                              const fieldValue = event.target.value;

                              setErrors((prev) => ({
                                ...prev,
                                [field.key]: validateField(field.key, fieldValue),
                              }));
                            }}
                          />

                          <label htmlFor={`${formId}-${field.key}`}>
                            {field.label} <span aria-hidden="true">*</span>
                          </label>
                        </div>

                        {error && (
                          <span id={`${formId}-error-${field.key}`} className={Styles.errorText}>
                            {error}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <details className={Styles.optionalDetails}>
                  <summary>
                    <span className={Styles.disclosureIcon}>
                      <MessageSquareText size={19} aria-hidden="true" />
                    </span>
                    <span className={Styles.disclosureText}>
                      <span className={Styles.disclosureTitle}>Должность и комментарий</span>
                      <span className={Styles.disclosureHint}>Необязательно</span>
                    </span>
                    <ChevronDown size={18} className={Styles.disclosureChevron} aria-hidden="true" />
                  </summary>
                  <div className={Styles.optionalFields}>
                    <div className={Styles.inputWrapper}>
                      <span className={Styles.fieldIcon} aria-hidden="true">
                        <BriefcaseIcon />
                      </span>
                      <input
                        id={`${formId}-position`}
                        name="position"
                        autoComplete="organization-title"
                        value={position}
                        maxLength={200}
                        placeholder=" "
                        onChange={(event) => setField('position', event.target.value)}
                      />
                      <label htmlFor={`${formId}-position`}>Должность</label>
                    </div>
                    <div className={`${Styles.inputWrapper} ${Styles.commentInputWrapper}`}>
                      <span className={Styles.fieldIcon} aria-hidden="true">
                        <MessageIcon />
                      </span>
                      <textarea
                        id={`${formId}-comment`}
                        name="comment"
                        value={comment}
                        rows={3}
                        maxLength={5000}
                        placeholder=" "
                        onChange={(event) => setField('comment', event.target.value)}
                      />
                      <label htmlFor={`${formId}-comment`}>Комментарий к заявке</label>
                    </div>
                  </div>
                </details>

                {/* AGREEMENTS */}

                <div className={Styles.agreements}>
                  <h3>Подтверждение</h3>
                  {/* PERSONAL DATA */}

                  <div ref={consentRef} className={`${Styles.checkboxContainer} ${errors.consent ? Styles.errorState : ''}`}>
                    <label className={Styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={consent}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
                        onChange={(event) => {
                          const checked = event.target.checked;

                          setField('consent', checked);

                          setErrors((prev) => ({
                            ...prev,
                            consent: checked ? undefined : 'Необходимо дать согласие на обработку персональных данных',
                          }));
                        }}
                      />

                      <span className={Styles.customCheckbox} aria-hidden="true">
                        <CheckIcon />
                      </span>

                      <span className={Styles.checkboxText}>
                        Я даю согласие на{' '}
                        <a href="/file/personal_data_v1.pdf" target="_blank" rel="noopener noreferrer">
                          обработку моих персональных данных
                        </a>
                      </span>
                    </label>

                    {errors.consent && (
                      <span id={`${formId}-consent-error`} className={Styles.checkboxError}>
                        {errors.consent}
                      </span>
                    )}
                  </div>

                  {/* OFFER */}

                  <div ref={offerRef} className={`${Styles.checkboxContainer} ${errors.offerAgreement ? Styles.errorState : ''}`}>
                    <label className={Styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={offerAgreement}
                        aria-invalid={Boolean(errors.offerAgreement)}
                        aria-describedby={errors.offerAgreement ? `${formId}-offer-error` : undefined}
                        onChange={(event) => {
                          const checked = event.target.checked;

                          setField('offerAgreement', checked);

                          setErrors((prev) => ({
                            ...prev,
                            offerAgreement: checked ? undefined : 'Необходимо подтвердить ознакомление с офертой и условиями возврата',
                          }));
                        }}
                      />

                      <span className={Styles.customCheckbox} aria-hidden="true">
                        <CheckIcon />
                      </span>

                      <span className={Styles.checkboxText}>
                        Я ознакомлен(а) и согласен(на) с{' '}
                        <a href="/file/offer_v1.pdf" target="_blank" rel="noopener noreferrer">
                          договором оферты
                        </a>{' '}
                        и{' '}
                        <a href="/file/return_v1.pdf" target="_blank" rel="noopener noreferrer">
                          условиями возврата
                        </a>
                      </span>
                    </label>

                    {errors.offerAgreement && (
                      <span id={`${formId}-offer-error`} className={Styles.checkboxError}>
                        {errors.offerAgreement}
                      </span>
                    )}
                  </div>
                </div>

                {/* SUBMIT */}

                {submitError && (
                  <p ref={submitErrorRef} className={Styles.submitError} role="alert">
                    {submitError}
                  </p>
                )}
                <div className={Styles.formSubmit}>
                  <div className={Styles.finalTotal}>
                    <span>Стоимость товаров без НДС</span>
                    <strong>{formatCartPrice(totalPrice)} ₽</strong>
                  </div>
                  <motion.button
                    type="submit"
                    className={Styles.submitButton}
                    disabled={isSubmitting}
                    whileTap={
                      !isSubmitting
                        ? {
                            scale: 0.985,
                          }
                        : undefined
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <span className={Styles.spinner} />
                        Отправляем заявку...
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <span className={Styles.submitArrow}>
                          <ArrowIcon />
                        </span>
                      </>
                    )}
                  </motion.button>
                  <p className={Styles.paymentNote}>
                    <LockKeyhole size={15} aria-hidden="true" /> Заявка без онлайн-оплаты
                  </p>
                  <p className={Styles.nextStepNote}>После отправки менеджер уточнит комплектацию, сроки и доставку.</p>
                </div>
              </form>

              {/* RIGHT — ORDER SUMMARY */}

              <aside className={Styles.summaryColumn}>
                <section className={Styles.summaryCard} aria-label="Стоимость заявки">
                  <h2>Ваш заказ</h2>
                  <div className={Styles.total}>
                    <span>Стоимость товаров</span>
                    <strong>{formatCartPrice(totalPrice)} ₽</strong>
                  </div>
                  <p className={Styles.vat}>Без НДС · доставка согласуется отдельно</p>
                </section>
                <section className={Styles.summaryProducts} aria-label="Состав заявки" data-expanded={summaryExpanded}>
                  <button
                    type="button"
                    className={Styles.summaryToggle}
                    aria-expanded={summaryExpanded}
                    aria-controls={`${formId}-products`}
                    onClick={() => setSummaryExpanded((expanded) => !expanded)}
                  >
                    <span className={Styles.disclosureIcon}>
                      <ShoppingBag size={19} aria-hidden="true" />
                    </span>
                    <span className={Styles.disclosureText}>
                      <span className={Styles.disclosureTitle}>Состав заявки</span>
                      <span className={Styles.disclosureHint}>
                        {totalCount} {getProductWord(totalCount)}
                      </span>
                    </span>
                    <ChevronDown size={18} className={Styles.disclosureChevron} aria-hidden="true" />
                  </button>
                  <div
                    id={`${formId}-products`}
                    className={Styles.products}
                    hidden={!summaryExpanded}
                    role="region"
                    aria-label="Товары в заявке"
                    tabIndex={summaryExpanded ? 0 : -1}
                  >
                    {cart.map((item) => (
                      <div key={item.cartKey} className={Styles.product}>
                        <div className={Styles.productImage}>{item.image ? <img src={item.image} alt="" /> : <CartIcon />}</div>
                        <div className={Styles.productInfo}>
                          <span className={Styles.productTitle}>{item.title}</span>
                          <span className={Styles.productMeta}>
                            {item.count} × {item.price} ₽
                          </span>
                          <span className={Styles.productMeta}>Поставка: {item.deliveryTime || 'по запросу'}</span>
                          <strong className={Styles.productPrice}>{formatCartPrice(parsePrice(item.price) * item.count)} ₽</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
