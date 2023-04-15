import { TabPanel as ChakraTabPanel } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { TabPanelProps } from './tab-panel.types';

const TabPanelComponent: ForwardRefRenderFunction<HTMLDivElement, TabPanelProps> = (
  props,
  ref,
): JSX.Element => <ChakraTabPanel ref={ref} {...props} />;

export const TabPanel = memo(forwardRef(TabPanelComponent));
