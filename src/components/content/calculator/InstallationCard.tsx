import { useState } from 'react';
import Styles from './card.module.scss';
import { ParamCard } from '../../ui/param-card/ParamCard';
import { useEffect } from 'react';

interface InstallationCardProps {
    inst: any;
    sel: any;
    errors: any;
    showMessage: boolean;
    onChange: (field: string, value: any) => void;
    onAdd: () => void;
}

export const InstallationCard = ({
    inst,
    sel = {},
    errors = {},
    showMessage,
    onChange,
    onAdd
}: InstallationCardProps) => {

    const getVagometer1Options = () => {
        const hasNonSepGas =
            sel.max_gas_1?.length &&
            !sel.max_gas_1.includes('Не требуется');

        if (hasNonSepGas) {
            return inst.vagometer1Options.filter(
            (o: any) => o.label === 'Многофазный расходомер'
            );
        }

        return inst.vagometer1Options;
    };

    useEffect(() => {
    const values = sel.max_gas_1 || [];

    const isEmpty = values.length === 0;
    const isNotRequired =
        values.length === 1 && values[0] === 'Не требуется';
    const hasRealValue =
        values.length > 0 && !values.includes('Не требуется');

    // 1️⃣ Есть реальное значение (НЕ "Не требуется")
    if (hasRealValue) {
        // max_gas → "Не требуется"
        if (sel.max_gas?.[0] !== 'Не требуется') {
            onChange('max_gas', ['Не требуется']);
        }

        // Расходомер на линии газа → "Не требуется"
        if (sel.vagometer?.[0] !== 'Не требуется') {
            onChange('vagometer', ['Не требуется']);
        }

        // Дублирующий расходомер → "Не требуется"
        if (sel.vagometer2?.[0] !== 'Не требуется') {
            onChange('vagometer2', ['Не требуется']);
        }

        // Автовыбор многофазного расходомера
        if (sel.vagometer1?.[0] !== 'Многофазный расходомер') {
            onChange('vagometer1', ['Многофазный расходомер']);
        }
    }

    // 2️⃣ max_gas_1 пустой → очищаем зависимые параметры
    if (isEmpty) {
        if (sel.max_gas?.length) onChange('max_gas', []);
        if (sel.vagometer?.length) onChange('vagometer', []);
        if (sel.vagometer2?.length) onChange('vagometer2', []);
        if (sel.vagometer1?.length) onChange('vagometer1', []);
    }

    // 3️⃣ Если выбрано "Не требуется" → НИЧЕГО НЕ ДЕЛАЕМ
}, [sel.max_gas_1]);

    const getQuantityOptions = () => {
        if (sel.density?.[0] === 'Одностороннее') {
            return inst.quantityOptions.filter(
                (o: any) => o.label >= 1 && o.label <= 10
            );
        }

        if (sel.density?.[0] === 'Двустороннее') {
            return inst.quantityOptions.filter(
                (o: any) => o.label >= 4 && o.label <= 14
            );
        }

        return inst.quantityOptions;
    };

    useEffect(() => {
        if (!sel.quantity || !sel.density?.length) return;

        const q = sel.quantity;
        const d = sel.density[0];

        // Одностороннее → 1–10
        if (d === 'Одностороннее' && (q < 1 || q > 10)) {
            onChange('quantity', null);
        }

        // Двустороннее → 4–14
        if (d === 'Двустороннее' && (q < 4 || q > 14)) {
            onChange('quantity', null);
        }
    }, [sel.density]);



    const handleToggleOption = (field: string, option: any, numeric?: boolean) => {
        if (numeric) {
            onChange(field, option.label);
            return;
        }

        const current: any[] = Array.isArray(sel[field]) ? sel[field] : [];
        const val = option?.label ?? option;

        const updated = current.includes(val)
            ? current.filter(v => v !== val)
            : [...current, val];

        onChange(field, updated);
    };

    const renderCheckboxes = (field: string, options: any[], numeric?: boolean) => {
        return (
            <div className={Styles.checkboxListCompact}>
                {options?.map((o: any) => {
                    const value = o.label ?? o;
                    const checked = numeric
                        ? sel[field] === value
                        : (sel[field] || []).includes(value);

                    return (
                        <label key={String(value)} className={Styles.checkboxItemCompact}>
                            <input
                                type={numeric ? 'radio' : 'checkbox'}
                                name={`${field}-${inst.id}`}
                                checked={checked}
                                onChange={() => handleToggleOption(field, o, numeric)}
                            />
                            {value}
                        </label>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={Styles.card}>

            {showMessage && (
                <div className={Styles.errorMessage}>
                    Заполните обязательные параметры
                </div>
            )}

            <div className={`${Styles.cardContent} ${Styles.open}`}>
                <div className={Styles.paramsGrid}>

                    <ParamCard title="Количество скважин" error={errors.quantity} >
                        {renderCheckboxes('quantity', getQuantityOptions(), true)}
                    </ParamCard>

                    <ParamCard title="Максимальное рабочее давление" error={errors.heating} >
                        {renderCheckboxes('heating', inst.heatingOptions)}
                    </ParamCard>

                    <ParamCard title="Максимальная производительность по жидкости до, т/сут" error={errors.volume}>
                        {renderCheckboxes('volume', inst.volumeOptions)}
                    </ParamCard>

                    <ParamCard title="Исполнение по входным трубопроводам" error={errors.density} >
                        {renderCheckboxes('density', inst.densityOptions)}
                    </ParamCard>                    

                    <ParamCard title="Максимальная производительность по газу для сепарационного способа измерения, м³/сут" error={errors.max_gas} >
                        {renderCheckboxes('max_gas', inst.max_gasOptions)}
                    </ParamCard>

                    <ParamCard title="Максимальная производительность по газу для бессепарационного способа измерения, м³/сут" error={errors.max_gas_1} >
                        {renderCheckboxes('max_gas_1', inst.max_gas_1Options)}
                    </ParamCard>

                    {/* <ParamCard
                        title="Габариты блока автоматики"
                        error={errors.pressure1}
                    >
                        {renderCheckboxes('pressure1', inst.pressure1Options)}
                    </ParamCard> */}

                    {/* <ParamCard
                        title="Габариты блока технологий"
                        error={errors.pressure}
                    >
                        {renderCheckboxes('pressure', inst.pressureOptions)}
                    </ParamCard> */}

                    <ParamCard title="Наличие поточного влагомера" error={errors.pollution} >
                        {renderCheckboxes('pollution', inst.pollutionOptions)}
                    </ParamCard>

                    <ParamCard title="Расходомер на линии жидкости" error={errors.vagometer1} >
                        {renderCheckboxes('vagometer1', getVagometer1Options())}
                    </ParamCard>

                    <ParamCard title="Расходомер на линии газа" error={errors.vagometer} >
                        {renderCheckboxes('vagometer', inst.vagometerOptions)}
                    </ParamCard>

                    <ParamCard title="Дублирующий расходомер" error={errors.vagometer2} >
                        {renderCheckboxes('vagometer2', inst.vagometer2Options)}
                    </ParamCard>

                    <ParamCard title="Шкафное оборудование" error={errors.closet} >
                        {renderCheckboxes('closet', inst.closetOptions)}
                    </ParamCard>

                    <ParamCard title="Запорная арматура" error={errors.fittings} >
                        {renderCheckboxes('fittings', inst.fittingsOptions)}
                    </ParamCard>

                </div>
            </div>

            <div className={Styles.rightBlock}>
                <button className={Styles.addButton} onClick={onAdd}>
                    <p>
                        Получить расчет
                    </p>
                </button>
            </div>
        </div>
    );
};
