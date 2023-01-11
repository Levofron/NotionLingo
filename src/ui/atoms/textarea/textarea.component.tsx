import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ITextareaProps } from './textarea.types';

const TextareaComponent: ForwardRefRenderFunction<HTMLTextAreaElement, ITextareaProps> = (
  { mode, ...restProps },
  ref,
): JSX.Element => (
  <ChakraTextarea
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

export const Textarea = forwardRef(TextareaComponent);
