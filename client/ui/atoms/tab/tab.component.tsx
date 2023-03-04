import { Tab as ChakraTab } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ITabProps } from './tab.types';

const TabComponent: ForwardRefRenderFunction<HTMLButtonElement, ITabProps> = (
  props,
  ref,
): JSX.Element => <ChakraTab ref={ref} {...props} />;

export const Tab = memo(forwardRef(TabComponent));

export default Tab;
