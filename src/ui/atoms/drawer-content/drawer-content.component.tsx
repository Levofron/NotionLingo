import { DrawerContent as ChakraDrawerContent } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IDrawerContentProps } from './drawer-content.types';

const DrawerContentComponent: ForwardRefRenderFunction<HTMLElement, IDrawerContentProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraDrawerContent ref={ref} {...restProps}>
    {children}
  </ChakraDrawerContent>
);

export const DrawerContent = forwardRef(DrawerContentComponent);
