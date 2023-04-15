import { TabPanels as ChakraTabPanels } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { TabPanelsProps } from './tab-panels.types';

const TabPanelsComponent: ForwardRefRenderFunction<HTMLDivElement, TabPanelsProps> = (
  props,
  ref,
): JSX.Element => <ChakraTabPanels ref={ref} {...props} />;

export const TabPanels = memo(forwardRef(TabPanelsComponent));
