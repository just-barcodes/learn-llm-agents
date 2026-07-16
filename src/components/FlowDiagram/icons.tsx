/** Line-art icons, matching the hand-drawn stroke style of the flow nodes. */
const STROKE = 'var(--icon-stroke)';
const FILL_BG = 'var(--node-bg)';

function Svg({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={STROKE}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/** Small inline wrapper so an icon sits neatly before a line of text. */
export function InlineIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        verticalAlign: '-0.22em',
        marginRight: 7,
      }}
    >
      {children}
    </span>
  );
}

/** The three-bar "LLM" glyph, shared by the hero and every LLM node. */
export function LlmGlyph({
  size,
  fill = 'var(--accent)',
  className,
}: {
  size: number;
  fill?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <g fill={fill}>
        <rect x="5" y="6.5" width="14" height="2.3" rx="1.15" />
        <rect x="5" y="10.85" width="14" height="2.3" rx="1.15" />
        <rect x="5" y="15.2" width="8.5" height="2.3" rx="1.15" />
      </g>
    </svg>
  );
}

/** The "You" avatar glyph, shared by the flow nodes and the context demo. */
export function UserGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="54%" height="54%">
      <circle cx="12" cy="8.4" r="4.1" fill="var(--icon-stroke)" />
      <path d="M4.4 20.5a7.6 7.6 0 0 1 15.2 0Z" fill="var(--icon-stroke)" />
    </svg>
  );
}

/** Web search — a globe with meridians. */
export function GlobeIcon({ size = 26 }: { size?: number }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="3.7" ry="8.5" />
      <line x1="3.5" y1="12" x2="20.5" y2="12" />
      <path d="M5 7.4 C8 9 16 9 19 7.4" />
      <path d="M5 16.6 C8 15 16 15 19 16.6" />
    </Svg>
  );
}

/** Knowledge base — a stack of documents. */
export function BookIcon({ size = 26 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="4" y="5.5" width="16" height="4" rx="1.2" />
      <rect x="4" y="11" width="16" height="4" rx="1.2" />
      <rect x="4" y="16.5" width="16" height="4" rx="1.2" />
      <line x1="7" y1="7.5" x2="9.5" y2="7.5" />
      <line x1="7" y1="13" x2="9.5" y2="13" />
      <line x1="7" y1="18.5" x2="9.5" y2="18.5" />
    </Svg>
  );
}

/** Sub-agent — a small robot head. */
export function RobotIcon({ size = 26 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="4.5" y="8" width="15" height="11" rx="2.6" />
      <line x1="12" y1="4.4" x2="12" y2="8" />
      <circle cx="12" cy="3.6" r="1.3" />
      <circle cx="9.4" cy="13" r="1.1" fill={STROKE} stroke="none" />
      <circle cx="14.6" cy="13" r="1.1" fill={STROKE} stroke="none" />
      <line x1="9.5" y1="16.3" x2="14.5" y2="16.3" />
    </Svg>
  );
}

/** Email — an envelope. */
export function EnvelopeIcon({ size = 26 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M4 7.4 L12 12.6 L20 7.4" />
    </Svg>
  );
}

/** Input guard — a shield with a check. */
export function ShieldIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M12 3 L19 6 V11 C19 15.9 15.6 18.9 12 21 C8.4 18.9 5 15.9 5 11 V6 Z" />
      <path d="M9 11.6 L11.3 13.9 L15.2 9.4" />
    </Svg>
  );
}

/** Output guard / retrieval — a magnifier. */
export function SearchIcon({ size = 22 }: { size?: number }) {
  return (
    <Svg size={size}>
      <circle cx="10.5" cy="10.5" r="6" />
      <line x1="14.9" y1="14.9" x2="20" y2="20" />
    </Svg>
  );
}

/** The harness's resources — a toolbox. */
export function ToolboxIcon({ size = 26 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="3.5" y="8.5" width="17" height="10" rx="2" />
      <path d="M9 8.5 V6.8 C9 5.9 9.7 5.3 10.5 5.3 H13.5 C14.3 5.3 15 5.9 15 6.8 V8.5" />
      <line x1="3.5" y1="12.5" x2="20.5" y2="12.5" />
      <rect x="10.5" y="11" width="3" height="3" rx="0.8" fill={FILL_BG} />
    </Svg>
  );
}

/** System prompt — a scroll of instructions. */
export function ScrollIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M7 4 H17 A2 2 0 0 1 19 6 V18 A2 2 0 0 0 21 20 H9 A2 2 0 0 1 7 18 Z" />
      <path d="M7 4 A2 2 0 0 0 5 6 V8 H7" />
      <line x1="10" y1="9" x2="16.5" y2="9" />
      <line x1="10" y1="12.5" x2="16.5" y2="12.5" />
      <line x1="10" y1="16" x2="14" y2="16" />
    </Svg>
  );
}

/** Context — a window. */
export function WindowIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="4" y="4.5" width="16" height="15" rx="2" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="12" y1="9" x2="12" y2="19.5" />
    </Svg>
  );
}

