import { Input as ChakraInput } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { InputProps } from './input.types';

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => {
  const isDarkMode = mode === 'dark';
  const color = isDarkMode ? 'gray.900' : 'gray.50';

  return (
    <ChakraInput
      ref={ref}
      _hover={{ borderColor: color, borderWidth: 1 }}
      _placeholder={{ color }}
      borderColor={color}
      color={color}
      focusBorderColor={color}
      style={{ boxShadow: 'none', borderRadius: 10 }}
      {...restProps}
    />
  );
};

export const Input = memo(forwardRef(InputComponent));
