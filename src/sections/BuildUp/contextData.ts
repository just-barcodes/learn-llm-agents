export type BlockKind = 'sys' | 'user' | 'asst' | 'think';

export interface ContextBlock {
  kind: BlockKind;
  tag: string;
  tok: number;
  text: string;
}

/** The plain conversation (no visible reasoning). */
export const CONTEXT_PLAIN: ContextBlock[] = [
  {
    kind: 'sys',
    tag: '⚙ System prompt',
    tok: 300,
    text: '"You are a concise travel helper. Prefer trains and ferries, be brief."',
  },
  { kind: 'user', tag: 'You', tok: 40, text: '"Fly or drive to Basel?"' },
  {
    kind: 'asst',
    tag: 'Assistant',
    tok: 60,
    text: '"Drive — about 3h door to door vs ~4h once you count airports."',
  },
  { kind: 'user', tag: 'You', tok: 40, text: '"What about with a lot of luggage?"' },
  {
    kind: 'asst',
    tag: 'Assistant',
    tok: 60,
    text: '"Still drive — more boot space, no bag limits."',
  },
  { kind: 'user', tag: 'You', tok: 40, text: '"Is that drive scenic?"' },
  {
    kind: 'asst',
    tag: 'Assistant',
    tok: 60,
    text: '"Very — the Rhine valley stretch is a highlight."',
  },
];

/** The same conversation, with the model's hidden reasoning interleaved. */
export const CONTEXT_THINKING: ContextBlock[] = [
  {
    kind: 'sys',
    tag: '⚙ System prompt',
    tok: 300,
    text: '"You are a concise travel helper. Prefer trains and ferries, be brief."',
  },
  { kind: 'user', tag: 'You', tok: 40, text: '"Fly or drive to Basel?"' },
  {
    kind: 'think',
    tag: 'Thinking · hidden',
    tok: 220,
    text: 'weighs 1h flight + airport transfers vs ~3h drive door-to-door…',
  },
  {
    kind: 'asst',
    tag: 'Assistant',
    tok: 60,
    text: '"Drive — about 3h door to door vs ~4h once you count airports."',
  },
  { kind: 'user', tag: 'You', tok: 40, text: '"What about with a lot of luggage?"' },
  {
    kind: 'think',
    tag: 'Thinking · hidden',
    tok: 240,
    text: 'compares bag limits, boot capacity, cost of extra checked bags…',
  },
  {
    kind: 'asst',
    tag: 'Assistant',
    tok: 60,
    text: '"Still drive — more boot space, no bag limits."',
  },
  { kind: 'user', tag: 'You', tok: 40, text: '"Is that drive scenic?"' },
  {
    kind: 'think',
    tag: 'Thinking · hidden',
    tok: 230,
    text: 'recalls the Rhine valley route and its viewpoints…',
  },
  {
    kind: 'asst',
    tag: 'Assistant',
    tok: 60,
    text: '"Very — the Rhine valley stretch is a highlight."',
  },
];

export const CONTEXT_CAP = 1200;

export const KIND_CAPTION: Record<BlockKind, string> = {
  sys: "Before you type a word, the builder's system prompt is already sitting in the context.",
  user: 'Your message is appended to the end. The context grows.',
  think:
    'Private scratch-work counts against the window too, even though you never see it.',
  asst: 'The reply is appended. Next turn, this entire block is re-sent to the model, which remembers nothing on its own.',
};

export const OVERFLOW_CAPTION =
  'Context window full — the earliest turns must now be dropped or summarized to make room.';