/** A thinking model — a brain. */
export function BrainIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M9.5 5 A3 3 0 0 0 6 8 A2.6 2.6 0 0 0 5 13 A2.8 2.8 0 0 0 7 17.5 A2.6 2.6 0 0 0 9.5 19 V5 Z" />
      <path d="M14.5 5 A3 3 0 0 1 18 8 A2.6 2.6 0 0 1 19 13 A2.8 2.8 0 0 1 17 17.5 A2.6 2.6 0 0 1 14.5 19 V5 Z" />
      <line x1="12" y1="5" x2="12" y2="19" />
    </Svg>
  );
}

/** System prompt tag — a gear. */
export function GearIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5 V6 M12 18 V20.5 M20.5 12 H18 M6 12 H3.5 M18 6 L16.2 7.8 M7.8 16.2 L6 18 M18 18 L16.2 16.2 M7.8 7.8 L6 6" />
    </Svg>
  );
}

/** Reasoning / scratchpad — a thought bubble. */
export function ThoughtIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M6 6.5 A4.5 3.5 0 1 1 15 6.5 A3.5 3 0 1 1 15 12 H8 A3 2.6 0 1 1 6 6.5 Z" />
      <circle cx="6" cy="16" r="1.4" fill={STROKE} stroke="none" />
      <circle cx="3.5" cy="19" r="1" fill={STROKE} stroke="none" />
    </Svg>
  );
}

/** Database query — stacked cylinders. */
export function DatabaseIcon({ size = 19 }: { size?: number }) {
  return (
    <Svg size={size}>
      <ellipse cx="12" cy="6" rx="7" ry="2.6" />
      <path d="M5 6 V12 C5 13.4 8.1 14.6 12 14.6 C15.9 14.6 19 13.4 19 12 V6" />
      <path d="M5 12 V18 C5 19.4 8.1 20.6 12 20.6 C15.9 20.6 19 19.4 19 18 V12" />
    </Svg>
  );
}

/** Run code — angle brackets. */
export function CodeIcon({ size = 19 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M8.5 8 L4.5 12 L8.5 16" />
      <path d="M15.5 8 L19.5 12 L15.5 16" />
      <line x1="13.2" y1="6.5" x2="10.8" y2="17.5" />
    </Svg>
  );
}

/** Call an API / a tool — a wrench. */
export function WrenchIcon({ size = 19 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M15.5 6.5 A4 4 0 0 0 10.4 11.6 L5 17 L7 19 L12.4 13.6 A4 4 0 0 0 17.5 8.5 L15 11 L13 9 Z" />
    </Svg>
  );
}

/** Calculator — exact arithmetic. */
export function CalculatorIcon({ size = 19 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <rect x="7.5" y="6" width="9" height="3" rx="0.8" />
      <line x1="8.2" y1="12.5" x2="8.3" y2="12.5" />
      <line x1="12" y1="12.5" x2="12.1" y2="12.5" />
      <line x1="15.8" y1="12.5" x2="15.9" y2="12.5" />
      <line x1="8.2" y1="16.5" x2="8.3" y2="16.5" />
      <line x1="12" y1="16.5" x2="12.1" y2="16.5" />
      <line x1="15.8" y1="16.5" x2="15.9" y2="16.5" />
    </Svg>
  );
}

/** Another agent, as people — two figures. */
export function PeopleIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <circle cx="8.5" cy="8" r="2.6" />
      <path d="M4 19 A4.5 4.5 0 0 1 13 19" />
      <circle cx="16" cy="9" r="2.2" />
      <path d="M15 13.6 A4 4 0 0 1 20.5 17.5" />
    </Svg>
  );
}

/** Private knowledge — an office building. */
export function BuildingIcon({ size = 19 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="5.5" y="3.5" width="13" height="17" rx="1.5" />
      <line x1="8.5" y1="7" x2="10" y2="7" />
      <line x1="14" y1="7" x2="15.5" y2="7" />
      <line x1="8.5" y1="10.5" x2="10" y2="10.5" />
      <line x1="14" y1="10.5" x2="15.5" y2="10.5" />
      <path d="M10.5 20.5 V16.5 H13.5 V20.5" />
    </Svg>
  );
}

/** Fresh & changing — a calendar. */
export function CalendarIcon({ size = 19 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="4" y="5.5" width="16" height="15" rx="2" />
      <line x1="4" y1="9.5" x2="20" y2="9.5" />
      <line x1="8" y1="3.5" x2="8" y2="7" />
      <line x1="16" y1="3.5" x2="16" y2="7" />
    </Svg>
  );
}

/** Grounded answers — a link. */
export function LinkIcon({ size = 19 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M9.5 14.5 A3.5 3.5 0 0 1 9.5 9.5 L12 7 A3.5 3.5 0 0 1 17 12 L15.7 13.3" />
      <path d="M14.5 9.5 A3.5 3.5 0 0 1 14.5 14.5 L12 17 A3.5 3.5 0 0 1 7 12 L8.3 10.7" />
    </Svg>
  );
}

