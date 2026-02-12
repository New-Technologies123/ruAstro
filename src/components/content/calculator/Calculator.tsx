import { useState, useEffect } from 'react';
import Styles from './calculator.module.scss';
import { Title } from '../../ui/title/Title';
import { installations } from './installationsData';
import { InstallationCard } from './InstallationCard';
import { exportToPDF } from '../calculator/exportToPDF';
import { maxGasSepRules } from './maxGasSepRules';
import { maxGasNonSepPriceRules } from './maxGasNonSepPriceRules';
import { LayoutBack } from '../../layout/LayoutBack';

export const Calculator = () => {
  const [loaded, setLoaded] = useState(false);
  const [selections, setSelections] = useState<any>({});
  const [selectedInstallations, setSelectedInstallations] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [openSelected, setOpenSelected] = useState<Record<number, boolean>>({});
  const [errorMessages, setErrorMessages] = useState<Record<number, boolean>>({});

  const onBackAccountingSystem = () => {
    window.location.href = '/products/accounting-system';
  };

  const gasGroupMap: Record<string, 'LOW' | 'MID' | 'HIGH'> = {
    'До 40 000': 'LOW',
    'Свыше 40 000 до 80 000': 'MID',
    'Свыше 80 000 до 150 000': 'MID',
    'Свыше 150 000 до 300 000': 'HIGH',
    'Свыше 300 000 до 500 000': 'HIGH'
  };

  const getSepGasPrice = (selection: any, gasLabel: string) => {
    const gasGroup = gasGroupMap[gasLabel];
    if (!gasGroup) return undefined;

    const rule = maxGasSepRules.find(r =>
      r.quantity === selection.quantity &&
      r.volume === selection.volume?.[0] &&
      r.density === selection.density?.[0] &&
      r.gasGroup === gasGroup
    );

    return rule?.price;
  };

  const gasGroupNonSepMap: Record<string, 'LOW'> = {
    'До 500 000': 'LOW',
    'Свыше 500 000 до 1 500 000': 'LOW'
  };

  const getNonSepGasPrice = (selection: any, gasLabel: string) => {
    const gasGroup = gasGroupNonSepMap[gasLabel];
    if (!gasGroup) return undefined;

    const rule = maxGasNonSepPriceRules.find(r =>
      r.quantity === selection.quantity &&
      r.volume === selection.volume?.[0] &&
      r.density === selection.density?.[0] &&
      r.gasGroup === gasGroup
    );

    return rule?.price;
  };

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

    // Количество скважин
    total +=
      inst.quantityOptions.find(q => q.label === selection.quantity)?.price || 0;


    const fields = [
      { field: 'volume', options: inst.volumeOptions },
      { field: 'heating', options: inst.heatingOptions },
      { field: 'fittings', options: inst.fittingsOptions },
      // { field: 'max_gas', options: inst.max_gasOptions },
      // { field: 'max_gas_1', options: inst.max_gas_1Options },
      // { field: 'pressure', options: inst.pressureOptions },
      // { field: 'pressure1', options: inst.pressure1Options },
      { field: 'vagometer', options: inst.vagometerOptions },
      { field: 'vagometer1', options: inst.vagometer1Options },
      { field: 'vagometer2', options: inst.vagometer2Options },
      { field: 'pollution', options: inst.pollutionOptions },
      { field: 'closet', options: inst.closetOptions },
      { field: 'density', options: inst.densityOptions }
    ];

    // fields.forEach(({ field, options }) => {
    //   const selectedValues: any[] = selection[field] || [];
    //   selectedValues.forEach(value => {
    //     const price = options.find(o => o.label === value)?.price || 0;
    //     total += price;
    //   });
    // });

    fields.forEach(({ field, options }) => {
      (selection[field] || []).forEach((value: any) => {
        total += options.find(o => o.label === value)?.price || 0;
      });
    });

    // max_gas — сепарационный способ (групповая цена)
    (selection.max_gas || []).forEach((gasLabel: string) => {
      const dynamicPrice = getSepGasPrice(selection, gasLabel);

      total +=
        dynamicPrice ??
        inst.max_gasOptions.find(o => o.label === gasLabel)?.price ??
        0;
    });

    // max_gas_1 — бессепарационный способ (групповая цена)
    (selection.max_gas_1 || []).forEach((gasLabel: string) => {
      const dynamicPrice = getNonSepGasPrice(selection, gasLabel);

      total +=
        dynamicPrice ??
        inst.max_gas_1Options.find(o => o.label === gasLabel)?.price ??
        0;
    });

    return total;
  };

  const validateSelection = (instId: number, selection: any) => {
    const required = [
      'quantity', 'volume', 'fittings', 'max_gas', 'max_gas_1',
      // 'pressure', 'pressure1', 
      'vagometer', 'vagometer1',
      'vagometer2', 'heating', 'pollution', 'closet', 'density'
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
    // Заголовок вывода
    const hasNonSepGas =
      Array.isArray(selection.max_gas_1) &&
      selection.max_gas_1.length > 0 &&
      !selection.max_gas_1.includes('Не требуется');

    const pressure = selection.heating?.join(',') || '-';
    const quantity = selection.quantity || '-';
    const volume = selection.volume?.join(',') || '-';

    // порядок: давление → скважины → жидкость
    const base = `${inst.name} ${pressure}-${quantity}`;

    const summary = hasNonSepGas
      ? base
      : `${base}-${volume}`;

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

  return (
    <LayoutBack onBack={onBackAccountingSystem} title="Калькулятор измерительной установки">

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
                    <div className={Styles.priceDelete}>
                      <span className={Styles.selectedPrice}>
                        {item.price.toLocaleString('ru-RU')} ₽ без НДС
                      </span>
                      <button className={Styles.deleteButtonInline}
                        onClick={e => {
                          e.stopPropagation();
                          removeInstallation(index);
                        }}
                      >
                        Удалить
                      </button>
                    </div>                    
                  </div>

                  {isOpen && (
                    <div className={Styles.selectedDetails}>
                      <p>Количество скважин: {item.quantity}</p>
                      <p>Максимальное рабочее давление: {item.heating?.join(', ')}</p>
                      <p>Максимальная производительность по жидкости: {item.volume?.join(', ')}</p>
                      <p>Исполнение по входным трубопроводам: {item.density?.join(', ')}</p>
                      <p>Максимальная производительность по газу для сепарационного способа измерения: {item.max_gas?.join(', ')}</p>
                      <p>Максимальная производительность по газу для бессепарационного способа измерения: {item.max_gas_1?.join(', ')}</p>
                      {/* <p>Габариты блока технологии: {item.pressure?.join(', ')}</p>
                      <p>Габариты блока автоматики: {item.pressure1?.join(', ')}</p> */}
                      <p>Расходомер на линии газа: {item.vagometer?.join(', ')}</p>
                      <p>Расходомер на линии жидкости: {item.vagometer1?.join(', ')}</p>
                      <p>Дублирующий расходомер: {item.vagometer2?.join(', ')}</p>
                      <p>Наличие поточного влагомера: {item.pollution?.join(', ')}</p>
                      <p>Шкафное оборудование: {item.closet?.join(', ')}</p>
                      <p>Запорная арматура: {item.fittings?.join(', ')}</p>
                    </div>
                  )}
                </div>
              );
            })}
            <div className={Styles.totalPriceText}>
              <h3>Итого {totalPrice.toLocaleString('ru-RU')} руб. без НДС</h3>

              <button
                className={Styles.pdfButton}
                onClick={() => exportToPDF(selectedInstallations, totalPrice)}
              >
                Скачать PDF
              </button>
            </div>
          </div>
        )}

        <p>
          Информация, размещённая на данном сайте, не является публичной офертой.
        </p>
        <p>
          Для получения индивидуального предложения направьте запрос на почту:{' '}
          <a href="mailto:tendernt@tech-new.ru">tendernt@tech-new.ru</a>
        </p>

      </div>
    </LayoutBack>
  );
};
