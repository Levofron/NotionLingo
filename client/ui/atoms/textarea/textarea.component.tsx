import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ITextareaProps } from './textarea.types';

const TextareaComponent: ForwardRefRenderFunction<HTMLTextAreaElement, ITextareaProps> = (
  { mode = 'dark', style, ...restProps },
  ref,
): JSX.Element => {
  const isDarkMode = mode === 'dark';
  const color = isDarkMode ? 'gray.900' : 'gray.50';

  return (
    <ChakraTextarea
      ref={ref}
      _hover={{ borderColor: color, borderWidth: 1 }}
      _placeholder={{ color }}
      borderColor={color}
      color={color}
      focusBorderColor={color}
      style={{ boxShadow: 'none', borderRadius: 0, ...style }}
      {...restProps}
    />
  );
};

export const Textarea = memo(forwardRef(TextareaComponent));
