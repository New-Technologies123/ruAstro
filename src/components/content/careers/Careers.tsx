import Styles from './careers.module.scss';
import { useTranslation } from 'react-i18next';
import { Vacancy } from '../../ui/vacancy/Vacancy';
import { useState } from 'react';
import { Title } from '../../ui/title/Title';
import { useEffect } from 'react';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

type TCareers = 'vacancy1' | 'vacancy2' | 'vacancy3' | 'vacancy4' | 'vacancy5' | 'vacancy6' 
 | 'vacancy7' | 'vacancy8' | 'vacancy9' | 'vacancy10' | 'vacancy11' | 'vacancy12' | 'vacancy13'
 | 'vacancy14' | 'vacancy15' | 'vacancy16' | 'vacancy17' | 'vacancy18' | 'vacancy19' | 'vacancy20'
 | 'vacancy21' | 'vacancy22';

export const Careers = () => {
    const { t, i18n } = useTranslation('careers');

    const vacancyLinks: Record<TCareers, string> = {
        vacancy1: "https://ufa.hh.ru/vacancy/126006933?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy2: "https://ufa.hh.ru/vacancy/125823249?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy3: "https://ufa.hh.ru/vacancy/125412859?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy4: "https://ufa.hh.ru/vacancy/124368711?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy5: "https://ufa.hh.ru/vacancy/125953389?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy6: "https://ufa.hh.ru/vacancy/125412835?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy7: "",
        vacancy8: "https://ufa.hh.ru/vacancy/122969761?hhtmFrom=vacancy_search_list",
        vacancy9: "https://ufa.hh.ru/vacancy/125337621?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy10: "",
        vacancy11: "https://ufa.hh.ru/vacancy/125148681?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy12: "",
        vacancy13: "https://ufa.hh.ru/vacancy/125148803?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy14: "https://ufa.hh.ru/vacancy/125328844?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy15: "https://ufa.hh.ru/vacancy/125386510?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy16: "https://ufa.hh.ru/vacancy/125478382?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy17: "https://ufa.hh.ru/vacancy/126174218?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy18: "https://ufa.hh.ru/vacancy/125460589?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy19: "https://ufa.hh.ru/vacancy/126174382?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy20: "https://ufa.hh.ru/vacancy/124876774?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy21: "",
        vacancy22: "https://ufa.hh.ru/vacancy/124588968?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
    };

    const [typeLayoutBackOpen, setTypeLayoutBackOpen] = useState<TCareers | null>(null);
    
    useEffect(() => {
        setTypeLayoutBackOpen(() => {
            const queryParams = new URLSearchParams(window.location.search);
            const typeFromQuery = queryParams.get('type');
            return typeFromQuery ? (typeFromQuery as TCareers) : null;
        });
    }, []);
    
    const onBack = () => {
        setTypeLayoutBackOpen(null);
    
        const newUrl = `${window.location.origin}${window.location.pathname}`;
        window.history.pushState({}, '', newUrl);
    };
    
    const onClickCard = (typeProduct: TCareers) => {
        setTypeLayoutBackOpen(typeProduct);
    
        const newUrl = `${window.location.origin}${window.location.pathname}?type=${typeProduct}`;
        window.history.pushState({}, '', newUrl);
    };

    return (
        <>
            {typeLayoutBackOpen === null && (
                <>
                    <Title text={t('Вакансии')}></Title>
                    <div className={Styles.ramca}>                                           
                        <div className={Styles.vacancies}>
                            <p>{t('Офис')}</p>
                            <div className={Styles.team}>
                                <Vacancy
                                    header={t('ГлавныйМетролог')}
                                    title={t('Опыт6')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy8, "_blank")}
                                />
                                <Vacancy
                                    header={t('Тендерный')}
                                    title={t('Опыт')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy14, "_blank")}
                                />
                                <Vacancy
                                    header="Коммерческий директор (CCO)"
                                    title="Опыт работы: 3–6 лет"
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy1, "_blank")}
                                />
                                <Vacancy
                                    header="Инженер по снабжению"
                                    title="Опыт работы: 3–6 лет"
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy5, "_blank")}
                                />
                                <Vacancy
                                    header={t('НачальникОхраны')}
                                    title={t('Опыт3')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy16, "_blank")}
                                />
                                <Vacancy
                                    header="Заместитель генерального директора по финансам"
                                    title="Опыт работы: более 6 лет"
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy2, "_blank")}
                                />                                
                            </div>
                        </div>
                        <div className={Styles.vacancies}>
                            <p>{t('Завод')}</p>
                            <div className={Styles.team}>
                                <Vacancy
                                    header={t('НачальникКонструктор')}
                                    title={t('Опыт3')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy13, "_blank")}
                                />
                                <Vacancy
                                    header={t('Бухгалтера')}
                                    title={t('Опыт3')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy22, "_blank")}
                                />
                                <Vacancy
                                    header={t('Бригада')}
                                    title={t('Опыт')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy6, "_blank")}
                                />
                                <Vacancy
                                    header={t('ИнженерКонстр')}
                                    title={t('Опыт')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy15, "_blank")}
                                />
                                <Vacancy
                                    header={t('КонтролерОТК')}
                                    title={t('Опыт')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy18, "_blank")}
                                />
                                <Vacancy
                                    header={t('Наладчик')}
                                    title={t('Опыт')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy11, "_blank")}
                                />
                                <Vacancy
                                    header={t('Монтажник')}
                                    title={t('Опыт')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy17, "_blank")}
                                />
                                <Vacancy
                                    header={t('Работник')}
                                    title={t('ОпытНе')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy9, "_blank")}
                                />
                                <Vacancy
                                    header={t('Слесарь')}
                                    title={t('Опыт')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy4, "_blank")}
                                />
                                <Vacancy
                                    header={t('Маляр')}
                                    title={t('Опыт')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy19, "_blank")}
                                />
                                <Vacancy
                                    header={t('Грузчик')}
                                    title={t('ОпытНе')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy20, "_blank")}
                                />
                                <Vacancy
                                    header={t('Электрогазосварщик')}
                                    title={t('Опыт')}
                                    experience={t('Полная')}
                                    employmentType={t('График')}
                                    onClick={() => window.open(vacancyLinks.vacancy3, "_blank")}
                                />
                            </div> 
                        </div>
                        {/* <div className={Styles.vacancies}>
                            <p>{t('Вахта')}</p>
                            <div className={Styles.team}>
                            </div>
                        </div> */}
                    </div>
                </>
            )}
            <BackToTop/>
        </>
    );
};