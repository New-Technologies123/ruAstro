// hooks/useCounterAnimation.ts
import { useState, useEffect, useRef } from 'react';

export const useCounterAnimation = (
  targetValue: number,
  isVisible: boolean,
  duration: number = 2000
): number => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setCurrentValue(0);
      return;
    }

    const startAnimation = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Плавная функция замедления (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easedProgress * targetValue);
      
      setCurrentValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(startAnimation);
      }
    };

    animationRef.current = requestAnimationFrame(startAnimation);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = null;
    };
  }, [targetValue, isVisible, duration]);

  return currentValue;
};