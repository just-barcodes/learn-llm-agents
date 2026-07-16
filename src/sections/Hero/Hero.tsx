import { useLayoutEffect, useRef } from 'react';
import { Term } from '../../components/glossary/Term.tsx';
import { LlmGlyph } from '../../components/FlowDiagram/icons.tsx';
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

// Where the token train sits at progress 0 (mouth empty) and progress 1 (the
// end-of-prompt/stop badge docked at the model). Both are pure pixel offsets
// derived from a single cached measurement, so the resting point never drifts.
type Geom = { start: number; stop: number };

/** Measure a track: full content width, viewport width, and the badge width. */
function measure(track: HTMLElement, dockAtRight: boolean): Geom {
  const viewport = track.parentElement?.clientWidth ?? 0;
  const width = track.scrollWidth;
  const badge = track.querySelector<HTMLElement>('[data-badge]');
  const badgeW = badge?.offsetWidth ?? 0;
  // Both trains start fully off to the left with the model's mouth empty.
  // At the end the badge docks flush against the model: on the right edge for
  // the inbound stream, on the left edge (offset 0) for the outbound stream.
  return { start: -width, stop: dockAtRight ? viewport - badgeW : 0 };
}

function setFlow(el: HTMLElement, x: number, bright: boolean, tween: string) {
  el.style.transition = tween;
  el.style.transform = `translateX(${x}px)`;
  el.style.opacity = bright ? '1' : '0.2';
}

export function Hero() {
  const maxN = PROMPT.length + GAP + COMPLETION.length;
  const n = useTicker(TICK_MS, maxN + 26);

  const inRef = useRef<HTMLDivElement>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const prevN = useRef<number | null>(null);
  const geomIn = useRef<Geom | null>(null);
  const geomOut = useRef<Geom | null>(null);

  const inputPhase = n <= PROMPT.length + GAP;
  const pIn = clamp01(n / PROMPT.length);
  const pOut = clamp01((n - PROMPT.length - GAP) / COMPLETION.length);

  // Measure once on mount, and again whenever layout (or font loading) changes
  // the track width — so the flow's stop point is stable across every loop.
  useLayoutEffect(() => {
    const remeasure = () => {
      if (inRef.current) geomIn.current = measure(inRef.current, true);
      if (outRef.current) geomOut.current = measure(outRef.current, false);
    };
    remeasure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(remeasure);
    for (const el of [inRef.current, outRef.current]) {
      if (el) {
        ro.observe(el);
        if (el.parentElement) ro.observe(el.parentElement);
      }
    }
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    // Skip the transform tween on the wrap-around back to the start.
    const wrapped = prevN.current != null && n < prevN.current;
    prevN.current = n;
    const tween = wrapped ? 'opacity .4s' : `transform ${TICK_MS}ms linear, opacity .4s`;
    if (inRef.current && geomIn.current) {
      const { start, stop } = geomIn.current;
      setFlow(inRef.current, start + pIn * (stop - start), inputPhase, tween);
    }
    if (outRef.current && geomOut.current) {
      const { start, stop } = geomOut.current;
      setFlow(outRef.current, start + pOut * (stop - start), !inputPhase, tween);
    }
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
                <span data-badge className={`${styles.badge} ${styles.badgeIn}`}>
                  ⏎ end of prompt
                </span>
                {IN_TOKENS.map((t, i) => (
                  <span key={i} className={`${styles.token} ${styles.tokenIn}`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.llm} aria-label="LLM">
            <LlmGlyph size={30} fill="var(--accent-ink)" className={styles.llmIcon} />
            <span className={styles.llmLabel}>LLM</span>
          </div>

          <div className={`${styles.stream} ${styles.streamOut}`}>
            <div ref={outRef} className={styles.track}>
              <div className={styles.tokens}>
                <span data-badge className={`${styles.badge} ${styles.badgeOut}`}>
                  ■ &lt;end&gt; token · stop
                </span>
                {OUT_TOKENS.map((t, i) => (
                  <span key={i} className={`${styles.token} ${styles.tokenOut}`}>
                    {t}
                  </span>
                ))}
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
