import { Box as ChakraBox } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IBoxProps } from './box.types';

const BoxComponent: ForwardRefRenderFunction<HTMLDivElement, IBoxProps> = (
  props,
  ref,
): JSX.Element => <ChakraBox ref={ref} {...props} />;

export const Box = memo(forwardRef(BoxComponent));

export default Box;
