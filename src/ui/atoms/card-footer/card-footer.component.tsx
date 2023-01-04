import { CardFooter as ChakraCardFooter } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ICardFooterProps } from './card-footer.types';

const CardFooterComponent: ForwardRefRenderFunction<HTMLDivElement, ICardFooterProps> = (
  props,
  ref,
): JSX.Element => <ChakraCardFooter ref={ref} {...props} />;

export const CardFooter = forwardRef(CardFooterComponent);
