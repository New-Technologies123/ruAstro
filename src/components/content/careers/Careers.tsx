import Styles from './careers.module.scss';
import { Vacancy } from '../../ui/vacancy/Vacancy';
import { useMemo, useState } from 'react';

type TCareers =
    | 'vacancy1'
    | 'vacancy2'
    | 'vacancy3'
    | 'vacancy4'
    | 'vacancy5'
    | 'vacancy6'
    | 'vacancy7'
    | 'vacancy8'
    | 'vacancy9'
    | 'vacancy10'
    | 'vacancy11'
    | 'vacancy12'
    | 'vacancy13'
    | 'vacancy14'
    | 'vacancy15'
    | 'vacancy16'
    | 'vacancy17'
    | 'vacancy18'
    | 'vacancy19'
    | 'vacancy20'
    | 'vacancy21'
    | 'vacancy22'
    | 'vacancy23'
    | 'vacancy24';

type VacancyType = 'ufa' | 'shift';

type VacancyData = {
    id: TCareers;
    title: string;
    experience: string;
    employment: string;
    schedule: string;
    type: VacancyType;
    searchText: string;
};

const vacancies: VacancyData[] = [
    // =========================================================
    // УФА
    // =========================================================

    {
        id: 'vacancy10',
        title: 'Ведущий экономист',
        experience: 'Опыт работы: 3–6 лет',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText: 'ведущий экономист уфа экономика',
    },
    {
        id: 'vacancy3',
        title: 'Инженер ПНР КИПиА',
        experience: 'Опыт работы: 3–6 лет',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText: 'инженер пнр кипиа уфа инженер',
    },
    {
        id: 'vacancy11',
        title: 'Инженер-технолог',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText: 'инженер технолог уфа производство',
    },
    {
        id: 'vacancy15',
        title: 'Разнорабочий на производство',
        experience: 'Опыт работы: не требуется',
        employment: 'Частичная занятость',
        schedule: 'График: 5/2 и другие варианты',
        type: 'ufa',
        searchText: 'разнорабочий производство уфа рабочий',
    },
    {
        id: 'vacancy22',
        title: 'Инженер-конструктор',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText: 'инженер конструктор уфа проектирование',
    },
    {
        id: 'vacancy1',
        title: 'Монтажник ТТ',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText: 'монтажник тт уфа монтаж',
    },
    {
        id: 'vacancy13',
        title: 'Токарь',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText: 'токарь уфа производство',
    },
    {
        id: 'vacancy5',
        title: 'Специалист по охране труда',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText: 'специалист охрана труда уфа от охрана',
    },
    {
        id: 'vacancy17',
        title: 'Маляр по металлу',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText: 'маляр металл уфа производство',
    },
    {
        id: 'vacancy14',
        title: 'Инженер-технолог',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText: 'инженер технолог уфа производство',
    },
    {
        id: 'vacancy16',
        title: 'Электрогазосварщик ТТ',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText: 'электрогазосварщик сварщик тт уфа производство',
    },
    {
        id: 'vacancy7',
        title: 'Контролер ОТК металлургия',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText: 'контролер отк металлургия уфа качество',
    },
    {
        id: 'vacancy12',
        title: 'Слесарь механосборочных работ',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText: 'слесарь механосборочных работ уфа производство',
    },
    {
        id: 'vacancy21',
        title: 'Оператор по депарафинизации скважин (ХАРАМПУР)',
        experience: 'Опыт работы: 3–6 лет',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText:
            'оператор депарафинизация скважин харампур уфа нефть',
    },
    {
        id: 'vacancy2',
        title: 'Инженер-сметчик в тендерный отдел',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText:
            'инженер сметчик тендерный отдел уфа смета тендер',
    },
    {
        id: 'vacancy18',
        title: 'Бригада сварщиков и монтажников ТТ',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText:
            'бригада сварщиков монтажников тт уфа сварка монтаж',
    },
    {
        id: 'vacancy19',
        title: 'Уборщик производственных помещений',
        experience: 'Опыт работы: не требуется',
        employment: 'Частичная занятость',
        schedule: 'График: 5/2 и другие варианты',
        type: 'ufa',
        searchText:
            'уборщик производственных помещений уфа уборка',
    },
    {
        id: 'vacancy4',
        title: 'Ведущий инженер-проектировщик',
        experience: 'Опыт работы: 3–6 лет',
        employment: 'Полная занятость',
        schedule: 'График: 5/2',
        type: 'ufa',
        searchText:
            'ведущий инженер проектировщик уфа проектирование',
    },

    // =========================================================
    // ВАХТА
    // =========================================================

    {
        id: 'vacancy20',
        title: 'Мастер КИПиА (СургутНефтегаз)',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Вахта на 30 или 60 смен',
        schedule: '',
        type: 'shift',
        searchText: 'мастер кипиа сургутнефтегаз вахта сургут',
    },
    {
        id: 'vacancy9',
        title: 'Водитель категории С (ХАРАМПУР)',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Вахта на 30 или 45 смен',
        schedule: 'График: 5/2',
        type: 'shift',
        searchText: 'водитель категория с харампур вахта',
    },
    {
        id: 'vacancy8',
        title: 'Слесарь КИПиА (Сургут)',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Вахта на 30 смен',
        schedule: 'График: 6/1',
        type: 'shift',
        searchText: 'слесарь кипиа сургут вахта',
    },
    {
        id: 'vacancy6',
        title: 'Водитель (категория С), ХМАО',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Вахта на 30 смен',
        schedule: '',
        type: 'shift',
        searchText: 'водитель категория с хмао вахта',
    },
    {
        id: 'vacancy23',
        title: 'Водитель категории С (г. Губкинский)',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Вахта на 30 смен',
        schedule: 'График: 6/1',
        type: 'shift',
        searchText: 'водитель категория с губкинский вахта',
    },
    {
        id: 'vacancy24',
        title: 'Оператор по исследованию скважин (Губкинский)',
        experience: 'Опыт работы: 1–3 года',
        employment: 'Вахта на 30 смен',
        schedule: 'График: 6/1',
        type: 'shift',
        searchText:
            'оператор исследование скважин губкинский вахта нефть',
    },
];

