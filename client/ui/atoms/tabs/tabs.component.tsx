import { Tabs as ChakraTabs } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ITabsProps } from './tabs.types';

const TabsComponent: ForwardRefRenderFunction<HTMLDivElement, ITabsProps> = (
  props,
  ref,
): JSX.Element => <ChakraTabs ref={ref} {...props} />;

export const Tabs = memo(forwardRef(TabsComponent));
