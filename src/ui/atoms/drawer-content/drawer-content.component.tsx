import { DrawerContent as ChakraDrawerContent } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IDrawerContentProps } from './drawer-content.types';

const DrawerContentComponent: ForwardRefRenderFunction<HTMLElement, IDrawerContentProps> = (
  props,
  ref,
): JSX.Element => <ChakraDrawerContent ref={ref} {...props} />;

export const DrawerContent = forwardRef(DrawerContentComponent);
