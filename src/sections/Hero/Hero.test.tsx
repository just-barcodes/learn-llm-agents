import { act, render, screen } from '@testing-library/react';
import { GlossaryProvider } from '../../components/glossary/GlossaryProvider.tsx';
import { Hero } from './Hero.tsx';

function renderHero() {
  return render(
    <GlossaryProvider>
      <Hero />
    </GlossaryProvider>,
  );
}

describe('Hero', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('renders the page title and intro', () => {
    renderHero();
    expect(
      screen.getByRole('heading', { level: 1, name: /what is an ai agent\?/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('LLM')).toBeInTheDocument();
  });

  it('types the prompt in over time', () => {
    renderHero();
    // Advance enough ticks that the typed prompt is longer than any single
    // token, so the match is unambiguous.
    act(() => vi.advanceTimersByTime(95 * 12));
    expect(screen.getByText(/what should/)).toBeInTheDocument();
  });
});
