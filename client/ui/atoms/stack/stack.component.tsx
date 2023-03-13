import { Stack as ChakraStack } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IStackProps } from './stack.types';

const StackComponent: ForwardRefRenderFunction<HTMLDivElement, IStackProps> = (
  props,
  ref,
): JSX.Element => <ChakraStack ref={ref} {...props} />;

export const Stack = memo(forwardRef(StackComponent));

export default Stack;
