import { Input as ChakraInput } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IInputProps } from './input.types';

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  props,
  ref,
): JSX.Element => (
  <ChakraInput
    ref={ref}
    _hover={{ borderColor: 'black' }}
    borderColor="black"
    borderRadius={0}
    focusBorderColor="black"
    {...props}
  />
);

export const Input = forwardRef(InputComponent);
