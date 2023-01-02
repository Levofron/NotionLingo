import { functionImportTest } from '@infrastructure/utils';

import { debounce } from './debounce.function';

jest.useFakeTimers();

describe('debounce function', () => {
  functionImportTest(debounce);

  it('should call the callback after the delay', () => {
    const callback = jest.fn();
    const debouncedCallback = debounce(callback, 100);

    debouncedCallback();
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalled();
  });
});
