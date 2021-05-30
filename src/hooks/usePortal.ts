import { useEffect, useRef } from 'react';
import { PORTAL_ID } from 'pages/_app';

type Parameters = {
  closed: boolean;
};

function usePortal({ closed }: Parameters): HTMLDivElement {
  const rootElemRef = useRef(document.createElement('div'));

  useEffect(() => {
    const parentElem = document.getElementById(PORTAL_ID) as HTMLElement;
    const ref = rootElemRef.current;
    parentElem.appendChild(ref);
    return () => ref.remove();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--overflow',
      closed ? 'scroll' : 'hidden'
    );
  }, [closed]);

  return rootElemRef.current;
}

export default usePortal;
