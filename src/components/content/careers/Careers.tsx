import { ArrowUpRightIcon } from "../../ui/icon/ArrowUpRightIcon";
import Styles from './careers.module.scss';
import { Vacancy } from '../../ui/vacancy/Vacancy';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  | 'vacancy24'
  | 'vacancy25';

type VacancyType = 'ufa' | 'shift' | 'nizhnevartovsk';

const MOBILE_PREVIEW_COUNT = 4;
const DESKTOP_PREVIEW_COUNT = 6;

const createPreviewCounts = (isCompact: boolean): Record<VacancyType, number> => ({
  ufa: isCompact ? MOBILE_PREVIEW_COUNT : DESKTOP_PREVIEW_COUNT,
  nizhnevartovsk: isCompact ? MOBILE_PREVIEW_COUNT : DESKTOP_PREVIEW_COUNT,
  shift: isCompact ? MOBILE_PREVIEW_COUNT : DESKTOP_PREVIEW_COUNT,
});

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
    id: 'vacancy2',
    title: 'Начальник отдела кадров',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'начальник отдела кадров уфа',
  },
  {
    id: 'vacancy24',
    title: 'Заместитель главного бухгалтера',
    experience: 'Опыт работы: 3–6 лет',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'заместитель главного бухгалтера уфа',
  },
  {
    id: 'vacancy11',
    title: 'Начальник конструкторского отдела',
    experience: 'Опыт работы: 3–6 лет',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'начальник конструкторского отдела уфа',
  },
  {
    id: 'vacancy22',
    title: 'Тендерный специалист',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'тендерный специалист уфа',
  },
  {
    id: 'vacancy21',
    title: 'Главный бухгалтер',
    experience: 'Опыт работы: 3–6 лет',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'главный бухгалтер уфа',
  },
  {
    id: 'vacancy23',
    title: 'Менеджер по экспорту',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'менеджер по экспорту уфа',
  },
  {
    id: 'vacancy6',
    title: 'Ведущий инженер-проектировщик',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'ведущий инженер проектировщик уфа',
  },
  {
    id: 'vacancy5',
    title: 'Логист',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'логист уфа',
  },
  {
    id: 'vacancy4',
    title: 'Главный метролог',
    experience: 'Опыт работы: 3–6 лет',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'главный метролог уфа',
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
    id: 'vacancy16',
    title: 'Электрогазосварщик ТТ',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'электрогазосварщик сварщик тт уфа производство',
  },
  {
    id: 'vacancy9',
    title: 'Изолировщик',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Полная занятость',
    schedule: '',
    type: 'ufa',
    searchText: 'изолировщик уфа производство',
  },
  {
    id: 'vacancy3',
    title: 'Маркетолог',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Полная занятость',
    schedule: 'График: 5/2 и другие варианты',
    type: 'ufa',
    searchText: 'маркетолог уфа',
  },
  {
    id: 'vacancy19',
    title: 'Разнорабочий на производство',
    experience: 'Опыт работы: не требуется',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'разнорабочий уфа производство',
  },
  {
    id: 'vacancy18',
    title: 'Пескоструйщик-дробеструйщик',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'пескоструйщик дробеструйщик уфа производство',
  },
  {
    id: 'vacancy12',
    title: 'Бригада сварщиков-монтажников',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'бригада сварщиков-монтажников уфа производство',
  },
  {
    id: 'vacancy7',
    title: 'Специалист по охране труда',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'специалист по охране труда уфа',
  },
  {
    id: 'vacancy13',
    title: 'Уборщик производственных помещений',
    experience: 'Опыт работы: не требуется',
    employment: 'Полная занятость',
    schedule: 'График: 5/2 и другие варианты',
    type: 'ufa',
    searchText: 'уборщик производственных помещений уфа производство',
  },
  {
    id: 'vacancy14',
    title: 'Инженер-технолог по проектированию технологических схем',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'ufa',
    searchText: 'инженер технолог проектирование технологических схем уфа',
  },

  // =========================================================
  // НИЖНЕВАРТОВСК
  // =========================================================

  {
    id: 'vacancy15',
    title: 'Машинист КМУ',
    experience: 'Опыт работы: не требуется',
    employment: 'Полная занятость',
    schedule: 'График: 5/2',
    type: 'nizhnevartovsk',
    searchText: 'машинист кму нпо нижневартовск',
  },

  // =========================================================
  // ВАХТА — СУРГУТ
  // =========================================================

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
    id: 'vacancy10',
    title: 'Водитель категории С (Оренбургская, Самарская область)',
    experience: 'Опыт работы: 1–3 года',
    employment: 'Вахта на 15 смен',
    schedule: '',
    type: 'shift',
    searchText: 'слесарь кипиа сургут вахта',
  },
];

