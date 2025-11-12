import Styles from './careers.module.scss';
import { Vacancy } from '../../ui/vacancy/Vacancy';
import { useState } from 'react';
import { Title } from '../../ui/title/Title';
import { useEffect } from 'react';
import { BackToTop } from '../../ui/back-to-top/BackToTop';

type TCareers = 'vacancy1' | 'vacancy2' | 'vacancy3' | 'vacancy4' | 'vacancy5' | 'vacancy6' 
 | 'vacancy7' | 'vacancy8' | 'vacancy9' | 'vacancy10' | 'vacancy11' | 'vacancy12' | 'vacancy13'
 | 'vacancy14' | 'vacancy15' | 'vacancy16' | 'vacancy17' | 'vacancy18' | 'vacancy19' 
 | 'vacancy20' | 'vacancy21' | 'vacancy22' | 'vacancy23' | 'vacancy24' | 'vacancy25' | 'vacancy26';

export const Careers = () => {

    const vacancyLinks: Record<TCareers, string> = {
        vacancy1: "https://ufa.hh.ru/vacancy/126589484?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy2: "https://ufa.hh.ru/vacancy/127388660?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
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
        vacancy16: "https://ufa.hh.ru/vacancy/127392204?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy17: "https://ufa.hh.ru/vacancy/127293929?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy18: "https://ufa.hh.ru/vacancy/127391976?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy19: "https://ufa.hh.ru/vacancy/127392338?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy20: "https://ufa.hh.ru/vacancy/127389162?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy21: "https://ufa.hh.ru/vacancy/125136758?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy22: "https://ufa.hh.ru/vacancy/127481178?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy23: "https://ufa.hh.ru/vacancy/127556737?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy24: "https://ufa.hh.ru/vacancy/127526931?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy25: "https://ufa.hh.ru/vacancy/127558100?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy26: "https://ufa.hh.ru/vacancy/127557628?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
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
                                <Vacancy
                                    header="Заместитель главного бухгалтера"
                                    title="Опыт работы: 3–6 лет"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy26, "_blank")}
                                />
                                <Vacancy
                                    header="Руководитель проектов"
                                    title="Опыт работы: 3–6 лет"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy23, "_blank")}
                                />
                                <Vacancy
                                    header="Инженер по снабжению"
                                    title="Опыт работы: 3–6 лет"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy25, "_blank")}
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
                                    header="Маляр по металлу"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy24, "_blank")}
                                />
                                <Vacancy
                                    header="Токарь"
                                    title="Опыт работы: 1-3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy9, "_blank")}
                                />
                                <Vacancy
                                    header="Кладовщик"
                                    title="Опыт работы: 1-3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy2, "_blank")}
                                />
                                <Vacancy
                                    header="Ведущий инженер ПНР КИПиА"
                                    title="Опыт работы: 3-6 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy17, "_blank")}
                                />
                                <Vacancy
                                    header="Уборщик производственных помещений"
                                    title="Опыт работы: не требуется"
                                    experience="Частичная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy22, "_blank")}
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
                        <div className={Styles.vacancies}>
                            <p>Вахта</p>
                            <div className={Styles.team}>
                                <Vacancy
                                    header="Монтажник ТТ"
                                    title="Опыт работы: 1–3 года"
                                    experience="Вахта на 30 смен"
                                    employmentType="График: 6/1"
                                    onClick={() => window.open(vacancyLinks.vacancy16, "_blank")}
                                />
                                <Vacancy
                                    header="Машинист крана-манипулятора"
                                    title="Опыт работы: 1–3 года"
                                    experience="Вахта на 30 смен"
                                    employmentType="График: 6/1"
                                    onClick={() => window.open(vacancyLinks.vacancy18, "_blank")}
                                />
                                <Vacancy
                                    header="Слесарь КИПиА (Сургут)"
                                    title="Опыт работы: 1–3 года"
                                    experience="Вахта на 30 смен"
                                    employmentType="График: 6/1"
                                    onClick={() => window.open(vacancyLinks.vacancy19, "_blank")}
                                />
                                <Vacancy
                                    header="Водитель категории С"
                                    title="Опыт работы: 1–3 года"
                                    experience="Вахта на 30 смен"
                                    employmentType="График: 6/1"
                                    onClick={() => window.open(vacancyLinks.vacancy20, "_blank")}
                                />
                                <Vacancy
                                    header="Слесарь КИПиА (Конданефть)"
                                    title="Опыт работы: 1–3 года"
                                    experience="Вахта на 30 смен"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy21, "_blank")}
                                />
                            </div>
                        </div>
                    </div>
                </> 
            )}
            <BackToTop/>
        </>
    );
};