import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ITextareaProps } from './textarea.types';

const TextareaComponent: ForwardRefRenderFunction<HTMLTextAreaElement, ITextareaProps> = (
  props,
  ref,
): JSX.Element => <ChakraTextarea ref={ref} {...props} />;

export const Textarea = forwardRef(TextareaComponent);
