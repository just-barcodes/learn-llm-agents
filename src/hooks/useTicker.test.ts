import { act, renderHook } from '@testing-library/react';
import { useTicker } from './useTicker.ts';

describe('useTicker', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('starts at 0 and increments each period', () => {
    const { result } = renderHook(() => useTicker(100, 5));
    expect(result.current).toBe(0);
    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe(1);
    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe(3);
  });

  it('wraps back to 0 after passing max', () => {
    const { result } = renderHook(() => useTicker(100, 2));
    act(() => vi.advanceTimersByTime(300)); // 1, 2, 3
    expect(result.current).toBe(3);
    act(() => vi.advanceTimersByTime(100)); // 3 > max → 0
    expect(result.current).toBe(0);
  });

  it('stops ticking after unmount', () => {
    const { result, unmount } = renderHook(() => useTicker(100, 5));
    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe(1);
    unmount();
    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe(1);
  });
});
