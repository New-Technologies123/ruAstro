import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import Styles from './order.module.scss';

import {
  getCart,
  clearCart,
  type CartItem,
} from '../../utils/cartStorage';

import back from '../../../images/back.svg';

type OrderProps = {
  onBack: () => void;
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
  key:
  | 'name'
  | 'position'
  | 'company'
  | 'email'
  | 'phone';
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
    key: 'position',
    label: 'Должность',
    type: 'text',
    autocomplete: 'organization-title',
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
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M20 21a8 8 0 0 0-16 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="7"
      r="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="7"
      width="18"
      height="13"
      rx="2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
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
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="m4 7 8 6 8-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
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
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
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
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M4 5h2l1.5 10h10.7L20 8H7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="9"
      cy="19"
      r="1.2"
      fill="currentColor"
    />
    <circle
      cx="17"
      cy="19"
      r="1.2"
      fill="currentColor"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="m6 12.5 4 4L18.5 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M5 12h13M13 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================================================
   STEPPER
   ========================================================= */

const CheckoutStepper = ({
  onCart,
}: {
  onCart: () => void;
}) => {
  return (
    <nav
      className={Styles.checkoutSteps}
      aria-label="Этап оформления заказа"
    >
      <button
        type="button"
        className={`${Styles.checkoutStep} ${Styles.checkoutStepCompleted}`}
        onClick={onCart}
        aria-label="Вернуться в корзину"
      >
        <span
          className={`${Styles.stepNumber} ${Styles.stepNumberCompleted}`}
        >
          <CheckIcon />
        </span>

        <span className={Styles.stepInfo}>
          <span className={Styles.stepLabel}>
            Корзина
          </span>

          <span className={Styles.stepDescription}>
            Товары
          </span>
        </span>
      </button>

      <span
        className={`${Styles.stepConnector} ${Styles.stepConnectorActive}`}
        aria-hidden="true"
      />

      <div
        className={`${Styles.checkoutStep} ${Styles.checkoutStepCurrent}`}
        aria-current="step"
      >
        <span
          className={`${Styles.stepNumber} ${Styles.stepNumberCurrent}`}
        >
          02
        </span>

        <span className={Styles.stepInfo}>
          <span className={Styles.stepLabel}>
            Оформление
          </span>

          <span className={Styles.stepDescription}>
            Контактные данные
          </span>
        </span>
      </div>
    </nav>
  );
};

/* =========================================================
   ORDER
   ========================================================= */

export const Order = ({
  onBack,
}: OrderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

  const [consent, setConsent] = useState(false);
  const [offerAgreement, setOfferAgreement] =
    useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] =
    useState('');

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const contentRef =
    useRef<HTMLDivElement | null>(null);

  const consentRef =
    useRef<HTMLDivElement | null>(null);

  const offerRef =
    useRef<HTMLDivElement | null>(null);

  /* =========================================================
     CART
     ========================================================= */

  useEffect(() => {
    const updateCart = () => {
      setCart(getCart());
    };

    updateCart();

    window.addEventListener(
      'cartUpdated',
      updateCart
    );

    return () => {
      window.removeEventListener(
        'cartUpdated',
        updateCart
      );
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

    return Number.isFinite(result)
      ? result
      : 0;
  };

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum +
        parsePrice(item.price) * item.count,
      0
    );
  }, [cart]);

  const totalCount = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.count,
      0
    );
  }, [cart]);

  /* =========================================================
     SUCCESS
     ========================================================= */

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSuccessMessage('');
    }, 10000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [successMessage]);

  /* =========================================================
     VALIDATION
     ========================================================= */

  const validateField = (
    key: keyof Errors,
    value: string
  ): string | undefined => {
    const trimmed = value.trim();

    switch (key) {
      case 'email':
        if (!trimmed) {
          return 'Обязательно заполнить';
        }

        return /^\S+@\S+\.\S+$/.test(trimmed)
          ? undefined
          : 'Введите корректный email';

      case 'phone': {
        if (!trimmed) {
          return 'Обязательно заполнить';
        }

        const normalizedPhone =
          trimmed.replace(/[\s()-]/g, '');

        return /^\+?\d{10,15}$/.test(
          normalizedPhone
        )
          ? undefined
          : 'Введите корректный номер телефона';
      }

      default:
        return trimmed
          ? undefined
          : 'Обязательно заполнить';
    }
  };

  const updateField = (
    key: keyof Errors,
    value: string,
    setter: (value: string) => void
  ) => {
    setter(value);

    /*
     * Важно:
     * если пользователь начал редактировать поле,
     * ошибка сразу пересчитывается.
     */
    setErrors(prev => ({
      ...prev,
      [key]:
        value.trim().length > 0
          ? validateField(key, value)
          : undefined,
    }));
  };

  /* =========================================================
     SCROLL TO ERROR
     ========================================================= */

  const scrollToElement = (
    element: HTMLElement | null
  ) => {
    if (
      !element ||
      !contentRef.current
    ) {
      return;
    }

    const container =
      contentRef.current;

    const elementTop =
      element.getBoundingClientRect().top;

    const containerTop =
      container
        .getBoundingClientRect()
        .top;

    const offset = 24;

    container.scrollTo({
      top:
        container.scrollTop +
        elementTop -
        containerTop -
        offset,
      behavior: 'smooth',
    });
  };

  /* =========================================================
     SUBMIT
     ========================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!cart.length) {
      return;
    }

    /*
     * Формируем ошибки заново.
     * Поэтому после нажатия кнопки ВСЕ
     * пустые обязательные поля подсветятся.
     */
    const newErrors: Errors = {
      name: validateField('name', name),
      position: validateField(
        'position',
        position
      ),
      company: validateField(
        'company',
        company
      ),
      email: validateField(
        'email',
        email
      ),
      phone: validateField(
        'phone',
        phone
      ),
      consent: consent
        ? undefined
        : 'Необходимо дать согласие на обработку персональных данных',
      offerAgreement: offerAgreement
        ? undefined
        : 'Необходимо подтвердить ознакомление с офертой и условиями возврата',
    };

    setErrors(newErrors);

    /*
     * Находим первое обязательное поле
     * с ошибкой.
     */
    const firstInvalidId =
      newErrors.name
        ? 'order-name'
        : newErrors.position
          ? 'order-position'
          : newErrors.company
            ? 'order-company'
            : newErrors.email
              ? 'order-email'
              : newErrors.phone
                ? 'order-phone'
                : null;

    if (firstInvalidId) {
      const firstInvalidField =
        document.getElementById(
          firstInvalidId
        );

      if (firstInvalidField) {
        scrollToElement(
          firstInvalidField
        );

        window.setTimeout(() => {
          firstInvalidField.focus();
        }, 250);
      }

      return;
    }

    if (newErrors.consent) {
      scrollToElement(
        consentRef.current
      );

      return;
    }

    if (newErrors.offerAgreement) {
      scrollToElement(
        offerRef.current
      );

      return;
    }

    if (
      Object.values(newErrors).some(
        Boolean
      )
    ) {
      return;
    }

    const orderData = {
      name: name.trim(),
      position: position.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      comment: comment.trim(),
      cart,
      consent,
      offerAgreement,
    };

    try {
      setIsSubmitting(true);

      const response = await fetch(
        '/sendOrder.php',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(
            orderData
          ),
        }
      );

      const result =
        (await response.json()) as {
          success?: boolean;
          error?: string;
        };

      if (
        response.ok &&
        result.success
      ) {
        setSuccessMessage(
          'Спасибо за заказ!'
        );

        setCart([]);
        clearCart();

        setName('');
        setPosition('');
        setCompany('');
        setEmail('');
        setPhone('');
        setComment('');

        setConsent(false);
        setOfferAgreement(false);
        setErrors({});

        contentRef.current?.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        alert(
          'Ошибка при отправке: ' +
          (result.error ||
            'Неизвестная ошибка')
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        'Ошибка сети. Попробуйте ещё раз.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     FIELD VALUES
     ========================================================= */

  const fieldValues: Record<
    FieldConfig['key'],
    string
  > = {
    name,
    position,
    company,
    email,
    phone,
  };

  const fieldSetters: Record<
    FieldConfig['key'],
    (value: string) => void
  > = {
    name: setName,
    position: setPosition,
    company: setCompany,
    email: setEmail,
    phone: setPhone,
  };

  const fieldIcons: Record<
    FieldConfig['key'],
    React.ReactNode
  > = {
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

      <header className={Styles.header}>
        <button
          type="button"
          className={Styles.backButton}
          onClick={onBack}
          aria-label="Вернуться в корзину"
        >
          <img
            src={back.src}
            alt=""
            aria-hidden="true"
          />

          <span>Корзина</span>
        </button>

        <div className={Styles.headerCenter}>
          <h1>Оформление заказа</h1>
          <span>
            Контактные данные
          </span>
        </div>

        <div className={Styles.headerRight}>
          {totalCount > 0 && (
            <>
              <CartIcon />
              <span>
                {totalCount}{' '}
                {totalCount === 1
                  ? 'товар'
                  : totalCount >= 2 &&
                    totalCount <= 4
                    ? 'товара'
                    : 'товаров'}
              </span>
            </>
          )}
        </div>
      </header>

      {/* STEPPER */}

      {cart.length > 0 && (
        <CheckoutStepper
          onCart={onBack}
        />
      )}

      {/* CONTENT */}

      <div
        ref={contentRef}
        className={Styles.content}
      >
        <AnimatePresence mode="wait">
          {successMessage ? (
            <motion.div
              key="success"
              className={
                Styles.successWrapper
              }
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
              <div
                className={
                  Styles.successCard
                }
              >
                <div
                  className={
                    Styles.successIcon
                  }
                >
                  <CheckIcon />
                </div>

                <div
                  className={
                    Styles.successContent
                  }
                >
                  <span
                    className={
                      Styles.successEyebrow
                    }
                  >
                    Заказ оформлен
                  </span>

                  <h2>
                    Заказ успешно
                    отправлен
                  </h2>

                  <p>
                    Спасибо! Мы получили
                    вашу заявку и свяжемся
                    с вами в ближайшее
                    время.
                  </p>

                  <button
                    type="button"
                    className={
                      Styles.successButton
                    }
                    onClick={onBack}
                  >
                    Вернуться в корзину
                  </button>
                </div>
              </div>
            </motion.div>
          ) : !cart.length ? (
            <motion.div
              key="empty"
              className={
                Styles.emptyState
              }
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <div
                className={
                  Styles.emptyIcon
                }
              >
                <CartIcon />
              </div>

              <h2>
                Корзина пуста
              </h2>

              <p>
                Добавьте товары в корзину,
                чтобы оформить заказ.
              </p>

              <button
                type="button"
                className={
                  Styles.emptyButton
                }
                onClick={onBack}
              >
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

              <form
                className={Styles.formCard}
                onSubmit={handleSubmit}
                noValidate
              >
                <div
                  className={
                    Styles.formHeader
                  }
                >
                  <div>
                    <span
                      className={
                        Styles.eyebrow
                      }
                    >
                      Контактные данные
                    </span>

                    <h2>
                      Оформление заказа
                    </h2>

                    <p>
                      Укажите данные для
                      связи. Менеджер
                      свяжется с вами и
                      уточнит детали
                      поставки.
                    </p>
                  </div>
                </div>

                {/* FIELDS */}

                <div
                  className={Styles.fields}
                >
                  {FIELDS.map(field => {
                    const value =
                      fieldValues[
                      field.key
                      ];

                    const error =
                      errors[
                      field.key
                      ];

                    return (
                      <div
                        key={field.key}
                        className={`${Styles.field} ${error
                            ? Styles.fieldError
                            : ''
                          }`}
                      >
                        <div
                          className={
                            Styles.inputWrapper
                          }
                        >
                          <span
                            className={
                              Styles.fieldIcon
                            }
                            aria-hidden="true"
                          >
                            {
                              fieldIcons[
                              field.key
                              ]
                            }
                          </span>

                          <input
                            id={`order-${field.key}`}
                            name={
                              field.key
                            }
                            type={
                              field.type ||
                              'text'
                            }
                            value={value}
                            autoComplete={
                              field.autocomplete
                            }
                            placeholder=" "
                            aria-invalid={Boolean(
                              error
                            )}
                            aria-describedby={
                              error
                                ? `error-${field.key}`
                                : undefined
                            }
                            onChange={event =>
                              updateField(
                                field.key,
                                event.target
                                  .value,
                                fieldSetters[
                                field.key
                                ]
                              )
                            }
                            onBlur={event => {
                              const fieldValue =
                                event.target
                                  .value;

                              setErrors(
                                prev => ({
                                  ...prev,
                                  [field.key]:
                                    validateField(
                                      field.key,
                                      fieldValue
                                    ),
                                })
                              );
                            }}
                          />

                          <label
                            htmlFor={`order-${field.key}`}
                          >
                            {field.label}
                          </label>
                        </div>

                        {error && (
                          <span
                            id={`error-${field.key}`}
                            className={
                              Styles.errorText
                            }
                          >
                            {error}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* COMMENT */}

                <div
                  className={
                    Styles.field
                  }
                >
                  <div
                    className={
                      Styles.inputWrapper
                    }
                  >
                    <span
                      className={
                        Styles.fieldIcon
                      }
                      aria-hidden="true"
                    >
                      <MessageIcon />
                    </span>

                    <textarea
                      id="order-comment"
                      name="comment"
                      value={comment}
                      rows={4}
                      placeholder=" "
                      onChange={event =>
                        setComment(
                          event.target.value
                        )
                      }
                    />

                    <label htmlFor="order-comment">
                      Комментарий к заказу
                    </label>
                  </div>
                </div>

                {/* AGREEMENTS */}

                <div
                  className={
                    Styles.agreements
                  }
                >
                  {/* PERSONAL DATA */}

                  <div
                    ref={consentRef}
                    className={`${Styles.checkboxContainer} ${errors.consent
                        ? Styles.errorState
                        : ''
                      }`}
                  >
                    <label
                      className={
                        Styles.checkboxLabel
                      }
                    >
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={event => {
                          const checked =
                            event.target
                              .checked;

                          setConsent(
                            checked
                          );

                          setErrors(
                            prev => ({
                              ...prev,
                              consent:
                                checked
                                  ? undefined
                                  : 'Необходимо дать согласие на обработку персональных данных',
                            })
                          );
                        }}
                      />

                      <span
                        className={
                          Styles.customCheckbox
                        }
                        aria-hidden="true"
                      >
                        <CheckIcon />
                      </span>

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
                          обработку моих
                          персональных
                          данных
                        </a>
                      </span>
                    </label>

                    {errors.consent && (
                      <span
                        className={
                          Styles.checkboxError
                        }
                      >
                        {errors.consent}
                      </span>
                    )}
                  </div>

                  {/* OFFER */}

                  <div
                    ref={offerRef}
                    className={`${Styles.checkboxContainer} ${errors.offerAgreement
                        ? Styles.errorState
                        : ''
                      }`}
                  >
                    <label
                      className={
                        Styles.checkboxLabel
                      }
                    >
                      <input
                        type="checkbox"
                        checked={
                          offerAgreement
                        }
                        onChange={event => {
                          const checked =
                            event.target
                              .checked;

                          setOfferAgreement(
                            checked
                          );

                          setErrors(
                            prev => ({
                              ...prev,
                              offerAgreement:
                                checked
                                  ? undefined
                                  : 'Необходимо подтвердить ознакомление с офертой и условиями возврата',
                            })
                          );
                        }}
                      />

                      <span
                        className={
                          Styles.customCheckbox
                        }
                        aria-hidden="true"
                      >
                        <CheckIcon />
                      </span>

                      <span
                        className={
                          Styles.checkboxText
                        }
                      >
                        Я ознакомлен(а) и
                        согласен(на) с{' '}
                        <a
                          href="/file/offer_v1.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          договором оферты
                        </a>{' '}
                        и{' '}
                        <a
                          href="/file/return_v1.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          условиями возврата
                        </a>
                      </span>
                    </label>

                    {errors.offerAgreement && (
                      <span
                        className={
                          Styles.checkboxError
                        }
                      >
                        {
                          errors.offerAgreement
                        }
                      </span>
                    )}
                  </div>
                </div>

                {/* SUBMIT */}

                <motion.button
                  type="submit"
                  className={
                    Styles.submitButton
                  }
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
                      <span
                        className={
                          Styles.spinner
                        }
                      />
                      Отправляем
                      заказ...
                    </>
                  ) : (
                    <>
                      Отправить заказ

                      <span
                        className={
                          Styles.submitArrow
                        }
                      >
                        <ArrowIcon />
                      </span>
                    </>
                  )}
                </motion.button>

                <p
                  className={
                    Styles.formNote
                  }
                >
                  Нажимая «Отправить
                  заказ», вы подтверждаете
                  корректность указанных
                  данных.
                </p>
              </form>

              {/* RIGHT — ORDER SUMMARY */}

              <aside
                className={
                  Styles.summaryColumn
                }
              >
                <section
                  className={
                    Styles.summaryCard
                  }
                >
                  <div
                    className={
                      Styles.summaryHeader
                    }
                  >
                    <div>
                      <span
                        className={
                          Styles.eyebrow
                        }
                      >
                        Ваш заказ
                      </span>

                      <h2>
                        Состав заказа
                      </h2>
                    </div>

                    <span
                      className={
                        Styles.itemCount
                      }
                    >
                      {totalCount}{' '}
                      {totalCount === 1
                        ? 'товар'
                        : totalCount >= 2 &&
                          totalCount <= 4
                          ? 'товара'
                          : 'товаров'}
                    </span>
                  </div>

                  <div
                    className={
                      Styles.products
                    }
                  >
                    {cart.map(item => {
                      const itemTotal =
                        parsePrice(
                          item.price
                        ) *
                        item.count;

                      return (
                        <div
                          key={item.id}
                          className={
                            Styles.product
                          }
                        >
                          <div
                            className={
                              Styles.productImage
                            }
                          >
                            <img
                              src={item.image}
                              alt=""
                            />
                          </div>

                          <div
                            className={
                              Styles.productInfo
                            }
                          >
                            <span
                              className={
                                Styles.productTitle
                              }
                            >
                              {item.title}
                            </span>

                            <span
                              className={
                                Styles.productMeta
                              }
                            >
                              {item.count} ×{' '}
                              {item.price}
                            </span>
                          </div>

                          <strong
                            className={
                              Styles.productPrice
                            }
                          >
                            {itemTotal.toLocaleString(
                              'ru-RU'
                            )}{' '}
                            ₽
                          </strong>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className={Styles.total}
                  >
                    <span>
                      Итого
                    </span>

                    <strong>
                      {totalPrice.toLocaleString(
                        'ru-RU'
                      )}{' '}
                      ₽
                    </strong>
                  </div>

                  <div
                    className={Styles.vat}
                  >
                    Без НДС
                  </div>

                  <div
                    className={
                      Styles.summaryInfo
                    }
                  >
                    <div
                      className={
                        Styles.infoIcon
                      }
                    >
                      <CheckIcon />
                    </div>

                    <span>
                      После отправки заявки
                      менеджер свяжется с
                      вами для подтверждения
                      заказа и условий
                      поставки.
                    </span>
                  </div>
                </section>

                <button
                  type="button"
                  className={
                    Styles.backToCart
                  }
                  onClick={onBack}
                >
                  <span>
                    ←
                  </span>
                  Изменить заказ
                </button>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};