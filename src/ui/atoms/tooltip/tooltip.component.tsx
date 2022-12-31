import { Tooltip as ChakraTooltip } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ITooltipProps } from './tooltip.types';

const TooltipComponent: ForwardRefRenderFunction<HTMLDivElement, ITooltipProps> = (
  props,
  ref,
): JSX.Element => <ChakraTooltip ref={ref} {...props} />;

export const Tooltip = forwardRef(TooltipComponent);
