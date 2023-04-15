import { Tabs as ChakraTabs } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { TabsProps } from './tabs.types';

const TabsComponent: ForwardRefRenderFunction<HTMLDivElement, TabsProps> = (
  props,
  ref,
): JSX.Element => <ChakraTabs ref={ref} {...props} />;

export const Tabs = memo(forwardRef(TabsComponent));