/** Vector store — a folder of cards. */
export function FolderIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M4 7 A2 2 0 0 1 6 5 H9.5 L11.5 7 H18 A2 2 0 0 1 20 9 V17 A2 2 0 0 1 18 19 H6 A2 2 0 0 1 4 17 Z" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </Svg>
  );
}

/** Decorative checklist marker — a checked square. */
export function CheckSquareIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="4.5" y="4.5" width="15" height="15" rx="3" />
      <path d="M8 12 L11 15 L16.5 9" />
    </Svg>
  );
}

/** Orchestration — a compass. */
export function CompassIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5 L11 11 L8.5 15.5 L13 13 Z" fill={STROKE} stroke="none" />
    </Svg>
  );
}

/** Observe — an eye. */
export function EyeIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M3 12 C6 7 18 7 21 12 C18 17 6 17 3 12 Z" />
      <circle cx="12" cy="12" r="2.4" />
    </Svg>
  );
}

/** Hallucination — a ghost. */
export function GhostIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M5.5 19.5 V10 A6.5 6.5 0 0 1 18.5 10 V19.5 L16 17.5 L13.5 19.5 L11 17.5 L8.5 19.5 L6 17.5 Z" />
      <circle cx="9.7" cy="10.5" r="1" fill={STROKE} stroke="none" />
      <circle cx="14.3" cy="10.5" r="1" fill={STROKE} stroke="none" />
    </Svg>
  );
}

/** Guardrails — a barrier. */
export function BarrierIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="4" y="7" width="16" height="6" rx="1" />
      <path d="M6 7 L9 13 M11 7 L14 13 M16 7 L19 13" />
      <line x1="6" y1="13" x2="6" y2="20" />
      <line x1="18" y1="13" x2="18" y2="20" />
    </Svg>
  );
}

/** Guardrails in the loop — a traffic light. */
export function TrafficLightIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="7.5" y="3" width="9" height="16" rx="3" />
      <circle cx="12" cy="7" r="1.4" />
      <circle cx="12" cy="11" r="1.4" />
      <circle cx="12" cy="15" r="1.4" />
      <line x1="12" y1="19" x2="12" y2="21" />
    </Svg>
  );
}

/** The trade-off — scales. */
export function ScalesIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="7" y1="20" x2="17" y2="20" />
      <line x1="5" y1="7" x2="19" y2="7" />
      <path d="M5 7 L2.5 12 A2.5 2.5 0 0 0 7.5 12 Z" />
      <path d="M19 7 L16.5 12 A2.5 2.5 0 0 0 21.5 12 Z" />
    </Svg>
  );
}

/** Tool / function-calling schemas — a puzzle piece. */
export function PuzzleIcon({ size = 19 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M8 5 A1.6 1.6 0 0 1 11.2 5 H14 V7.8 A1.6 1.6 0 0 0 17.2 7.8 H19 V11 A1.6 1.6 0 0 1 19 14.2 V17 H16.2 A1.6 1.6 0 0 0 13 17 H10 V14.2 A1.6 1.6 0 0 1 6.8 14.2 H5 V8 H8 Z" />
    </Svg>
  );
}

/** Agent cards — an ID card. */
export function IdCardIcon({ size = 19 }: { size?: number }) {
  return (
    <Svg size={size}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M5.5 15.5 A3.2 3.2 0 0 1 11.5 15.5" />
      <line x1="14" y1="10" x2="17.5" y2="10" />
      <line x1="14" y1="13.5" x2="17.5" y2="13.5" />
    </Svg>
  );
}

/** MCP — a plug. */
export function PlugIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M8 11 A4 4 0 0 0 16 11 V8 H8 Z" />
      <line x1="10.5" y1="8" x2="10.5" y2="4.5" />
      <line x1="13.5" y1="8" x2="13.5" y2="4.5" />
      <line x1="12" y1="15" x2="12" y2="20" />
    </Svg>
  );
}

/** A2A — two linked agent nodes (agent ↔ agent). */
export function PeersIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <circle cx="6.5" cy="12" r="3.6" />
      <circle cx="6.5" cy="12" r="0.9" fill={STROKE} stroke="none" />
      <circle cx="17.5" cy="12" r="3.6" />
      <circle cx="17.5" cy="12" r="0.9" fill={STROKE} stroke="none" />
      <line x1="10.1" y1="12" x2="13.9" y2="12" />
    </Svg>
  );
}

/** Warning — a triangle. */
export function WarningIcon({ size = 15 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M12 4 L21 19 H3 Z" />
      <line x1="12" y1="10" x2="12" y2="14" />
      <line x1="12" y1="16.5" x2="12" y2="16.6" />
    </Svg>
  );
}

/** Read a file — a document page. */
export function DocumentIcon({ size = 19 }: { size?: number }) {
  return (
    <Svg size={size}>
      <path d="M6 3.5 H14 L18 7.5 V20.5 H6 Z" />
      <path d="M14 3.5 V7.5 H18" />
      <line x1="8.5" y1="12" x2="15.5" y2="12" />
      <line x1="8.5" y1="15.5" x2="15.5" y2="15.5" />
    </Svg>
  );
}
