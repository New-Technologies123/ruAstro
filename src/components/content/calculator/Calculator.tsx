import { useRef, useState } from 'react';

import Styles from './calculator.module.scss';
import { installations } from './installationsData';
import { InstallationCard } from './InstallationCard';
import { exportToPDF } from '../calculator/exportToPDF';
import { maxGasSepRules } from './maxGasSepRules';
import { maxGasNonSepPriceRules } from './maxGasNonSepPriceRules';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

type Selection = Record<number, Record<string, any>>;
type FieldErrors = Record<number, Record<string, boolean>>;
type ValidationAttempts = Record<number, number>;
type OpenSelected = Record<number, boolean>;
type SelectedInstallation = Record<string, any> & {
  selectionKey: number;
  price: number;
  summary: string;
};

const gasGroupMap: Record<string, 'LOW' | 'MID' | 'HIGH'> = {
  'До 40 000': 'LOW',
  'Свыше 40 000 до 80 000': 'MID',
  'Свыше 80 000 до 150 000': 'MID',
  'Свыше 150 000 до 300 000': 'HIGH',
  'Свыше 300 000 до 500 000': 'HIGH',
};

const gasGroupNonSepMap: Record<string, 'LOW'> = {
  'До 500 000': 'LOW',
  'Свыше 500 000 до 1 500 000': 'LOW',
};

const requiredFields = [
  'quantity', 'volume', 'fittings', 'max_gas', 'max_gas_1',
  'vagometer', 'vagometer1', 'vagometer2', 'heating',
  'pollution', 'closet', 'density',
] as const;

const detailRows = [
  { field: 'quantity', label: 'Количество скважин' },
  { field: 'heating', label: 'Максимальное рабочее давление' },
  { field: 'volume', label: 'Производительность по жидкости' },
  { field: 'density', label: 'Исполнение входных трубопроводов' },
  { field: 'max_gas', label: 'Газ, сепарационный способ' },
  { field: 'max_gas_1', label: 'Газ, бессепарационный способ' },
  { field: 'vagometer', label: 'Расходомер на линии газа' },
  { field: 'vagometer1', label: 'Расходомер на линии жидкости' },
  { field: 'vagometer2', label: 'Дублирующий расходомер' },
  { field: 'pollution', label: 'Поточный влагомер' },
  { field: 'closet', label: 'Шкафное оборудование' },
  { field: 'fittings', label: 'Запорная арматура' },
] as const;

const formatPrice = (value: number) => `${value.toLocaleString('ru-RU')} ₽`;

const formatValue = (value: unknown) => {
  if (Array.isArray(value)) return value.length ? value.join(', ') : '—';
  return value == null || value === '' ? '—' : String(value);
};

const getSepGasPrice = (selection: Record<string, any>, gasLabel: string) => {
  const gasGroup = gasGroupMap[gasLabel];
  if (!gasGroup) return undefined;
  return maxGasSepRules.find((rule) =>
    rule.quantity === selection.quantity &&
    rule.volume === selection.volume?.[0] &&
    rule.density === selection.density?.[0] &&
    rule.gasGroup === gasGroup
  )?.price;
};

const getNonSepGasPrice = (selection: Record<string, any>, gasLabel: string) => {
  const gasGroup = gasGroupNonSepMap[gasLabel];
  if (!gasGroup) return undefined;
  return maxGasNonSepPriceRules.find((rule) =>
    rule.quantity === selection.quantity &&
    rule.volume === selection.volume?.[0] &&
    rule.density === selection.density?.[0] &&
    rule.gasGroup === gasGroup
  )?.price;
};

const calculatePrice = (inst: any, selection: Record<string, any>) => {
  let total = inst.quantityOptions.find((option: any) =>
    option.label === selection.quantity
  )?.price || 0;

  const fields = [
    { field: 'volume', options: inst.volumeOptions },
    { field: 'heating', options: inst.heatingOptions },
    { field: 'fittings', options: inst.fittingsOptions },
    { field: 'vagometer', options: inst.vagometerOptions },
    { field: 'vagometer1', options: inst.vagometer1Options },
    { field: 'vagometer2', options: inst.vagometer2Options },
    { field: 'pollution', options: inst.pollutionOptions },
    { field: 'closet', options: inst.closetOptions },
    { field: 'density', options: inst.densityOptions },
  ];

  fields.forEach(({ field, options }) => {
    (selection[field] || []).forEach((value: string) => {
      total += options.find((option: any) => option.label === value)?.price || 0;
    });
  });

  (selection.max_gas || []).forEach((gasLabel: string) => {
    total += (
      getSepGasPrice(selection, gasLabel) ??
      inst.max_gasOptions.find((option: any) => option.label === gasLabel)?.price ??
      0
    );
  });

  (selection.max_gas_1 || []).forEach((gasLabel: string) => {
    total += (
      getNonSepGasPrice(selection, gasLabel) ??
      inst.max_gas_1Options.find((option: any) => option.label === gasLabel)?.price ??
      0
    );
  });

  return total;
};

