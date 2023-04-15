import { act, renderHook } from '@testing-library/react-hooks';

import { functionImportTest } from '@shared/functions';
import { isFunction } from '@shared/guards';

import { useCopyToClipboard } from './use-copy-to-clipboard.hook';

describe('useCopyToClipboard hook', () => {
  functionImportTest(useCopyToClipboard);

  it('should set the copiedText state to null initially', () => {
    const { result } = renderHook(() => useCopyToClipboard());

    expect(result.current.copiedText).toBeNull();
  });

  it('should return a copyToClipboard function', () => {
    const { result } = renderHook(() => useCopyToClipboard());

    expect(isFunction(result.current.copyToClipboard)).toBeTruthy();
  });

  it('should copy text to clipboard', async () => {
    const { result, waitFor } = renderHook(() => useCopyToClipboard());
    const { copyToClipboard } = result.current;

    await act(async () => {
      await copyToClipboard('test');
    });

    waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test');
    });
  });

  it('does not copy text to clipboard when navigator.clipboard is not available', async () => {
    const originalClipboard = navigator.clipboard;

    // @ts-expect-error
    navigator.clipboard = undefined;

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copyToClipboard('test');
    });

    expect(navigator.clipboard).toBeUndefined();

    expect(result.current.copiedText).toBeNull();

    // @ts-expect-error
    navigator.clipboard = originalClipboard;
  });
});
