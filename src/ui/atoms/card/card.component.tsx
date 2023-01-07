import { Card as ChakraCard } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ICardProps } from './card.types';

const CardComponent: ForwardRefRenderFunction<HTMLDivElement, ICardProps> = (
  props,
  ref,
): JSX.Element => (
  <ChakraCard
    ref={ref}
    bg="white"
    border="1px"
    borderColor="black"
    borderRadius={0}
    boxShadow="6px 6px 0 black"
    {...props}
  />
);

export const Card = forwardRef(CardComponent);
