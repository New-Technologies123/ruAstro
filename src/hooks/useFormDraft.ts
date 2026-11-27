import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';

// Restore after hydration so server and client render the same initial markup.
export const useFormDraft = <T extends { [K in keyof T]: string | boolean }>(
  key: string,
  emptyForm: T,
): [T, Dispatch<SetStateAction<T>>, () => void] => {
  const storageKey = `form-draft:${key}`;
  const [form, setForm] = useState(emptyForm);
  const currentForm = useRef(emptyForm);

  useEffect(() => {
    const restored = { ...emptyForm };
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        for (const field of Object.keys(emptyForm) as (keyof T)[]) {
          const value = (saved as Record<keyof T, unknown>)[field];
          if (typeof value === typeof emptyForm[field]) restored[field] = value as T[keyof T];
        }
      }
    } catch { /* Storage may be blocked or contain an invalid draft. */ }
    currentForm.current = restored;
    setForm(restored);
  }, [storageKey, emptyForm]);

  const setDraft = useCallback<Dispatch<SetStateAction<T>>>((update) => {
    const next = typeof update === 'function' ? update(currentForm.current) : update;
    currentForm.current = next;
    // Save during the change, without waiting for an effect before navigation.
    try { sessionStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Keep the form usable without storage. */ }
    setForm(next);
  }, [storageKey]);

  const clearDraft = useCallback(() => {
    currentForm.current = emptyForm;
    setForm(emptyForm);
    try { sessionStorage.removeItem(storageKey); } catch { /* Storage may be blocked. */ }
  }, [storageKey, emptyForm]);

  return [form, setDraft, clearDraft];
};
