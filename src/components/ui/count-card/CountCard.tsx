// CountCard.tsx
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { useCounterAnimation } from '../../../hooks/useCounterAnimation';
import Styles from './count-card.module.scss';

type TVacancyProps = {
  header: string;
  title?: string;
  offer?: string;
  number?: string;
  index?: number;
};

export const CountCard = ({ header, number, title, offer, index = 0 }: TVacancyProps) => {
  const { ref, isVisible } = useScrollAnimation(index * 100);
  
  // Извлекаем число из строки header для анимации
  const getNumberFromString = (str: string): number => {
    const match = str.match(/\d+([,.]\d+)?/);
    return match ? parseFloat(match[0].replace(',', '.')) : 0;
  };
  
  // Получаем суффикс (+, %, м² и т.д.)
  const getSuffix = (str: string): string => {
    return str.replace(/[\d,.\s]/g, '').trim();
  };

  const numericValue = getNumberFromString(header);
  const suffix = getSuffix(header);
  const animatedValue = useCounterAnimation(numericValue, isVisible, 2000);

  // Массив цветов для каждой карточки
  const accentColors = ['#2a7de1', '#07357a', '#1a5cb0', '#2a8a3a', '#d48a1a'];
  const gradientColors = [
    'linear-gradient(135deg, #2a7de1, #6db3ff)',
    'linear-gradient(135deg, #0a1e3c, #2a5a8a)',
    'linear-gradient(135deg, #1a5cb0, #4a8ad4)',
    'linear-gradient(135deg, #2a8a3a, #6aba6a)',
    'linear-gradient(135deg, #d48a1a, #f0b84a)',
  ];

  return (
    <div 
      ref={ref} 
      className={`${Styles.bloc} ${isVisible ? Styles.visible : Styles.hidden}`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
      }}
    >
      {/* Градиентный акцент сверху */}
      <div 
        className={Styles.accentBar} 
        style={{ background: gradientColors[index % gradientColors.length] }}
      />

      <div className={Styles.content}>
        {/* Верхняя часть: иконка + число в одной строке */}
        <div className={Styles.headerRow}>
          <div 
            className={Styles.iconCircle}
            style={{ background: gradientColors[index % gradientColors.length] }}
          >
            <span className={Styles.icon}>
              {index === 0 && '👥'}
              {index === 1 && '🏭'}
              {index === 2 && '📋'}
              {index === 3 && '🌿'}
              {index === 4 && '🚛'}
            </span>
          </div>
          
          <div className={Styles.numberWrapper}>
            <h3 style={{ color: accentColors[index % accentColors.length] }}>
              {isVisible ? animatedValue : numericValue}
              {suffix}              
            </h3>
            {/* Дополнительная информация (м², единиц и т.д.) */}
              {(number || offer) && (
                <div className={Styles.subInfo}>
                  {number && <span className={Styles.numberUnit}>{number}</span>}
                  {offer && <span className={Styles.offerText}>{offer}</span>}
                </div>
              )}
          </div>
        </div>

        

        {/* Описание */}
        <p>{title}</p>
      </div>

      {/* Декоративная точка в углу */}
      <div 
        className={Styles.cornerDot}
        style={{ background: accentColors[index % accentColors.length] }}
      />
    </div>
  );
};