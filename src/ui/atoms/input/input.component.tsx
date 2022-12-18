import { Input as ChakraInput } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IInputProps } from './input.types';

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraInput ref={ref} {...restProps}>
    {children}
  </ChakraInput>
);

export const Input = forwardRef(InputComponent);
