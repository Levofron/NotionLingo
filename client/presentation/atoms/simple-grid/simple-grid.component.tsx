import { SimpleGrid as ChakraSimpleGrid } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { SimpleGridProps } from './simple-grid.types';

const SimpleGridComponent: ForwardRefRenderFunction<HTMLDivElement, SimpleGridProps> = (
  props,
  ref,
): JSX.Element => <ChakraSimpleGrid ref={ref} {...props} />;

export const SimpleGrid = memo(forwardRef(SimpleGridComponent));
