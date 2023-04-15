import { Icon as ChakraIcon } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IconProps } from './icon.types';

const IconComponent: ForwardRefRenderFunction<SVGSVGElement, IconProps> = (
  props,
  ref,
): JSX.Element => <ChakraIcon ref={ref} {...props} />;

export const Icon = memo(forwardRef(IconComponent));
