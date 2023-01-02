import { Tab as ChakraTab } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ITabProps } from './tab.types';

const TabComponent: ForwardRefRenderFunction<HTMLButtonElement, ITabProps> = (
  props,
  ref,
): JSX.Element => <ChakraTab ref={ref} {...props} />;

export const Tab = forwardRef(TabComponent);
