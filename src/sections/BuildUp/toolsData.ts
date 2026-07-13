import type { FlowStep } from '../../components/FlowDiagram/FlowDiagram.tsx';

export interface ToolExample {
  icon: string;
  name: string;
  desc: string;
}

export const TOOL_EXAMPLES: ToolExample[] = [
  { icon: '🌐', name: 'Web search', desc: 'look something up online right now' },
  { icon: '🗄️', name: 'Database query', desc: 'read live records, orders, prices' },
  { icon: '💻', name: 'Run code', desc: 'do math, parse a file, make a chart' },
  { icon: '📧', name: 'Send email', desc: 'or a Slack message, or a calendar invite' },
  { icon: '📄', name: 'Read a file', desc: 'open a PDF or spreadsheet you gave it' },
  { icon: '🛠️', name: 'Call an API', desc: 'book a room, pay, file a ticket' },
  { icon: '🧮', name: 'Calculator', desc: "exact arithmetic it shouldn't guess" },
  { icon: '🤖', name: 'Another agent', desc: 'hand a sub-task to a specialist' },
];

// Reusable connector geometries for the horizontal (user↔harness, harness↔llm)
// and vertical (harness↔tool) legs of the diagram.
const LEG_USER = {
  R: {
    left: '12%',
    top: 'calc(34% - 2px)',
    width: '22%',
    height: '3px',
    angle: '90deg',
    arrowLeft: '33.5%',
    arrowTop: 'calc(34% - 8px)',
  },
  L: {
    left: '12%',
    top: 'calc(34% - 2px)',
    width: '22%',
    height: '3px',
    angle: '90deg',
    arrowLeft: '11.5%',
    arrowTop: 'calc(34% - 8px)',
  },
};
const LEG_LLM = {
  R: {
    left: '42%',
    top: 'calc(34% - 2px)',
    width: '26%',
    height: '3px',
    angle: '90deg',
    arrowLeft: '67.5%',
    arrowTop: 'calc(34% - 8px)',
  },
  L: {
    left: '42%',
    top: 'calc(34% - 2px)',
    width: '26%',
    height: '3px',
    angle: '90deg',
    arrowLeft: '41.5%',
    arrowTop: 'calc(34% - 8px)',
  },
};
const LEG_TOOL = {
  D: {
    left: 'calc(38% - 1.5px)',
    top: '50%',
    width: '3px',
    height: '21%',
    angle: '180deg',
    arrowLeft: 'calc(38% - 6.5px)',
    arrowTop: '70%',
  },
  U: {
    left: 'calc(38% - 1.5px)',
    top: '50%',
    width: '3px',
    height: '21%',
    angle: '180deg',
    arrowLeft: 'calc(38% - 6.5px)',
    arrowTop: 'calc(50% - 4px)',
  },
};

const CHIP_USER = { left: '23%', top: '10%' };
const CHIP_LLM = { left: '55%', top: '10%' };
const CHIP_TOOL = { left: '57%', top: '61%' };

const GREY = { bg: '#343838', border: '#4a4f4e', fg: '#d8cdb8' };
const AMBER = { bg: '#3a2d15', border: '#e8a04c', fg: '#e8d9bd' };
const GREEN = { bg: '#1e2620', border: '#7a8a5e', fg: '#cfe0bd' };
const GREEN_OUT = { bg: '#3d4a35', border: '#7a8a5e', fg: '#cfe0bd' };

export const TOOL_STEPS: FlowStep[] = [
  {
    label: '1 · you ask',
    color: '#b8bcb2',
    dir: 'R',
    connector: LEG_USER.R,
    chip: { text: '✉️ "Find hotels in Basel"', ...CHIP_USER, ...GREY },
    raw: '{ "role": "user",\n  "content": "Find hotels in Basel" }',
    note: 'Your plain-language message arrives at the harness as ordinary text. No format, no special syntax, just what you typed.',
    highlight: ['user', 'harness'],
  },
  {
    label: '2 · harness assembles the prompt',
    color: '#b8bcb2',
    dir: 'R',
    connector: LEG_LLM.R,
    chip: {
      text: 'prompt: system rules + your question + tool list',
      ...CHIP_LLM,
      ...GREY,
    },
    raw: 'system: "You are a travel helper…"\ntools: [ web_search(query) ]\nmessages: [ user: "Find hotels in Basel" ]',
    note: 'The harness bundles its hidden system prompt, the tool menu (as JSON schemas), and the whole conversation, then sends it all to the model.',
    highlight: ['harness'],
  },
  {
    label: '3 · LLM outputs special text',
    color: '#e8a04c',
    dir: 'L',
    connector: LEG_LLM.L,
    chip: {
      text: 'tool_use: web.search("Basel hotels") · just text!',
      ...CHIP_LLM,
      ...AMBER,
    },
    raw: '{ "type": "tool_use",\n  "name": "web_search",\n  "input": { "query": "Basel hotels" } }',
    note: "The model can't search. It just writes this block of text. The harness recognises the tool_use shape and acts on it — the model never runs anything.",
    highlight: ['harness'],
  },
  {
    label: '4 · harness runs the real search',
    color: '#7a8a5e',
    dir: 'D',
    connector: LEG_TOOL.D,
    chip: { text: 'the harness performs the actual web call', ...CHIP_TOOL, ...GREEN },
    raw: 'GET https://search.api/?q=Basel+hotels\n→ 200 OK',
    note: 'Ordinary code makes the real network request and gets a response. This is the only step where anything leaves the text world.',
    highlight: ['harness', 'tool'],
  },
  {
    label: '5 · raw results return',
    color: '#7a8a5e',
    dir: 'U',
    connector: LEG_TOOL.U,
    chip: { text: '10 pages of raw results', ...CHIP_TOOL, ...GREEN },
    raw: '[ { title, url, snippet }, … ]  // 10 hits,\n  ~40 KB of messy HTML-ish text',
    note: 'The raw result lands back in the harness. Often too long or too messy to hand straight to the model.',
    highlight: ['harness', 'tool'],
  },
  {
    label: '6 · full history + result sent again',
    color: '#9fb28a',
    dir: 'R',
    connector: LEG_LLM.R,
    chip: {
      text: 'whole history again + tool_result: top hotels, cleaned up',
      ...CHIP_LLM,
      ...GREEN,
    },
    raw: 'messages: [ user…, assistant(tool_use)…,\n  { "type": "tool_result",\n    "content": "Top 3: Hotel A, B, C" } ]',
    note: 'Because the model is stateless, the harness re-sends the ENTIRE conversation plus the tidied result as a tool_result. The model remembers nothing on its own.',
    highlight: ['harness'],
  },
  {
    label: '7 · LLM writes the reply',
    color: '#9fb28a',
    dir: 'L',
    connector: LEG_LLM.L,
    chip: {
      text: '✉️ "Three good options: …" · again, just text',
      ...CHIP_LLM,
      ...GREEN_OUT,
    },
    raw: '{ "role": "assistant",\n  "content": "Three good options in Basel: …" }',
    note: 'With the result now sitting in its context, the model writes a normal text reply that weaves the findings in. Still just text.',
    highlight: ['harness'],
  },
  {
    label: '8 · harness shows it to you',
    color: '#9fb28a',
    dir: 'L',
    connector: LEG_USER.L,
    chip: { text: '✉️ "Three good options: …"', ...CHIP_USER, ...GREEN_OUT },
    raw: 'Three good options in Basel: …',
    note: 'The harness strips away all the machinery and shows you only the final, human-readable reply, as if it had known the answer all along.',
    highlight: ['user', 'harness'],
  },
];
