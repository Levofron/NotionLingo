import { Icon as ChakraIcon } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IIconProps } from './icon.types';

const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IIconProps> = (
  props,
  ref,
): JSX.Element => <ChakraIcon ref={ref} {...props} />;

export const Icon = forwardRef(IconComponent);
