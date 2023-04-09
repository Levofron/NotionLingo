import { Icon as ChakraIcon } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IIconProps } from './icon.types';

const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IIconProps> = (
  props,
  ref,
): JSX.Element => <ChakraIcon ref={ref} {...props} />;

export const Icon = memo(forwardRef(IconComponent));
