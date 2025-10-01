import Styles from './about.module.scss';
import { Title } from '../../ui/title/Title';
import { useTranslation } from 'react-i18next';
import { CountCard } from '../../ui/count-card/CountCard';

export const About = () => {
  const { t } = useTranslation('about');
  return (
    <>
      <Title text="О компании"></Title>
      <div className={Styles.layout}>
        <p>ООО Инженерно-Производственное Предприятие «Новые Технологии» функционирует с 2005 года и является одним из ведущих 
          производителей технологического оборудования в блочно-модульном исполнении для обустройства нефтегазовых месторождений 
          и комплектующих к ним, специализирующихся в том числе на предоставлении сервисных услуг по депарафинизации скважин и 
          капитальному ремонту оборудования в районах Крайнего Севера (Красноярский и Пермский край, Иркутская и Тюменская области т.д.).</p>        
      </div>

      <Title text="Компания в цифрах"></Title>

      <div className={Styles.numberAbout}>
        <CountCard 
          header='Более 300'
          title='Штатных сотрудников.'
          index={0}
        />
        <CountCard
          header='31 404 м'
          number='2'
          title='Площадь производственной базы с подъездными Ж/Д путями.'
          index={1}
        />
        <CountCard
          header='Более 100'
          title='Успешно выполненных проектов на территории России и СНГ'
          index={2}
        />
        <CountCard
          header='100 %'
          title='Следование требованиям HSE (Здоровье, безопасность и окружающая среда).'
          index={3}
        />
        <CountCard
          header='79'
          offer='Единиц вездеходной техники'
          title='Краны, экскаваторы, полуприцепы, пассажирский транспорт.'
          index={4}
        />
      </div>
    </>
  );
};
