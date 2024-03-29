import { Box as ChakraBox } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { BoxProps } from './box.types';

const BoxComponent: ForwardRefRenderFunction<HTMLDivElement, BoxProps> = (
  props,
  ref,
): JSX.Element => <ChakraBox ref={ref} {...props} />;

export const Box = memo(forwardRef(BoxComponent));
