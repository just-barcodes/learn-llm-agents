import { useMemo, useState } from 'react';
import { glossary, type TermKey } from '../../data/glossary.ts';
import { GlossaryContext, type GlossaryController } from './GlossaryContext.ts';
import styles from './glossary.module.css';

interface ActiveTip {
  term: TermKey;
  x: number;
  y: number;
}

const TOOLTIP_WIDTH = 320;

/**
 * Provides the glossary tooltip controller to descendants and renders the
 * single, shared cursor-following tooltip.
 */
export function GlossaryProvider({ children }: { children: React.ReactNode }) {
  const [tip, setTip] = useState<ActiveTip | null>(null);

  const controller = useMemo<GlossaryController>(
    () => ({
      show: (term, x, y) => setTip({ term, x, y }),
      hide: () => setTip(null),
    }),
    [],
  );

  const entry = tip ? glossary[tip.term] : null;
  const left = tip ? Math.min(tip.x, window.innerWidth - TOOLTIP_WIDTH) : 0;

  return (
    <GlossaryContext value={controller}>
      {children}
      {tip && entry && (
        <div
          role="tooltip"
          className={styles.tooltip}
          style={{ left: `${left}px`, top: `${tip.y + 22}px` }}
        >
          <div className={styles.tooltipTitle}>{entry.title}</div>
          {entry.definition}
        </div>
      )}
    </GlossaryContext>
  );
}
