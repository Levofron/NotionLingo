import { Input as ChakraInput } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IInputProps } from './input.types';

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  props,
  ref,
): JSX.Element => <ChakraInput ref={ref} {...props} />;

export const Input = forwardRef(InputComponent);
