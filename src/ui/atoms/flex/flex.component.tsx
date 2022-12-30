import { Flex as ChakraFlex } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IFlexProps } from './flex.types';

const FlexComponent: ForwardRefRenderFunction<HTMLDivElement, IFlexProps> = (
  props,
  ref,
): JSX.Element => <ChakraFlex ref={ref} {...props} />;

export const Flex = forwardRef(FlexComponent);
