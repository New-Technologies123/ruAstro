import { useState } from 'react';
import Styles from './card.module.scss';

interface InstallationCardProps {
    inst: any;
    sel: any;
    errors: any;
    isOpen: boolean;
    showMessage: boolean;
    onToggle: () => void;
    onChange: (field: string, value: any) => void;
    onAdd: () => void;
}

export const InstallationCard = ({
    inst,
    sel = {},
    errors = {},
    isOpen,
    showMessage,
    onToggle,
    onChange,
    onAdd
}: InstallationCardProps) => {

    const [openField, setOpenField] = useState<string | null>(null);

    const toggleField = (field: string) => {
        setOpenField(prev => (prev === field ? null : field));
    };

    const fields = [
        { label: 'Количество скважин', field: 'quantity', options: [1, 4, 6, 8, 10, 12, 14], numeric: true },
        { label: 'Максимальное рабочее давление', field: 'heating', options: inst.heatingOptions },
        { label: 'Емкость', field: 'volume', options: inst.volumeOptions },
        { label: 'Габариты блока технологий', field: 'pressure', options: inst.pressureOptions },
        { label: 'Габариты блока автоматики', field: 'pressure1', options: inst.pressure1Options },
        { label: 'Максимальная производительность по газу при стандартных условиях', field: 'range', options: inst.rangeOptions },
        { label: 'Расходомер на линии газа', field: 'vagometer', options: inst.vagometerOptions },
        { label: 'Расходомер на линии жидкости', field: 'vagometer1', options: inst.vagometer1Options },
        { label: 'Дублирующий расходомер', field: 'vagometer2', options: inst.vagometer2Options },
        { label: 'Исполнение по содержанию газа', field: 'lighting', options: inst.lightingOptions },
        { label: 'Наличие поточного влагомера, метод измерения', field: 'pollution', options: inst.pollutionOptions },
        { label: 'Шкафное оборудование', field: 'closet', options: inst.closetOptions }
    ];

    const handleToggleOption = (field: string, option: any, numeric?: boolean) => {
        if (numeric) {
            const val = Number(option);
            onChange(field, val);
            return;
        }

        const current: any[] = Array.isArray(sel[field]) ? sel[field] : [];
        const val = option?.label ?? option;
        let updated: any[];

        if (current.includes(val)) {
            updated = current.filter(v => v !== val);
        } else {
            updated = [...current, val];
        }

        onChange(field, updated);
    };

    return (
        <div className={Styles.card}>
            <div className={Styles.cardHeader} onClick={onToggle}>
                <h3>{inst.name}</h3>
                <div className={`${Styles.toggleIcon} ${isOpen ? Styles.open : ""}`}>
                    {isOpen ? '▲' : '▼'}
                </div>
            </div>

            {showMessage && (
                <div className={Styles.errorMessage}>
                    Заполните обязательные параметры
                </div>
            )}

            <div className={`${Styles.cardContent} ${isOpen ? Styles.open : ''}`}>
                <div className={Styles.formLeft}>
                    {fields.map(item => {
                        const isItemOpen = openField === item.field;
                        const hasError = !!errors[item.field];

                        return (
                            <div
                                key={item.field}
                                className={`${Styles.selectGroup} ${hasError ? Styles.errorBorder : ''}`}
                            >
                                <div className={Styles.paramHeader} onClick={() => toggleField(item.field)}>
                                    <label>{item.label}</label>
                                    <span className={`${Styles.arrow} ${isItemOpen ? Styles.open : ""}`}>{isItemOpen ? '▲' : '▼'}</span>
                                </div>

                                <div className={`${Styles.checkboxListWrapper} ${isItemOpen ? Styles.open : ''}`}>
                                    <div className={Styles.checkboxList}>
                                        {item.options?.map((o: any) => {
                                            const optionValue = o.label ?? o;
                                            const display = o.label ?? o;

                                            if (item.numeric) {
                                                const checked = sel[item.field] === Number(optionValue);
                                                return (
                                                    <label key={String(optionValue)} className={Styles.checkboxItem}>
                                                        <input
                                                            type="radio"
                                                            name={`${item.field}-${inst.id}`}
                                                            checked={checked}
                                                            onChange={() => handleToggleOption(item.field, optionValue, true)}
                                                        />
                                                        {display}
                                                    </label>
                                                );
                                            } else {
                                                const selectedArray: any[] = Array.isArray(sel[item.field]) ? sel[item.field] : [];
                                                const checked = selectedArray.includes(optionValue);
                                                return (
                                                    <label key={String(optionValue)} className={Styles.checkboxItem}>
                                                        <input
                                                            type="checkbox"
                                                            checked={checked}
                                                            onChange={() => handleToggleOption(item.field, optionValue, false)}
                                                        />
                                                        {display}
                                                    </label>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>

                                {hasError && (
                                    <div className={Styles.errorSelect}>Поле обязательно заполнить</div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className={Styles.rightBlock}>
                    <button className={Styles.addButton} onClick={() => { setOpenField(null); onAdd(); }}>
                        Получить расчет
                    </button>
                </div>
            </div>
        </div>
    );
};