const vacancyLinks: Record<TCareers, string> = {
  vacancy1: 'https://ufa.hh.ru/vacancy/137591937?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy2: 'https://ufa.hh.ru/vacancy/138771118?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy3: 'https://ufa.hh.ru/vacancy/138771807?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy4: 'https://ufa.hh.ru/vacancy/138519218?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy5: 'https://ufa.hh.ru/vacancy/138665820?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy6: 'https://ufa.hh.ru/vacancy/138196884?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy7: 'https://ufa.hh.ru/vacancy/138735326?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy8: 'https://ufa.hh.ru/vacancy/136384308?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy9: 'https://ufa.hh.ru/vacancy/137306407?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy10: 'https://ufa.hh.ru/vacancy/138778078?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy11: 'https://ufa.hh.ru/vacancy/138775290?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy12: 'https://ufa.hh.ru/vacancy/138746448?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy13: 'https://ufa.hh.ru/vacancy/138406486?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy14: 'https://ufa.hh.ru/vacancy/135275235?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy15: 'https://ufa.hh.ru/vacancy/137913780?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy16: 'https://ufa.hh.ru/vacancy/137564123?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy17: '',
  vacancy18: 'https://ufa.hh.ru/vacancy/137285693?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy19: 'https://ufa.hh.ru/vacancy/138350726?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy20: '',
  vacancy21: 'https://ufa.hh.ru/vacancy/138588181?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy22: 'https://ufa.hh.ru/vacancy/138635574?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy23: 'https://ufa.hh.ru/vacancy/138610317?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy24: 'https://ufa.hh.ru/vacancy/138606645?hhtmFromLabel=employer_vacancy_tab&hhtmFrom=employer',
  vacancy25: '',
};

