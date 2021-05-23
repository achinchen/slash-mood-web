import { useCallback, useEffect } from 'react';

type Parameters = {
  onClose: () => void;
};

function useESC({ onClose }: Parameters): void {
  const keyup = useCallback(
    (event: KeyboardEvent): void => {
      const details = event.currentTarget;
      if (!(details instanceof Element)) return;
      if (event.key === 'Escape' || event.key === 'Esc') {
        onClose?.();
        event.stopPropagation();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keyup', keyup);
    return () => document.removeEventListener('keyup', keyup);
  }, [keyup]);
}

export default useESC;
