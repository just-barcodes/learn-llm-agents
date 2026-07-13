import { Term } from '../../components/glossary/Term.tsx';
import { FlowDiagram, type FlowNode } from '../../components/FlowDiagram/FlowDiagram.tsx';
import {
  GuardNode,
  HarnessNode,
  LlmFlowNode,
  UserNode,
} from '../../components/FlowDiagram/nodes.tsx';
import {
  BarrierIcon,
  EnvelopeIcon,
  GhostIcon,
  InlineIcon,
  ScalesIcon,
  SearchIcon,
  ShieldIcon,
  TrafficLightIcon,
} from '../../components/FlowDiagram/icons.tsx';
import text from '../../styles/text.module.css';
import panel from './ToolsPanel.module.css';
import { SAFE_STEPS } from './safetyData.ts';
import styles from './SafetyPanel.module.css';

const nodes: FlowNode[] = [
  {
    id: 'you',
    left: '8%',
    top: '34%',
    render: (active, color) => <UserNode active={active} color={color} />,
  },
  {
    id: 'inguard',
    left: '23%',
    top: '34%',
    render: (active, color) => (
      <GuardNode
        icon={<ShieldIcon size={22} />}
        label="input guard"
        active={active}
        color={color}
      />
    ),
  },
  {
    id: 'harness',
    left: '38%',
    top: '34%',
    render: (active, color) => (
      <HarnessNode active={active} color={color} sub="enforces the guards" />
    ),
  },
  {
    id: 'outguard',
    left: '55%',
    top: '34%',
    render: (active, color) => (
      <GuardNode
        icon={<SearchIcon size={22} />}
        label="output guard"
        active={active}
        color={color}
      />
    ),
  },
  {
    id: 'llm',
    left: '72%',
    top: '34%',
    render: (active, color) => (
      <LlmFlowNode active={active} color={color} size={66} sub="drafts a reply" />
    ),
  },
  {
    id: 'action',
    left: '38%',
    top: '84%',
    render: (active, color, step) => {
      const human = SAFE_STEPS[step].human;
      return (
        <>
          <div className={styles.action}>
            <div
              className={styles.actionBox}
              style={{ borderColor: active ? color : '#4a4f4e' }}
            >
              <EnvelopeIcon size={26} />
            </div>
            {human && (
              <span className={styles.actionBadge}>
                {human === 'pending' ? '✋' : '✅'}
              </span>
            )}
          </div>
          <div className={styles.actionLabel}>Send email</div>
          <div className={styles.actionSub}>needs approval</div>
        </>
      );
    },
  },
];

function SafeOverlay(step: number) {
  const s = SAFE_STEPS[step];
  return (
    <>
      {s.human === 'pending' && (
        <>
          <div className={`${styles.approveLine} ${styles.approveH}`} />
          <div className={`${styles.approveLine} ${styles.approveV}`} />
          <div className={styles.approveArrow} />
          <div className={styles.approveLabel}>needs your OK</div>
        </>
      )}
      {s.verdict && (
        <div
          className={styles.verdict}
          style={{ left: s.verdictLeft, top: s.verdictTop }}
        >
          <span
            className={styles.verdictText}
            style={{
              background: s.verdictBg,
              borderColor: s.verdictBorder,
              color: s.verdictFg,
            }}
          >
            {s.verdict}
          </span>
        </div>
      )}
    </>
  );
}

/** Tab 5 — hallucination, guardrails, and a human-in-the-loop approval flow. */
export function SafetyPanel() {
  return (
    <div className={panel.panel}>
      <h3 className={text.h3}>When the model gets it wrong</h3>
      <p className={text.body}>
        Everything still rests on a stochastic text predictor which will happily write a
        confident, wrong sentence. It is important to understand when the model{' '}
        <Term term="hallucination">hallucinates</Term>, and how to build{' '}
        <Term term="guardrails">guardrails</Term> around what it is allowed to do.
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <InlineIcon>
              <GhostIcon size={17} />
            </InlineIcon>
            Hallucination
          </div>
          <p className={styles.cardBody}>
            The model writes something fluent, plausible, and simply false, an invented
            citation, a wrong date, an API that never existed. It isn’t lying; it has no
            notion of truth. It is only predicting the next likely word, and the likely
            word is not always the true one.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <InlineIcon>
              <BarrierIcon size={17} />
            </InlineIcon>
            Guardrails
          </div>
          <p className={styles.cardBody}>
            The rules of the building: what the agent may never do, which actions need a
            human’s sign-off, and what gets filtered on the way in and out. They live in
            layers: policy in the system prompt, classifiers on inputs and outputs, tool
            allow-lists, sandboxes, and a human in the loop for anything irreversible.
          </p>
        </div>
      </div>

      <FlowDiagram
        title={
          <>
            <InlineIcon>
              <TrafficLightIcon size={16} />
            </InlineIcon>
            Guardrails in the loop
          </>
        }
        nodes={nodes}
        steps={SAFE_STEPS}
        sceneHeight={250}
        overlay={SafeOverlay}
      />

      <div className={panel.aside} style={{ marginTop: 26 }}>
        <div className={panel.asideTitle}>
          <InlineIcon>
            <ScalesIcon size={16} />
          </InlineIcon>
          The trade-off
        </div>
        <p>
          Every guardrail costs a little capability, and every bit of freedom adds a
          little risk. The craft of building an agent is deciding, for a certain task, how
          much autonomy is worth how much oversight, and proving it with{' '}
          <Term term="evals">evals</Term> instead of a hunch.
        </p>
      </div>
    </div>
  );
}
