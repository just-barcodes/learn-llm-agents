import { useState } from 'react';
import { Term } from '../../components/glossary/Term.tsx';
import {
  GearIcon,
  InlineIcon,
  ThoughtIcon,
} from '../../components/FlowDiagram/icons.tsx';
import { LlmNode } from '../../components/LlmNode/LlmNode.tsx';
import { useInViewOnce } from '../../hooks/useInViewOnce.ts';
import { useContextWindow } from './useContextWindow.ts';
import type { BlockKind } from './contextData.ts';
import type { DerivedBlock } from './useContextWindow.ts';
import styles from './ContextWindowDemo.module.css';

interface KindStyle {
  accent: string;
  bg: string;
  tag: string;
  text: string;
  italic?: boolean;
}

const KIND_STYLE: Record<BlockKind, KindStyle> = {
  sys: {
    accent: 'var(--accent)',
    bg: 'var(--chip-accent-bg)',
    tag: 'var(--chip-accent-fg)',
    text: 'var(--chip-accent-fg)',
  },
  user: {
    accent: 'var(--border-strong)',
    bg: 'var(--surface)',
    tag: 'var(--fg-muted)',
    text: 'var(--fg-muted)',
  },
  asst: {
    accent: 'var(--green)',
    bg: 'var(--chip-green-bg)',
    tag: 'var(--chip-green-fg)',
    text: 'var(--chip-green-fg)',
  },
  think: {
    accent: 'var(--purple)',
    bg: 'var(--chip-violet-bg)',
    tag: 'var(--chip-violet-fg)',
    text: 'var(--chip-violet-fg)',
    italic: true,
  },
};

const DROPPED_STYLE: KindStyle = {
  accent: 'var(--coral)',
  bg: 'var(--chip-coral-bg)',
  tag: 'var(--coral)',
  text: 'var(--chip-coral-fg)',
};

const FLOW_CHIP: Record<BlockKind, string> = {
  sys: 'system prompt loaded',
  user: '',
  think: 'reasoning privately…',
  asst: '',
};

function meterColor(pct: number, over: boolean): string {
  if (over) return 'var(--coral)';
  return pct > 78 ? 'var(--accent)' : 'var(--green)';
}

function ContextBlockRow({ block }: { block: DerivedBlock }) {
  const base = KIND_STYLE[block.kind];
  const s = block.dropped ? DROPPED_STYLE : base;
  const dashed = block.dropped || block.kind === 'think';
  const opacity = block.dropped ? 0.4 : block.latest ? 1 : 0.62;

  return (
    <div
      className={styles.block}
      style={{
        borderLeftColor: s.accent,
        borderTopColor: s.accent,
        borderRightColor: s.accent,
        borderBottomColor: s.accent,
        borderTopStyle: dashed ? 'dashed' : 'solid',
        borderRightStyle: dashed ? 'dashed' : 'solid',
        borderBottomStyle: dashed ? 'dashed' : 'solid',
        background: s.bg,
        opacity,
      }}
    >
      <div className={styles.blockHead}>
        <span className={styles.blockTag} style={{ color: s.tag }}>
          {block.kind === 'sys' && (
            <InlineIcon>
              <GearIcon size={13} />
            </InlineIcon>
          )}
          {block.tag}
        </span>
        <div className={styles.blockMeta}>
          {block.dropped && <span className={styles.droppedBadge}>✕ Dropped</span>}
          <span className={styles.blockTok}>{block.tok} tok</span>
        </div>
      </div>
      <div
        className={styles.blockText}
        style={{
          color: s.text,
          fontStyle: base.italic ? 'italic' : 'normal',
          textDecoration: block.dropped ? 'line-through' : 'none',
        }}
      >
        {block.text}
      </div>
    </div>
  );
}

