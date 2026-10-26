import { useCallback, useEffect, useRef, useState } from 'react';

import Styles from './accounting.module.scss';

export const ArrowUpRight = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M5 15 15 5M6 5h9v9" />
  </svg>
);

const CarouselArrow = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d={direction === 'left' ? 'M19 12H5m6-6-6 6 6 6' : 'M4 12h15m-6-6 6 6-6 6'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const useCategoryCarousel = (itemCount: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const programmaticIndexRef = useRef<number | null>(null);
  const releaseTimerRef = useRef<number | null>(null);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || programmaticIndexRef.current !== null) return;

    const targetLeft =
      track.getBoundingClientRect().left +
      (parseFloat(getComputedStyle(track).paddingLeft) || 0);
    const cards = Array.from(track.children) as HTMLElement[];
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - targetLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (cards.length) setActiveIndex(closestIndex);
  }, []);

  const scrollToCard = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const track = trackRef.current;
      if (!track || index < 0 || index >= itemCount) return;

      const card = track.children.item(index) as HTMLElement | null;
      if (!card) return;

      const left =
        card.getBoundingClientRect().left -
        track.getBoundingClientRect().left +
        track.scrollLeft -
        (parseFloat(getComputedStyle(track).paddingLeft) || 0);

      programmaticIndexRef.current = index;
      setActiveIndex(index);

      if (releaseTimerRef.current !== null) {
        window.clearTimeout(releaseTimerRef.current);
      }
      releaseTimerRef.current = window.setTimeout(() => {
        programmaticIndexRef.current = null;
        releaseTimerRef.current = null;
        updateActiveIndex();
      }, 2000);

      track.scrollTo({
        left,
        behavior:
          behavior === 'smooth' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : behavior,
      });
    },
    [itemCount, updateActiveIndex]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const releaseProgrammaticScroll = () => {
      if (releaseTimerRef.current !== null) {
        window.clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = null;
      }
      if (programmaticIndexRef.current === null) return;
      programmaticIndexRef.current = null;
      updateActiveIndex();
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      if (programmaticIndexRef.current !== null) {
        if (releaseTimerRef.current !== null) {
          window.clearTimeout(releaseTimerRef.current);
        }
        releaseTimerRef.current = window.setTimeout(releaseProgrammaticScroll, 260);
        return;
      }
      frame = window.requestAnimationFrame(updateActiveIndex);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('scrollend', releaseProgrammaticScroll);
    window.addEventListener('resize', updateActiveIndex);
    updateActiveIndex();

    return () => {
      window.cancelAnimationFrame(frame);
      if (releaseTimerRef.current !== null) {
        window.clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = null;
      }
      programmaticIndexRef.current = null;
      track.removeEventListener('scroll', onScroll);
      track.removeEventListener('scrollend', releaseProgrammaticScroll);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [updateActiveIndex]);

  return { trackRef, activeIndex, scrollToCard };
};

type CategoryCarouselControlsProps = {
  labels: readonly string[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export const CategoryCarouselControls = ({
  labels,
  activeIndex,
  onSelect,
}: CategoryCarouselControlsProps) => (
  <div className={Styles.carouselControls}>
    <div className={Styles.carouselDots} role="group" aria-label="Выбрать оборудование">
      {labels.map((label, index) => (
        <button
          key={`${label}-${index}`}
          type="button"
          aria-label={`Показать ${index + 1}: ${label}`}
          aria-current={activeIndex === index ? 'true' : undefined}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>

    <div className={Styles.carouselNavigation}>
      <button
        type="button"
        aria-label="Предыдущая карточка"
        onClick={() => onSelect(activeIndex === 0 ? labels.length - 1 : activeIndex - 1)}
      >
        <CarouselArrow direction="left" />
      </button>
      <button
        type="button"
        aria-label="Следующая карточка"
        onClick={() => onSelect(activeIndex === labels.length - 1 ? 0 : activeIndex + 1)}
      >
        <CarouselArrow direction="right" />
      </button>
    </div>

    <span className={Styles.carouselHint}>Листайте карточки свайпом</span>
  </div>
);
