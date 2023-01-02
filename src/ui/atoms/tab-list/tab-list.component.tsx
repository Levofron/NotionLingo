import { TabList as ChakraTabList } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ITabListProps } from './tab-list.types';

const TabListComponent: ForwardRefRenderFunction<HTMLDivElement, ITabListProps> = (
  props,
  ref,
): JSX.Element => <ChakraTabList ref={ref} {...props} />;

export const TabList = forwardRef(TabListComponent);
