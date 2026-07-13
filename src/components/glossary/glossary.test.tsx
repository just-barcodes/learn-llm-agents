import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlossaryProvider } from './GlossaryProvider.tsx';
import { Term } from './Term.tsx';
import { glossary } from '../../data/glossary.ts';

function renderTerm() {
  return render(
    <GlossaryProvider>
      <p>
        A <Term term="llm">language model</Term> reads text.
      </p>
    </GlossaryProvider>,
  );
}

describe('glossary', () => {
  it('shows no tooltip until a term is hovered', () => {
    renderTerm();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('reveals the definition on hover and hides it on leave', async () => {
    const user = userEvent.setup();
    renderTerm();
    const term = screen.getByText('language model');

    await user.hover(term);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent(glossary.llm.title);
    expect(tooltip).toHaveTextContent(glossary.llm.definition);

    await user.unhover(term);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('reveals the definition on keyboard focus', async () => {
    const user = userEvent.setup();
    renderTerm();

    await user.tab();
    expect(screen.getByText('language model')).toHaveFocus();
    expect(screen.getByRole('tooltip')).toHaveTextContent(glossary.llm.title);
  });

  it('throws if <Term> is used outside a provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Term term="llm">x</Term>)).toThrow(/GlossaryProvider/);
    spy.mockRestore();
  });
});
