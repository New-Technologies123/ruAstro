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
  
  const getNumberFromString = (str: string): number => {
    const match = str.match(/\d+([,.]\d+)?/);
    return match ? parseFloat(match[0].replace(',', '.')) : 0;
  };
  
  const getSuffix = (str: string): string => {
    return str.replace(/[\d,.\s]/g, '').trim();
  };

  const numericValue = getNumberFromString(header);
  const suffix = getSuffix(header);
  const animatedValue = useCounterAnimation(numericValue, isVisible, 2000);

  // Профессиональная цветовая гамма
  const accentColors = ['#1a3a6b', '#2c4a7c', '#3a5a8c', '#1a5a4a', '#8a6a2a'];
  const gradientColors = [
    'linear-gradient(135deg, #1a3a6b, #4a7ab8)',
    'linear-gradient(135deg, #2c4a7c, #5a8ab8)',
    'linear-gradient(135deg, #3a5a8c, #6a9ac8)',
    'linear-gradient(135deg, #1a5a4a, #4a8a7a)',
    'linear-gradient(135deg, #8a6a2a, #b89a4a)',
  ];

  // Профессиональные иконки
  const getIcon = (index: number) => {
    const icons = {
      0: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      1: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 7h6" />
          <path d="M9 12h6" />
          <path d="M9 17h4" />
        </svg>
      ),
      2: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      ),
      3: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      4: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
    };
    return icons[index as keyof typeof icons] || icons[0];
  };

  return (
    <div 
      ref={ref} 
      className={`${Styles.bloc} ${isVisible ? Styles.visible : Styles.hidden}`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
      }}
    >
      <div className={Styles.accentBar} style={{ background: gradientColors[index % gradientColors.length] }} />

      <div className={Styles.content}>
        <div className={Styles.headerRow}>
          <div 
            className={Styles.iconCircle}
            style={{ 
              borderColor: accentColors[index % accentColors.length],
              color: accentColors[index % accentColors.length]
            }}
          >
            {getIcon(index)}
          </div>
          
          <div className={Styles.numberWrapper}>
            <h3 style={{ color: accentColors[index % accentColors.length] }}>
              {isVisible ? animatedValue : numericValue}
              {suffix}
            </h3>
            
            {(number || offer) && (
              <div className={Styles.subInfo}>
                {number && <span className={Styles.numberUnit}>{number}</span>}
                {offer && <span className={Styles.offerText}>{offer}</span>}
              </div>
            )}
          </div>
        </div>

        <p className={Styles.title}>{title}</p>
      </div>
    </div>
  );
};