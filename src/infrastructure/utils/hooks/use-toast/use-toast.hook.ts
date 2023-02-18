import { UseToastOptions, useToast as useChakraToast } from '@chakra-ui/react';
import { useCallback } from 'react';

const TOAST_DURATION = 5000;

export const useToast = () => {
  const toast = useChakraToast();

  const success = useCallback(
    (options?: UseToastOptions) =>
      toast({
        title: 'Success!',
        isClosable: true,
        status: 'success',
        duration: TOAST_DURATION,
        ...options,
      }),
    [toast],
  );

  const error = useCallback(
    (options?: UseToastOptions) =>
      toast({
        title: 'Error!',
        status: 'error',
        isClosable: true,
        duration: TOAST_DURATION,
        ...options,
      }),
    [toast],
  );

  const info = useCallback(
    (options?: UseToastOptions) =>
      toast({
        title: 'Info!',
        status: 'info',
        duration: 2000,
        isClosable: true,
        ...options,
      }),
    [toast],
  );

  return {
    info,
    error,
    success,
  };
};
