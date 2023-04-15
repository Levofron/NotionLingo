import { ListIcon as ChakraListIcon } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ListIconProps } from './list-icon.types';

const ListIconComponent: ForwardRefRenderFunction<SVGSVGElement, ListIconProps> = (
  props,
  ref,
): JSX.Element => <ChakraListIcon ref={ref} {...props} />;

export const ListIcon = memo(forwardRef(ListIconComponent));
