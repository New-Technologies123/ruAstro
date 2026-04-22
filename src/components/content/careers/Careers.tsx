import Styles from './careers.module.scss';
import { Vacancy } from '../../ui/vacancy/Vacancy';
import { useState } from 'react';
import { Title } from '../../ui/title/Title';
import { useEffect } from 'react';

type TCareers = 'vacancy1' | 'vacancy2' | 'vacancy3' | 'vacancy4' | 'vacancy5' | 'vacancy6' 
 | 'vacancy7' | 'vacancy8' | 'vacancy9' | 'vacancy10' | 'vacancy11' | 'vacancy12' ;

export const Careers = () => {

    const vacancyLinks: Record<TCareers, string> = {
        vacancy1: "https://ufa.hh.ru/vacancy/132221496?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy2: "https://ufa.hh.ru/vacancy/132288467?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy3: "https://ufa.hh.ru/vacancy/132287600?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy4: "https://ufa.hh.ru/vacancy/132317538?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy5: "https://ufa.hh.ru/vacancy/132221506?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",        
        vacancy6: "https://ufa.hh.ru/vacancy/132274433?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy7: "https://ufa.hh.ru/vacancy/132274399?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy8: "https://ufa.hh.ru/vacancy/132334546?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer",
        vacancy9: "",
        vacancy10: "",
        vacancy11: "",
        vacancy12: "",
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
                                    header="Инженер ПТО"
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
                                    header="Мастер цех"
                                    title="Опыт работы: 3–6 лет"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy2, "_blank")}
                                />
                                <Vacancy
                                    header="Начальник ОТК"
                                    title="Опыт работы: 3–6 лет"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy3, "_blank")}
                                />                                
                                <Vacancy
                                    header="Монтажник ТТ"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy6, "_blank")}
                                />
                                <Vacancy
                                    header="Электрогазосварщик ТТ"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy7, "_blank")}
                                />
                                <Vacancy
                                    header="Мастер сварочного участка"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy8, "_blank")}
                                />
                                <Vacancy
                                    header="Пескоструйщик-дробеструйщик"
                                    title="Опыт работы: 1–3 года"
                                    experience="Полная занятость"
                                    employmentType="График: 5/2"
                                    onClick={() => window.open(vacancyLinks.vacancy4, "_blank")}
                                />
                            </div>
                        </div>
                        <div className={Styles.vacancies}>
                            <p>Вахта</p>
                            <div className={Styles.team}>
                                <Vacancy
                                    header="Водитель (категория С) ХМАО"
                                    title="Опыт работы: не требуется"
                                    experience="Вахта на 30, 45 или 60 смен"
                                    employmentType=""
                                    onClick={() => window.open(vacancyLinks.vacancy5, "_blank")}
                                />
                            </div>
                        </div>
                    </div>
                </> 
            )}
        </>
    );
};