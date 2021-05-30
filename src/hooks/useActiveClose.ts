import { useCallback, useEffect } from 'react';

type Parameters = {
  onClose: () => void;
  enabled?: boolean;
};

const SCRIM_ID = 'dialog-scrim';

function useActiveClose({ enabled, onClose }: Parameters): void {
  const click = useCallback(
    (event: Event): void => {
      const target = event.target as HTMLElement;
      if (target.id === SCRIM_ID) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (enabled) {
      window.addEventListener('click', click);
      return () => window.removeEventListener('click', click);
    }
  }, [enabled, click]);
}

export default useActiveClose;
