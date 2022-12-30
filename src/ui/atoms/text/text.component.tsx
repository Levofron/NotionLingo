import { Text as ChakraText } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ITextProps } from './text.types';

const TextComponent: ForwardRefRenderFunction<HTMLParagraphElement, ITextProps> = (
  props,
  ref,
): JSX.Element => <ChakraText ref={ref} {...props} />;

export const Text = forwardRef(TextComponent);
