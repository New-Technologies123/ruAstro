import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Basket } from '../basket/Basket';
import { Order } from '../order/Order';
import Styles from './global-cart.module.scss';

type CartMode = 'cart' | 'order';

export const GlobalCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [mode, setMode] = useState<CartMode>('cart');
  const panelRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const syncCart = (event: StorageEvent) => {
      if (event.key === 'cart' || event.key === null) window.dispatchEvent(new Event('cartUpdated'));
    };
    const open = () => {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setHasOpened(true);
      setMode('cart');
      setIsOpen(true);
    };
    window.addEventListener('storage', syncCart);
    window.addEventListener('toggleGlobalCart', open);
    return () => {
      window.removeEventListener('storage', syncCart);
      window.removeEventListener('toggleGlobalCart', open);
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.dataset.cartOpen = 'true';
    // Astro may wrap this dialog in an island. Isolate siblings at every level.
    const background = new Map<HTMLElement, boolean>();
    let ancestor: HTMLElement = panel.parentElement!;
    while (ancestor.parentElement) {
      for (const sibling of ancestor.parentElement.children) {
        if (sibling !== ancestor && sibling instanceof HTMLElement) {
          background.set(sibling, sibling.inert);
          sibling.inert = true;
        }
      }
      if (ancestor.parentElement === document.body) break;
      ancestor = ancestor.parentElement;
    }
    const focusPanel = () => panel.focus({ preventScroll: true });
    const frame = requestAnimationFrame(focusPanel);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(false);
      }
      if (event.key !== 'Tab') return;
      const controls = [...panel.querySelectorAll<HTMLElement>('a[href], button, input, textarea, select, [tabindex]')].filter(
        (element) => element.tabIndex >= 0 && !element.matches(':disabled') && element.getClientRects().length > 0,
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first) {
        event.preventDefault();
        focusPanel();
      } else if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel)) {
        event.preventDefault();
        first.focus();
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && !panel.contains(event.target)) focusPanel();
    };
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('focusin', onFocusIn);
      background.forEach((wasInert, element) => {
        element.inert = wasInert;
      });
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      delete document.body.dataset.cartOpen;
      openerRef.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) panelRef.current?.focus({ preventScroll: true });
  }, [mode, isOpen]);

  if (!hasOpened) return null;

  // Keep both steps mounted so edits and pending requests survive closing or changing steps.
  return (
    <div hidden={!isOpen} className={Styles.root}>
      <div className={Styles.backdrop} onClick={() => setIsOpen(false)} aria-hidden="true" />
      <motion.aside
        ref={panelRef}
        className={Styles.panel}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 32 }}
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'cart' ? 'Корзина' : 'Оформление заявки'}
        tabIndex={-1}
      >
        <div className={Styles.panelContent} hidden={mode !== 'cart'}>
          <Basket onBack={() => setIsOpen(false)} goToOrder={() => setMode('order')} />
        </div>
        <div className={Styles.panelContent} hidden={mode !== 'order'}>
          <Order
            active={isOpen && mode === 'order'}
            onBack={() => setMode('cart')}
            onFinish={() => setIsOpen(false)}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </motion.aside>
    </div>
  );
};
