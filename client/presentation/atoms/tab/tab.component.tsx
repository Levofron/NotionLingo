import { Tab as ChakraTab } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { TabProps } from './tab.types';

const TabComponent: ForwardRefRenderFunction<HTMLButtonElement, TabProps> = (
  props,
  ref,
): JSX.Element => <ChakraTab ref={ref} {...props} />;

export const Tab = memo(forwardRef(TabComponent));
