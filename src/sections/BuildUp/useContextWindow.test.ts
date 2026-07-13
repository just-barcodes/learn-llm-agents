import { act, renderHook } from '@testing-library/react';
import { useContextWindow } from './useContextWindow.ts';
import { CONTEXT_CAP, CONTEXT_THINKING } from './contextData.ts';

describe('useContextWindow', () => {
  it('starts with just the system prompt', () => {
    const { result } = renderHook(() => useContextWindow());
    expect(result.current.blocks).toHaveLength(1);
    expect(result.current.blocks[0].kind).toBe('sys');
    expect(result.current.used).toBe(300);
    expect(result.current.over).toBe(false);
  });

  it('appends a block on each step and grows the token count', () => {
    const { result } = renderHook(() => useContextWindow());
    act(() => result.current.next());
    expect(result.current.blocks).toHaveLength(2);
    expect(result.current.used).toBe(340);
    expect(result.current.blocks[1].latest).toBe(true);
  });

  it('stops at the end of the sequence and reports done', () => {
    const { result } = renderHook(() => useContextWindow());
    for (let i = 0; i < 20; i++) act(() => result.current.next());
    expect(result.current.done).toBe(true);
    expect(result.current.blocks).toHaveLength(7); // plain sequence length
  });

  it('drops the oldest turns (never the system prompt) once over the cap', () => {
    const { result } = renderHook(() => useContextWindow());
    act(() => result.current.setMode(true)); // thinking sequence overflows the cap
    for (let i = 0; i < CONTEXT_THINKING.length; i++) act(() => result.current.next());

    expect(result.current.over).toBe(true);
    expect(result.current.used).toBeGreaterThan(CONTEXT_CAP);
    // The system prompt (index 0) is preserved; some later turn is dropped.
    expect(result.current.blocks[0].dropped).toBe(false);
    expect(result.current.blocks.some((b) => b.dropped)).toBe(true);
  });

  it('resets the step count when switching modes', () => {
    const { result } = renderHook(() => useContextWindow());
    act(() => result.current.next());
    act(() => result.current.next());
    expect(result.current.blocks.length).toBeGreaterThan(1);
    act(() => result.current.setMode(true));
    expect(result.current.blocks).toHaveLength(1);
    expect(result.current.thinking).toBe(true);
  });
});
