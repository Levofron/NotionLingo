import { TabList as ChakraTabList } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { TabListProps } from './tab-list.types';

const TabListComponent: ForwardRefRenderFunction<HTMLDivElement, TabListProps> = (
  props,
  ref,
): JSX.Element => <ChakraTabList ref={ref} {...props} />;

export const TabList = memo(forwardRef(TabListComponent));
