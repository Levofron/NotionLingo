import { useToast as useChakraToast } from '@chakra-ui/react';
import { renderHook } from '@testing-library/react-hooks';

import { useToast } from './use-toast.hook';

jest.mock('@chakra-ui/react');

describe('useToast hook', () => {
  it('should display a success toast', () => {
    const mockToast = jest.fn();

    (useChakraToast as jest.Mock).mockReturnValue(mockToast);

    const { result } = renderHook(() => useToast());

    result.current.success({ description: 'Test description' });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Success!',
      isClosable: true,
      status: 'success',
      duration: 5000,
      description: 'Test description',
    });
  });

  it('should display an error toast', () => {
    const mockToast = jest.fn();

    (useChakraToast as jest.Mock).mockReturnValue(mockToast);

    const { result } = renderHook(() => useToast());

    result.current.error({ description: 'Test description' });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error!',
      isClosable: true,
      status: 'error',
      duration: 5000,
      description: 'Test description',
    });
  });

  it('should display an info toast', () => {
    const mockToast = jest.fn();

    (useChakraToast as jest.Mock).mockReturnValue(mockToast);

    const { result } = renderHook(() => useToast());

    result.current.info({ description: 'Test description' });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Info!',
      isClosable: true,
      status: 'info',
      duration: 2000,
      description: 'Test description',
    });
  });
});
