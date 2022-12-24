import { Stack as ChakraStack } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IStackProps } from './stack.types';

const StackComponent: ForwardRefRenderFunction<HTMLDivElement, IStackProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraStack ref={ref} {...restProps}>
    {children}
  </ChakraStack>
);

export const Stack = forwardRef(StackComponent);
