import { useState } from 'react';
import Styles from './card.module.scss';
import { ParamCard } from '../../ui/param-card/ParamCard';

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
            <h3 className={Styles.cardHeader}>{inst.name}</h3>

            {showMessage && (
                <div className={Styles.errorMessage}>
                    Заполните обязательные параметры
                </div>
            )}

            <div className={`${Styles.cardContent} ${Styles.open}`}>
                <div className={Styles.paramsGrid}>

                    <ParamCard
                        title="Количество скважин"
                        error={errors.quantity}
                    >
                        {renderCheckboxes('quantity', inst.quantityOptions, true)}
                    </ParamCard>

                    <ParamCard
                        title="Максимальное рабочее давление"
                        error={errors.heating}
                    >
                        {renderCheckboxes('heating', inst.heatingOptions)}
                    </ParamCard>

                    <ParamCard
                        title="Емкость"
                        error={errors.volume}
                    >
                        {renderCheckboxes('volume', inst.volumeOptions)}
                    </ParamCard>

                    <ParamCard
                        title="Габариты блока автоматики"
                        error={errors.pressure1}
                    >
                        {renderCheckboxes('pressure1', inst.pressure1Options)}
                    </ParamCard>

                    <ParamCard
                        title="Габариты блока технологий"
                        error={errors.pressure}
                    >
                        {renderCheckboxes('pressure', inst.pressureOptions)}
                    </ParamCard>

                    <ParamCard
                        title="Наличие поточного влагомера"
                        error={errors.pollution}
                    >
                        {renderCheckboxes('pollution', inst.pollutionOptions)}
                    </ParamCard>

                    <ParamCard
                        title="Расходомер на линии жидкости"
                        error={errors.vagometer1}
                    >
                        {renderCheckboxes('vagometer1', inst.vagometer1Options)}
                    </ParamCard>

                    <ParamCard
                        title="Расходомер на линии газа"
                        error={errors.vagometer}
                    >
                        {renderCheckboxes('vagometer', inst.vagometerOptions)}
                    </ParamCard>

                    <ParamCard
                        title="Дублирующий расходомер"
                        error={errors.vagometer2}
                    >
                        {renderCheckboxes('vagometer2', inst.vagometer2Options)}
                    </ParamCard>

                    <ParamCard
                        title="Шкафное оборудование"
                        error={errors.closet}
                    >
                        {renderCheckboxes('closet', inst.closetOptions)}
                    </ParamCard>

                </div>
            </div>

            <div className={Styles.rightBlock}>
                <button className={Styles.addButton} onClick={onAdd}>
                    Получить расчет
                </button>
            </div>
        </div>
    );
};
