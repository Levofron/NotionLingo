import { Input as ChakraInput } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

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
      _hover={{ borderColor: color, borderWidth: 1 }}
      _placeholder={{ color }}
      borderColor={color}
      borderRadius={0}
      color={color}
      focusBorderColor={color}
      style={{ boxShadow: 'none' }}
      {...restProps}
    />
  );
};

export const Input = memo(forwardRef(InputComponent));

export default Input;
