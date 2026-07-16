import type { FlowStep } from '../../components/FlowDiagram/FlowDiagram.tsx';
import { LEG } from './flowLegs.ts';

export interface SafeStep extends FlowStep {
  verdict?: string;
  verdictBg?: string;
  verdictBorder?: string;
  verdictFg?: string;
  verdictLeft?: string;
  verdictTop?: string;
  human?: 'pending' | 'approved';
}

// This panel's nodes sit on the same 34% row as the tools/RAG panels, so its
// connectors are the shared flowLegs geometries.
const OUT = { R: LEG.userR, L: LEG.userL };
const LLMC = { L: LEG.llmL, R: LEG.llmR };
const RES_D = LEG.vertD;

export const SAFE_STEPS: SafeStep[] = [
  {
    label: '1 · you send a prompt',
    color: 'var(--fg-muted)',
    dir: 'R',
    connector: OUT.R,
    chip: {
      text: '"Email all 40k customers a 90%-off coupon"',
      left: '23%',
      top: '10%',
      bg: 'var(--chip-neutral-bg)',
      border: 'var(--chip-neutral-border)',
      fg: 'var(--chip-neutral-fg)',
      wrap: true,
    },
    raw: 'user: "Email all 40,000 customers a 90% off coupon."',
    note: 'The prompt reaches the harness first. Before the model is called, it passes the input guard.',
    highlight: ['you', 'harness'],
  },
  {
    label: '2 · input guardrail checks it',
    color: 'var(--green-soft)',
    dir: 'R',
    chip: {
      text: 'scanning the prompt…',
      left: '23%',
      top: '10%',
      bg: 'var(--chip-green-bg)',
      border: 'var(--green)',
      fg: 'var(--chip-green-fg)',
      wrap: true,
    },
    verdict: '✓ no jailbreak, no leaked secrets — allowed',
    verdictBg: 'var(--chip-green-bg)',
    verdictBorder: 'var(--green)',
    verdictFg: 'var(--chip-green-fg)',
    verdictLeft: '23%',
    verdictTop: '60%',
    raw: 'input_filter(prompt)\n→ { jailbreak:false, pii:false, allow:true }',
    note: 'The harness runs a classifier on the prompt, blocking prompt-injection, secrets, or off-limits topics before the model is even called.',
    highlight: ['inguard', 'harness'],
  },
  {
    label: '3 · model drafts a reply',
    color: 'var(--accent)',
    dir: 'R',
    connector: LLMC.R,
    chip: {
      text: 'model: "Sure — sending to all 40,000 now."',
      left: '55%',
      top: '10%',
      bg: 'var(--chip-accent-bg)',
      border: 'var(--accent)',
      fg: 'var(--chip-accent-fg)',
      wrap: true,
    },
    raw: '{ "role":"assistant",\n  "content":"Sure — sending to all 40,000 now.",\n  "tool_use":"send_email" }',
    note: 'The harness forwards the cleared prompt to the model, which drafts a reply, complying without any sense of the cost.',
    highlight: ['llm', 'harness'],
  },
  {
    label: '4 · output guardrail checks the reply',
    color: 'var(--coral)',
    dir: 'L',
    connector: LLMC.L,
    chip: {
      text: 'scanning the response…',
      left: '55%',
      top: '10%',
      bg: 'var(--chip-coral-bg)',
      border: 'var(--coral)',
      fg: 'var(--chip-coral-fg)',
      wrap: true,
    },
    verdict: '⚠ bulk email + steep discount — flag for sign-off',
    verdictBg: 'var(--chip-coral-bg)',
    verdictBorder: 'var(--coral)',
    verdictFg: 'var(--chip-coral-fg)',
    verdictLeft: '55%',
    verdictTop: '60%',
    raw: 'output_filter(reply)\n→ { policy_ok:true, high_impact:true,\n    needs_human:true }',
    note: 'On the way back, the reply passes the output guard: it checks for leaked data, off-policy content, or a high-impact action that must not run unattended.',
    highlight: ['outguard', 'llm', 'harness'],
  },
  {
    label: '5 · the tool asks for approval',
    color: 'var(--accent)',
    dir: 'D',
    connector: RES_D,
    chip: {
      text: 'send_email(40,000 recipients)',
      left: '58%',
      top: '61%',
      bg: 'var(--chip-accent-bg)',
      border: 'var(--accent)',
      fg: 'var(--chip-accent-fg)',
      wrap: true,
    },
    verdict: '✋ waiting for your approval…',
    verdictBg: 'var(--chip-accent-bg)',
    verdictBorder: 'var(--accent)',
    verdictFg: 'var(--chip-accent-fg)',
    verdictLeft: '63%',
    verdictTop: '72%',
    human: 'pending',
    raw: 'tool_use: send_email(\n  to=<40,000>, body="90% off")\n⏸ paused — awaiting human OK',
    note: 'The harness is set up to not send emails on its own: it pauses and hands control to a person.',
    highlight: ['action', 'harness'],
  },
  {
    label: '6 · you approve → it runs',
    color: 'var(--green)',
    dir: 'R',
    chip: {
      text: '✅ approved by you',
      left: '63%',
      top: '10%',
      bg: 'var(--chip-green-bg)',
      border: 'var(--green)',
      fg: 'var(--chip-green-fg)',
      wrap: true,
    },
    verdict: '✅ approved — emails sent, logged for audit',
    verdictBg: 'var(--chip-green-bg)',
    verdictBorder: 'var(--green)',
    verdictFg: 'var(--chip-green-fg)',
    verdictLeft: '63%',
    verdictTop: '72%',
    human: 'approved',
    raw: 'human_approval: GRANTED\n→ send_email executed · 40,000 sent',
    note: "With a human's sign-off recorded, the harness runs the tool. Guardrails don't remove capability, they put a checkpoint where the stakes are highest.",
    highlight: ['action', 'harness'],
  },
  {
    label: '7 · it reports back to you',
    color: 'var(--green-soft)',
    dir: 'L',
    connector: OUT.L,
    chip: {
      text: '"Done — coupon emailed to all 40,000 customers."',
      left: '23%',
      top: '10%',
      bg: 'var(--chip-green-strong-bg)',
      border: 'var(--green)',
      fg: 'var(--chip-green-fg)',
      wrap: true,
    },
    raw: 'assistant: "Done. With your approval, I emailed\nthe 90% off coupon to all 40,000 customers."',
    note: 'Only after the guarded, approved action runs does the agent report the result back to you, plain text again, as always.',
    highlight: ['you', 'harness'],
  },
];
