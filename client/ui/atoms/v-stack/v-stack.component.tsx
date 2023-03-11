import { VStack as ChakraVStack } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IVStackProps } from './v-stack.types';

const VStackComponent: ForwardRefRenderFunction<HTMLDivElement, IVStackProps> = (
  props,
  ref,
): JSX.Element => <ChakraVStack ref={ref} {...props} />;

export const VStack = memo(forwardRef(VStackComponent));
