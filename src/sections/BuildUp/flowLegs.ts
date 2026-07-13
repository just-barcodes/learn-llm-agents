import type { FlowConnector } from '../../components/FlowDiagram/FlowDiagram.tsx';

/**
 * Shared connector geometries for the flow diagrams whose nodes sit at
 * You (8%), Harness (38%), LLM (72%) on a top row, plus one node below the
 * harness (84%). Reused by the tools and RAG panels.
 */
export const LEG = {
  userR: {
    left: '12%',
    top: 'calc(34% - 2px)',
    width: '22%',
    height: '3px',
    angle: '90deg',
    arrowLeft: '33.5%',
    arrowTop: 'calc(34% - 8px)',
  },
  userL: {
    left: '12%',
    top: 'calc(34% - 2px)',
    width: '22%',
    height: '3px',
    angle: '90deg',
    arrowLeft: '11.5%',
    arrowTop: 'calc(34% - 8px)',
  },
  llmR: {
    left: '42%',
    top: 'calc(34% - 2px)',
    width: '26%',
    height: '3px',
    angle: '90deg',
    arrowLeft: '67.5%',
    arrowTop: 'calc(34% - 8px)',
  },
  llmL: {
    left: '42%',
    top: 'calc(34% - 2px)',
    width: '26%',
    height: '3px',
    angle: '90deg',
    arrowLeft: '41.5%',
    arrowTop: 'calc(34% - 8px)',
  },
  vertD: {
    left: 'calc(38% - 1.5px)',
    top: '50%',
    width: '3px',
    height: '21%',
    angle: '180deg',
    arrowLeft: 'calc(38% - 6.5px)',
    arrowTop: '70%',
  },
  vertU: {
    left: 'calc(38% - 1.5px)',
    top: '50%',
    width: '3px',
    height: '21%',
    angle: '180deg',
    arrowLeft: 'calc(38% - 6.5px)',
    arrowTop: 'calc(50% - 4px)',
  },
} satisfies Record<string, FlowConnector>;

/** Chip anchor points matching each connector leg. */
export const CHIP_AT = {
  user: { left: '23%', top: '10%' },
  llm: { left: '55%', top: '10%' },
  vert: { left: '58%', top: '61%' },
};

/** Message-chip colour palettes keyed by the actor/phase they represent. */
export const CHIP_COLOR = {
  grey: {
    bg: 'var(--chip-neutral-bg)',
    border: 'var(--chip-neutral-border)',
    fg: 'var(--chip-neutral-fg)',
  },
  amber: {
    bg: 'var(--chip-accent-bg)',
    border: 'var(--accent)',
    fg: 'var(--chip-accent-fg)',
  },
  green: {
    bg: 'var(--chip-green-bg)',
    border: 'var(--green)',
    fg: 'var(--chip-green-fg)',
  },
  greenOut: {
    bg: 'var(--chip-green-strong-bg)',
    border: 'var(--green)',
    fg: 'var(--chip-green-fg)',
  },
  purple: {
    bg: 'var(--chip-violet-bg)',
    border: 'var(--purple)',
    fg: 'var(--chip-violet-fg)',
  },
};

/** Line/accent colours used for each phase of the flows. */
export const LINE = {
  neutral: 'var(--fg-muted)',
  amber: 'var(--accent)',
  green: 'var(--green)',
  greenSoft: 'var(--green-soft)',
  purple: 'var(--purple)',
};
