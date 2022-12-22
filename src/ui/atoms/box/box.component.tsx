import { Box as ChakraBox } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IBoxProps } from './box.types';

const BoxComponent: ForwardRefRenderFunction<HTMLDivElement, IBoxProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraBox ref={ref} {...restProps}>
    {children}
  </ChakraBox>
);

export const Box = forwardRef(BoxComponent);
