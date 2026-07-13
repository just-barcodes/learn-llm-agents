import { useState } from 'react';
import styles from './FlowDiagram.module.css';

export type FlowDir = 'R' | 'L' | 'D' | 'U';

export interface FlowConnector {
  left: string;
  top: string;
  width: string;
  height: string;
  angle: string;
  arrowLeft: string;
  arrowTop: string;
}

export interface FlowChip {
  text: string;
  left: string;
  top: string;
  bg: string;
  border: string;
  fg: string;
  /** Allow the chip to wrap across lines instead of staying on one line. */
  wrap?: boolean;
}

export interface FlowStep {
  label: string;
  color: string;
  dir: FlowDir;
  /** Omit for steps with no travelling connector (e.g. an in-place check). */
  connector?: FlowConnector;
  chip: FlowChip;
  note: string;
  raw: string;
  /** Node ids highlighted (border tinted to `color`) on this step. */
  highlight: string[];
}

export interface FlowNode {
  id: string;
  left: string;
  top: string;
  render: (active: boolean, color: string, step: number) => React.ReactNode;
}

const DASH_ANIM: Record<FlowDir, string> = {
  R: 'dashR',
  L: 'dashL',
  D: 'dashD',
  U: 'dashU',
};

function Arrow({
  dir,
  color,
  left,
  top,
}: {
  dir: FlowDir;
  color: string;
  left: string;
  top: string;
}) {
  const base: React.CSSProperties = {
    position: 'absolute',
    left,
    top,
    width: 0,
    height: 0,
  };
  const styleByDir: Record<FlowDir, React.CSSProperties> = {
    R: {
      borderTop: '8px solid transparent',
      borderBottom: '8px solid transparent',
      borderLeft: `13px solid ${color}`,
    },
    L: {
      borderTop: '8px solid transparent',
      borderBottom: '8px solid transparent',
      borderRight: `13px solid ${color}`,
    },
    D: {
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderTop: `13px solid ${color}`,
    },
    U: {
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderBottom: `13px solid ${color}`,
    },
  };
  // Centre the arrowhead across its connector. The step data anchors the
  // triangle's top-left corner (tuned for the old size), so nudge it onto the
  // line's centre: horizontal lines need 0.5px, vertical lines 1.5px.
  const centred: React.CSSProperties =
    dir === 'R' || dir === 'L'
      ? { transform: 'translateY(-0.5px)' }
      : { transform: 'translateX(-1.5px)' };
  return <div style={{ ...base, ...styleByDir[dir], ...centred }} />;
}

interface FlowDiagramProps {
  title?: React.ReactNode;
  nodes: FlowNode[];
  steps: FlowStep[];
  sceneHeight: number;
  /** Extra content rendered between the scene and the caption (e.g. a live TODO). */
  extras?: (step: number) => React.ReactNode;
  /** Absolutely-positioned content rendered inside the scene (e.g. a verdict badge). */
  overlay?: (step: number) => React.ReactNode;
}

/**
 * A stepped flow diagram: fixed, positioned nodes with an animated connector
 * that walks between them, a message chip, a caption, clickable phase markers,
 * and an "under the hood" wire tap showing the raw bytes for each step.
 */
export function FlowDiagram({
  title,
  nodes,
  steps,
  sceneHeight,
  extras,
  overlay,
}: FlowDiagramProps) {
  const [step, setStep] = useState(0);
  const cur = steps[step];
  const last = step === steps.length - 1;

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.stepButtons}>
          <button className={styles.restart} onClick={() => setStep(0)}>
            ↺ Restart
          </button>
          <button
            className={styles.next}
            onClick={() => !last && setStep(step + 1)}
            disabled={last}
          >
            {last ? 'Complete ✓' : 'Next step →'}
          </button>
        </div>
      </div>

      <div className={styles.scene} style={{ height: sceneHeight }}>
        {nodes.map((node) => {
          const active = cur.highlight.includes(node.id);
          return (
            <div
              key={node.id}
              className={styles.node}
              style={{ left: node.left, top: node.top }}
            >
              {node.render(active, cur.color, step)}
            </div>
          );
        })}

        {cur.connector && (
          <>
            <div
              className={styles.connector}
              style={{
                left: cur.connector.left,
                top: cur.connector.top,
                width: cur.connector.width,
                height: cur.connector.height,
                backgroundImage: `repeating-linear-gradient(${cur.connector.angle}, ${cur.color} 0 8px, transparent 8px 15px)`,
                animation: `${DASH_ANIM[cur.dir]} .7s linear infinite`,
              }}
            />
            <Arrow
              dir={cur.dir}
              color={cur.color}
              left={cur.connector.arrowLeft}
              top={cur.connector.arrowTop}
            />
          </>
        )}

        {overlay?.(step)}

        <div
          key={step}
          className={styles.chip}
          style={{ left: cur.chip.left, top: cur.chip.top }}
        >
          <span
            className={
              cur.chip.wrap ? `${styles.chipText} ${styles.chipWrap}` : styles.chipText
            }
            style={{
              background: cur.chip.bg,
              borderColor: cur.chip.border,
              color: cur.chip.fg,
            }}
          >
            {cur.chip.text}
          </span>
        </div>
      </div>

      {extras?.(step)}

      <p className={styles.note} style={{ borderLeftColor: cur.color }}>
        {cur.note}
      </p>

      <div className={styles.phases}>
        {steps.map((s, i) => (
          <button
            key={i}
            className={styles.phase}
            onClick={() => setStep(i)}
            aria-current={i === step}
            style={{
              borderColor: i === step ? s.color : '#3a3f3e',
              color: i === step ? s.color : 'var(--fg-dim)',
              opacity: i === step ? 1 : 0.6,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.wireTap}>
        <div className={styles.wireHead}>⌥ Under the hood</div>
        <div className={styles.wireTitle} style={{ color: cur.color }}>
          {cur.label}
        </div>
        <pre className={styles.wireRaw} style={{ borderLeftColor: cur.color }}>
          {cur.raw}
        </pre>
      </div>
    </div>
  );
}
