import { useRef, useState } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  /** Rendered lazily so only the active panel mounts. */
  render: () => React.ReactNode;
}

/**
 * An accessible tabbed panel (WAI-ARIA tabs pattern) with roving-tabindex
 * arrow-key navigation. Only the selected panel is mounted.
 */
export function Tabs({ items, initial = 0 }: { items: TabItem[]; initial?: number }) {
  const [active, setActive] = useState(initial);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function focusTab(index: number) {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') focusTab(active + 1);
    else if (e.key === 'ArrowLeft') focusTab(active - 1);
    else if (e.key === 'Home') focusTab(0);
    else if (e.key === 'End') focusTab(items.length - 1);
    else return;
    e.preventDefault();
  }

  const current = items[active];

  return (
    <>
      <div role="tablist" className={styles.tablist}>
        {items.map((item, i) => (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${item.id}`}
            tabIndex={i === active ? 0 : -1}
            className={i === active ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        tabIndex={0}
      >
        {current.render()}
      </div>
    </>
  );
}
