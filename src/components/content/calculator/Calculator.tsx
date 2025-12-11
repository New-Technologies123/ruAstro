import { useState, useEffect } from 'react';
import Styles from './calculator.module.scss';
import { Title } from '../../ui/title/Title';
import { installations } from "./installationsData";
import { InstallationCard } from "./InstallationCard";

export const Calculator = () => {
  const [loaded, setLoaded] = useState(false);
  const [selections, setSelections] = useState<any>({});
  const [selectedInstallations, setSelectedInstallations] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [openCards, setOpenCards] = useState<Record<number, boolean>>({});
  const [openSelected, setOpenSelected] = useState<Record<number, boolean>>({});
  const [errorMessages, setErrorMessages] = useState<Record<number, boolean>>({});

  useEffect(() => setLoaded(true), []);

  const handleChange = (instId: number, field: string, value: any) => {
    setSelections((prev: any) => ({
      ...prev,
      [instId]: { ...prev[instId], [field]: value }
    }));

    setFieldErrors((prev: any) => {
      const instErrors = prev[instId] || {};
      let isError = false;

      if (field === "quantity") isError = !value || value <= 0;
      else isError = !value || (Array.isArray(value) && value.length === 0);

      if (!isError && instErrors[field]) {
        return { ...prev, [instId]: { ...instErrors, [field]: false } };
      }
      return prev;
    });
  };

  const calculatePrice = (inst: any, selection: any) => {
    if (!selection) return 0;

    const { quantity = 1 } = selection;

    const fields = [
      { field: "volume", options: inst.volumeOptions },
      { field: "heating", options: inst.heatingOptions },
      { field: "pressure", options: inst.pressureOptions },
      { field: "pressure1", options: inst.pressure1Options },
      { field: "range", options: inst.rangeOptions },
      { field: "vagometer", options: inst.vagometerOptions },
      { field: "vagometer1", options: inst.vagometer1Options },
      { field: "vagometer2", options: inst.vagometer2Options },
      { field: "lighting", options: inst.lightingOptions },      
      { field: "pollution", options: inst.pollutionOptions },
      { field: "closet", options: inst.closetOptions }
    ];

    let total = 0;

    fields.forEach(({ field, options }) => {
      const selectedValues: any[] = selection[field] || [];
      selectedValues.forEach(value => {
        const price = options.find((o: any) => o.label === value)?.price || 0;
        total += price;
      });
    });

    return total * quantity;
  };

  const validateSelection = (instId: number, selection: any) => {
    const required = [
      "quantity", "volume", "pressure", "pressure1", "range", "vagometer", "vagometer1", "vagometer2",
      "lighting", "heating", "pollution", "closet"
    ];

    const errors: any = {};

    required.forEach(field => {
      if (field === "quantity") {
        if (!selection?.[field] || selection[field] <= 0) errors[field] = true;
      } else {
        if (!Array.isArray(selection[field]) || selection[field].length === 0) errors[field] = true;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors((prev: any) => ({ ...prev, [instId]: errors }));
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

    // Вывод название установки
    // setSelectedInstallations(prev => [...prev, { ...inst, ...selection, price }]);
    const summary = `${inst.name} ${selection.heating?.join(', ')} / ${selection.quantity} / ${selection.volume?.join(', ')}`
    setSelectedInstallations(prev => [...prev, { ...inst, ...selection, price, summary }]);

    setTotalPrice(prev => prev + price);

    setSelections(prev => ({ ...prev, [instId]: {} }));
    setFieldErrors(prev => ({ ...prev, [instId]: {} }));
  };

  const removeInstallation = (index: number) => {
    const removed = selectedInstallations[index];
    setTotalPrice(prev => prev - removed.price);
    setSelectedInstallations(prev => prev.filter((_, i) => i !== index));
  };

  const toggleCard = (instId: number) => {
    setOpenCards(prev => ({ ...prev, [instId]: !prev[instId] }));
  };

  return (
    <>
      <Title text="Калькулятор установок" />

      <div className={`${Styles.wrapper} ${loaded ? Styles.loaded : ''}`}>
        <div className={Styles.cardsContainer}>

          {installations.map(inst => {
            const sel = selections[inst.id] || {};
            const errors = fieldErrors[inst.id] || {};
            const isOpen = openCards[inst.id];
            const showMessage = errorMessages[inst.id];

            return (
              <InstallationCard
                key={inst.id}
                inst={inst}
                sel={sel}
                errors={errors}
                isOpen={isOpen}
                showMessage={showMessage}
                onToggle={() => toggleCard(inst.id)}
                onChange={(field, value) => handleChange(inst.id, field, value)}
                onAdd={() => addInstallation(inst.id)}
              />
            );
          })}

        </div>

        {selectedInstallations.length > 0 && (
          <div className={Styles.selectedList}>
            <Title text="Выбранные установки" />

            {selectedInstallations.map((item, index) => {
              const isOpen = openSelected[index];

              return (
                <div
                  className={Styles.selectedItem}
                  onClick={() =>
                      setOpenSelected(prev => ({ ...prev, [index]: !prev[index] }))
                  }
                >
                  <div className={Styles.selectedHeader}>
                    <span className={Styles.selectedName}>
                        {item.summary}
                    </span>

                    <span className={Styles.selectedPrice}>
                        {item.price.toLocaleString('ru-RU')} ₽
                    </span>

                    <button
                      className={Styles.deleteButtonInline}
                      onClick={(e) => {
                        e.stopPropagation();   // чтобы удаление не открывало карточку
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
                      <p>Максимальная производительность по газу при стандартных условиях: {item.range?.join(', ')}</p>
                      <p>Расходомер на линии газа: {item.vagometer?.join(', ')}</p>
                      <p>Расходомер на линии жидкости: {item.vagometer1?.join(', ')}</p>
                      <p>Дублирующий расходомер: {item.vagometer2?.join(', ')}</p>
                      <p>Исполнение по содержанию газа: {item.lighting?.join(', ')}</p>                      
                      <p>Наличие поточного влагомера, метод измерения: {item.pollution?.join(', ')}</p>
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
      </div>
    </>
  );
};
