import Styles from './careers.module.scss';
import { useTranslation } from 'react-i18next';
import { Vacancy } from '../../ui/vacancy/Vacancy';
import { useState } from 'react';
import { Title } from '../../ui/title/Title';
import { useEffect } from 'react';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

type TCareers = 'vacancy1' | 'vacancy2' | 'vacancy3' | 'vacancy4' | 'vacancy5' | 'vacancy6' 
 | 'vacancy7' | 'vacancy8' | 'vacancy9' | 'vacancy10' | 'vacancy11' | 'vacancy12' | 'vacancy13'
 | 'vacancy14' | 'vacancy15' | 'vacancy16' | 'vacancy17' | 'vacancy18';

export const Careers = () => {
    const { t, i18n } = useTranslation('careers');

    const vacancyLinks: Record<TCareers, string> = {
        vacancy1: "https://ufa.hh.ru/vacancy/126589484?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy2: "https://ufa.hh.ru/vacancy/126915229?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy3: "https://ufa.hh.ru/vacancy/126472421?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy4: "https://ufa.hh.ru/vacancy/124368711?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy5: "https://ufa.hh.ru/vacancy/127099664?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy6: "https://ufa.hh.ru/vacancy/126473582?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy7: "https://ufa.hh.ru/vacancy/127175649?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy8: "https://ufa.hh.ru/vacancy/126187855?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy9: "https://ufa.hh.ru/vacancy/127099692?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy10: "http://ufa.hh.ru/vacancy/127184615?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy11: "https://ufa.hh.ru/vacancy/125148681?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy12: "https://ufa.hh.ru/vacancy/126589206?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy13: "https://ufa.hh.ru/vacancy/125148803?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy14: "https://ufa.hh.ru/vacancy/126174218?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy15: "https://ufa.hh.ru/vacancy/125460589?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy16: "https://ufa.hh.ru/vacancy/126174382?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy17: "",        
        vacancy18: "",        
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
                    <Title text="Открытые вакансии"></Title>
                    <div className={Styles.ramca}>                                           
                        <div className={Styles.vacancies}>
                            <p>Заки Валиди 32/2</p>
                            <div className={Styles.team}>
                                <Vacancy
                                    header="Ведущий инженер отдела ПТО"
                                    title="Опыт работы: 3–6 лет"
                                    experience="Проект или разовое задание"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy2, "_blank")}
                                />
                                <Vacancy
                                    header="Инженер-конструктор"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy6, "_blank")}
                                />
                                <Vacancy
                                    header="Метролог"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy5, "_blank")}
                                />
                                <Vacancy
                                    header="Тендерный специалист"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy7, "_blank")}
                                />
                                <Vacancy
                                    header="Юрист"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy10, "_blank")}
                                />
                                <Vacancy
                                    header="Специалист службы безопасности"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy1, "_blank")}
                                />                                
                            </div>
                        </div>
                        <div className={Styles.vacancies}>
                            <p>Благоварская 16/2</p>
                            <div className={Styles.team}>
                                <Vacancy
                                    header="Водитель с категорией С, Е"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy12, "_blank")}
                                />
                                <Vacancy
                                    header="Контролер ОТК металлургия"
                                    title="Опыт работы: 1-3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy15, "_blank")}
                                />
                                <Vacancy
                                    header="Наладчик станков с ЧПУ"
                                    title="Опыт работы: 1-3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy11, "_blank")}
                                />
                                <Vacancy
                                    header="Монтажник ТТ"
                                    title="Опыт работы: 1-3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy14, "_blank")}
                                />
                                <Vacancy
                                    header="Слесарь КИПиА"
                                    title="Опыт работы: 1-3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy4, "_blank")}
                                />
                                <Vacancy
                                    header="Маляр по металлу"
                                    title="Опыт работы: 1-3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy16, "_blank")}
                                />
                                <Vacancy
                                    header="Электрогазосварщик ТТ"
                                    title="Опыт работы: 1-3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy3, "_blank")}
                                />
                                <Vacancy
                                    header="Грузчик"
                                    title="Опыт работы: не требуется"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy8, "_blank")}
                                />
                                <Vacancy
                                    header="Токарь"
                                    title="Опыт работы: 1-3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy9, "_blank")}
                                />
                                <Vacancy
                                    header="Начальник конструкторского отдела"
                                    title="Опыт работы: 3-6 лет"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy13, "_blank")}
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