import type { ReactNode } from 'react';
import { Term } from '../../components/glossary/Term.tsx';
import { FlowDiagram, type FlowNode } from '../../components/FlowDiagram/FlowDiagram.tsx';
import {
  HarnessNode,
  IconNode,
  LlmFlowNode,
  UserNode,
} from '../../components/FlowDiagram/nodes.tsx';
import {
  BookIcon,
  BuildingIcon,
  CalendarIcon,
  FolderIcon,
  InlineIcon,
  LinkIcon,
  SearchIcon,
  WrenchIcon,
} from '../../components/FlowDiagram/icons.tsx';
import text from '../../styles/text.module.css';
import { RAG_REASONS, RAG_STEPS } from './ragData.ts';
import styles from './ToolsPanel.module.css';

const REASON_ICONS: Record<string, ReactNode> = {
  'Private knowledge': <BuildingIcon size={20} />,
  'Fresh & changing': <CalendarIcon size={20} />,
  'Grounded answers': <LinkIcon size={20} />,
};

const nodes: FlowNode[] = [
  {
    id: 'user',
    left: '8%',
    top: '34%',
    render: (active, color) => <UserNode active={active} color={color} />,
  },
  {
    id: 'harness',
    left: '38%',
    top: '34%',
    render: (active, color) => <HarnessNode active={active} color={color} />,
  },
  {
    id: 'llm',
    left: '72%',
    top: '34%',
    render: () => <LlmFlowNode sub="only writes text" />,
  },
  {
    id: 'kb',
    left: '38%',
    top: '84%',
    render: (active, color) => (
      <IconNode
        icon={<BookIcon />}
        label="Knowledge base"
        active={active}
        color={color}
      />
    ),
  },
];

/** Tab 3 — retrieval-augmented generation: grounding answers in your own documents. */
export function RagPanel() {
  return (
    <div className={styles.panel}>
      <h3 className={text.h3}>Giving the model your own knowledge</h3>
      <p className={text.lead}>
        The model only knows what it saw during training: nothing about your company, your
        documents, or anything newer than its cutoff. <b>RAG</b> (Retrieval-Augmented
        Generation) fixes that without retraining. Before the model answers, the harness
        looks up relevant passages from a <Term term="kb">knowledge base</Term> and pastes
        them into the prompt, so the answer is <Term term="grounding">grounded</Term> in
        real material instead of memory.
      </p>

      <div className={text.eyebrow}>Why bring your own knowledge</div>
      <div className={styles.examples}>
        {RAG_REASONS.map((r) => (
          <div key={r.name} className={styles.example}>
            <div className={styles.exampleIcon}>{REASON_ICONS[r.name]}</div>
            <div className={styles.exampleName}>{r.name}</div>
            <div className={styles.exampleDesc}>{r.desc}</div>
          </div>
        ))}
      </div>

      <p className={text.small}>
        The knowledge base is prepared ahead of time: documents are split into small
        chunks and each is turned into an <Term term="embedding">embedding</Term>, a list
        of numbers capturing its meaning, so the harness can later find the chunks closest
        to a question. Step through a lookup.
      </p>

      <FlowDiagram
        title={
          <>
            <InlineIcon>
              <SearchIcon size={16} />
            </InlineIcon>
            Anatomy of a retrieval
          </>
        }
        nodes={nodes}
        steps={RAG_STEPS}
        sceneHeight={235}
      />

      <div className={styles.aside}>
        <div className={styles.asideTitle}>
          <InlineIcon>
            <WrenchIcon size={16} />
          </InlineIcon>
          Isn’t this just a tool?
        </div>
        <p>
          Good eye, the shape is identical: the harness fetches something and folds it
          into the prompt. The difference is who decides. In classic RAG the harness{' '}
          <em>always</em> retrieves first, automatically, before the model even runs. When
          search is offered as a <em>tool</em>, the model chooses whether and what to look
          up. Modern agents often blend both.
        </p>
      </div>

      <div className={styles.aside}>
        <div className={styles.asideTitle}>
          <InlineIcon>
            <FolderIcon size={16} />
          </InlineIcon>
          Why a vector store?
        </div>
        <p>
          It doesn’t have to be. A plain keyword search for “refund policy” misses a
          passage that says “returns accepted within 30 days.” Embeddings turn text into
          numbers that capture <em>meaning</em>, so the store can find passages that are
          close in intent even when they share no words.
        </p>
      </div>
    </div>
  );
}
