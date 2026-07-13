import { Term } from '../../components/glossary/Term.tsx';
import text from '../../styles/text.module.css';
import { ContextWindowDemo } from './ContextWindowDemo.tsx';
import styles from './ConversationPanel.module.css';

/** Tab 1 — a plain chat model: system prompt, context, and the growing window. */
export function ConversationPanel() {
  return (
    <div className={styles.panel}>
      <h3 className={text.h3}>It’s just a conversation</h3>
      <p className={text.body}>
        At its simplest, using an LLM is passing text back and forth. But every message
        you send is quietly wrapped in two invisible things: a{' '}
        <Term term="sysprompt">system prompt</Term> and the{' '}
        <Term term="context">context</Term> so far.
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>📜 The system prompt</div>
          <p className={styles.cardBody}>
            The builder’s standing instructions, silently pinned to the top of every
            message: who the assistant is, what its job is, the rules it follows, the tone
            it takes. You never see it, but it shapes every reply, and it is the main
            steering wheel a builder has.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>🪟 The context</div>
          <p className={styles.cardBody}>
            Everything the model can see at once: the system prompt plus the whole
            conversation so far. The model is stateless, so this entire context is re-sent
            every single turn, and it has a hard size limit counted in{' '}
            <Term term="token">tokens</Term>. Run past it and the oldest text must be
            dropped or summarized.
          </p>
        </div>
      </div>

      <h4 className={text.h4}>The context window fills up as you talk</h4>
      <p className={text.body}>
        Everything, the system prompt, each question, and every reply, piles into one
        growing block of text that is re-sent in full every turn. Toggle thinking on to
        watch it fill faster, and keep stepping to add more turns.
      </p>

      <ContextWindowDemo />

      <div className={styles.note}>
        <p>
          <b>
            “Thinking” just means the model writes more of its own text to itself before
            it commits to an answer. Either way, the model returns text.
          </b>
        </p>
        <p>
          That is why, from here on, it barely matters whether the model is a “thinking”
          one. Tool calls, retrieval, and the agent loop all work identically for both.
          The one place the difference shows up is on genuinely hard reasoning, where the
          private scratch-work catches mistakes a snap answer would miss.
        </p>
      </div>
    </div>
  );
}
