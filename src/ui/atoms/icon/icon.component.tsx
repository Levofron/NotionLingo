import { Icon as ChakraIcon } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IIconProps } from './icon.types';

const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IIconProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraIcon ref={ref} {...restProps}>
    {children}
  </ChakraIcon>
);

export const Icon = forwardRef(IconComponent);
