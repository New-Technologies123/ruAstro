import { useEffect, useRef } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { createPortal } from "react-dom";
import { LotDetail, type LotGroup } from "./LotDetail";
import Styles from "./procurement.module.scss";

type Props = {
  group: LotGroup;
  searchTerm: string;
  onClose: () => void;
  onAddOffer: () => void;
  returnFocusTo: HTMLElement | null;
  restoreFocus: boolean;
};

export const LotSheet = ({ group, searchTerm, onClose, onAddOffer, returnFocusTo, restoreFocus }: Props) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dragStartY = useRef<number | null>(null);
  const dragPointerId = useRef<number | null>(null);
  const dragDistance = useRef(0);
  const dismissTimer = useRef<number | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (restoreFocus) closeRef.current?.focus({ preventScroll: true });
    else {
      returnFocusTo?.blur();
      sheetRef.current?.focus({ preventScroll: true });
    }
    return () => {
      if (dismissTimer.current !== null) window.clearTimeout(dismissTimer.current);
      document.body.style.overflow = previousOverflow;
      const focusTarget = returnFocusTo?.isConnected
        ? returnFocusTo
        : document.querySelector<HTMLElement>('[aria-label="Список лотов"] button');
      if (restoreFocus) focusTarget?.focus({ preventScroll: true });
    };
  }, [returnFocusTo, restoreFocus]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [group.note]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !sheetRef.current) return;

    const focusable = Array.from(sheetRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && (document.activeElement === first || document.activeElement === sheetRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const resetDrag = () => {
    dragStartY.current = null;
    dragPointerId.current = null;
    dragDistance.current = 0;
    sheetRef.current?.classList.remove(Styles.lotDragging);
    sheetRef.current?.style.removeProperty("--drag-y");
  };

  const handleDragStart = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as Element).closest("button")) return;
    dragStartY.current = event.clientY;
    dragPointerId.current = event.pointerId;
    dragDistance.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current !== event.pointerId || dragStartY.current === null) return;
    const distance = Math.max(0, event.clientY - dragStartY.current);
    dragDistance.current = distance;
    if (distance > 0 && sheetRef.current) {
      sheetRef.current.classList.add(Styles.lotDragging);
      sheetRef.current.style.setProperty("--drag-y", `${distance}px`);
    }
  };

  const handleDragEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (dragDistance.current > 110 && sheetRef.current) {
      dragStartY.current = null;
      dragPointerId.current = null;
      sheetRef.current.classList.remove(Styles.lotDragging);
      sheetRef.current.style.setProperty("--drag-y", "100dvh");
      dismissTimer.current = window.setTimeout(onClose, 220);
    } else {
      resetDrag();
    }
  };

  const handleDragCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    resetDrag();
  };

  return createPortal(
    <div className={Styles.lotOverlay} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={sheetRef} className={Styles.lotSheet} role="dialog" aria-modal="true" aria-label={`Лот ${group.note}`} tabIndex={-1} onKeyDown={handleKeyDown}>
        <div
          className={Styles.lotTopbar}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragCancel}
        >
          <div className={Styles.lotPosition}><strong>Подробности лота</strong></div>
          <div className={Styles.lotActions}>
            <button ref={closeRef} type="button" className={Styles.lotBackButton} onClick={onClose}>К списку</button>
          </div>
        </div>
        <div ref={scrollRef} className={Styles.lotScroll}>
          <LotDetail group={group} searchTerm={searchTerm} onClose={onClose} onAddOffer={onAddOffer} inSheet />
        </div>
      </div>
    </div>,
    document.body
  );
};
