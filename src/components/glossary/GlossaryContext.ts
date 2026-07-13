import { createContext, useContext } from 'react';
import type { TermKey } from '../../data/glossary.ts';

export interface GlossaryController {
  /** Show the tooltip for `term`, anchored near the given viewport point. */
  show(term: TermKey, x: number, y: number): void;
  hide(): void;
}

export const GlossaryContext = createContext<GlossaryController | null>(null);

export function useGlossary(): GlossaryController {
  const controller = useContext(GlossaryContext);
  if (!controller) {
    throw new Error('useGlossary must be used within a <GlossaryProvider>');
  }
  return controller;
}
