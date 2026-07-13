import { useMemo, useState } from 'react';
import {
  CONTEXT_CAP,
  CONTEXT_PLAIN,
  CONTEXT_THINKING,
  KIND_CAPTION,
  OVERFLOW_CAPTION,
  type BlockKind,
  type ContextBlock,
} from './contextData.ts';

export interface DerivedBlock extends ContextBlock {
  dropped: boolean;
  /** True for the block added on the most recent step. */
  latest: boolean;
}

export interface ContextWindowState {
  thinking: boolean;
  blocks: DerivedBlock[];
  used: number;
  cap: number;
  pct: number;
  over: boolean;
  caption: string;
  done: boolean;
  currentKind: BlockKind;
  setMode(thinking: boolean): void;
  next(): void;
  reset(): void;
}

/** Which blocks fall out of the window, oldest-first, keeping the system prompt. */
function computeDropped(shown: ContextBlock[], used: number): Set<number> {
  const dropped = new Set<number>();
  if (used <= CONTEXT_CAP) return dropped;
  let toRemove = used - CONTEXT_CAP;
  for (let i = 1; i < shown.length && toRemove > 0; i++) {
    dropped.add(i);
    toRemove -= shown[i].tok;
  }
  return dropped;
}

/**
 * Drives the growing-context-window demo: a stepped walk through a
 * conversation, tracking token usage against a fixed window and dropping the
 * oldest turns once it overflows.
 */
export function useContextWindow(): ContextWindowState {
  const [thinking, setThinking] = useState(false);
  const [step, setStep] = useState(1);

  const seq = thinking ? CONTEXT_THINKING : CONTEXT_PLAIN;

  return useMemo(() => {
    const shownN = Math.min(step, seq.length);
    const shown = seq.slice(0, shownN);
    const used = shown.reduce((sum, b) => sum + b.tok, 0);
    const over = used > CONTEXT_CAP;
    const dropped = computeDropped(shown, used);
    const pct = Math.min(100, Math.round((used / CONTEXT_CAP) * 100));
    const lastKind = shownN > 0 ? seq[shownN - 1].kind : 'sys';

    const blocks: DerivedBlock[] = shown.map((b, i) => ({
      ...b,
      dropped: dropped.has(i),
      latest: i === shownN - 1,
    }));

    return {
      thinking,
      blocks,
      used,
      cap: CONTEXT_CAP,
      pct,
      over,
      caption: over ? OVERFLOW_CAPTION : KIND_CAPTION[lastKind],
      done: shownN >= seq.length,
      currentKind: lastKind,
      setMode: (nextThinking: boolean) => {
        setThinking(nextThinking);
        setStep(1);
      },
      next: () => setStep((s) => Math.min(s + 1, seq.length)),
      reset: () => setStep(1),
    };
  }, [thinking, step, seq]);
}