const vacancyLinks: Record<TCareers, string> = {
    vacancy1:
        'https://ufa.hh.ru/vacancy/136382290?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy2:
        'https://ufa.hh.ru/vacancy/136726516?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy3:
        'https://ufa.hh.ru/vacancy/136685420?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy4:
        'https://ufa.hh.ru/vacancy/136602952?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy5:
        'https://ufa.hh.ru/vacancy/136435976?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy6:
        'https://ufa.hh.ru/vacancy/136257799?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy7:
        'https://ufa.hh.ru/vacancy/136825067?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy8:
        'https://ufa.hh.ru/vacancy/136384308?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy9:
        'https://ufa.hh.ru/vacancy/136574447?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy10:
        'https://ufa.hh.ru/vacancy/136428407?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy11:
        'https://ufa.hh.ru/vacancy/135275235?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy12:
        'https://ufa.hh.ru/vacancy/136211327?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy13:
        'https://ufa.hh.ru/vacancy/136488489?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy14:
        'https://ufa.hh.ru/vacancy/135275235?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy15:
        'https://ufa.hh.ru/vacancy/136408407?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy16:
        'https://ufa.hh.ru/vacancy/136365814?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy17:
        'https://ufa.hh.ru/vacancy/135707059?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy18:
        'https://ufa.hh.ru/vacancy/136384517?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy19:
        'https://ufa.hh.ru/vacancy/136617297?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy20:
        'https://ufa.hh.ru/vacancy/136239971?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy21:
        'https://ufa.hh.ru/vacancy/136574407?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy22:
        'https://ufa.hh.ru/vacancy/136238661?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy23:
        'https://ufa.hh.ru/vacancy/136835771?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
    vacancy24:
        'https://ufa.hh.ru/vacancy/136835847?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
};

