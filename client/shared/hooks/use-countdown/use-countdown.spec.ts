import { renderHook } from '@testing-library/react-hooks';

import { functionImportTest } from '@shared/functions';

import { useCountdown } from './use-countdown.hook';

describe('useCountdown hook', () => {
  functionImportTest(useCountdown);

  it('should return proper values', () => {
    const { result } = renderHook(() => useCountdown(5));

    expect(result.current.countdown).toBe(5);
    expect(result.current.isEnded).toBe(false);
    expect(result.current.isStarted).toBe(false);
  });

  it('should start countdown', async () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useCountdown(5));

    result.current.start();

    expect(result.current.countdown).toBe(5);
    expect(result.current.isEnded).toBe(false);
    expect(result.current.isStarted).toBe(true);

    jest.advanceTimersByTime(1000);

    expect(result.current.countdown).toBe(4);
    expect(result.current.isEnded).toBe(false);
    expect(result.current.isStarted).toBe(true);

    jest.advanceTimersByTime(4000);

    expect(result.current.countdown).toBe(0);
    expect(result.current.isEnded).toBe(true);
    expect(result.current.isStarted).toBe(false);
  });

  it('should throw error when start is called twice', () => {
    const { result } = renderHook(() => useCountdown(5));

    result.current.start();

    expect(() => result.current.start()).toThrowError('Interval is already set');
  });
});
