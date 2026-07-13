import type { FlowStep } from '../../components/FlowDiagram/FlowDiagram.tsx';
import { CHIP_AT, CHIP_COLOR, LEG, LINE } from './flowLegs.ts';

export interface RagReason {
  name: string;
  desc: string;
}

export const RAG_REASONS: RagReason[] = [
  {
    name: 'Private knowledge',
    desc: 'your wikis, contracts, tickets, the model never saw them',
  },
  {
    name: 'Fresh & changing',
    desc: "today's prices, this week's policy, no retraining needed",
  },
  {
    name: 'Grounded answers',
    desc: 'replies can quote and cite real passages, not guesses',
  },
];

export const RAG_STEPS: FlowStep[] = [
  {
    label: '1 · you ask',
    color: LINE.neutral,
    dir: 'R',
    connector: LEG.userR,
    chip: {
      text: '"What is our refund policy?"',
      ...CHIP_AT.user,
      ...CHIP_COLOR.grey,
    },
    raw: '{ "role": "user",\n  "content": "What is our refund policy?" }',
    note: 'Your question arrives at the harness as plain text.',
    highlight: ['user', 'harness'],
  },
  {
    label: '2 · harness embeds the question',
    color: LINE.purple,
    dir: 'D',
    connector: LEG.vertD,
    chip: {
      text: 'turn question into a vector [0.02, -0.7, …]',
      ...CHIP_AT.vert,
      ...CHIP_COLOR.purple,
    },
    raw: 'embed("What is our refund policy?")\n→ [0.021, -0.703, 0.118, … ]  // 1536 numbers',
    note: 'The harness converts the question into an embedding. A kind of numeric fingerprint every chunk in the knowledge base already has.',
    highlight: ['harness', 'kb'],
  },
  {
    label: '3 · search the knowledge base',
    color: LINE.green,
    dir: 'D',
    connector: LEG.vertD,
    chip: {
      text: 'find the nearest chunks (top-k)',
      ...CHIP_AT.vert,
      ...CHIP_COLOR.green,
    },
    raw: 'vector_store.search(query_vec, k=3)\n// compares against every stored chunk',
    note: "It asks the vector store for the handful of chunks whose fingerprints sit closest to the question's, meaning closest in meaning.",
    highlight: ['harness', 'kb'],
  },
  {
    label: '4 · top matches return',
    color: LINE.green,
    dir: 'U',
    connector: LEG.vertU,
    chip: { text: '3 relevant passages', ...CHIP_AT.vert, ...CHIP_COLOR.green },
    raw: '[ { text: "Refunds within 30 days…", score: .91 },\n  { text: "Digital goods are final…", score: .84 },\n  { text: "To start a return, …",     score: .79 } ]',
    note: 'The knowledge base just returns text again, the actual passages plus a similarity score. Nothing here touches the model yet.',
    highlight: ['harness', 'kb'],
  },
  {
    label: '5 · build the augmented prompt',
    color: LINE.amber,
    dir: 'R',
    connector: LEG.llmR,
    chip: {
      text: 'question + retrieved passages → prompt',
      ...CHIP_AT.llm,
      ...CHIP_COLOR.amber,
    },
    raw: 'system: "Answer using ONLY the context below."\ncontext: "Refunds within 30 days… Digital goods…"\nuser: "What is our refund policy?"',
    note: "This is the 'augmented' in RAG: the harness pastes the retrieved passages into the prompt as context, right beside your question.",
    highlight: ['harness'],
  },
  {
    label: '6 · grounded answer',
    color: LINE.greenSoft,
    dir: 'L',
    connector: LEG.llmL,
    chip: {
      text: '"You can return items within 30 days…"',
      ...CHIP_AT.llm,
      ...CHIP_COLOR.greenOut,
    },
    raw: '{ "role": "assistant",\n  "content": "You can return items within 30 days\nof purchase. Digital goods are final." }',
    note: 'The model reads the context and writes an answer drawn from it. It is able to quote the real policy instead of guessing.',
    highlight: ['harness'],
  },
  {
    label: '7 · answer shown to you',
    color: LINE.greenSoft,
    dir: 'L',
    connector: LEG.userL,
    chip: {
      text: '"You can return items within 30 days…"',
      ...CHIP_AT.user,
      ...CHIP_COLOR.greenOut,
    },
    raw: 'You can return items within 30 days of purchase.\nDigital goods are final.',
    note: 'The harness shows you the grounded reply, often with citations back to the source passages.',
    highlight: ['user', 'harness'],
  },
];