export const Careers = () => {
  const mainRef = useRef<HTMLElement>(null);
  const ufaHeaderRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | VacancyType>('all');
  const [isCompact, setIsCompact] = useState(true);
  const [visibleCounts, setVisibleCounts] = useState(() => createPreviewCounts(true));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)');
    const updateLayout = () => {
      const compact = mediaQuery.matches;
      setIsCompact(compact);
      setVisibleCounts(createPreviewCounts(compact));
    };

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);
    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  const previewCount = isCompact ? MOBILE_PREVIEW_COUNT : DESKTOP_PREVIEW_COUNT;

  const filteredVacancies = useMemo(() => {
    const query = search.trim().toLowerCase();

    return vacancies.filter((vacancy) => {
      const matchesFilter =
        filter === 'all' || vacancy.type === filter;

      const matchesSearch =
        query === '' ||
        vacancy.searchText.toLowerCase().includes(query) ||
        vacancy.title.toLowerCase().includes(query) ||
        vacancy.experience.toLowerCase().includes(query) ||
        vacancy.employment.toLowerCase().includes(query) ||
        vacancy.schedule.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  const ufaVacancies = filteredVacancies.filter(
    (vacancy) => vacancy.type === 'ufa',
  );

  const nizhnevartovskVacancies = filteredVacancies.filter(
    (vacancy) => vacancy.type === 'nizhnevartovsk',
  );

  const shiftVacancies = filteredVacancies.filter(
    (vacancy) => vacancy.type === 'shift',
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const elements = mainRef.current?.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!elements) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.remove(Styles.revealPending);
        entry.target.classList.add(Styles.revealVisible);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    elements.forEach((element) => {
      if (!element.dataset.revealReady) {
        element.dataset.revealReady = 'true';
        element.classList.add(Styles.revealPending);
      }

      if (element.classList.contains(Styles.revealPending)) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [filteredVacancies, visibleCounts]);

  const showNextVacancies = (type: VacancyType) => {
    setVisibleCounts((current) => ({
      ...current,
      [type]: current[type] + previewCount,
    }));
  };

  const collapseUfaVacancies = () => {
    setVisibleCounts((current) => ({ ...current, ufa: previewCount }));
    requestAnimationFrame(() => ufaHeaderRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    }));
  };

  const selectFilter = (type: 'all' | VacancyType) => {
    setFilter(type);
    setVisibleCounts(createPreviewCounts(isCompact));
  };

  const openVacancy = (vacancy: TCareers) => {
    const url = vacancyLinks[vacancy];

    // Не открываем пустую ссылку.
    if (!url) {
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const clearSearch = () => {
    setSearch('');
    setVisibleCounts(createPreviewCounts(isCompact));
  };

  const resetFilters = () => {
    setSearch('');
    setFilter('all');
    setVisibleCounts(createPreviewCounts(isCompact));
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
    <main className={Styles.careers} ref={mainRef}>
      {/* HERO */}

      <section className={Styles.hero}>
        <div className={Styles.heroInner}>
          <div className={Styles.heroContent} data-reveal>
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

            <a href="#vacancies" className={Styles.heroButton}>
              Смотреть вакансии
              <span>↓</span>
            </a>
          </div>

          <div className={Styles.heroVisual} data-reveal>
            <div className={Styles.visualCard}>
              <div className={Styles.visualNumber}>ОТ ПРОЕКТА ДО ЗАПУСКА</div>
              <div className={Styles.visualLine} />
              <div className={Styles.visualText}>
                <strong>Работа над реальными решениями</strong>
                <span>Инженерия · Производство · Сервис</span>
              </div>
            </div>

            <div className={Styles.heroOrb} />
          </div>
        </div>
      </section>

      {/* VACANCIES */}

      <section
        className={Styles.vacanciesSection}
        id="vacancies"
      >
        <div className={Styles.sectionHeader} data-reveal>
          <div>
            <span className={Styles.sectionLabel}>ВАКАНСИИ</span>

            <h2>
              Найдите своё
              <span> направление</span>
            </h2>
          </div>

          <p>
            Выберите интересующую позицию,
            чтобы посмотреть подробности
            и откликнуться.
          </p>
        </div>

        {/* SEARCH + FILTERS */}

        <div className={Styles.vacancyControls} data-reveal>
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
              onChange={(event) => {
                setSearch(event.target.value);
                setVisibleCounts(createPreviewCounts(isCompact));
              }}
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
            <div
              className={Styles.filters}
              role="group"
              aria-label="Фильтр по месту работы"
            >
              <button
                type="button"
                className={
                  filter === 'all' ? Styles.filterActive : ''
                }
                onClick={() => selectFilter('all')}
                aria-pressed={filter === 'all'}
              >
                Все
              </button>

              <button
                type="button"
                className={
                  filter === 'ufa' ? Styles.filterActive : ''
                }
                onClick={() => selectFilter('ufa')}
                aria-pressed={filter === 'ufa'}
              >
                Уфа
              </button>

              <button
                type="button"
                className={
                  filter === 'nizhnevartovsk'
                    ? Styles.filterActive
                    : ''
                }
                onClick={() => selectFilter('nizhnevartovsk')}
                aria-pressed={filter === 'nizhnevartovsk'}
              >
                Нижневартовск
              </button>

              <button
                type="button"
                className={
                  filter === 'shift' ? Styles.filterActive : ''
                }
                onClick={() => selectFilter('shift')}
                aria-pressed={filter === 'shift'}
              >
                Вахта
              </button>
            </div>

            <span className={Styles.vacancyCount} aria-live="polite">
              {filteredVacancies.length}{' '}
              {getVacancyWord(filteredVacancies.length)}
            </span>
          </div>
        </div>

        {/* EMPTY STATE */}

        {filteredVacancies.length === 0 && (
          <div className={Styles.emptyState}>
            <div className={Styles.emptyStateIcon}>⌕</div>

            <h3>Вакансии не найдены</h3>

            <p>
              Попробуйте изменить поисковый запрос
              или выбрать другой вариант фильтра.
            </p>

            <button type="button" onClick={resetFilters}>
              Сбросить поиск
            </button>
          </div>
        )}

        {/* УФА */}

        {ufaVacancies.length > 0 && (
          <div className={Styles.vacancyGroup}>
            <div ref={ufaHeaderRef} className={Styles.groupHeader} data-reveal>
              <div>
                <span className={Styles.groupIndex}>01</span>

                <div>
                  <h3>Работа в Уфе</h3>
                  <p>Производственная площадка</p>
                  {ufaVacancies.length > visibleCounts.ufa && (
                    <span className={Styles.mobileMoreHint}>Есть ещё вакансии ↓</span>
                  )}
                </div>
              </div>

              <span className={Styles.location}>
                Благоварская 16/2
              </span>
            </div>

            <div className={Styles.team} id="ufa-vacancies">
              {ufaVacancies.slice(0, visibleCounts.ufa).map((vacancy, index) => (
                <div
                  key={vacancy.id}
                  className={Styles.vacancyItem}
                  data-reveal
                  style={{ transitionDelay: `${(index % 3) * 65}ms` }}
                >
                  <Vacancy
                    header={vacancy.title}
                    title={vacancy.experience}
                    experience={vacancy.employment}
                    employmentType={vacancy.schedule}
                    onClick={() => openVacancy(vacancy.id)}
                  />
                </div>
              ))}
            </div>

            {(ufaVacancies.length > visibleCounts.ufa || visibleCounts.ufa > previewCount) && (
              <div className={Styles.listActions}>
                {ufaVacancies.length > visibleCounts.ufa && (
                  <button
                    type="button"
                    className={Styles.showMoreButton}
                    onClick={() => showNextVacancies('ufa')}
                    aria-controls="ufa-vacancies"
                  >
                    <span className={Styles.showMoreCopy}>
                      <strong>Показать ещё вакансии</strong>
                      <small>
                        Показано {Math.min(visibleCounts.ufa, ufaVacancies.length)} из {ufaVacancies.length}
                        {' · '}следующие {Math.min(previewCount, ufaVacancies.length - visibleCounts.ufa)}
                      </small>
                    </span>
                    <span className={Styles.showMoreArrow} aria-hidden="true">↓</span>
                  </button>
                )}
                {visibleCounts.ufa > previewCount && (
                  <button
                    type="button"
                    className={Styles.hideButton}
                    onClick={collapseUfaVacancies}
                    aria-controls="ufa-vacancies"
                  >
                    Свернуть список <span aria-hidden="true">↑</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* НИЖНЕВАРТОВСК */}

        {nizhnevartovskVacancies.length > 0 && (
          <div className={Styles.vacancyGroup}>
            <div className={Styles.groupHeader} data-reveal>
              <div>
                <span className={Styles.groupIndex}>02</span>

                <div>
                  <h3>Работа в Нижневартовске</h3>
                  <p>Вакансии для работы в регионе</p>
                  {nizhnevartovskVacancies.length > visibleCounts.nizhnevartovsk && (
                    <span className={Styles.mobileMoreHint}>Есть ещё вакансии ↓</span>
                  )}
                </div>
              </div>

              <span className={Styles.location}>
                2П-2, 12
              </span>
            </div>

            <div className={Styles.team} id="nizhnevartovsk-vacancies">
              {nizhnevartovskVacancies.slice(0, visibleCounts.nizhnevartovsk).map((vacancy, index) => (
                <div
                  key={vacancy.id}
                  className={Styles.vacancyItem}
                  data-reveal
                  style={{ transitionDelay: `${(index % 3) * 65}ms` }}
                >
                  <Vacancy
                    header={vacancy.title}
                    title={vacancy.experience}
                    experience={vacancy.employment}
                    employmentType={vacancy.schedule}
                    onClick={() => openVacancy(vacancy.id)}
                  />
                </div>
              ))}
            </div>

            {nizhnevartovskVacancies.length > visibleCounts.nizhnevartovsk && (
              <button
                type="button"
                className={Styles.showMoreButton}
                onClick={() => showNextVacancies('nizhnevartovsk')}
                aria-controls="nizhnevartovsk-vacancies"
                data-reveal
              >
                <span className={Styles.showMoreCopy}>
                  <strong>Показать ещё вакансии</strong>
                  <small>
                    Показано {Math.min(visibleCounts.nizhnevartovsk, nizhnevartovskVacancies.length)} из {nizhnevartovskVacancies.length}
                    {' · '}следующие {Math.min(previewCount, nizhnevartovskVacancies.length - visibleCounts.nizhnevartovsk)}
                  </small>
                </span>
                <span className={Styles.showMoreArrow} aria-hidden="true">↓</span>
              </button>
            )}
          </div>
        )}

        {/* ВАХТА */}

        {shiftVacancies.length > 0 && (
          <div className={Styles.vacancyGroup}>
            <div className={Styles.groupHeader} data-reveal>
              <div>
                <span className={Styles.groupIndex}>03</span>

                <div>
                  <h3>Вахтовая работа</h3>
                  <p>Проекты в регионах России</p>
                  {shiftVacancies.length > visibleCounts.shift && (
                    <span className={Styles.mobileMoreHint}>Есть ещё вакансии ↓</span>
                  )}
                </div>
              </div>

              <span className={Styles.location}>Вахта</span>
            </div>

            <div className={Styles.team} id="shift-vacancies">
              {shiftVacancies.slice(0, visibleCounts.shift).map((vacancy, index) => (
                <div
                  key={vacancy.id}
                  className={Styles.vacancyItem}
                  data-reveal
                  style={{ transitionDelay: `${(index % 3) * 65}ms` }}
                >
                  <Vacancy
                    header={vacancy.title}
                    title={vacancy.experience}
                    experience={vacancy.employment}
                    employmentType={vacancy.schedule}
                    onClick={() => openVacancy(vacancy.id)}
                  />
                </div>
              ))}
            </div>

            {shiftVacancies.length > visibleCounts.shift && (
              <button
                type="button"
                className={Styles.showMoreButton}
                onClick={() => showNextVacancies('shift')}
                aria-controls="shift-vacancies"
                data-reveal
              >
                <span className={Styles.showMoreCopy}>
                  <strong>Показать ещё вакансии</strong>
                  <small>
                    Показано {Math.min(visibleCounts.shift, shiftVacancies.length)} из {shiftVacancies.length}
                    {' · '}следующие {Math.min(previewCount, shiftVacancies.length - visibleCounts.shift)}
                  </small>
                </span>
                <span className={Styles.showMoreArrow} aria-hidden="true">↓</span>
              </button>
            )}
          </div>
        )}
      </section>

      {/* INTRO */}

      <section className={Styles.intro}>
        <div className={Styles.introHeading} data-reveal>
          <span className={Styles.sectionLabel}>О КОМАНДЕ</span>

          <h2>
            Не просто работа.
            <br />
            <span>Общее дело.</span>
          </h2>
        </div>

        <div className={Styles.introText} data-reveal>
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
        <div className={Styles.stat} data-reveal>
          <strong>20+</strong>
          <span>
            лет работы
            <br />
            в отрасли
          </span>
        </div>

        <div className={Styles.stat} data-reveal>
          <strong>200+</strong>
          <span>
            реализованных
            <br />
            проектов
          </span>
        </div>

        <div className={Styles.stat} data-reveal>
          <strong>3</strong>
          <span>
            формата
            <br />
            занятости
          </span>
        </div>

        <div className={Styles.stat} data-reveal>
          <strong>300+</strong>
          <span>
            сотрудников
            <br />
            в команде
          </span>
        </div>
      </section>

      {/* CTA */}

      <section className={Styles.cta}>
        <div className={Styles.ctaContent} data-reveal>
          <div className={Styles.ctaText}>
            <span className={Styles.sectionLabel}>
              НЕ НАШЛИ ПОДХОДЯЩУЮ ВАКАНСИЮ?
            </span>

            <h2>
              Возможно, мы ищем
              <span> именно вас.</span>
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

            <span className={Styles.ctaButtonIcon}><ArrowUpRightIcon /></span>
          </a>
        </div>

        {/* <div className={Styles.ctaDecor}>
          <span>NT</span>
        </div> */}
      </section>
    </main>
  );
};