export const Careers = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | VacancyType>('all');

    const filteredVacancies = useMemo(() => {
        const query = search.trim().toLowerCase();

        return vacancies.filter((vacancy) => {
            const matchesFilter =
                filter === 'all' || vacancy.type === filter;

            const matchesSearch =
                query === '' ||
                vacancy.searchText.includes(query) ||
                vacancy.title.toLowerCase().includes(query) ||
                vacancy.experience.toLowerCase().includes(query) ||
                vacancy.employment.toLowerCase().includes(query) ||
                vacancy.schedule.toLowerCase().includes(query);

            return matchesFilter && matchesSearch;
        });
    }, [search, filter]);

    const ufaVacancies = filteredVacancies.filter(
        (vacancy) => vacancy.type === 'ufa'
    );

    const shiftVacancies = filteredVacancies.filter(
        (vacancy) => vacancy.type === 'shift'
    );

    const openVacancy = (vacancy: TCareers) => {
        window.open(
            vacancyLinks[vacancy],
            '_blank',
            'noopener,noreferrer'
        );
    };

    const clearSearch = () => {
        setSearch('');
    };

    const resetFilters = () => {
        setSearch('');
        setFilter('all');
    };

    const getVacancyWord = (count: number) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'вакансия';
        }

        if (
            count % 10 >= 2 &&
            count % 10 <= 4 &&
            (count % 100 < 10 || count % 100 >= 20)
        ) {
            return 'вакансии';
        }

        return 'вакансий';
    };

    return (
        <main className={Styles.careers}>

            {/* HERO */}

            <section className={Styles.hero}>
                <div className={Styles.heroInner}>

                    <div className={Styles.heroContent}>
                        <div className={Styles.eyebrow}>
                            <span className={Styles.eyebrowDot} />
                            КАРЬЕРА В НОВЫХ ТЕХНОЛОГИЯХ
                        </div>

                        <h1>
                            Работа, где
                            <br />
                            <span>создают решения</span>
                        </h1>

                        <p>
                            Присоединяйтесь к команде, которая проектирует,
                            производит и внедряет оборудование для
                            нефтегазовой отрасли.
                        </p>

                        <a
                            href="#vacancies"
                            className={Styles.heroButton}
                        >
                            Смотреть вакансии
                            <span>↓</span>
                        </a>
                    </div>

                    <div className={Styles.heroVisual}>
                        <div className={Styles.visualCard}>
                            <div className={Styles.visualNumber}>
                                01
                            </div>

                            <div className={Styles.visualLine} />

                            <div className={Styles.visualText}>
                                <strong>Команда</strong>

                                <span>
                                    специалисты, инженеры
                                    и производственные эксперты
                                </span>
                            </div>
                        </div>

                        <div className={Styles.heroOrb} />
                    </div>

                </div>
            </section>

            {/* INTRO */}

            <section className={Styles.intro}>
                <div className={Styles.introHeading}>
                    <span className={Styles.sectionLabel}>
                        О КОМАНДЕ
                    </span>

                    <h2>
                        Не просто работа.
                        <br />
                        <span>Общее дело.</span>
                    </h2>
                </div>

                <div className={Styles.introText}>
                    <p>
                        Мы объединяем людей, которым важны результат,
                        профессиональное развитие и возможность видеть
                        практический эффект своей работы.
                    </p>

                    <p>
                        В нашей команде есть специалисты разных
                        направлений — от инженерии и производства
                        до экономики, проектирования и управления.
                    </p>
                </div>
            </section>

            {/* STATS */}

            <section className={Styles.stats}>
                <div className={Styles.stat}>
                    <strong>20+</strong>
                    <span>
                        лет работы
                        <br />
                        в отрасли
                    </span>
                </div>

                <div className={Styles.stat}>
                    <strong>100+</strong>
                    <span>
                        реализованных
                        <br />
                        проектов
                    </span>
                </div>

                <div className={Styles.stat}>
                    <strong>2</strong>
                    <span>
                        формата
                        <br />
                        занятости
                    </span>
                </div>

                <div className={Styles.stat}>
                    <strong>24</strong>
                    <span>
                        актуальные
                        <br />
                        вакансии
                    </span>
                </div>
            </section>

            {/* VACANCIES */}

            <section
                className={Styles.vacanciesSection}
                id="vacancies"
            >
                <div className={Styles.sectionHeader}>
                    <div>
                        <span className={Styles.sectionLabel}>
                            ВАКАНСИИ
                        </span>

                        <h2>
                            Найдите своё
                            <br />
                            <span>направление</span>
                        </h2>
                    </div>

                    <p>
                        Выберите интересующую позицию,
                        чтобы посмотреть подробности
                        и откликнуться.
                    </p>
                </div>

                {/* SEARCH + FILTERS */}

                <div className={Styles.vacancyControls}>
                    <div className={Styles.searchWrapper}>
                        <span
                            className={Styles.searchIcon}
                            aria-hidden="true"
                        >
                            ⌕
                        </span>

                        <input
                            type="search"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Поиск по вакансиям"
                            aria-label="Поиск по вакансиям"
                        />

                        {search && (
                            <button
                                type="button"
                                className={Styles.clearButton}
                                onClick={clearSearch}
                                aria-label="Очистить поиск"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <div className={Styles.filterWrapper}>
                        <div className={Styles.filters}>
                            <button
                                type="button"
                                className={
                                    filter === 'all'
                                        ? Styles.filterActive
                                        : ''
                                }
                                onClick={() => setFilter('all')}
                            >
                                Все
                            </button>

                            <button
                                type="button"
                                className={
                                    filter === 'ufa'
                                        ? Styles.filterActive
                                        : ''
                                }
                                onClick={() => setFilter('ufa')}
                            >
                                Уфа
                            </button>

                            <button
                                type="button"
                                className={
                                    filter === 'shift'
                                        ? Styles.filterActive
                                        : ''
                                }
                                onClick={() => setFilter('shift')}
                            >
                                Вахта
                            </button>
                        </div>

                        <span className={Styles.vacancyCount}>
                            {filteredVacancies.length}{' '}
                            {getVacancyWord(
                                filteredVacancies.length
                            )}
                        </span>
                    </div>
                </div>

                {/* EMPTY STATE */}

                {filteredVacancies.length === 0 && (
                    <div className={Styles.emptyState}>
                        <div className={Styles.emptyStateIcon}>
                            ⌕
                        </div>

                        <h3>Вакансии не найдены</h3>

                        <p>
                            Попробуйте изменить поисковый запрос
                            или выбрать другой вариант фильтра.
                        </p>

                        <button
                            type="button"
                            onClick={resetFilters}
                        >
                            Сбросить поиск
                        </button>
                    </div>
                )}

                {/* УФА */}

                {ufaVacancies.length > 0 && (
                    <div className={Styles.vacancyGroup}>
                        <div className={Styles.groupHeader}>
                            <div>
                                <span className={Styles.groupIndex}>
                                    01
                                </span>

                                <div>
                                    <h3>Работа в Уфе</h3>

                                    <p>
                                        Производственная площадка
                                    </p>
                                </div>
                            </div>

                            <span className={Styles.location}>
                                Благоварская 16/2
                            </span>
                        </div>

                        <div className={Styles.team}>
                            {ufaVacancies.map((vacancy) => (
                                <Vacancy
                                    key={vacancy.id}
                                    header={vacancy.title}
                                    title={vacancy.experience}
                                    experience={vacancy.employment}
                                    employmentType={vacancy.schedule}
                                    onClick={() =>
                                        openVacancy(vacancy.id)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* ВАХТА */}

                {shiftVacancies.length > 0 && (
                    <div className={Styles.vacancyGroup}>
                        <div className={Styles.groupHeader}>
                            <div>
                                <span className={Styles.groupIndex}>
                                    02
                                </span>

                                <div>
                                    <h3>Вахтовая работа</h3>

                                    <p>
                                        Проекты в регионах России
                                    </p>
                                </div>
                            </div>

                            <span className={Styles.location}>
                                Вахта
                            </span>
                        </div>

                        <div className={Styles.team}>
                            {shiftVacancies.map((vacancy) => (
                                <Vacancy
                                    key={vacancy.id}
                                    header={vacancy.title}
                                    title={vacancy.experience}
                                    experience={vacancy.employment}
                                    employmentType={vacancy.schedule}
                                    onClick={() =>
                                        openVacancy(vacancy.id)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* CTA */}

            <section className={Styles.cta}>
                <div className={Styles.ctaContent}>

                    <div className={Styles.ctaText}>
                        <span className={Styles.sectionLabel}>
                            НЕ НАШЛИ ПОДХОДЯЩУЮ ВАКАНСИЮ?
                        </span>

                        <h2>
                            Возможно, мы ищем
                            <br />
                            <span>именно вас.</span>
                        </h2>

                        <p>
                            Следите за актуальными предложениями
                            и отправляйте резюме через наши вакансии.
                        </p>
                    </div>

                    <a
                        href="https://ufa.hh.ru/employer/10682801?hhtmFrom=vacancy&tab=VACANCIES"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={Styles.ctaButton}
                    >
                        <span className={Styles.ctaButtonText}>
                            Перейти на HH.ru
                        </span>

                        <span className={Styles.ctaButtonIcon}>
                            ↗
                        </span>
                    </a>

                </div>

                <div className={Styles.ctaDecor}>
                    <span>NT</span>
                </div>
            </section>

        </main>
    );
};