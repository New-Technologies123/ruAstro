import { useState, useEffect } from 'react';
import Styles from './calculator.module.scss';
import { Title } from '../../ui/title/Title';
import { installations } from './installationsData';
import { InstallationCard } from './InstallationCard';
import { QuestionForm } from './QuestionForm';

export const Calculator = () => {
  const [loaded, setLoaded] = useState(false);
  const [selections, setSelections] = useState<any>({});
  const [selectedInstallations, setSelectedInstallations] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [openSelected, setOpenSelected] = useState<Record<number, boolean>>({});
  const [errorMessages, setErrorMessages] = useState<Record<number, boolean>>({});
  const [questionFormVisible, setQuestionFormVisible] = useState(false);

  const [questionForm, setQuestionForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => setLoaded(true), []);

  const handleChange = (instId: number, field: string, value: any) => {
    setSelections(prev => ({
      ...prev,
      [instId]: { ...prev[instId], [field]: value }
    }));

    setFieldErrors(prev => ({
      ...prev,
      [instId]: { ...prev[instId], [field]: false }
    }));
  };

  const calculatePrice = (inst: any, selection: any) => {
    if (!selection) return 0;
    let total = 0;

    if (selection.quantity) {
      const quantityPrice =
        inst.quantityOptions?.find(q => q.label === selection.quantity)?.price || 0;
      total += quantityPrice;
    }

    const fields = [
      { field: 'volume', options: inst.volumeOptions },
      { field: 'heating', options: inst.heatingOptions },
      { field: 'pressure', options: inst.pressureOptions },
      { field: 'pressure1', options: inst.pressure1Options },
      { field: 'vagometer', options: inst.vagometerOptions },
      { field: 'vagometer1', options: inst.vagometer1Options },
      { field: 'vagometer2', options: inst.vagometer2Options },
      { field: 'pollution', options: inst.pollutionOptions },
      { field: 'closet', options: inst.closetOptions }
    ];

    fields.forEach(({ field, options }) => {
      const selectedValues: any[] = selection[field] || [];
      selectedValues.forEach(value => {
        const price = options.find(o => o.label === value)?.price || 0;
        total += price;
      });
    });

    return total;
  };

  const validateSelection = (instId: number, selection: any) => {
    const required = [
      'quantity','volume','pressure','pressure1','vagometer','vagometer1',
      'vagometer2','heating','pollution','closet'
    ];

    const errors: any = {};
    required.forEach(field => {
      if (field === 'quantity') {
        if (!selection?.[field]) errors[field] = true;
      } else {
        if (!Array.isArray(selection[field]) || selection[field].length === 0) {
          errors[field] = true;
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(prev => ({ ...prev, [instId]: errors }));
      setErrorMessages(prev => ({ ...prev, [instId]: true }));
      setTimeout(() => {
        setErrorMessages(prev => ({ ...prev, [instId]: false }));
      }, 3000);
      return false;
    }
    return true;
  };

  const addInstallation = (instId: number) => {
    const inst = installations.find(i => i.id === instId)!;
    const selection = selections[instId];
    if (!validateSelection(instId, selection)) return;
    const price = calculatePrice(inst, selection);
    const summary = `${inst.name} / ${selection.quantity} скв.`;

    setSelectedInstallations(prev => [
      ...prev,
      { ...inst, ...selection, price, summary }
    ]);
    setTotalPrice(prev => prev + price);
    setSelections(prev => ({ ...prev, [instId]: {} }));
    setFieldErrors(prev => ({ ...prev, [instId]: {} }));
  };

  const removeInstallation = (index: number) => {
    const removed = selectedInstallations[index];
    setTotalPrice(prev => prev - removed.price);
    setSelectedInstallations(prev => prev.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (field: string, value: string) => {
    setQuestionForm(prev => ({ ...prev, [field]: value }));
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Ваш вопрос отправлен.');
    setQuestionForm({ name: '', email: '', message: '' });
    setQuestionFormVisible(false);
  };

  return (
    <>
      <Title text="Калькулятор установок" />

      <div className={`${Styles.wrapper} ${loaded ? Styles.loaded : ''}`}>
        <div className={Styles.cardsContainer}>
          {installations.map(inst => (
            <InstallationCard
              key={inst.id}
              inst={inst}
              sel={selections[inst.id] || {}}
              errors={fieldErrors[inst.id] || {}}
              showMessage={errorMessages[inst.id]}
              onChange={(field, value) => handleChange(inst.id, field, value)}
              onAdd={() => addInstallation(inst.id)}
            />
          ))}
        </div>

        {selectedInstallations.length > 0 && (
          <div className={Styles.selectedList}>
            <Title text="Выбранные установки" />
            {selectedInstallations.map((item, index) => {
              const isOpen = openSelected[index];
              return (
                <div
                  key={index}
                  className={Styles.selectedItem}
                  onClick={() =>
                    setOpenSelected(prev => ({ ...prev, [index]: !prev[index] }))
                  }
                >
                  <div className={Styles.selectedHeader}>
                    <span className={Styles.selectedName}>{item.summary}</span>
                    <span className={Styles.selectedPrice}>
                      {item.price.toLocaleString('ru-RU')} ₽
                    </span>
                    <button
                      className={Styles.deleteButtonInline}
                      onClick={e => {
                        e.stopPropagation();
                        removeInstallation(index);
                      }}
                    >
                      Удалить
                    </button>
                  </div>

                  {isOpen && (
                    <div className={Styles.selectedDetails}>
                      <p>Количество скважин: {item.quantity}</p>
                      <p>Максимальное рабочее давление: {item.heating?.join(', ')}</p>
                      <p>Емкость: {item.volume?.join(', ')}</p>
                      <p>Габариты блока технологии: {item.pressure?.join(', ')}</p>
                      <p>Габариты блока автоматики: {item.pressure1?.join(', ')}</p>
                      <p>Расходомер на линии газа: {item.vagometer?.join(', ')}</p>
                      <p>Расходомер на линии жидкости: {item.vagometer1?.join(', ')}</p>
                      <p>Дублирующий расходомер: {item.vagometer2?.join(', ')}</p>
                      <p>Наличие поточного влагомера: {item.pollution?.join(', ')}</p>
                      <p>Шкафное оборудование: {item.closet?.join(', ')}</p>
                    </div>
                  )}
                </div>
              );
            })}
            <div className={Styles.totalPriceText}>
              <h3>Итого {totalPrice.toLocaleString('ru-RU')} руб.</h3>
            </div>
          </div>
        )}

        <p>
          Информация, размещённая на данном сайте, не является публичной офертой.
        </p>
        <p>
          Для получения индивидуального предложения направьте запрос на почту:{' '}
          <a href="mailto:nt@tech-new.ru">nt@tech-new.ru</a>
        </p>

        {/* Кнопка для показа формы */}
        {/* <div className={Styles.communicationButtonWrapper}>
          <button
            className={Styles.communicationButton}
            onClick={() => setQuestionFormVisible(prev => !prev)}
          >
            Общение
          </button>
        </div> */}

        {/* Форма QuestionForm */}
        {questionFormVisible && (
          <QuestionForm
            formData={questionForm}
            onChange={handleQuestionChange}
            onSubmit={handleQuestionSubmit}
          />
        )}
      </div>
    </>
  );
};
