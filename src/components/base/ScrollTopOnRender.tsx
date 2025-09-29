import React, { useEffect, useRef, useState } from 'react';

/**
 * Когда рендерится компонент страница скролится в начало
 */
export const ScrollTopOnRender: React.FC<React.PropsWithChildren<unknown>> = (props) => {
  const { children } = props;

  const elRef = useRef<HTMLDivElement | null>(null);
  const [isRenderEl, setIsRenderEl] = useState(true);

  useEffect(() => {
    if (elRef.current) {
      elRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });

      setIsRenderEl(false);
    }
  }, [elRef]);

  return (
    <>
      {isRenderEl && <div ref={elRef}></div>}
      {children}
    </>
  );
};
