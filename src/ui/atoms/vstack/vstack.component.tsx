import { VStack as ChakraVStack } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IVStackProps } from './vstack.types';

const VStackComponent: ForwardRefRenderFunction<HTMLDivElement, IVStackProps> = (
  props,
  ref,
): JSX.Element => <ChakraVStack ref={ref} {...props} />;

export const VStack = forwardRef(VStackComponent);
