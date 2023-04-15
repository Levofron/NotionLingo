import { Stack as ChakraStack } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { StackProps } from './stack.types';

const StackComponent: ForwardRefRenderFunction<HTMLDivElement, StackProps> = (
  props,
  ref,
): JSX.Element => <ChakraStack ref={ref} {...props} />;

export const Stack = memo(forwardRef(StackComponent));
