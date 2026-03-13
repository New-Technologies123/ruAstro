import { useState } from 'react';
import Styles from './procurement.module.scss';
import { Title } from '../../ui/title/Title';

export const Procurement = () => {
  const procurements = [
    {
      id: 1,
      name: 'Закупка офисной мебели',
      items: [
        { name: 'Стул офисный', quantity: 5 },
        { name: 'Стол письменный', quantity: 10 },
        { name: 'Шкаф для документов', quantity: 2 },
      ],
      address: 'г. Москва, ул. Ленина, 10',
      notes: 'С доставкой до офиса к 1 апреля',
    },
    {
      id: 2,
      name: 'Закупка канцелярии',
      items: [
        { name: 'Блокнот А4', quantity: 50 },
        { name: 'Ручка шариковая', quantity: 100 },
        { name: 'Маркер', quantity: 30 },
      ],
      address: 'г. Санкт-Петербург, пр. Невский, 50',
      notes: 'С упаковкой по 10 штук',
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProcurement, setSelectedProcurement] = useState(null);
  const [formData, setFormData] = useState({
    lastName: '',
    company: '',
    email: '',
    proposedItems: [], // пользовательские предложения
  });

  const openForm = (procurement) => {
    setSelectedProcurement(procurement);
    setFormData({
      lastName: '',
      company: '',
      email: '',
      proposedItems: [{ name: '', quantity: '' }],
    });
    setIsModalOpen(true);
  };

  const handleProposedItemChange = (index, field, value) => {
    const newItems = [...formData.proposedItems];
    newItems[index][field] = value;
    setFormData(prev => ({ ...prev, proposedItems: newItems }));
  };

  const handleAddProposedItem = () => {
    setFormData(prev => ({
      ...prev,
      proposedItems: [...prev.proposedItems, { name: '', quantity: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Предложение отправлено для закупки:', selectedProcurement.name, formData);
    alert(`Ваше предложение для "${selectedProcurement.name}" успешно отправлено!`);
    setFormData({ lastName: '', company: '', email: '', proposedItems: [{ name: '', quantity: '' }] });
    setIsModalOpen(false);
    setSelectedProcurement(null);
  };

  return (
    <div className={Styles.container}>
      <Title text="Закупки" />

      {/* {procurements.map(proc => (
        <div key={proc.id} className={Styles.procurementCard}>
          <h3 className={Styles.procurementName}>{proc.name}</h3>
          <p><strong>Товары (количество, которое нужно):</strong></p>
          <ul>
            {proc.items.map((item, i) => (
              <li key={i}>
                {item.name} — {item.quantity} шт.
              </li>
            ))}
          </ul>
          <p><strong>Адрес доставки:</strong> {proc.address}</p>
          <p><strong>Примечания:</strong> {proc.notes}</p>
          <button
            className={Styles.openFormButton}
            onClick={() => openForm(proc)}
          >
            Отправить предложение
          </button>
        </div>
      ))} */}

      {isModalOpen && selectedProcurement && (
        <div className={Styles.modalBackdrop}>
          <div className={Styles.modal}>
            <h2>Отправьте своё предложение</h2>
            <form onSubmit={handleSubmit} className={Styles.form}>
              <input
                type="text"
                name="procurementName"
                value={selectedProcurement.name}
                readOnly
                placeholder="Наименование закупки"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Фамилия"
                value={formData.lastName}
                onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Наименование компании"
                value={formData.company}
                onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />

              {/* Список нужных товаров */}
              <p><strong>Нужные товары:</strong></p>
              <ul className={Styles.requiredItems}>
                {selectedProcurement.items.map((item, index) => (
                  <li key={index}>
                    {item.name} — {item.quantity} шт.
                  </li>
                ))}
              </ul>

              {/* Поля для предложения пользователя */}
              <p><strong>Предложите свои товары и количество:</strong></p>
              {formData.proposedItems.map((item, index) => (
                <div key={index} className={Styles.itemRow}>
                  <input
                    type="text"
                    placeholder="Название товара"
                    value={item.name}
                    onChange={e => handleProposedItemChange(index, 'name', e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="Количество"
                    value={item.quantity}
                    onChange={e => handleProposedItemChange(index, 'quantity', e.target.value)}
                    required
                  />
                </div>
              ))}
              <button type="button" className={Styles.addItemButton} onClick={handleAddProposedItem}>
                Добавить ещё товар
              </button>

              <div className={Styles.formButtons}>
                <button type="submit">Отправить</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>Отмена</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};