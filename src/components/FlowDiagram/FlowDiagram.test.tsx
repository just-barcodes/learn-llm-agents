import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FlowDiagram, type FlowNode, type FlowStep } from './FlowDiagram.tsx';

const nodes: FlowNode[] = [
  {
    id: 'a',
    left: '20%',
    top: '50%',
    render: (active) => <div>Node A {active ? '*' : ''}</div>,
  },
];

const connector = {
  left: '0',
  top: '0',
  width: '10px',
  height: '3px',
  angle: '90deg',
  arrowLeft: '0',
  arrowTop: '0',
};
const chip = { text: '', left: '0', top: '0', bg: '#000', border: '#000', fg: '#fff' };

const steps: FlowStep[] = [
  {
    label: 'one',
    color: '#e8a04c',
    dir: 'R',
    connector,
    chip: { ...chip, text: 'chip one' },
    note: 'note one',
    raw: 'raw one',
    highlight: ['a'],
  },
  {
    label: 'two',
    color: '#7a8a5e',
    dir: 'L',
    connector,
    chip: { ...chip, text: 'chip two' },
    note: 'note two',
    raw: 'raw two',
    highlight: [],
  },
];

describe('FlowDiagram', () => {
  it('shows the first step by default', () => {
    render(<FlowDiagram nodes={nodes} steps={steps} sceneHeight={200} />);
    expect(screen.getByText('note one')).toBeInTheDocument();
    expect(screen.getByText('raw one')).toBeInTheDocument();
    expect(screen.getByText(/Node A \*/)).toBeInTheDocument(); // highlighted
  });

  it('advances with the Next button and stops at the end', async () => {
    const user = userEvent.setup();
    render(<FlowDiagram nodes={nodes} steps={steps} sceneHeight={200} />);
    await user.click(screen.getByRole('button', { name: /next step/i }));
    expect(screen.getByText('note two')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /complete/i })).toBeDisabled();
  });

  it('jumps to a step via its phase marker', async () => {
    const user = userEvent.setup();
    render(<FlowDiagram nodes={nodes} steps={steps} sceneHeight={200} />);
    await user.click(screen.getByRole('button', { name: 'two' }));
    expect(screen.getByText('note two')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /restart/i }));
    expect(screen.getByText('note one')).toBeInTheDocument();
  });
});
