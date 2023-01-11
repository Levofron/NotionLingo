import { Input as ChakraInput } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IInputProps } from './input.types';

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => (
  <ChakraInput
    ref={ref}
    _hover={{ borderColor: mode === 'dark' ? 'gray.900' : 'gray.50' }}
    _placeholder={{ color: mode === 'light' ? 'gray.50' : 'gray.900' }}
    borderColor={mode === 'dark' ? 'gray.900' : 'gray.50'}
    borderRadius={0}
    color={mode === 'light' ? 'gray.50' : 'gray.900'}
    focusBorderColor={mode === 'dark' ? 'gray.900' : 'gray.50'}
    {...restProps}
  />
);

export const Input = forwardRef(InputComponent);
