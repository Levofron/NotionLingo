import { act, renderHook } from '@testing-library/react-hooks';

import { functionImportTest } from '@infrastructure/utils';

import { useAxiosAction } from './use-axios-action.hook';

describe('useAxiosAction hook', () => {
  functionImportTest(useAxiosAction);

  it('should return isLoading, error, data and mutate function', () => {
    const axiosAction = jest.fn().mockResolvedValue({ data: 'data' });

    const { result } = renderHook(() => useAxiosAction(axiosAction));

    expect(result.current).toEqual({
      data: expect.any(Object),
      error: expect.any(Object),
      reset: expect.any(Function),
      mutate: expect.any(Function),
      isError: expect.any(Boolean),
      isLoading: expect.any(Boolean),
      mutateAsync: expect.any(Function),
    });
  });

  it('should call axios action', async () => {
    const axiosAction = jest.fn().mockResolvedValue({ data: 'data' });

    const { result } = renderHook(() => useAxiosAction(axiosAction));

    act(() => {
      result.current.mutate();
    });

    expect(axiosAction).toHaveBeenCalled();
  });

  it('should set isLoading to true when axios action is called', async () => {
    const axiosAction = jest.fn().mockResolvedValue({ data: 'data' });

    const { result } = renderHook(() => useAxiosAction(axiosAction));

    expect(result.current.isLoading).toBeFalsy();

    act(() => {
      result.current.mutate();
    });

    expect(result.current.isLoading).toBeTruthy();
  });

  it('should set isLoading to false when axios action is resolved', async () => {
    const axiosAction = jest.fn().mockResolvedValue({ data: 'data' });

    const { result } = renderHook(() => useAxiosAction(axiosAction));

    act(() => {
      result.current.mutate();
    });

    expect(result.current.isLoading).toBeTruthy();

    await act(async () => {
      await result.current.mutate();
    });

    expect(result.current.isLoading).toBeFalsy();
  });
});
