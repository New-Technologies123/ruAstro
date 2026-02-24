import Styles from './careers.module.scss';
import { Vacancy } from '../../ui/vacancy/Vacancy';
import { useState } from 'react';
import { Title } from '../../ui/title/Title';
import { useEffect } from 'react';

type TCareers = 'vacancy1' | 'vacancy2' | 'vacancy3' | 'vacancy4' | 'vacancy5' | 'vacancy6' 
 | 'vacancy7' | 'vacancy8' | 'vacancy9' | 'vacancy10' | 'vacancy11' | 'vacancy12' | 'vacancy13'
 | 'vacancy14' | 'vacancy15' | 'vacancy16' | 'vacancy17' | 'vacancy18' | 'vacancy19' 
 | 'vacancy20' | 'vacancy21' | 'vacancy22' | 'vacancy23' | 'vacancy24' | 'vacancy25';

export const Careers = () => {

    const vacancyLinks: Record<TCareers, string> = {
        vacancy1: "",
        vacancy2: "https://ufa.hh.ru/vacancy/129985800?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy3: "https://ufa.hh.ru/vacancy/130527326?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy4: "https://ufa.hh.ru/vacancy/130285329?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy5: "https://ufa.hh.ru/vacancy/130561788?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy6: "https://ufa.hh.ru/vacancy/128807546?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy7: "https://ufa.hh.ru/vacancy/128808731?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy8: "https://ufa.hh.ru/vacancy/130552730?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy9: "https://ufa.hh.ru/vacancy/130527291?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy10: "https://ufa.hh.ru/vacancy/130358499?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy11: "https://ufa.hh.ru/vacancy/130532248?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy12: "",
        vacancy13: "https://ufa.hh.ru/vacancy/129981588?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy14: "https://ufa.hh.ru/vacancy/130350879?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer", 
        vacancy15: "https://ufa.hh.ru/vacancy/130461562?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy16: "https://ufa.hh.ru/vacancy/130552696?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy17: "https://ufa.hh.ru/vacancy/130490534?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy18: "https://ufa.hh.ru/vacancy/129983204?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy19: "https://ufa.hh.ru/vacancy/130339209?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy20: "https://ufa.hh.ru/vacancy/130351150?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy21: "https://ufa.hh.ru/vacancy/129446854?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy22: "https://ufa.hh.ru/vacancy/130602170?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy23: "https://ufa.hh.ru/vacancy/130602230?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy24: "",
        vacancy25: "",
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
                                    header="Главный бухгалтер"
                                    title="Опыт работы: 3–6 лет"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy4, "_blank")}
                                />
                                <Vacancy
                                    header="Главный метролог"
                                    title="Опыт работы: более 6 лет"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy3, "_blank")}
                                />
                                <Vacancy
                                    header="Ведущий экономист"
                                    title="Опыт работы: 3–6 лет"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy19, "_blank")}
                                />
                                <Vacancy
                                    header="Программист 1С"
                                    title="Опыт работы: не требуется"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy17, "_blank")}
                                />
                                <Vacancy
                                    header="Специалист по кадровому делопроизводству"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy5, "_blank")}
                                />
                                <Vacancy
                                    header="Заместитель главного бухгалтера"
                                    title="Опыт работы: 3–6 лет"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy23, "_blank")}
                                />
                                <Vacancy
                                    header="Куратор проекта"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy10, "_blank")}
                                />
                                <Vacancy
                                    header="Менеджер по экспорту"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy14, "_blank")}
                                />
                                <Vacancy
                                    header="Инженер-электронщик"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy15, "_blank")}
                                />
                            </div>
                        </div>
                        <div className={Styles.vacancies}>
                            <p>Благоварская 16/2</p>
                            <div className={Styles.team}>
                                <Vacancy
                                    header="Электрогазосварщик ТТ"
                                    title="Опыт работы: 1-3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy22, "_blank")}
                                />
                                <Vacancy
                                    header="Инженер-электрик"
                                    title="Опыт работы: 1-3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy8, "_blank")}
                                />
                                <Vacancy
                                    header="Работник на производство"
                                    title="Опыт работы: не требуется"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy6, "_blank")}
                                />
                                <Vacancy
                                    header="Пескоструйщик-дробеструйщик"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy7, "_blank")}
                                />
                                <Vacancy
                                    header="Юрист"
                                    title="Опыт работы: 1-3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy16, "_blank")}
                                />
                                <Vacancy
                                    header="Специалист по стандартизации и сертификации"
                                    title="Опыт работы: 3–6 лет"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy9, "_blank")}
                                />                                
                            </div>
                        </div>
                        <div className={Styles.vacancies}>
                            <p>Вахта</p>
                            <div className={Styles.team}>
                                <Vacancy
                                    header="Водитель категории С (Татарстан, Самара)"
                                    title="Опыт работы: 1–3 года"
                                    experience="Вахта на 30 смен"
                                    employmentType="График: 6/1 или 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy11, "_blank")}
                                />
                                <Vacancy
                                    header="Оператор по исследованию скважин (Губкинский)"
                                    title="Опыт работы: 1–3 года"
                                    experience="Вахта на 30 смен"
                                    employmentType="График: 6/1"
                                    onClick={() => window.open(vacancyLinks.vacancy13, "_blank")}
                                />
                                <Vacancy
                                    header="Водитель категории С (Губкинский)"
                                    title="Опыт работы: 1–3 года"
                                    experience="Вахта на 30 или 45 смен"
                                    employmentType="График: 6/1"
                                    onClick={() => window.open(vacancyLinks.vacancy20, "_blank")}
                                />
                                <Vacancy
                                    header="Водитель (категория С) ХМАО"
                                    title="Опыт работы: не требуется"
                                    experience="Вахта на 30, 45 или 60 смен"
                                    employmentType=""
                                    onClick={() => window.open(vacancyLinks.vacancy21, "_blank")}
                                />
                                <Vacancy
                                    header="Сварщик (Нижневартовск)"
                                    title="Опыт работы: 1–3 года"
                                    experience="Вахта на 30 или 60 смен"
                                    employmentType=""
                                    onClick={() => window.open(vacancyLinks.vacancy2, "_blank")}
                                />
                            </div>
                        </div>
                    </div>
                </> 
            )}
        </>
    );
};