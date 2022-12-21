import { Card as ChakraCard } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ICardProps } from './card.types';

const CardComponent: ForwardRefRenderFunction<HTMLDivElement, ICardProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraCard ref={ref} {...restProps}>
    {children}
  </ChakraCard>
);

export const Card = forwardRef(CardComponent);
