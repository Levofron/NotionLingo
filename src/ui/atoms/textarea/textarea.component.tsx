import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ITextareaProps } from './textarea.types';

const TextareaComponent: ForwardRefRenderFunction<HTMLTextAreaElement, ITextareaProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => {
  const isDarkMode = mode === 'dark';

  return (
    <ChakraTextarea
      ref={ref}
      _hover={{ borderColor: isDarkMode ? 'gray.900' : 'gray.50' }}
      _placeholder={{ color: !isDarkMode ? 'gray.50' : 'gray.900' }}
      borderColor={isDarkMode ? 'gray.900' : 'gray.50'}
      borderRadius={0}
      color={mode === 'light' ? 'gray.50' : 'gray.900'}
      focusBorderColor={isDarkMode ? 'gray.900' : 'gray.50'}
      {...restProps}
    />
  );
};

export const Textarea = forwardRef(TextareaComponent);
