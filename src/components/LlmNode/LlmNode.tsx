import { LlmGlyph } from '../FlowDiagram/icons.tsx';
import styles from './LlmNode.module.css';

interface LlmNodeProps {
  size?: number;
  /** Colour of the halo drawn around the node (via box-shadow). */
  ring?: string;
}

/** The small outlined "LLM" node used in the context-window demo. */
export function LlmNode({ size = 60, ring = 'transparent' }: LlmNodeProps) {
  return (
    <div
      className={styles.node}
      style={{ width: size, height: size, boxShadow: `0 0 0 3px ${ring}` }}
      aria-label="LLM"
    >
      <LlmGlyph size={size * 0.37} />
      <span className={styles.label}>LLM</span>
    </div>
  );
}
