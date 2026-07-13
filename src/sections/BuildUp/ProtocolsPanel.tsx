import { Term } from '../../components/glossary/Term.tsx';
import text from '../../styles/text.module.css';
import panel from './ToolsPanel.module.css';
import { RELATED_STANDARDS } from './protocolsData.ts';
import styles from './ProtocolsPanel.module.css';

/** Tab 6 — the open protocols (MCP, A2A) that let agents plug into everything. */
export function ProtocolsPanel() {
  return (
    <div className={panel.panel}>
      <h3 className={text.h3}>Getting agents to plug into everything</h3>
      <p className={text.body}>
        Once every team builds tools and agents their own way, connecting them becomes an
        N×N mess. A handful of open protocols fix that with shared plugs, so any agent can
        reach any tool, and any agent can talk to any other.
      </p>

      <div className={styles.protocols}>
        <div className={styles.protocol}>
          <div className={styles.protocolTitle} style={{ color: 'var(--accent)' }}>
            🔌 <Term term="mcp">MCP</Term> · agent ↔ tools
          </div>
          <div className={styles.protocolMeta}>
            Model Context Protocol · Anthropic, 2024
          </div>
          <p className={styles.protocolBody}>
            One standard way for a tool or data source to describe itself to any agent,
            like USB-C for tools. An <b>MCP server</b> exposes its tools, resources, and
            prompts; the agent (the client) discovers and calls them without custom glue
            for each one.
          </p>
          <p className={styles.protocolNote}>
            Solves the M×N problem: wrap a service as an MCP server once, and every
            MCP-aware agent can use it.
          </p>
        </div>

        <div className={styles.protocol}>
          <div className={styles.protocolTitle} style={{ color: 'var(--purple)' }}>
            🤝 <Term term="a2a">A2A</Term> · agent ↔ agent
          </div>
          <div className={styles.protocolMeta}>Agent2Agent · Google, 2025</div>
          <p className={styles.protocolBody}>
            A standard for agents built by <em>different</em> teams or vendors to work
            together: publish a skill card, discover each other, hand off a task, and
            exchange results over plain HTTP/JSON, without sharing code or memory.
          </p>
          <p className={styles.protocolNote}>
            Where MCP hooks an agent up to tools, A2A lets one agent delegate to another
            as a peer.
          </p>
        </div>
      </div>

      <div className={panel.aside} style={{ marginTop: 0, marginBottom: 26 }}>
        <div className={panel.asideTitle}>🧭 One line to remember them by</div>
        <p>
          <b>MCP</b> connects an agent <em>down</em> to its tools and data; <b>A2A</b>{' '}
          connects an agent <em>across</em> to other agents. They are complementary, a
          single system often speaks both at once.
        </p>
      </div>

      <h4 className={text.h4}>Related standards you’ll bump into</h4>
      <div className={styles.related}>
        {RELATED_STANDARDS.map((s) => (
          <div key={s.name} className={panel.example}>
            <div className={panel.exampleIcon}>{s.icon}</div>
            <div className={panel.exampleName}>{s.name}</div>
            <div className={panel.exampleDesc}>{s.desc}</div>
          </div>
        ))}
      </div>

      <div className={panel.aside} style={{ marginTop: 0 }}>
        <div className={panel.asideTitle} style={{ color: 'var(--accent)' }}>
          ⚠️ Still early days
        </div>
        <p>
          These protocols are young and moving fast, adoption, security models, and even
          the specs are still shifting. The idea is durable even if the names change:
          agents need shared plugs, for tools and for each other, and underneath every one
          of them the traffic is still just text.
        </p>
      </div>
    </div>
  );
}
