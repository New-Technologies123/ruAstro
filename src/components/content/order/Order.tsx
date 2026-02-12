import { useEffect, useState } from 'react';
import Styles from './order.module.scss';
import { getCart, clearCart, type CartItem } from '../../utils/cartStorage';
import { Title } from '../../ui/title/Title';
import back from '../../../images/back.svg'

type OrderProps = {
  onBack: () => void;
};

export const Order = ({ onBack }: OrderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

  const [successMessage, setSuccessMessage] = useState(''); // сообщение об успешном заказе

  useEffect(() => {
    setCart(getCart());
  }, []);

  // Автоматическое скрытие сообщения через 10 секунд
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 10000); // 10 секунд
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

    const orderData = {
      name,
      position,
      company,
      email,
      phone,
      comment,
      cart
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

        // Очистка корзины
        setCart([]);
        clearCart();

        // Очистка формы
        setName('');
        setPosition('');
        setCompany('');
        setEmail('');
        setPhone('');
        setComment('');
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
          <img src={back.src} alt=""/>
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
              <input
                type="text"
                placeholder="ФИО"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Должность"
                value={position}
                onChange={e => setPosition(e.target.value)}
              />

              <input
                type="text"
                placeholder="Название компании"
                value={company}
                onChange={e => setCompany(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />

              <input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />

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
