import { useEffect, useRef, useState } from 'react';

import Styles from './card.module.scss';
import { configurationSteps, getIncompleteFields, nonSeparationValues } from './configurationSteps';

interface Option {
  label: string;
  price?: number;
}

type SelectionMode = 'multiple' | 'single' | 'number';

interface InstallationCardProps {
  inst: any;
  sel: Record<string, any>;
  errors: Record<string, boolean>;
  showMessage: boolean;
  validationAttempt: number;
  onChange: (field: string, value: any) => void;
  onValidate: (fields: readonly string[]) => boolean;
  onAdd: () => boolean;
}

export const InstallationCard = ({
  inst,
  sel = {},
  errors = {},
  showMessage,
  validationAttempt,
  onChange,
  onValidate,
  onAdd,
}: InstallationCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const stepProgressRef = useRef<HTMLOListElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [highestReachedStep, setHighestReachedStep] = useState(0);
  const focusStepOnChange = useRef(false);
  const isLastStep = activeStep === configurationSteps.length - 1;
  const currentStepHasErrors = configurationSteps[activeStep].fields.some((field) => errors[field]);
  const stepParameterCount = configurationSteps[activeStep].fields.length;
  const filledParameterCount = stepParameterCount - getIncompleteFields(sel, configurationSteps[activeStep].fields).length;
  const hasNonSepGas = Array.isArray(sel.max_gas_1) && sel.max_gas_1.some((value: string) => value !== 'Не требуется');

  const changeStep = (step: number) => {
    focusStepOnChange.current = true;
    setActiveStep(step);
  };

  useEffect(() => {
    if (!focusStepOnChange.current) return;
    focusStepOnChange.current = false;
    const panel = cardRef.current?.querySelector<HTMLElement>(':scope section:not([hidden])');
    panel?.focus({ preventScroll: true });
    stepProgressRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [activeStep]);

  const handleNext = () => {
    if (!onValidate(configurationSteps[activeStep].fields)) return;
    setHighestReachedStep((previous) => Math.max(previous, activeStep + 1));
    changeStep(activeStep + 1);
  };

  const handleStepNavigation = (step: number) => {
    if (step === activeStep || step > highestReachedStep) return;
    if (step > activeStep) {
      const previousFields = configurationSteps.slice(0, step).flatMap((entry) => [...entry.fields]);
      if (!onValidate(previousFields)) {
        setActiveStep(configurationSteps.findIndex((entry) => getIncompleteFields(sel, entry.fields).length > 0));
        return;
      }
    }
    changeStep(step);
  };

  const handleAdd = () => {
    const incompleteStep = configurationSteps.findIndex((step) => getIncompleteFields(sel, step.fields).length > 0);
    if (incompleteStep >= 0) setActiveStep(incompleteStep);
    if (onAdd()) {
      setActiveStep(0);
      setHighestReachedStep(0);
    }
  };

  useEffect(() => {
    if (validationAttempt === 0) return;

    const firstInvalidField = cardRef.current?.querySelector<HTMLElement>(':scope section:not([hidden]) [data-invalid="true"]');
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
    if (hasRealValue && sel.vagometer1?.includes('Многофазный расходомер')) {
      onChange('vagometer1', sel.vagometer1.filter((value: string) => value !== 'Многофазный расходомер'));
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
      if (sel.max_gas?.length !== 1 || sel.max_gas[0] !== 'Не требуется') onChange('max_gas', ['Не требуется']);
      if (sel.vagometer?.length !== 1 || sel.vagometer[0] !== 'Не требуется') onChange('vagometer', ['Не требуется']);
      if (sel.vagometer2?.length !== 1 || sel.vagometer2[0] !== 'Не требуется') onChange('vagometer2', ['Не требуется']);
      if (sel.vagometer1?.length !== 1 || sel.vagometer1[0] !== 'Многофазный расходомер') {
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

  const handleToggleOption = (field: string, option: Option, mode: SelectionMode) => {
    if (mode === 'number') {
      onChange(field, option.label);
      return;
    }
    if (mode === 'single') {
      onChange(field, [option.label]);
      return;
    }
    const current: string[] = Array.isArray(sel[field]) ? sel[field] : [];
    if ((field === 'max_gas' || field === 'max_gas_1') && !current.includes(option.label)) {
      onChange(field, option.label === 'Не требуется'
        ? ['Не требуется']
        : [...current.filter((value) => value !== 'Не требуется'), option.label]);
      return;
    }
    const updated = current.includes(option.label)
      ? current.filter((value) => value !== option.label)
      : [...current, option.label];
    onChange(field, updated);
  };

  const renderField = (field: string, title: string, options: Option[], mode: SelectionMode = 'multiple') => {
    const hasError = Boolean(errors[field]);
    const errorId = `error-${inst.id}-${field}`;
    const availableOptions = hasNonSepGas && nonSeparationValues[field]
      ? options.filter((option) => option.label === nonSeparationValues[field])
      : options;

    return (
      <fieldset
        className={`${Styles.fieldGroup} ${hasError ? Styles.fieldError : ''}`}
        data-invalid={hasError ? 'true' : undefined}
        key={field}
      >
        <legend>{title}</legend>
        <div className={Styles.options}>
          {availableOptions?.map((option) => {
            const checked = mode === 'number'
              ? sel[field] === option.label
              : (sel[field] || []).includes(option.label);
            return (
              <label className={Styles.option} key={option.label}>
                <input
                  type={mode === 'multiple' ? 'checkbox' : 'radio'}
                  name={`${field}-${inst.id}`}
                  checked={checked}
                  onChange={() => handleToggleOption(field, option, mode)}
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
    <article className={Styles.card} ref={cardRef} data-motion-ignore>
      <div className={Styles.cardHeader}>
        <div>
          <span className={Styles.cardEyebrow}>Конфигурация установки</span>
          <h3>{inst.name}</h3>
        </div>
        <p className={Styles.stepStatus} role="status">Шаг {activeStep + 1} из {configurationSteps.length}</p>
      </div>

      <div className={Styles.stepIntroduction}>
        <p id={`configuration-hint-${inst.id}`}>
          Выберите все параметры на каждом шаге. Если оборудование не нужно, отметьте «Не требуется» или «Без влагомера».
        </p>
        <ol className={Styles.stepProgress} aria-label="Этапы конфигурации" ref={stepProgressRef}>
          {configurationSteps.map((step, stepIndex) => {
            const isCompleted = stepIndex < highestReachedStep && getIncompleteFields(sel, step.fields).length === 0;
            return (
              <li
                key={step.title}
                className={`${activeStep === stepIndex ? Styles.currentStep : ''} ${isCompleted ? Styles.completedStep : ''}`}
                aria-current={activeStep === stepIndex ? 'step' : undefined}
              >
                <button
                  className={Styles.stepLink}
                  type="button"
                  disabled={stepIndex === activeStep || stepIndex > highestReachedStep}
                  onClick={() => handleStepNavigation(stepIndex)}
                >
                  <span aria-hidden="true">{isCompleted && stepIndex !== activeStep ? '✓' : stepIndex + 1}</span>
                  <span id={`configuration-step-${inst.id}-${stepIndex}`}>{step.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className={Styles.parameterCount}>{filledParameterCount} из {stepParameterCount} выбрано</p>
      </div>

      <div className={Styles.parameterSections}>
        <section className={Styles.parameterSection} aria-labelledby={`configuration-step-${inst.id}-0`} tabIndex={-1} hidden={activeStep !== 0}>
          <div className={Styles.paramsGrid}>
            {renderField('quantity', 'Количество скважин', getQuantityOptions(), 'number')}
            {renderField('heating', 'Максимальное рабочее давление', inst.heatingOptions, 'single')}
            {renderField('volume', 'Производительность по жидкости до, т/сут', inst.volumeOptions, 'single')}
            {renderField('density', 'Исполнение входных трубопроводов', inst.densityOptions, 'single')}
          </div>
        </section>

        <section className={Styles.parameterSection} aria-labelledby={`configuration-step-${inst.id}-1`} tabIndex={-1} hidden={activeStep !== 1}>
          <div className={Styles.paramsGrid}>
            {renderField('max_gas', 'Газ: сепарационный способ, м³/сут', inst.max_gasOptions)}
            {renderField('max_gas_1', 'Газ: бессепарационный способ, м³/сут', getMaxGas1Options())}
            {renderField('vagometer1', 'Расходомер на линии жидкости', getVagometer1Options())}
            {renderField('vagometer', 'Расходомер на линии газа', inst.vagometerOptions)}
          </div>
        </section>

        <section className={Styles.parameterSection} aria-labelledby={`configuration-step-${inst.id}-2`} tabIndex={-1} hidden={activeStep !== 2}>
          <div className={Styles.paramsGrid}>
            {renderField('pollution', 'Наличие поточного влагомера', inst.pollutionOptions)}
            {renderField('vagometer2', 'Дублирующий расходомер', inst.vagometer2Options)}
            {renderField('closet', 'Шкафное оборудование', inst.closetOptions)}
            {renderField('fittings', 'Запорная арматура', inst.fittingsOptions, 'single')}
          </div>
        </section>
      </div>

      <div className={Styles.cardFooter}>
        <div className={Styles.footerCopy}>
          <p>{isLastStep ? 'Выберите комплектацию и добавьте установку в расчёт.' : 'Чтобы продолжить, выберите все параметры текущего шага.'}</p>
          {showMessage && currentStepHasErrors && (
            <p className={Styles.errorMessage} role="alert">
              Выберите все параметры, выделенные красным.
            </p>
          )}
        </div>
        <div className={Styles.stepActions}>
          {activeStep > 0 && <button className={Styles.backButton} type="button" onClick={() => changeStep(activeStep - 1)}>Назад</button>}
          {isLastStep ? (
            <button className={Styles.addButton} type="button" onClick={handleAdd} aria-describedby={`configuration-hint-${inst.id}`}>
              Добавить в расчёт <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button className={Styles.addButton} type="button" onClick={handleNext} aria-describedby={`configuration-hint-${inst.id}`}>
              Далее <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
