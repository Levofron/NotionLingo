import { functionImportTest } from '@infrastructure/functions';

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

  it('should call the callback only once', () => {
    const callback = jest.fn();
    const debouncedCallback = debounce(callback, 100);

    debouncedCallback();
    debouncedCallback();
    debouncedCallback();
    debouncedCallback();
    debouncedCallback();

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call the callback with the correct arguments', () => {
    const callback = jest.fn();
    const debouncedCallback = debounce(callback, 100);

    debouncedCallback('foo', 'bar');
    debouncedCallback('bar', 'foo');

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledWith('bar', 'foo');
  });
});
