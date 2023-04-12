import { renderHook } from '@testing-library/react-hooks';

import { functionImportTest } from '@shared/functions';

import { useIsFirstRender } from './use-is-first-render.hook';

describe('useIsFirstRender hook', () => {
  functionImportTest(useIsFirstRender);

  it('should return true on first render', () => {
    const { result } = renderHook(() => useIsFirstRender());

    expect(result.current).toBeTruthy();
  });

  it('should return false on second render', () => {
    const { rerender, result } = renderHook(() => useIsFirstRender());

    rerender();

    expect(result.current).toBeFalsy();
  });
});
