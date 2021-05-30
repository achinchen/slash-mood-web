import { RefObject, useEffect } from 'react';

type Parameters = {
  root?: HTMLElement;
  targetRef: RefObject<HTMLDivElement>;
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
};

function useIntersectionObserver({
  root,
  targetRef,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true
}: Parameters): void {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root,
        rootMargin,
        threshold
      }
    );

    const element = targetRef?.current;

    if (!element) return;

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [targetRef, enabled, onIntersect, root, rootMargin, threshold]);
}

export default useIntersectionObserver;
