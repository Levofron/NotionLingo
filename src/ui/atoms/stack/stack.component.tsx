import { Stack as ChakraStack } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IStackProps } from './stack.types';

const StackComponent: ForwardRefRenderFunction<HTMLDivElement, IStackProps> = (
  props,
  ref,
): JSX.Element => <ChakraStack ref={ref} {...props} />;

export const Stack = forwardRef(StackComponent);
