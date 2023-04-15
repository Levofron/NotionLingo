import { CardFooter as ChakraCardFooter } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { CardFooterProps } from './card-footer.types';

const CardFooterComponent: ForwardRefRenderFunction<HTMLDivElement, CardFooterProps> = (
  props,
  ref,
): JSX.Element => <ChakraCardFooter ref={ref} {...props} />;

export const CardFooter = memo(forwardRef(CardFooterComponent));
