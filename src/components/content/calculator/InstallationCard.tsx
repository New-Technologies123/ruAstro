import { useState } from 'react';
import Styles from './card.module.scss';

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
                <div className={Styles.formGrid}>

                    {/* Количество скважин */}
                    <div className={`${Styles.selectGroup} ${errors.quantity ? Styles.errorBorder : ''}`}>
                        <div className={Styles.paramHeader}><label>Количество скважин</label></div>
                        <div className={`${Styles.checkboxListWrapper} ${Styles.open}`}>
                            {renderCheckboxes('quantity', inst.quantityOptions, true)}
                        </div>
                        {errors.quantity && <div className={Styles.errorSelect}>Поле обязательно заполнить</div>}
                    </div>

                    {/* Максимальное рабочее давление */}
                    <div className={`${Styles.selectGroup} ${errors.heating ? Styles.errorBorder : ''}`}>
                        <div className={Styles.paramHeader}><label>Максимальное рабочее давление</label></div>
                        <div className={`${Styles.checkboxListWrapper} ${Styles.open}`}>
                            {renderCheckboxes('heating', inst.heatingOptions)}
                        </div>
                        {errors.heating && <div className={Styles.errorSelect}>Поле обязательно заполнить</div>}
                    </div>

                    {/* Емкость */}
                    <div className={`${Styles.selectGroup} ${errors.volume ? Styles.errorBorder : ''}`}>
                        <div className={Styles.paramHeader}><label>Емкость</label></div>
                        <div className={`${Styles.checkboxListWrapper} ${Styles.open}`}>
                            {renderCheckboxes('volume', inst.volumeOptions)}
                        </div>
                        {errors.volume && <div className={Styles.errorSelect}>Поле обязательно заполнить</div>}
                    </div>

                    {/* Габариты блока технологий */}
                    <div className={`${Styles.selectGroup} ${errors.pressure ? Styles.errorBorder : ''}`}>
                        <div className={Styles.paramHeader}><label>Габариты блока технологий</label></div>
                        <div className={`${Styles.checkboxListWrapper} ${Styles.open}`}>
                            {renderCheckboxes('pressure', inst.pressureOptions)}
                        </div>
                        {errors.pressure && <div className={Styles.errorSelect}>Поле обязательно заполнить</div>}
                    </div>

                    {/* Габариты блока автоматики */}
                    <div className={`${Styles.selectGroup} ${errors.pressure1 ? Styles.errorBorder : ''}`}>
                        <div className={Styles.paramHeader}><label>Габариты блока автоматики</label></div>
                        <div className={`${Styles.checkboxListWrapper} ${Styles.open}`}>
                            {renderCheckboxes('pressure1', inst.pressure1Options)}
                        </div>
                        {errors.pressure1 && <div className={Styles.errorSelect}>Поле обязательно заполнить</div>}
                    </div>

                    {/* Расходомер на линии газа */}
                    <div className={`${Styles.selectGroup} ${errors.vagometer ? Styles.errorBorder : ''}`}>
                        <div className={Styles.paramHeader}><label>Расходомер на линии газа</label></div>
                        <div className={`${Styles.checkboxListWrapper} ${Styles.open}`}>
                            {renderCheckboxes('vagometer', inst.vagometerOptions)}
                        </div>
                        {errors.vagometer && <div className={Styles.errorSelect}>Поле обязательно заполнить</div>}
                    </div>

                    {/* Расходомер на линии жидкости */}
                    <div className={`${Styles.selectGroup} ${errors.vagometer1 ? Styles.errorBorder : ''}`}>
                        <div className={Styles.paramHeader}><label>Расходомер на линии жидкости</label></div>
                        <div className={`${Styles.checkboxListWrapper} ${Styles.open}`}>
                            {renderCheckboxes('vagometer1', inst.vagometer1Options)}
                        </div>
                        {errors.vagometer1 && <div className={Styles.errorSelect}>Поле обязательно заполнить</div>}
                    </div>

                    {/* Дублирующий расходомер */}
                    <div className={`${Styles.selectGroup} ${errors.vagometer2 ? Styles.errorBorder : ''}`}>
                        <div className={Styles.paramHeader}><label>Дублирующий расходомер</label></div>
                        <div className={`${Styles.checkboxListWrapper} ${Styles.open}`}>
                            {renderCheckboxes('vagometer2', inst.vagometer2Options)}
                        </div>
                        {errors.vagometer2 && <div className={Styles.errorSelect}>Поле обязательно заполнить</div>}
                    </div>

                    {/* Наличие поточного влагомера */}
                    <div className={`${Styles.selectGroup} ${errors.pollution ? Styles.errorBorder : ''}`}>
                        <div className={Styles.paramHeader}><label>Наличие поточного влагомера, метод измерения</label></div>
                        <div className={`${Styles.checkboxListWrapper} ${Styles.open}`}>
                            {renderCheckboxes('pollution', inst.pollutionOptions)}
                        </div>
                        {errors.pollution && <div className={Styles.errorSelect}>Поле обязательно заполнить</div>}
                    </div>

                    {/* Шкафное оборудование */}
                    <div className={`${Styles.selectGroup} ${errors.closet ? Styles.errorBorder : ''}`}>
                        <div className={Styles.paramHeader}><label>Шкафное оборудование</label></div>
                        <div className={`${Styles.checkboxListWrapper} ${Styles.open}`}>
                            {renderCheckboxes('closet', inst.closetOptions)}
                        </div>
                        {errors.closet && <div className={Styles.errorSelect}>Поле обязательно заполнить</div>}
                    </div>

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
