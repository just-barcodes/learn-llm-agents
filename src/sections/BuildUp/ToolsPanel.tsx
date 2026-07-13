import type { ReactNode } from 'react';
import { Term } from '../../components/glossary/Term.tsx';
import { FlowDiagram, type FlowNode } from '../../components/FlowDiagram/FlowDiagram.tsx';
import {
  HarnessNode,
  IconNode,
  LlmFlowNode,
  UserNode,
} from '../../components/FlowDiagram/nodes.tsx';
import {
  CalculatorIcon,
  CodeIcon,
  DatabaseIcon,
  DocumentIcon,
  EnvelopeIcon,
  GlobeIcon,
  InlineIcon,
  PeopleIcon,
  RobotIcon,
  WrenchIcon,
} from '../../components/FlowDiagram/icons.tsx';
import text from '../../styles/text.module.css';
import { TOOL_EXAMPLES, TOOL_STEPS } from './toolsData.ts';
import styles from './ToolsPanel.module.css';

const TOOL_ICONS: Record<string, ReactNode> = {
  'Web search': <GlobeIcon size={20} />,
  'Database query': <DatabaseIcon size={20} />,
  'Run code': <CodeIcon size={20} />,
  'Send email': <EnvelopeIcon size={20} />,
  'Read a file': <DocumentIcon size={20} />,
  'Call an API': <WrenchIcon size={20} />,
  Calculator: <CalculatorIcon size={20} />,
  'Another agent': <RobotIcon size={20} />,
};

const nodes: FlowNode[] = [
  {
    id: 'user',
    left: '8%',
    top: '34%',
    render: (active, color) => <UserNode active={active} color={color} />,
  },
  {
    id: 'harness',
    left: '38%',
    top: '34%',
    render: (active, color) => <HarnessNode active={active} color={color} />,
  },
  {
    id: 'llm',
    left: '72%',
    top: '34%',
    render: () => <LlmFlowNode sub="only writes text" />,
  },
  {
    id: 'tool',
    left: '38%',
    top: '84%',
    render: (active, color) => (
      <IconNode
        icon={<GlobeIcon />}
        label="Web search"
        active={active}
        color={color}
      />
    ),
  },
];

/** Tab 2 — how a tool call actually works: the model asks in text, the harness acts. */
export function ToolsPanel() {
  return (
    <div className={styles.panel}>
      <h3 className={text.h3}>How an agent uses a tool</h3>
      <p className={text.lead}>
        An agent consists of a language model plus a <b>harness</b> (some software) that
        enhances it. A <b>tool</b> is any action the harness is willing to perform on the
        model’s behalf. The model cannot do these things itself, it can only ask in text.
        The harness does them and returns the result to the model as a new input.
      </p>

      <div className={text.eyebrow}>Examples of tools</div>
      <div className={styles.examples}>
        {TOOL_EXAMPLES.map((t) => (
          <div key={t.name} className={styles.example}>
            <div className={styles.exampleIcon}>{TOOL_ICONS[t.name]}</div>
            <div className={styles.exampleName}>{t.name}</div>
            <div className={styles.exampleDesc}>{t.desc}</div>
          </div>
        ))}
      </div>

      <p className={text.small}>
        The pattern is always the same: the model writes a request in a fixed format, the
        harness runs the real thing, the result comes back as text. Change the tools and
        you change what the agent can do, without touching the model. How does the model
        know which tools exist? The harness tells it up front, in the{' '}
        <Term term="sysprompt">system prompt</Term>.
      </p>

      <FlowDiagram
        title={
          <>
            <InlineIcon>
              <WrenchIcon size={16} />
            </InlineIcon>
            Our first agent that can use a tool
          </>
        }
        nodes={nodes}
        steps={TOOL_STEPS}
        sceneHeight={235}
      />

      <div className={styles.aside}>
        <div className={styles.asideTitle}>
          <InlineIcon>
            <EnvelopeIcon size={16} />
          </InlineIcon>
          “But I’ve never set up a harness…”
        </div>
        <p>
          You don’t have to. When you use ChatGPT or the Claude app,{' '}
          <b>that product is the harness.</b> The chat website, its servers, and its
          plumbing are the ordinary software wrapped around the raw model. It stores your
          conversation and re-sends it each turn, holds the hidden system prompt, exposes
          tools like web search and code, runs them when the model asks, and streams only
          the finished reply to your screen.
        </p>
      </div>

      <div className={styles.aside}>
        <div className={styles.asideTitle}>
          <InlineIcon>
            <PeopleIcon size={16} />
          </InlineIcon>
          A tool can even be another agent
        </div>
        <p>
          Because a tool is just “something the harness runs and returns text from,” a
          whole other agent can be wrapped as one tool. A research agent might list “ask
          the coding-agent” among its tools; calling it kicks off that second agent’s own
          think-act loop, and only its final answer returns. This is one way to build{' '}
          <Term term="multiagent">multi-agent systems</Term>.
        </p>
      </div>
    </div>
  );
}