/** Interactive demo: the context window filling up (and overflowing) turn by turn. */
export function ContextWindowDemo() {
  const ctx = useContextWindow();
  const [demoRef, seen] = useInViewOnce<HTMLDivElement>(0.55);
  const [coachDismissed, setCoachDismissed] = useState(false);
  const coach = seen && !coachDismissed;

  const onStep = () => {
    if (coach) {
      setCoachDismissed(true); // first click just dismisses the hint
      return;
    }
    ctx.next();
  };

  const kind = ctx.currentKind;
  const accent = KIND_STYLE[kind].accent;
  const chip =
    kind === 'user' || kind === 'asst' ? ctx.blocks.at(-1)?.text : FLOW_CHIP[kind];
  const isThink = kind === 'think';
  const chipIcon =
    kind === 'sys' ? (
      <GearIcon size={13} />
    ) : kind === 'think' ? (
      <ThoughtIcon size={13} />
    ) : null;

  return (
    <div className={styles.demo} ref={demoRef}>
      {coach && (
        <>
          <div className={styles.coachOverlay} />
          <div className={styles.coachHint}>click here to advance →</div>
        </>
      )}
      <div className={styles.controls}>
        <div className={styles.modeToggle} role="group" aria-label="Reasoning mode">
          <button
            className={!ctx.thinking ? `${styles.mode} ${styles.modeOn}` : styles.mode}
            aria-pressed={!ctx.thinking}
            onClick={() => ctx.setMode(false)}
          >
            Plain
          </button>
          <button
            className={ctx.thinking ? `${styles.mode} ${styles.modeOn}` : styles.mode}
            aria-pressed={ctx.thinking}
            onClick={() => ctx.setMode(true)}
          >
            With thinking
          </button>
        </div>
        <div className={styles.stepButtons}>
          <button className={styles.restart} onClick={ctx.reset}>
            ↺ Restart
          </button>
          <button
            className={coach ? `${styles.step} ${styles.stepCoach}` : styles.step}
            onClick={onStep}
            disabled={ctx.done && !coach}
            aria-label="Advance the conversation"
          >
            {ctx.done ? 'Chat complete ✓' : 'Step →'}
          </button>
        </div>
      </div>

      {/* flow scene */}
      <div className={styles.scene}>
        <div className={styles.actor}>
          <div
            className={styles.you}
            style={{
              borderColor: kind === 'user' ? 'var(--accent)' : 'var(--node-idle-border)',
            }}
            aria-label="You"
          >
            <svg viewBox="0 0 24 24" width="54%" height="54%">
              <circle cx="12" cy="8.4" r="4.1" fill="var(--icon-stroke)" />
              <path d="M4.4 20.5a7.6 7.6 0 0 1 15.2 0Z" fill="var(--icon-stroke)" />
            </svg>
          </div>
          <div className={styles.actorLabel}>You</div>
        </div>

        <div className={styles.wire}>
          {!isThink && (
            <div
              className={styles.wireLine}
              style={{
                opacity: kind === 'user' || kind === 'asst' ? 1 : 0.25,
                backgroundImage: `repeating-linear-gradient(90deg, ${accent} 0 8px, transparent 8px 15px)`,
                animation:
                  kind === 'user'
                    ? 'dashR .7s linear infinite'
                    : kind === 'asst'
                      ? 'dashL .7s linear infinite'
                      : 'none',
              }}
            />
          )}
          {kind === 'user' && (
            <div className={styles.wireArrowR} style={{ borderLeftColor: accent }} />
          )}
          {kind === 'asst' && (
            <div className={styles.wireArrowL} style={{ borderRightColor: accent }} />
          )}
          {isThink && (
            <>
              {/* the model reasoning to and from itself, near the LLM */}
              <div className={`${styles.thinkLine} ${styles.thinkLineTop}`} />
              <div className={styles.thinkArrowIn} />
              <div className={`${styles.thinkLine} ${styles.thinkLineBottom}`} />
              <div className={styles.thinkArrowOut} />
            </>
          )}
          {chip && (
            <div className={isThink ? `${styles.chip} ${styles.chipMid}` : styles.chip}>
              <span className={styles.chipText} style={{ borderColor: accent }}>
                {chipIcon && <InlineIcon>{chipIcon}</InlineIcon>}
                {chip}
              </span>
            </div>
          )}
        </div>

        <div className={styles.actor}>
          <LlmNode
            size={60}
            ring={
              isThink
                ? 'color-mix(in srgb, var(--purple) 45%, transparent)'
                : 'transparent'
            }
          />
          <div
            className={styles.scratch}
            style={{
              color: isThink ? 'var(--purple)' : 'var(--node-idle-border)',
              borderColor: isThink ? 'var(--purple)' : 'var(--node-idle-border)',
              opacity: isThink ? 1 : 0.4,
            }}
          >
            <InlineIcon>
              <ThoughtIcon size={13} />
            </InlineIcon>
            scratchpad
          </div>
        </div>
      </div>

      <p className={styles.caption}>{ctx.caption}</p>

      {/* token meter */}
      <div className={styles.meterHead}>
        <span>Context window</span>
        <span style={{ color: meterColor(ctx.pct, ctx.over) }}>
          {ctx.used.toLocaleString()} / {ctx.cap.toLocaleString()} tokens · {ctx.pct}%
        </span>
      </div>
      <div className={styles.meterTrack}>
        <div
          className={styles.meterFill}
          style={{ width: `${ctx.pct}%`, background: meterColor(ctx.pct, ctx.over) }}
        />
      </div>

      {/* stacked context blocks */}
      <div className={styles.blocks}>
        {ctx.blocks.map((block, i) => (
          <ContextBlockRow key={i} block={block} />
        ))}
      </div>

      <p className={styles.footnote}>
        Every turn, this whole block is re-sent: the model is stateless and counts it all
        in <Term term="token">tokens</Term>.
      </p>
    </div>
  );
}
