import { useEffect, useState } from 'react';

/**
 * A self-resetting counter that increments every `periodMs` and wraps back to
 * 0 once it passes `max`. Used to drive looping, time-based animations.
 */
export function useTicker(periodMs: number, max: number): number {
  const [n, setN] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setN((v) => (v > max ? 0 : v + 1));
    }, periodMs);
    return () => clearInterval(id);
  }, [periodMs, max]);

  return n;
}
