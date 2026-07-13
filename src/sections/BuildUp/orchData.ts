import type { FlowStep } from '../../components/FlowDiagram/FlowDiagram.tsx';
import { CHIP_COLOR, LINE } from './flowLegs.ts';

export interface OrchResource {
  key: string;
  icon: string;
  name: string;
  desc: string;
}
export interface OrchTodo {
  key: string;
  text: string;
}

export const ORCH_RESOURCES: OrchResource[] = [
  { key: 'kb', icon: '📚', name: 'Knowledge base', desc: 'your own docs, via RAG' },
  { key: 'web', icon: '🌐', name: 'Web search', desc: 'live news on the rival' },
  {
    key: 'agent',
    icon: '🤖',
    name: 'Research sub-agent',
    desc: 'its own think–act loop',
  },
  { key: 'email', icon: '📧', name: 'Send email', desc: 'deliver the final brief' },
];

export const ORCH_TODO: OrchTodo[] = [
  { key: 'docs', text: 'pull our positioning (docs)' },
  { key: 'web', text: 'research Rival Co (web)' },
  { key: 'agent', text: 'deep-dive → research sub-agent' },
  { key: 'draft', text: 'draft the 1-page brief' },
  { key: 'email', text: 'email it to the team' },
];

export const SUB_LOOP = [
  { icon: '💭', text: 'think: where does Rival Co make money?' },
  { icon: '🔧', text: 'act: web_search + read filings' },
  { icon: '👀', text: 'observe: premium pricing, weak self-serve' },
];

// Connectors for the 30%-row layout (You 8%, Harness 38%, Orchestrator 72%,
// active resource at 82%).
const OUT = {
  R: {
    left: '13%',
    top: 'calc(30% - 2px)',
    width: '20%',
    height: '3px',
    angle: '90deg',
    arrowLeft: '32.5%',
    arrowTop: 'calc(30% - 8px)',
  },
  L: {
    left: '13%',
    top: 'calc(30% - 2px)',
    width: '20%',
    height: '3px',
    angle: '90deg',
    arrowLeft: '12.5%',
    arrowTop: 'calc(30% - 8px)',
  },
};
const LLMC = {
  R: {
    left: '43%',
    top: 'calc(30% - 2px)',
    width: '24%',
    height: '3px',
    angle: '90deg',
    arrowLeft: '66.5%',
    arrowTop: 'calc(30% - 8px)',
  },
  L: {
    left: '43%',
    top: 'calc(30% - 2px)',
    width: '24%',
    height: '3px',
    angle: '90deg',
    arrowLeft: '42.5%',
    arrowTop: 'calc(30% - 8px)',
  },
};
const RES = {
  D: {
    left: 'calc(38% - 1.5px)',
    top: '40%',
    width: '3px',
    height: '30%',
    angle: '180deg',
    arrowLeft: 'calc(38% - 6.5px)',
    arrowTop: '68%',
  },
  U: {
    left: 'calc(38% - 1.5px)',
    top: '40%',
    width: '3px',
    height: '30%',
    angle: '180deg',
    arrowLeft: 'calc(38% - 6.5px)',
    arrowTop: '40%',
  },
};
const CHIP_OUT = { left: '23%', top: '13%' };
const CHIP_LLM = { left: '55%', top: '13%' };
const CHIP_RES = { left: '61%', top: '57%' };

export interface OrchStep extends FlowStep {
  /** Which node/resource is lit; drives the bottom node and resource menu. */
  activeKey: string;
  /** TODO item keys completed by this step. */
  done: string[];
}

