import Styles from './about.module.scss';
import { Title } from '../../ui/title/Title';
import { useTranslation } from 'react-i18next';
import { CountCard } from '../../ui/count-card/CountCard';

export const About = () => {
  const { t } = useTranslation('about');
  return (
    <>
      <Title text={t('О компании')}></Title>
      <div className={Styles.layout}>
        <p>{t('Текст о компании')}</p>        
      </div>

      <Title text={t('Цифра')}></Title>

      <div className={Styles.numberAbout}>
        <CountCard 
          header={t('Более300')}
          title={t('Штатных')}
          index={0}
        />
        <CountCard
          header={t('31404м')}
          number='2'
          title={t('Площадь')}
          index={1}
        />
        <CountCard
          header={t('Более100')}
          title={t('Успешно')}
          index={2}
        />
        <CountCard
          header='100 %'
          title={t('Следование')}
          index={3}
        />
        <CountCard
          header='79'
          offer={t('Единиц')}
          title={t('Краны')}
          index={4}
        />
      </div>
    </>
  );
};
