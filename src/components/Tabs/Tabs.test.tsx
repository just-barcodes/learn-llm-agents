import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, type TabItem } from './Tabs.tsx';

const items: TabItem[] = [
  { id: 'a', label: 'First', render: () => <p>Panel A</p> },
  { id: 'b', label: 'Second', render: () => <p>Panel B</p> },
  { id: 'c', label: 'Third', render: () => <p>Panel C</p> },
];

describe('Tabs', () => {
  it('mounts only the active panel', () => {
    render(<Tabs items={items} />);
    expect(screen.getByText('Panel A')).toBeInTheDocument();
    expect(screen.queryByText('Panel B')).not.toBeInTheDocument();
  });

  it('switches panel on click', async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    await user.click(screen.getByRole('tab', { name: 'Second' }));
    expect(screen.getByText('Panel B')).toBeInTheDocument();
    expect(screen.queryByText('Panel A')).not.toBeInTheDocument();
  });

  it('navigates with arrow keys (roving tabindex)', async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    await user.click(screen.getByRole('tab', { name: 'First' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Second' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    // Wraps around to the last tab.
    expect(screen.getByRole('tab', { name: 'Third' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });
});
