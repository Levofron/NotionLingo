import { renderHook } from '@testing-library/react-hooks';

import { functionImportTest } from '@infrastructure/utils';

import { useWindowSize } from './use-window-size.hook';

describe('useWindowSize hook', () => {
  functionImportTest(useWindowSize);

  it('should return an object with width and height properties', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toHaveProperty('width');
    expect(result.current).toHaveProperty('height');
  });

  it('should return the correct width and height', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toEqual(window.innerWidth);
    expect(result.current.height).toEqual(window.innerHeight);
  });
});
