import styles from './nodes.module.css';

const IDLE_BORDER = '#4a4f4e';
const LLM_ACCENT = '#e8a04c';

export function NodeLabel({ label, sub }: { label: string; sub?: string }) {
  return (
    <>
      <div className={styles.label}>{label}</div>
      {sub && <div className={styles.sub}>{sub}</div>}
    </>
  );
}

/** The "You" avatar node. */
export function UserNode({ active, color }: { active: boolean; color: string }) {
  return (
    <>
      <div
        className={styles.circle}
        style={{ width: 60, height: 60, borderColor: active ? color : IDLE_BORDER }}
        aria-label="You"
      >
        <svg viewBox="0 0 24 24" width="54%" height="54%">
          <circle cx="12" cy="8.4" r="4.1" fill="#d8cdb8" />
          <path d="M4.4 20.5a7.6 7.6 0 0 1 15.2 0Z" fill="#d8cdb8" />
        </svg>
      </div>
      <NodeLabel label="You" />
    </>
  );
}

/** The outlined "LLM" node, sized for the flow diagrams. */
export function LlmFlowNode({
  active,
  color,
  size = 72,
  label,
  sub,
}: {
  active?: boolean;
  color?: string;
  size?: number;
  label?: string;
  sub?: string;
}) {
  const border = active && color ? color : LLM_ACCENT;
  return (
    <>
      <div
        className={styles.circle}
        style={{
          width: size,
          height: size,
          borderColor: border,
          flexDirection: 'column',
          gap: 2,
        }}
        aria-label="LLM"
      >
        <svg viewBox="0 0 24 24" width={size * 0.37} height={size * 0.37}>
          <g fill={LLM_ACCENT}>
            <rect x="5" y="6.5" width="14" height="2.3" rx="1.15" />
            <rect x="5" y="10.85" width="14" height="2.3" rx="1.15" />
            <rect x="5" y="15.2" width="8.5" height="2.3" rx="1.15" />
          </g>
        </svg>
        <span className={styles.llmLabel}>LLM</span>
      </div>
      {label ? <NodeLabel label={label} sub={sub} /> : sub && <NodeLabel label={sub} />}
    </>
  );
}

/** A small guardrail checkpoint node (input/output filter). */
export function GuardNode({
  icon,
  label,
  active,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  color: string;
}) {
  return (
    <>
      <div className={styles.guard} style={{ borderColor: active ? color : IDLE_BORDER }}>
        {icon}
      </div>
      <div className={styles.guardLabel}>{label}</div>
    </>
  );
}

/** A rounded-square node showing an icon and a label — tools, resources, etc. */
export function IconNode({
  icon,
  label,
  active,
  color,
  size = 56,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  color: string;
  size?: number;
}) {
  return (
    <>
      <div
        className={styles.square}
        style={{
          width: size,
          height: size,
          borderRadius: 16,
          borderColor: active ? color : IDLE_BORDER,
        }}
      >
        {icon}
      </div>
      <NodeLabel label={label} />
    </>
  );
}

/** The "harness" node — ordinary software wrapped around the model. */
export function HarnessNode({
  active,
  color,
  label = 'The harness',
  sub = 'ordinary software',
}: {
  active: boolean;
  color: string;
  label?: string;
  sub?: string;
}) {
  return (
    <>
      <div
        className={styles.square}
        style={{ width: 64, height: 64, borderColor: active ? color : IDLE_BORDER }}
        aria-label="The harness"
      >
        <svg viewBox="0 0 24 24" width="32" height="32">
          <rect
            x="7"
            y="7"
            width="10"
            height="10"
            rx="2.2"
            fill="none"
            stroke="#cdd2c8"
            strokeWidth="1.6"
          />
          <rect x="10.2" y="10.2" width="3.6" height="3.6" rx="1" fill="#cdd2c8" />
          <g stroke="#cdd2c8" strokeWidth="1.6" strokeLinecap="round">
            <line x1="10" y1="4.4" x2="10" y2="7" />
            <line x1="14" y1="4.4" x2="14" y2="7" />
            <line x1="10" y1="17" x2="10" y2="19.6" />
            <line x1="14" y1="17" x2="14" y2="19.6" />
            <line x1="4.4" y1="10" x2="7" y2="10" />
            <line x1="4.4" y1="14" x2="7" y2="14" />
            <line x1="17" y1="10" x2="19.6" y2="10" />
            <line x1="17" y1="14" x2="19.6" y2="14" />
          </g>
        </svg>
      </div>
      <NodeLabel label={label} sub={sub} />
    </>
  );
}
