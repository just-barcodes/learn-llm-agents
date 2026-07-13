import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref and a flag that flips to `true` the first time the referenced
 * element scrolls past `threshold` visibility, then stops observing. Degrades
 * to `false` where IntersectionObserver is unavailable (e.g. jsdom).
 */
export function useInViewOnce<T extends Element>(
  threshold = 0.5,
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [seen, threshold]);

  return [ref, seen];
}
