import type { ReactNode } from 'react';
import { FlowDiagram, type FlowNode } from '../../components/FlowDiagram/FlowDiagram.tsx';
import {
  HarnessNode,
  IconNode,
  LlmFlowNode,
  UserNode,
} from '../../components/FlowDiagram/nodes.tsx';
import {
  BookIcon,
  CheckSquareIcon,
  CompassIcon,
  EnvelopeIcon,
  EyeIcon,
  GlobeIcon,
  InlineIcon,
  RobotIcon,
  ThoughtIcon,
  ToolboxIcon,
  WrenchIcon,
} from '../../components/FlowDiagram/icons.tsx';
import text from '../../styles/text.module.css';
import {
  ORCH_RESOURCES,
  ORCH_STEPS,
  ORCH_TODO,
  SUB_LOOP,
  type OrchStep,
} from './orchData.ts';
import styles from './OrchestrationPanel.module.css';
import panel from './ToolsPanel.module.css';

const DEFAULT_RESOURCE = {
  key: '',
  name: 'resources',
  desc: 'docs · web · sub-agent · email',
};

const RESOURCE_ICONS: Record<string, ReactNode> = {
  kb: <BookIcon size={22} />,
  web: <GlobeIcon size={22} />,
  agent: <RobotIcon size={22} />,
  email: <EnvelopeIcon size={22} />,
};

/** Icons for the sub-agent's think → act → observe loop, in SUB_LOOP order. */
const SUB_LOOP_ICONS: ReactNode[] = [
  <ThoughtIcon size={15} />,
  <WrenchIcon size={15} />,
  <EyeIcon size={15} />,
];

function resourceIcon(key: string) {
  return RESOURCE_ICONS[key] ?? <ToolboxIcon size={22} />;
}

function activeResource(step: OrchStep) {
  return ORCH_RESOURCES.find((r) => r.key === step.activeKey) ?? DEFAULT_RESOURCE;
}

const nodes: FlowNode[] = [
  {
    id: 'you',
    left: '8%',
    top: '30%',
    render: (active, color) => <UserNode active={active} color={color} />,
  },
  {
    id: 'harness',
    left: '38%',
    top: '30%',
    render: (active, color) => (
      <HarnessNode active={active} color={color} sub="runs the plan" />
    ),
  },
  {
    id: 'orch',
    left: '72%',
    top: '30%',
    render: (active, color) => (
      <LlmFlowNode
        active={active}
        color={color}
        label="Orchestrator"
        sub="owns the plan · still only writes text"
      />
    ),
  },
  {
    id: 'res',
    left: '38%',
    top: '82%',
    render: (active, color, step) => {
      const r = activeResource(ORCH_STEPS[step]);
      return (
        <IconNode
          icon={resourceIcon(r.key)}
          label={r.name}
          active={active}
          color={color}
        />
      );
    },
  },
];

function OrchExtras(step: number) {
  const cur = ORCH_STEPS[step];
  const showTodo = step >= 1;
  const showSubAgent = cur.activeKey === 'agent';

  return (
    <>
      {showSubAgent && (
        <div className={styles.subAgent}>
          <div className={styles.subAgentTitle}>
            <InlineIcon>
              <RobotIcon size={14} />
            </InlineIcon>
            inside the sub-agent · its own loop
          </div>
          <div className={styles.subLoop}>
            {SUB_LOOP.map((s, i) => (
              <div key={s.text} className={styles.subLoopItem}>
                <span className={styles.subLoopIcon}>{SUB_LOOP_ICONS[i]}</span>
                <span className={styles.subLoopText}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.grid}>
        <div>
          <div className={styles.gridLabel}>
            <InlineIcon>
              <ToolboxIcon size={14} />
            </InlineIcon>
            The harness can reach for any of these
          </div>
          <div className={styles.resources}>
            {ORCH_RESOURCES.map((r) => {
              const on = cur.activeKey === r.key;
              return (
                <div
                  key={r.key}
                  className={styles.resource}
                  style={{
                    borderColor: on ? cur.color : '#343838',
                    background: on ? '#232827' : '#191d1d',
                    opacity: on ? 1 : 0.42,
                    transform: on ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: on
                      ? `0 0 0 1px ${cur.color}, 0 10px 26px rgba(0,0,0,.4)`
                      : 'none',
                  }}
                >
                  <div className={styles.resourceIcon}>{resourceIcon(r.key)}</div>
                  <div>
                    <div
                      className={styles.resourceName}
                      style={{ color: on ? 'var(--fg)' : 'var(--fg-dim)' }}
                    >
                      {r.name}
                    </div>
                    <div className={styles.resourceDesc}>{r.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.todo}>
          <div className={styles.todoLabel}>
            <InlineIcon>
              <CheckSquareIcon size={14} />
            </InlineIcon>
            The agent’s TODO list
          </div>
          {showTodo ? (
            <div className={styles.todoItems}>
              {ORCH_TODO.map((t) => {
                const done = cur.done.includes(t.key);
                return (
                  <div key={t.key} className={styles.todoItem}>
                    <span
                      className={styles.todoBox}
                      style={{ color: done ? 'var(--green-soft)' : '#5a5f5e' }}
                    >
                      {done ? '☑' : '☐'}
                    </span>
                    <span
                      className={styles.todoText}
                      style={{
                        color: done ? 'var(--fg-dim)' : 'var(--fg-muted)',
                        textDecoration: done ? 'line-through' : 'none',
                      }}
                    >
                      {t.text}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={styles.todoEmpty}>— empty until the agent plans —</p>
          )}
        </div>
      </div>
    </>
  );
}

/** Tab 4 — an orchestrator combining planning, RAG, tools, and a sub-agent. */
export function OrchestrationPanel() {
  return (
    <div className={panel.panel}>
      <h3 className={text.h3}>One agent, many tools, RAG, and a sub-agent</h3>
      <p className={text.lead}>
        An agent can combine everything we have seen so far. It <b>plans</b> a to-do list,
        grounds itself with <b>RAG</b>, reaches for whichever <b>tool</b> each step needs,
        and when a sub-task is big enough, <b>hands it to another agent</b> entirely.
      </p>

      <FlowDiagram
        title={
          <>
            <InlineIcon>
              <CompassIcon size={16} />
            </InlineIcon>
            The orchestrator at work
          </>
        }
        nodes={nodes}
        steps={ORCH_STEPS}
        sceneHeight={250}
        extras={OrchExtras}
      />

      <div className={panel.aside}>
        <div className={panel.asideTitle}>
          <InlineIcon>
            <CompassIcon size={16} />
          </InlineIcon>
          So what actually changed?
        </div>
        <p>
          Nothing new under the hood. Every arrow above is still one model reading text
          and writing text; even the sub-agent is just a tool that happens to be another
          loop. What makes it feel powerful is the combination and coordination of all the
          different elements.
        </p>
      </div>
    </div>
  );
}
