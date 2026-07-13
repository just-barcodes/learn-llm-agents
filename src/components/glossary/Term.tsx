import type { TermKey } from '../../data/glossary.ts';
import { useGlossary } from './GlossaryContext.ts';
import styles from './glossary.module.css';

interface TermProps {
  term: TermKey;
  children: React.ReactNode;
}

/**
 * An inline term with a dotted underline that reveals its glossary definition
 * on hover or keyboard focus.
 */
export function Term({ term, children }: TermProps) {
  const glossary = useGlossary();

  return (
    <span
      tabIndex={0}
      className={styles.term}
      onMouseEnter={(e) => glossary.show(term, e.clientX, e.clientY)}
      onMouseMove={(e) => glossary.show(term, e.clientX, e.clientY)}
      onMouseLeave={() => glossary.hide()}
      onFocus={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        glossary.show(term, r.left, r.bottom);
      }}
      onBlur={() => glossary.hide()}
    >
      {children}
    </span>
  );
}
