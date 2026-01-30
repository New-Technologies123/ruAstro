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

  // Управляемые поля формы
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    setCart(getCart());
  }, []);

  const parsePrice = (price: string): number =>
    Number(price.replace(/\s/g, ''));

  const totalPrice = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.count,
    0
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cart.length) {
      alert('Корзина пуста!');
      return;
    }

    // Можно здесь отправить данные на сервер
    alert('Заказ отправлен!');

    // Очистка корзины
    setCart([]);
    clearCart();

    // Очистка формы
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setComment('');
  };

  return (
    <div className={Styles.orderPage}>
      <div className={Styles.header}>
        <button className={Styles.backButton} onClick={onBack}>
          <img src={back.src} alt=""/>
          </button>
        <Title text="Оформление заказа" />        
      </div>

      <div className={Styles.content}>
        {/* Форма */}
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Контактные данные</h2>

          <input
            type="text"
            placeholder="ФИО"
            value={name}
            onChange={e => setName(e.target.value)}
            required
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

        {/* Сводка заказа */}
        <div className={Styles.summary}>
          <h2>Ваш заказ</h2>

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
      </div>
    </div>
  );
};
