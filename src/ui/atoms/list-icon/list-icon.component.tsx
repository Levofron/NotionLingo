import { ListIcon as ChakraListIcon } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IListIconProps } from './list-icon.types';

const ListIconComponent: ForwardRefRenderFunction<SVGSVGElement, IListIconProps> = (
  props,
  ref,
): JSX.Element => <ChakraListIcon ref={ref} {...props} />;

export const ListIcon = forwardRef(ListIconComponent);
