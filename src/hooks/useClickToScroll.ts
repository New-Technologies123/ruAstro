import { useCallback } from 'react';

// t = current time
// b = start value
// c = change in value
// d = duration
function easeInOutQuad(t: number, b: number, c: number, d: number) {
  // eslint-disable-next-line no-param-reassign
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  // eslint-disable-next-line no-plusplus, no-param-reassign
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

export function animatedScrollTo(element: any, duration: number, header?: boolean) {
  if (!element) {
    return;
  }

  const headerHeight = !header ? 80 : 0;

  const start = window.pageYOffset;
  const elemTypeof = typeof element === 'object' && typeof element.style === 'object' && typeof element.ownerDocument === 'object';
  const change = elemTypeof && element.nodeType === 1 ? element.getBoundingClientRect().top - headerHeight : element;
  let currentTime = 0;
  const increment = 20;

  const animateScroll = () => {
    currentTime += increment;
    const scrollVal = easeInOutQuad(currentTime, start, change, duration);
    window.scrollTo(0, scrollVal);
    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll);
    }
  };

  animateScroll();
}

export const useClickToScroll = () =>
  useCallback((elementId: string) => {
    const anchor = document.getElementById(elementId);
    anchor && animatedScrollTo(anchor, 1000);
  }, []);
