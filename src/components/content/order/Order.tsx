import { useEffect, useState } from 'react';
import Styles from './order.module.scss';
import { getCart, clearCart, type CartItem } from '../../utils/cartStorage';
import { Title } from '../../ui/title/Title';
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
};

export const Order = ({ onBack }: OrderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setCart(getCart());
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const parsePrice = (price: string): number =>
    Number(price.replace(/\s/g, ''));

  const totalPrice = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.count,
    0
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cart.length) {
      alert('Корзина пуста!');
      return;
    }

    const newErrors: Errors = {};

    if (!name.trim()) newErrors.name = 'Обязательно для заполнения';
    if (!position.trim()) newErrors.position = 'Обязательно для заполнения';
    if (!company.trim()) newErrors.company = 'Обязательно для заполнения';
    if (!email.trim()) newErrors.email = 'Обязательно для заполнения';
    if (!phone.trim()) newErrors.phone = 'Обязательно для заполнения';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const orderData = {
      name,
      position,
      company,
      email,
      phone,
      comment,
      cart,
    };

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
          <img src={back.src} alt="" />
        </button>
        <Title text="Ваш заказ" />
      </div>

      <div className={Styles.content}>
        {successMessage ? (
          <div className={Styles.successMessage}>
            {successMessage}
          </div>
        ) : (
          <>
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
                <strong>{totalPrice} ₽ без НДС</strong>
              </div>
            </div>

            <form className={Styles.form} onSubmit={handleSubmit}>
              
              {/* ФИО */}
              <div className={Styles.field}>
                <input
                  type="text"
                  placeholder="ФИО"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                    setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  className={errors.name ? Styles.errorInput : ''}
                />
                {errors.name && <span className={Styles.errorText}>{errors.name}</span>}
              </div>

              {/* Должность */}
              <div className={Styles.field}>
                <input
                  type="text"
                  placeholder="Должность"
                  value={position}
                  onChange={e => {
                    setPosition(e.target.value);
                    setErrors(prev => ({ ...prev, position: undefined }));
                  }}
                  className={errors.position ? Styles.errorInput : ''}
                />
                {errors.position && <span className={Styles.errorText}>{errors.position}</span>}
              </div>

              {/* Компания */}
              <div className={Styles.field}>
                <input
                  type="text"
                  placeholder="Название компании"
                  value={company}
                  onChange={e => {
                    setCompany(e.target.value);
                    setErrors(prev => ({ ...prev, company: undefined }));
                  }}
                  className={errors.company ? Styles.errorInput : ''}
                />
                {errors.company && <span className={Styles.errorText}>{errors.company}</span>}
              </div>

              {/* Email */}
              <div className={Styles.field}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  className={errors.email ? Styles.errorInput : ''}
                />
                {errors.email && <span className={Styles.errorText}>{errors.email}</span>}
              </div>

              {/* Телефон */}
              <div className={Styles.field}>
                <input
                  type="tel"
                  placeholder="Телефон"
                  value={phone}
                  onChange={e => {
                    setPhone(e.target.value);
                    setErrors(prev => ({ ...prev, phone: undefined }));
                  }}
                  className={errors.phone ? Styles.errorInput : ''}
                />
                {errors.phone && <span className={Styles.errorText}>{errors.phone}</span>}
              </div>

              {/* Комментарий (необязательный) */}
              <textarea
                placeholder="Текст обращения / комментарий"
                rows={4}
                value={comment}
                onChange={e => setComment(e.target.value)}
              />

              <button type="submit">Отправить заказ</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};