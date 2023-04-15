import { Flex as ChakraFlex } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { FlexProps } from './flex.types';

const FlexComponent: ForwardRefRenderFunction<HTMLDivElement, FlexProps> = (
  props,
  ref,
): JSX.Element => <ChakraFlex ref={ref} {...props} />;

export const Flex = memo(forwardRef(FlexComponent));
