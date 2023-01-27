import { renderHook } from '@testing-library/react-hooks';

import { functionImportTest } from '@infrastructure/utils';

import { usePrevious } from './use-previous.hook';

describe('usePrevious hook', () => {
  functionImportTest(usePrevious);

  it('should return the previous value', () => {
    const { rerender, result } = renderHook((value) => usePrevious(value), {
      initialProps: 1,
    });

    expect(result.current).toBeUndefined();

    rerender(2);

    expect(result.current).toBe(1);

    rerender(3);

    expect(result.current).toBe(2);
  });

  it('should return the previous value when the value is an object', () => {
    const { rerender, result } = renderHook((value) => usePrevious(value), {
      initialProps: { a: 1 },
    });

    expect(result.current).toBeUndefined();

    rerender({ a: 2 });

    expect(result.current).toEqual({ a: 1 });

    rerender({ a: 3 });

    expect(result.current).toEqual({ a: 2 });
  });
});
