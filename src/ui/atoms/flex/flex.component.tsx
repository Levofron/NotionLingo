import { Flex as ChakraFlex } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IFlexProps } from './flex.types';

const FlexComponent: ForwardRefRenderFunction<HTMLDivElement, IFlexProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraFlex ref={ref} {...restProps}>
    {children}
  </ChakraFlex>
);

export const Flex = forwardRef(FlexComponent);
