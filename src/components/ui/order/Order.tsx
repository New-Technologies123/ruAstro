import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Styles from './order.module.scss';
import { getCart, clearCart, type CartItem } from '../../utils/cartStorage';
import { Title } from '../../ui/title/Title';
import back from '../../../images/back.svg';

type OrderProps = { onBack: () => void };

type Errors = {
  name?: string;
  position?: string;
  company?: string;
  email?: string;
  phone?: string;
  agree?: string;
};

export const Order = ({ onBack }: OrderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState('');

  const checkboxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setCart(getCart()), []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 10000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const parsePrice = (price: string) => Number(price.replace(/\s/g, ''));
  const totalPrice = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.count,
    0
  );

  const validateField = (key: keyof Errors, value: string) => {
    switch (key) {
      case 'email':
        return /^\S+@\S+\.\S+$/.test(value) ? undefined : 'Неверный формат';
      case 'phone':
        return /^\+?\d{10,13}$/.test(value) ? undefined : 'Неверный формат';
      default:
        return value.trim() ? undefined : 'Обязательно заполнить';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cart.length) return alert('Корзина пуста!');

    const newErrors: Errors = {
      name: validateField('name', name),
      position: validateField('position', position),
      company: validateField('company', company),
      email: validateField('email', email),
      phone: validateField('phone', phone),
      agree: agree ? undefined : 'Необходимо подтвердить согласие на обработку данных',
    };

    setErrors(newErrors);

    if (newErrors.agree && checkboxRef.current) {
      checkboxRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (Object.values(newErrors).some(Boolean)) return;

    const orderData = { name, position, company, email, phone, comment, cart };

    try {
      const res = await fetch('/sendOrder.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (result.success) {
        setSuccessMessage('Спасибо за заказ!');
        setCart([]);
        clearCart();
        setName('');
        setPosition('');
        setCompany('');
        setEmail('');
        setPhone('');
        setComment('');
        setAgree(false);
        setErrors({});
      } else {
        alert('Ошибка при отправке: ' + (result.error || 'Неизвестная ошибка'));
      }
    } catch (err) {
      alert('Ошибка сети: ' + err);
    }
  };

  return (
    <div className={Styles.orderPage}>
      <div className={Styles.header}>
        <button className={Styles.backButton} onClick={onBack}>
          <img src={back.src} alt="Назад" />
        </button>
        <Title text="Оформление заказа" />
      </div>

      <div className={Styles.content}>
        <AnimatePresence>
          {successMessage ? (
            <motion.div
              className={Styles.successMessage}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {successMessage}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Корзина */}
              <div className={Styles.summary}>
                {cart.map(item => (
                  <div key={item.id} className={Styles.product}>
                    <div className={Styles.title}>{item.title}</div>
                    <div className={Styles.count}>{item.count} ×</div>
                    <div className={Styles.price}>
                      {parsePrice(item.price) * item.count} ₽ без НДС
                    </div>
                  </div>
                ))}

                <div className={Styles.total}>
                  <span>Итого:</span>
                  <strong>{totalPrice.toLocaleString('ru-RU')} ₽ без НДС</strong>
                </div>
              </div>

              {/* Форма */}
              <form className={Styles.form} onSubmit={handleSubmit}>
                {[
                  { value: name, setter: setName, label: 'ФИО', errorKey: 'name' },
                  { value: position, setter: setPosition, label: 'Должность', errorKey: 'position' },
                  { value: company, setter: setCompany, label: 'Компания', errorKey: 'company' },
                  { value: email, setter: setEmail, label: 'Email', errorKey: 'email', type: 'email' },
                  { value: phone, setter: setPhone, label: 'Телефон', errorKey: 'phone', type: 'tel' }
                ].map(f => (
                  <div
                    key={f.label}
                    className={`${Styles.field} ${errors[f.errorKey] ? Styles.fieldError : ''}`}
                  >
                    <input
                      type={f.type || 'text'}
                      value={f.value}
                      onChange={e => {
                        f.setter(e.target.value);
                        setErrors(prev => ({
                          ...prev,
                          [f.errorKey]: validateField(
                            f.errorKey as keyof Errors,
                            e.target.value
                          )
                        }));
                      }}
                      required
                    />
                    <label className={f.value ? Styles.filled : ''}>{f.label}</label>
                    {errors[f.errorKey] && (
                      <span className={Styles.g}>{errors[f.errorKey]}</span>
                    )}
                  </div>
                ))}

                <div className={Styles.field}>
                  <textarea
                    placeholder="Комментарий"
                    rows={4}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                </div>

                {/* Чекбокс */}
                <div
                  ref={checkboxRef}
                  className={`${Styles.checkboxContainer} ${errors.agree ? Styles.errorState : ''}`}
                >
                  <label className={Styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => {
                        setAgree(e.target.checked);
                        setErrors(prev => ({
                          ...prev,
                          agree: e.target.checked ? undefined : 'Необходимо согласие'
                        }));
                      }}
                    />
                    <span className={Styles.customCheckbox}></span>
                    <span>
                      Я согласен на обработку персональных данных и принимаю
                      <a href="/privacy" target="_blank"> Политику конфиденциальности </a> 
                    </span>
                    
                  </label>
                  {errors.agree && (
                    <p className={Styles.error}>{errors.agree}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className={Styles.submitButton}
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Отправить заказ
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};