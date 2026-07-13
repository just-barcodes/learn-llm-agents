import styles from './LlmNode.module.css';

interface LlmNodeProps {
  size?: number;
  /** Colour of the halo drawn around the node (via box-shadow). */
  ring?: string;
}

/** The small outlined "LLM" node reused across the diagram panels. */
export function LlmNode({ size = 60, ring = 'transparent' }: LlmNodeProps) {
  return (
    <div
      className={styles.node}
      style={{ width: size, height: size, boxShadow: `0 0 0 3px ${ring}` }}
      aria-label="LLM"
    >
      <svg viewBox="0 0 24 24" width={size * 0.37} height={size * 0.37}>
        <g fill="var(--accent)">
          <rect x="5" y="6.5" width="14" height="2.3" rx="1.15" />
          <rect x="5" y="10.85" width="14" height="2.3" rx="1.15" />
          <rect x="5" y="15.2" width="8.5" height="2.3" rx="1.15" />
        </g>
      </svg>
      <span className={styles.label}>LLM</span>
    </div>
  );
}
