import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { functionImportTest } from '@infrastructure/utils';

import { useKeyPressMapper } from './use-key-press-mapper.hook';

jest.useFakeTimers();

describe('useKeyPressMapper hook', () => {
  functionImportTest(useKeyPressMapper);

  it('should call callback assigned to key with "keypress" event', () => {
    const callback = jest.fn();

    renderHook(() => useKeyPressMapper([[['Space'], callback]]));

    fireEvent.keyPress(document, { code: 'Space' });

    jest.advanceTimersByTime(0);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);
    expect(callback).toHaveBeenCalled();
  });

  it('should not call unassigned callback', () => {
    const callback = jest.fn();

    renderHook(() => useKeyPressMapper([[['Space'], callback]]));

    fireEvent.keyPress(document, { code: 'KeyP' });

    jest.advanceTimersByTime(300);
    expect(callback).not.toHaveBeenCalled();
  });
});
