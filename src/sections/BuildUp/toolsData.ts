import type { FlowStep } from '../../components/FlowDiagram/FlowDiagram.tsx';
import { CHIP_AT, CHIP_COLOR, LEG } from './flowLegs.ts';

export interface ToolExample {
  name: string;
  desc: string;
}

export const TOOL_EXAMPLES: ToolExample[] = [
  { name: 'Web search', desc: 'look something up online right now' },
  { name: 'Database query', desc: 'read live records, orders, prices' },
  { name: 'Run code', desc: 'do math, parse a file, make a chart' },
  { name: 'Send email', desc: 'or a Slack message, or a calendar invite' },
  { name: 'Read a file', desc: 'open a PDF or spreadsheet you gave it' },
  { name: 'Call an API', desc: 'book a room, pay, file a ticket' },
  { name: 'Calculator', desc: "exact arithmetic it shouldn't guess" },
  { name: 'Another agent', desc: 'hand a sub-task to a specialist' },
];

const LEG_USER = { R: LEG.userR, L: LEG.userL };
const LEG_LLM = { R: LEG.llmR, L: LEG.llmL };
const LEG_TOOL = { D: LEG.vertD, U: LEG.vertU };

const CHIP_USER = CHIP_AT.user;
const CHIP_LLM = CHIP_AT.llm;
const CHIP_TOOL = CHIP_AT.vert;

const { grey: GREY, amber: AMBER, green: GREEN, greenOut: GREEN_OUT } = CHIP_COLOR;

export const TOOL_STEPS: FlowStep[] = [
  {
    label: '1 · you ask',
    color: '#b8bcb2',
    dir: 'R',
    connector: LEG_USER.R,
    chip: { text: '"Find hotels in Basel"', ...CHIP_USER, ...GREY },
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
      text: '"Three good options: …" · again, just text',
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
    chip: { text: '"Three good options: …"', ...CHIP_USER, ...GREEN_OUT },
    raw: 'Three good options in Basel: …',
    note: 'The harness strips away all the machinery and shows you only the final, human-readable reply, as if it had known the answer all along.',
    highlight: ['user', 'harness'],
  },
];
