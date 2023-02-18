import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ITextareaProps } from './textarea.types';

const TextareaComponent: ForwardRefRenderFunction<HTMLTextAreaElement, ITextareaProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => {
  const isDarkMode = mode === 'dark';
  const color = isDarkMode ? 'gray.900' : 'gray.50';

  return (
    <ChakraTextarea
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

export const Textarea = memo(forwardRef(TextareaComponent));

export default Textarea;
