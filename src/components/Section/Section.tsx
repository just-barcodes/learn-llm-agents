import styles from './Section.module.css';

interface SectionProps {
  label?: string;
  children: React.ReactNode;
}

/** The shared centered content column used by every page section. */
export function Section({ label, children }: SectionProps) {
  return (
    <section className={styles.section} aria-label={label}>
      {children}
    </section>
  );
}
