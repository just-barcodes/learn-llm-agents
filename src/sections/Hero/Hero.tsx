import { useLayoutEffect, useRef } from 'react';
import { Term } from '../../components/glossary/Term.tsx';
import { useTicker } from '../../hooks/useTicker.ts';
import styles from './Hero.module.css';

// The prompt is typed in, then (after a short gap) the completion is typed out.
const PROMPT = 'what should I pack for Basel in May';
const COMPLETION = 'pack light layers and bring a small umbrella';
const GAP = 12; // ticks between finishing the prompt and starting the completion
const TICK_MS = 95;

// Tokens shown streaming into / out of the model (order reads right-to-left as
// they scroll, matching the spoken prompt/completion).
const IN_TOKENS = ['May', 'in', 'Basel', 'for', 'pack', 'I', 'should', 'what'];
const OUT_TOKENS = ['umbrella', 'small', 'a', 'bring', 'and', 'layers', 'light', 'pack'];

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/** Slide a token stream so its end aligns with the model as progress hits 1. */
function applyFlow(
  el: HTMLElement | null,
  progress: number,
  bright: boolean,
  tween: string,
) {
  if (!el || !el.parentElement) return;
  const overflow = Math.max(0, el.scrollWidth - el.parentElement.clientWidth);
  el.style.transition = tween;
  el.style.transform = `translateX(${(progress - 1) * overflow}px)`;
  el.style.opacity = bright ? '1' : '0.2';
}

export function Hero() {
  const maxN = PROMPT.length + GAP + COMPLETION.length;
  const n = useTicker(TICK_MS, maxN + 26);

  const inRef = useRef<HTMLDivElement>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const prevN = useRef<number | null>(null);

  const inputPhase = n <= PROMPT.length + GAP;
  const pIn = clamp01(n / PROMPT.length);
  const pOut = clamp01((n - PROMPT.length - GAP) / COMPLETION.length);

  useLayoutEffect(() => {
    // Skip the transform tween on the wrap-around back to the start.
    const wrapped = prevN.current != null && n < prevN.current;
    prevN.current = n;
    const tween = wrapped ? 'opacity .4s' : 'transform 95ms linear, opacity .4s';
    applyFlow(inRef.current, pIn, inputPhase, tween);
    applyFlow(outRef.current, pOut, !inputPhase, tween);
  }, [n, pIn, pOut, inputPhase]);

  const typedIn = PROMPT.slice(0, Math.min(n, PROMPT.length));
  const typedOut = COMPLETION.slice(
    0,
    Math.max(0, Math.min(n - PROMPT.length - GAP, COMPLETION.length)),
  );

  return (
    <header className={styles.hero}>
      <h1 className={styles.title}>What is an AI agent?</h1>
      <p className={styles.intro}>
        An agent is a large language model (LLM) plus some software around it. The
        language model does exactly one thing: it reads text and writes text. Software
        such as “tools” is built around that.
      </p>

      <div className={styles.core}>
        <div className={styles.flowRow}>
          <div className={`${styles.stream} ${styles.streamIn}`}>
            <div ref={inRef} className={styles.track}>
              <div className={styles.tokens}>
                {IN_TOKENS.map((t, i) => (
                  <span key={i} className={`${styles.token} ${styles.tokenIn}`}>
                    {t}
                  </span>
                ))}
                <span className={`${styles.badge} ${styles.badgeIn}`}>
                  ⏎ end of prompt
                </span>
              </div>
            </div>
          </div>

          <div className={styles.llm} aria-label="LLM">
            <svg viewBox="0 0 24 24" width="30" height="30" className={styles.llmIcon}>
              <g fill="var(--accent-ink)">
                <rect x="5" y="6.5" width="14" height="2.3" rx="1.15" />
                <rect x="5" y="10.85" width="14" height="2.3" rx="1.15" />
                <rect x="5" y="15.2" width="8.5" height="2.3" rx="1.15" />
              </g>
            </svg>
            <span className={styles.llmLabel}>LLM</span>
          </div>

          <div className={`${styles.stream} ${styles.streamOut}`}>
            <div ref={outRef} className={styles.track}>
              <div className={styles.tokens}>
                {OUT_TOKENS.map((t, i) => (
                  <span key={i} className={`${styles.token} ${styles.tokenOut}`}>
                    {t}
                  </span>
                ))}
                <span className={`${styles.badge} ${styles.badgeOut}`}>
                  ■ &lt;end&gt; token · stop
                </span>
                <span aria-hidden="true" className={styles.spacer} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.readout}>
          <div className={styles.readoutRow}>
            <span className={styles.readoutLabel}>
              <Term term="prompt">
                <span className={styles.readoutLabelTerm}>Prompt in</span>
              </Term>
            </span>
            <span className={`${styles.readoutValue} ${styles.valueIn}`}>
              {typedIn}
              {inputPhase && <span className={styles.caret}>▋</span>}
            </span>
          </div>
          <div className={styles.readoutRow}>
            <span className={styles.readoutLabel}>
              <Term term="completion">
                <span className={styles.readoutLabelTerm}>Completion</span>
              </Term>
            </span>
            <span className={`${styles.readoutValue} ${styles.valueOut}`}>
              {typedOut}
              {!inputPhase && <span className={styles.caret}>▋</span>}
            </span>
          </div>
        </div>
      </div>

      <p className={styles.hint}>
        Dotted <Term term="llm">terms</Term> show a definition when you hover them.
      </p>
    </header>
  );
}
