export interface RelatedStandard {
  name: string;
  desc: string;
}

export const RELATED_STANDARDS: RelatedStandard[] = [
  {
    name: 'Tool / function-calling schemas',
    desc: 'Each model API defines a JSON shape for declaring tools and emitting tool_use calls, the low-level format MCP builds on.',
  },
  {
    name: 'OpenAPI',
    desc: 'The long-standing way REST APIs describe themselves. MCP servers often just wrap an existing OpenAPI service.',
  },
  {
    name: 'Agent Cards',
    desc: "A2A's discovery document: a public JSON file where an agent advertises its skills, endpoints, and auth so others can find it.",
  },
];
