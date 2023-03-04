import { Tooltip as ChakraTooltip } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ITooltipProps } from './tooltip.types';

const TooltipComponent: ForwardRefRenderFunction<HTMLDivElement, ITooltipProps> = (
  props,
  ref,
): JSX.Element => <ChakraTooltip ref={ref} {...props} />;

export const Tooltip = memo(forwardRef(TooltipComponent));

export default Tooltip;
