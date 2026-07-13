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
  grey: { bg: '#343838', border: '#4a4f4e', fg: '#d8cdb8' },
  amber: { bg: '#3a2d15', border: '#e8a04c', fg: '#e8d9bd' },
  green: { bg: '#1e2620', border: '#7a8a5e', fg: '#cfe0bd' },
  greenOut: { bg: '#3d4a35', border: '#7a8a5e', fg: '#cfe0bd' },
  purple: { bg: '#2a2135', border: '#c98adf', fg: '#e6d5f2' },
};

/** Line/accent colours used for each phase of the flows. */
export const LINE = {
  neutral: '#b8bcb2',
  amber: '#e8a04c',
  green: '#7a8a5e',
  greenSoft: '#9fb28a',
  purple: '#c98adf',
};
