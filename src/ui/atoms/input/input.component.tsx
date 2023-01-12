import { Input as ChakraInput } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IInputProps } from './input.types';

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => {
  const isDarkMode = mode === 'dark';
  const color = isDarkMode ? 'gray.900' : 'gray.50';

  return (
    <ChakraInput
      ref={ref}
      _hover={{ borderColor: color }}
      _placeholder={{ color }}
      borderColor={color}
      borderRadius={0}
      color={color}
      focusBorderColor={color}
      {...restProps}
    />
  );
};

export const Input = forwardRef(InputComponent);
