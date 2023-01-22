import { renderHook } from '@testing-library/react-hooks';

import { functionImportTest } from '@infrastructure/utils';

import { useLocalStorage } from './use-local-storage.hook';

describe('useLocalStorage hook', () => {
  functionImportTest(useLocalStorage);

  it('should return initial value when it is passed', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'test'));

    expect(result.current[0]).toEqual('test');
  });

  it('should return undefined when initial value is not passed', () => {
    const { result } = renderHook(() => useLocalStorage('test'));

    expect(result.current[0]).toBeUndefined();
  });

  it('should return value from local storage when it is passed', () => {
    const { result } = renderHook(() => useLocalStorage('key'));

    result.current[1]('test');

    expect(result.current[0]).toEqual('test');
  });
});
