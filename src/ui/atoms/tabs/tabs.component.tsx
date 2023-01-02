import { Tabs as ChakraTabs } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ITabsProps } from './tabs.types';

const TabsComponent: ForwardRefRenderFunction<HTMLDivElement, ITabsProps> = (
  props,
  ref,
): JSX.Element => <ChakraTabs ref={ref} {...props} />;

export const Tabs = forwardRef(TabsComponent);
