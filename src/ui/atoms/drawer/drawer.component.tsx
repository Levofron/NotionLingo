import { Drawer as ChakraDrawer } from '@chakra-ui/react';
import { FC } from 'react';

import { IDrawerProps } from './drawer.types';

export const Drawer: FC<IDrawerProps> = ({ children, ...restProps }): JSX.Element => (
  <ChakraDrawer {...restProps}>{children}</ChakraDrawer>
);
