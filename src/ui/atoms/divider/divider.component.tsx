import { Divider as ChakraDivider } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IDividerProps } from './divider.types';

const DividerComponent: ForwardRefRenderFunction<HTMLHRElement, IDividerProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraDivider ref={ref} {...restProps}>
    {children}
  </ChakraDivider>
);

export const Divider = forwardRef(DividerComponent);
