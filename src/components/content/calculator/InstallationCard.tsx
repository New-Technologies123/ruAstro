import { useEffect, useRef } from 'react';

import Styles from './card.module.scss';

interface Option {
  label: string;
  price?: number;
}

interface InstallationCardProps {
  index?: number;
  inst: any;
  sel: Record<string, any>;
  errors: Record<string, boolean>;
  showMessage: boolean;
  validationAttempt: number;
  onChange: (field: string, value: any) => void;
  onAdd: () => void;
}

export const InstallationCard = ({
  index,
  inst,
  sel = {},
  errors = {},
  showMessage,
  validationAttempt,
  onChange,
  onAdd,
}: InstallationCardProps) => {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (validationAttempt === 0) return;

    const firstInvalidField = cardRef.current?.querySelector<HTMLElement>('[data-invalid="true"]');
    if (!firstInvalidField) return;

    firstInvalidField.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center',
    });
    firstInvalidField.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true });
  }, [validationAttempt]);

  const getMaxGas1Options = (): Option[] => {
    const maxGasValues: string[] = sel.max_gas || [];
    const hasSepGas = maxGasValues.length > 0 && !maxGasValues.includes('Не требуется');
    const isSepNotRequired = maxGasValues.length === 1 && maxGasValues[0] === 'Не требуется';

    if (hasSepGas) {
      return inst.max_gas_1Options.filter((option: Option) => option.label === 'Не требуется');
    }
    if (isSepNotRequired) {
      return inst.max_gas_1Options.filter((option: Option) => option.label !== 'Не требуется');
    }
    return inst.max_gas_1Options;
  };

  const getVagometer1Options = (): Option[] => {
    const hasNonSepGas = sel.max_gas_1?.length && !sel.max_gas_1.includes('Не требуется');
    const hasSepGas = sel.max_gas?.length && !sel.max_gas.includes('Не требуется');

    if (hasNonSepGas) {
      return inst.vagometer1Options.filter((option: Option) => option.label === 'Многофазный расходомер');
    }
    if (hasSepGas) {
      return inst.vagometer1Options.filter((option: Option) => option.label !== 'Многофазный расходомер');
    }
    return inst.vagometer1Options;
  };

  useEffect(() => {
    const values: string[] = sel.max_gas || [];
    const isEmpty = values.length === 0;
    const hasRealValue = values.length > 0 && !values.includes('Не требуется');
    const isSepNotRequired = values.length === 1 && values[0] === 'Не требуется';

    if (hasRealValue && sel.max_gas_1?.[0] !== 'Не требуется') {
      onChange('max_gas_1', ['Не требуется']);
    }
    if (isSepNotRequired && sel.max_gas_1?.includes('Не требуется')) {
      onChange('max_gas_1', sel.max_gas_1.filter((value: string) => value !== 'Не требуется'));
    }
    if (isEmpty && sel.max_gas_1?.[0] === 'Не требуется') {
      onChange('max_gas_1', []);
    }
  }, [sel.max_gas]);

  useEffect(() => {
    const values: string[] = sel.max_gas_1 || [];
    const isEmpty = values.length === 0;
    const hasRealValue = values.length > 0 && !values.includes('Не требуется');

    if (hasRealValue) {
      if (sel.max_gas?.[0] !== 'Не требуется') onChange('max_gas', ['Не требуется']);
      if (sel.vagometer?.[0] !== 'Не требуется') onChange('vagometer', ['Не требуется']);
      if (sel.vagometer2?.[0] !== 'Не требуется') onChange('vagometer2', ['Не требуется']);
      if (sel.vagometer1?.[0] !== 'Многофазный расходомер') {
        onChange('vagometer1', ['Многофазный расходомер']);
      }
    }
    if (isEmpty) {
      if (sel.max_gas?.length) onChange('max_gas', []);
      if (sel.vagometer?.length) onChange('vagometer', []);
      if (sel.vagometer2?.length) onChange('vagometer2', []);
      if (sel.vagometer1?.length) onChange('vagometer1', []);
    }
  }, [sel.max_gas_1]);

  const getQuantityOptions = (): Option[] => {
    if (sel.density?.[0] === 'Одностороннее') {
      return inst.quantityOptions.filter((option: Option) => {
        const number = Number(option.label);
        return number >= 1 && number <= 10;
      });
    }
    if (sel.density?.[0] === 'Двустороннее') {
      return inst.quantityOptions.filter((option: Option) => {
        const number = Number(option.label);
        return number >= 4 && number <= 14;
      });
    }
    return inst.quantityOptions;
  };

  useEffect(() => {
    if (!sel.quantity || !sel.density?.length) return;
    const quantity = Number(sel.quantity);
    const density = sel.density[0];
    if (density === 'Одностороннее' && (quantity < 1 || quantity > 10)) onChange('quantity', null);
    if (density === 'Двустороннее' && (quantity < 4 || quantity > 14)) onChange('quantity', null);
  }, [sel.density]);

  const handleToggleOption = (field: string, option: Option, numeric = false) => {
    if (numeric) {
      onChange(field, option.label);
      return;
    }
    const current: string[] = Array.isArray(sel[field]) ? sel[field] : [];
    const updated = current.includes(option.label)
      ? current.filter((value) => value !== option.label)
      : [...current, option.label];
    onChange(field, updated);
  };

  const renderField = (field: string, title: string, options: Option[], numeric = false) => {
    const hasError = Boolean(errors[field]);
    const errorId = `error-${inst.id}-${field}`;

    return (
      <fieldset
        className={`${Styles.fieldGroup} ${hasError ? Styles.fieldError : ''}`}
        data-invalid={hasError ? 'true' : undefined}
        key={field}
      >
        <legend>{title}</legend>
        <div className={Styles.options}>
          {options?.map((option) => {
            const checked = numeric
              ? sel[field] === option.label
              : (sel[field] || []).includes(option.label);
            return (
              <label className={Styles.option} key={option.label}>
                <input
                  type={numeric ? 'radio' : 'checkbox'}
                  name={`${field}-${inst.id}`}
                  checked={checked}
                  onChange={() => handleToggleOption(field, option, numeric)}
                  aria-invalid={hasError}
                  aria-describedby={hasError ? errorId : undefined}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
        {hasError && <p className={Styles.fieldMessage} id={errorId}>Выберите вариант</p>}
      </fieldset>
    );
  };

  return (
    <article className={Styles.card} ref={cardRef}>
      <div className={Styles.cardHeader}>
        <span className={Styles.cardIndex}>{String(index ?? inst.id).padStart(2, '0')}</span>
        <div>
          <span className={Styles.cardEyebrow}>Конфигурация установки</span>
          <h3>{inst.name}</h3>
        </div>
      </div>

      <div className={Styles.paramsGrid}>
        {renderField('quantity', 'Количество скважин', getQuantityOptions(), true)}
        {renderField('heating', 'Максимальное рабочее давление', inst.heatingOptions)}
        {renderField('volume', 'Производительность по жидкости до, т/сут', inst.volumeOptions)}
        {renderField('density', 'Исполнение входных трубопроводов', inst.densityOptions)}
        {renderField('max_gas', 'Газ: сепарационный способ, м³/сут', inst.max_gasOptions)}
        {renderField('max_gas_1', 'Газ: бессепарационный способ, м³/сут', getMaxGas1Options())}
        {renderField('pollution', 'Наличие поточного влагомера', inst.pollutionOptions)}
        {renderField('vagometer1', 'Расходомер на линии жидкости', getVagometer1Options())}
        {renderField('vagometer', 'Расходомер на линии газа', inst.vagometerOptions)}
        {renderField('vagometer2', 'Дублирующий расходомер', inst.vagometer2Options)}
        {renderField('closet', 'Шкафное оборудование', inst.closetOptions)}
        {renderField('fittings', 'Запорная арматура', inst.fittingsOptions)}
      </div>

      <div className={Styles.cardFooter}>
        <div className={Styles.footerCopy}>
          <p>После добавления установку можно раскрыть и проверить выбранные параметры.</p>
          {showMessage && (
            <p className={Styles.errorMessage} role="alert">
              Установка не добавлена: выберите выделенные выше параметры.
            </p>
          )}
        </div>
        <button className={Styles.addButton} type="button" onClick={onAdd}>
          Добавить в расчёт <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
};