export const Calculator = () => {
  const [selections, setSelections] = useState<Selection>({});
  const [selectedInstallations, setSelectedInstallations] = useState<SelectedInstallation[]>([]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [openSelected, setOpenSelected] = useState<OpenSelected>({});
  const [validationAttempts, setValidationAttempts] = useState<ValidationAttempts>({});
  const nextSelectionKey = useRef(0);

  const totalPrice = selectedInstallations.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (instId: number, field: string, value: any) => {
    setSelections((prev) => ({
      ...prev,
      [instId]: { ...(prev[instId] || {}), [field]: value },
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [instId]: { ...(prev[instId] || {}), [field]: false },
    }));
  };

  const validateSelection = (instId: number, selection?: Record<string, any>) => {
    const errors: Record<string, boolean> = {};
    requiredFields.forEach((field) => {
      const value = selection?.[field];
      if (field === 'quantity' ? !value : !Array.isArray(value) || value.length === 0) {
        errors[field] = true;
      }
    });

    if (Object.keys(errors).length === 0) return true;
    setFieldErrors((prev) => ({ ...prev, [instId]: errors }));
    setValidationAttempts((prev) => ({
      ...prev,
      [instId]: (prev[instId] || 0) + 1,
    }));
    return false;
  };

  const addInstallation = (instId: number) => {
    const inst = installations.find((entry) => entry.id === instId);
    if (!inst) return;
    const selection = selections[instId];
    if (!validateSelection(instId, selection)) return;

    const price = calculatePrice(inst, selection);
    const hasNonSepGas = Array.isArray(selection.max_gas_1) &&
      selection.max_gas_1.length > 0 &&
      !selection.max_gas_1.includes('Не требуется');
    const pressure = selection.heating?.join(',') || '-';
    const quantity = selection.quantity || '-';
    const volume = selection.volume?.join(',') || '-';
    const base = `${inst.name} ${pressure}-${quantity}`;
    const summary = hasNonSepGas ? base : `${base}-${volume}`;

    setSelectedInstallations((prev) => [
      ...prev,
      { ...inst, ...selection, price, summary, selectionKey: nextSelectionKey.current++ },
    ]);
    setSelections((prev) => ({ ...prev, [instId]: {} }));
    setFieldErrors((prev) => ({ ...prev, [instId]: {} }));
  };

  const removeInstallation = (selectionKey: number) => {
    setSelectedInstallations((prev) => prev.filter((item) => item.selectionKey !== selectionKey));
    setOpenSelected((prev) => {
      const next = { ...prev };
      delete next[selectionKey];
      return next;
    });
  };

  const downloadPDF = () => {
    const data = selectedInstallations.map(({ selectionKey, ...item }) => item);
    exportToPDF(data, totalPrice);
  };

  return (
    <div className={Styles.page}>
      <main>
        <section className={Styles.hero} aria-labelledby="calculator-title">
          <div className={Styles.container}>
            <nav className={Styles.breadcrumbs} aria-label="Хлебные крошки">
              <a href="/products/">Продукция</a>
              <span aria-hidden="true">›</span>
              <a href="/products/accounting-system/">АГЗУ</a>
              <span aria-hidden="true">›</span>
              <span aria-current="page">Калькулятор</span>
            </nav>
            {/* <span className={Styles.eyebrow}>Подбор конфигурации АГЗУ</span> */}
            <h1 id="calculator-title">Рассчитайте <em>стоимость установки</em></h1>
            <p className={Styles.heroDescription}>
              Выберите параметры и добавьте нужные исполнения в расчёт.
              Итог можно сохранить в PDF.
            </p>
            <div className={Styles.heroActions}>
              <a className={Styles.primaryButton} href="#configurator">Выбрать параметры <span aria-hidden="true">↗</span></a>
              {/* <a className={Styles.secondaryButton} href="/products/accounting-system/">Вернуться к АГЗУ <span aria-hidden="true">→</span></a> */}
            </div>
            <div className={Styles.heroFacts}>
              <span><strong>01</strong> Выберите конфигурацию</span>
              <span><strong>02</strong> Добавьте в расчёт</span>
              <span><strong>03</strong> Скачайте PDF</span>
            </div>
          </div>
        </section>

        <section className={Styles.calculatorSection} id="configurator" aria-labelledby="configurator-title">
          <div className={Styles.container}>
            <div className={Styles.sectionHeading}>
              <div><span className={Styles.eyebrow}>01 / Конфигурация</span><h2 id="configurator-title">Параметры установки</h2></div>
              <p>Заполните все группы параметров. Если вариант недоступен, уточните связанные настройки.</p>
            </div>

            <div className={Styles.calculatorLayout}>
              <div className={Styles.cardsContainer}>
                {installations.map((inst, index) => (
                  <InstallationCard
                    key={inst.id}
                    index={index + 1}
                    inst={inst}
                    sel={selections[inst.id] || {}}
                    errors={fieldErrors[inst.id] || {}}
                    showMessage={Object.values(fieldErrors[inst.id] || {}).some(Boolean)}
                    validationAttempt={validationAttempts[inst.id] || 0}
                    onChange={(field, value) => handleChange(inst.id, field, value)}
                    onAdd={() => addInstallation(inst.id)}
                  />
                ))}
              </div>

              <aside className={Styles.selectedList} aria-labelledby="selected-title">
                <div className={Styles.selectedHeading}>
                  <span className={Styles.eyebrow}>02 / Ваш расчёт</span>
                  <h2 id="selected-title">Выбранные установки</h2>
                  <p>{selectedInstallations.length === 0
                    ? 'Добавьте установку, чтобы увидеть состав и итоговую стоимость.'
                    : `В расчёте: ${selectedInstallations.length}`}</p>
                </div>

                {selectedInstallations.length > 0 && (
                  <>
                    <div className={Styles.selectedItems}>
                      {selectedInstallations.map((item) => {
                        const isOpen = Boolean(openSelected[item.selectionKey]);
                        const detailsId = `selected-details-${item.selectionKey}`;
                        return (
                          <article className={Styles.selectedItem} key={item.selectionKey}>
                            <div className={Styles.selectedHeader}>
                              <button
                                className={Styles.selectedToggle}
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={detailsId}
                                onClick={() => setOpenSelected((prev) => ({
                                  ...prev,
                                  [item.selectionKey]: !prev[item.selectionKey],
                                }))}
                              >
                                <span className={Styles.selectedName}>{item.summary}</span>
                                <span className={Styles.toggleIcon} aria-hidden="true">{isOpen ? '−' : '+'}</span>
                              </button>
                              <div className={Styles.selectedMeta}>
                                <strong>{formatPrice(item.price)} <small>без НДС</small></strong>
                                <button className={Styles.deleteButton} type="button" onClick={() => removeInstallation(item.selectionKey)} aria-label={`Удалить ${item.summary}`}>Удалить</button>
                              </div>
                            </div>
                            <dl className={Styles.selectedDetails} id={detailsId} hidden={!isOpen}>
                              {detailRows.map(({ field, label }) => (
                                <div key={field}><dt>{label}</dt><dd>{formatValue(item[field])}</dd></div>
                              ))}
                            </dl>
                          </article>
                        );
                      })}
                    </div>
                    <div className={Styles.totalBlock}>
                      <span>Предварительная стоимость</span>
                      <strong>{formatPrice(totalPrice)}</strong>
                      <small>Без НДС</small>
                      <button className={Styles.pdfButton} type="button" onClick={downloadPDF}>Скачать расчёт в PDF <span aria-hidden="true">↓</span></button>
                    </div>
                  </>
                )}
              </aside>
            </div>
          </div>
        </section>

        <section className={Styles.contactSection} aria-labelledby="contact-title">
          <div className={Styles.container}>
            <div><span className={Styles.eyebrow}>Индивидуальное предложение</span><h2 id="contact-title">Нужна помощь с подбором?</h2><p>Направьте запрос с параметрами установки — специалисты подготовят предложение.</p></div>
            <a href="mailto:tendernt@tech-new.ru">tendernt@tech-new.ru 
              {/* <span aria-hidden="true">↗</span> */}
              </a>
          </div>
          <p className={Styles.legalNote}>Информация на сайте не является публичной офертой.</p>
        </section>
      </main>
      <BackToTop />
    </div>
  );
};
