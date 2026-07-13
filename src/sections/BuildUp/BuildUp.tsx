import { Section } from '../../components/Section/Section.tsx';
import { Tabs, type TabItem } from '../../components/Tabs/Tabs.tsx';
import text from '../../styles/text.module.css';
import { ConversationPanel } from './ConversationPanel.tsx';
import { ToolsPanel } from './ToolsPanel.tsx';
import { RagPanel } from './RagPanel.tsx';
import { OrchestrationPanel } from './OrchestrationPanel.tsx';
import styles from './BuildUp.module.css';

function Placeholder({ title }: { title: string }) {
  return (
    <div className={styles.placeholder}>
      <h3 className={text.h3}>{title}</h3>
      <p className={text.body}>This panel is coming next.</p>
    </div>
  );
}

const tabs: TabItem[] = [
  { id: 'chat', label: '1 · LLM chat', render: () => <ConversationPanel /> },
  { id: 'tools', label: '2 · Simple agent (tools)', render: () => <ToolsPanel /> },
  { id: 'rag', label: '3 · Retrieval (RAG)', render: () => <RagPanel /> },
  { id: 'orch', label: '4 · Orchestration', render: () => <OrchestrationPanel /> },
  {
    id: 'safety',
    label: '5 · Safety & limits',
    render: () => <Placeholder title="When the model gets it wrong" />,
  },
  {
    id: 'proto',
    label: '6 · Protocols',
    render: () => <Placeholder title="Getting agents to plug into everything" />,
  },
];

/** The tabbed walkthrough: a plain chat model grown into an agent, one capability per tab. */
export function BuildUp() {
  return (
    <Section label="How agents are built">
      <h2 className={text.h2}>From a chat box to a full agent</h2>
      <p className={text.lead}>
        Each tab adds capabilities. Switch between them to watch a plain chat model grow
        into an agent. Note that the model itself never changes, only the machinery
        wrapped around it.
      </p>
      <Tabs items={tabs} />
    </Section>
  );
}