export const ORCH_STEPS: OrchStep[] = [
  {
    label: '1 · you ask',
    color: LINE.neutral,
    dir: 'R',
    connector: OUT.R,
    chip: {
      text: '✉️ "Draft a brief on Rival Co & email the team"',
      ...CHIP_OUT,
      ...CHIP_COLOR.grey,
      wrap: true,
    },
    raw: 'user: "Draft a competitive brief on Rival Co\nand email it to the team."',
    note: 'One sentence from you, but several sub-tasks hiding inside it. The orchestrator agent owns the whole thing.',
    highlight: ['you', 'harness'],
    activeKey: 'you',
    done: [],
  },
  {
    label: '2 · it plans a TODO',
    color: LINE.amber,
    dir: 'R',
    connector: LLMC.R,
    chip: {
      text: '☑️ writes itself a to-do list',
      ...CHIP_LLM,
      ...CHIP_COLOR.amber,
      wrap: true,
    },
    raw: 'TODO:\n[ ] pull our positioning (docs)\n[ ] research Rival Co (web)\n[ ] deep-dive → sub-agent\n[ ] draft brief\n[ ] email the team',
    note: 'Same loop as before, just a longer list. Each item will lean on a different resource, and it crosses them off as it goes.',
    highlight: ['orch', 'harness'],
    activeKey: 'orch',
    done: [],
  },
  {
    label: '3 · RAG: our own docs',
    color: LINE.purple,
    dir: 'D',
    connector: RES.D,
    chip: {
      text: '📚 retrieve our positioning passages',
      ...CHIP_RES,
      ...CHIP_COLOR.purple,
      wrap: true,
    },
    raw: 'search(kb, "our positioning vs Rival Co")\n→ 3 chunks from strategy deck + battlecard',
    note: 'First it grounds itself in what YOU already know, retrieved from your knowledge base and pasted into the prompt.',
    highlight: ['res', 'harness'],
    activeKey: 'kb',
    done: ['docs'],
  },
  {
    label: '4 · tool: search the web',
    color: LINE.green,
    dir: 'D',
    connector: RES.D,
    chip: {
      text: '🌐 web_search("Rival Co news 2026")',
      ...CHIP_RES,
      ...CHIP_COLOR.green,
      wrap: true,
    },
    raw: 'tool_use: web_search(\n  query="Rival Co latest launches 2026")\n→ 8 fresh articles',
    note: 'A different tool for a different need. The orchestrator picks whichever fits the current to-do item.',
    highlight: ['res', 'harness'],
    activeKey: 'web',
    done: ['docs', 'web'],
  },
  {
    label: '5 · delegate to a sub-agent',
    color: LINE.amber,
    dir: 'D',
    connector: RES.D,
    chip: {
      text: '🤖 spins up a research sub-agent',
      ...CHIP_RES,
      ...CHIP_COLOR.amber,
      wrap: true,
    },
    raw: 'tool_use: research_agent(\n  task="Summarise Rival Co pricing & gaps")',
    note: 'The deep-dive is itself a whole agent. Calling it looks exactly like any other tool call, but behind that one line a second loop spins up.',
    highlight: ['res', 'harness'],
    activeKey: 'agent',
    done: ['docs', 'web'],
  },
  {
    label: '6 · sub-agent reports back',
    color: LINE.greenSoft,
    dir: 'U',
    connector: RES.U,
    chip: {
      text: '✉️ hands back a tight summary',
      ...CHIP_RES,
      ...CHIP_COLOR.greenOut,
      wrap: true,
    },
    raw: 'tool_result (from sub-agent):\n"Rival Co: premium pricing, weak\nself-serve, no EU data centre."',
    note: 'It ran its OWN think → act → observe loop with its own tools, and only its final answer returns, just text, like any tool result.',
    highlight: ['res', 'harness'],
    activeKey: 'agent',
    done: ['docs', 'web', 'agent'],
  },
  {
    label: '7 · draft + email',
    color: LINE.green,
    dir: 'D',
    connector: RES.D,
    chip: {
      text: '📧 send_email(team, brief)',
      ...CHIP_RES,
      ...CHIP_COLOR.green,
      wrap: true,
    },
    raw: 'assistant: writes the brief, then\ntool_use: send_email(\n  to="team@", body="<brief>")',
    note: "With docs, web results and the sub-agent's findings all in context, it writes the brief and fires the last tool.",
    highlight: ['res', 'harness'],
    activeKey: 'email',
    done: ['docs', 'web', 'agent', 'draft', 'email'],
  },
  {
    label: '8 · reports back to you',
    color: LINE.greenSoft,
    dir: 'L',
    connector: OUT.L,
    chip: {
      text: '✉️ "Done — brief sent to the team."',
      ...CHIP_OUT,
      ...CHIP_COLOR.greenOut,
      wrap: true,
    },
    raw: 'assistant: "Done. I researched Rival Co,\ncross-checked our docs, and emailed\nthe 1-page brief to the team."',
    note: "One request from you; a plan, RAG, two tools and a whole sub-agent underneath. That coordination is what 'agentic' really means.",
    highlight: ['you', 'harness'],
    activeKey: 'you',
    done: ['docs', 'web', 'agent', 'draft', 'email'],
  },
];
