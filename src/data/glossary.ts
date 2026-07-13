/**
 * Glossary of terms surfaced as hover tooltips throughout the page.
 * Keyed by a short slug used in <Term term="…"> markers.
 */
export interface GlossaryEntry {
  title: string;
  definition: string;
}

export const glossary = {
  llm: {
    title: 'LLM · Large Language Model',
    definition:
      'A program trained on huge amounts of text to predict the next word. It reads text and writes text. That is its entire interface with the world.',
  },
  prompt: {
    title: 'Prompt',
    definition:
      "The block of text handed to the model: instructions, the conversation so far, retrieved notes, tool results. Everything it will 'know' for this one reply.",
  },
  completion: {
    title: 'Completion',
    definition:
      'The text the model writes back, one token at a time, in response to the prompt. It is nothing more than the model’s predicted continuation of the text it was given.',
  },
  sysprompt: {
    title: 'System prompt',
    definition:
      'The builder’s standing instructions, invisibly attached to the top of every request: who the agent is, what its job is, what rules it must follow.',
  },
  context: {
    title: 'Context window',
    definition:
      'The maximum amount of text the model can consider at once (the length of the letter). Anything beyond it must be summarized, retrieved on demand, or lost.',
  },
  token: {
    title: 'Token',
    definition:
      'The unit models actually read and write, roughly 4 characters or three quarters of a word. Pricing, speed, and context limits are all counted in tokens.',
  },
  multiagent: {
    title: 'Multi-agent system',
    definition:
      'Several agents working together on one job, a researcher, a writer, a checker. They can be wired up as tools, as a fixed pipeline, or coordinated by a manager agent.',
  },
  kb: {
    title: 'Knowledge base',
    definition:
      'Your own documents, prepared for lookup: wikis, manuals, tickets, contracts. Split into chunks and stored so the harness can fetch the relevant bits on demand.',
  },
  grounding: {
    title: 'Grounding',
    definition:
      'Tying the model’s answer to real, supplied material, retrieved passages or tool results, rather than its trained-in memory. A grounded reply can quote and cite its sources, which makes it far less likely to make things up.',
  },
  embedding: {
    title: 'Embedding',
    definition:
      "A list of numbers that captures the meaning of a piece of text. Texts with similar meaning get similar numbers, which is how the harness finds passages 'close' to a question.",
  },
  hallucination: {
    title: 'Hallucination',
    definition:
      'When the model writes something confident and false. It isn’t lying; it predicts plausible text, and plausible is not always true. Grounding it in retrieved documents and tool results is the main cure.',
  },
  mcp: {
    title: 'MCP · Model Context Protocol',
    definition:
      'An open standard (Anthropic, 2024) that lets any tool or data source describe itself to any agent the same way, like USB-C for tools. Servers expose tools, resources, and prompts over JSON-RPC; the agent discovers and calls them uniformly.',
  },
  a2a: {
    title: 'A2A · Agent2Agent',
    definition:
      'An open protocol (Google, 2025) for agents built by different teams or vendors to talk to each other: discover one another’s skills, hand off tasks, and exchange results over HTTP/JSON. Where MCP connects an agent to tools, A2A connects agents to agents.',
  },
  guardrails: {
    title: 'Guardrails',
    definition:
      'The rules of the building: what the agent may never do, which actions need a human sign-off, what gets filtered. Built in layers, from system-prompt policy to sandboxes and human-in-the-loop for irreversible actions.',
  },
  evals: {
    title: 'Evals',
    definition:
      "A set of realistic test tasks you run over and over, scoring the results, to know whether the agent actually works. 'It seemed fine when I tried it' does not scale.",
  },
} as const satisfies Record<string, GlossaryEntry>;

export type TermKey = keyof typeof glossary;
