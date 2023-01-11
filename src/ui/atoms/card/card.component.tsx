import { Card as ChakraCard } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ICardProps } from './card.types';

const CardComponent: ForwardRefRenderFunction<HTMLDivElement, ICardProps> = (
  { variant = 'light', ...restProps },
  ref,
): JSX.Element => (
  <ChakraCard
    ref={ref}
    bg={variant === 'dark' ? 'gray.50' : 'gray.900'}
    border="1px"
    borderColor={variant === 'light' ? 'gray.50' : 'gray.900'}
    borderRadius={0}
    boxShadow={`6px 6px 0 var(--chakra-colors-gray-${variant === 'dark' ? '900' : '50'})`}
    {...restProps}
  />
);

export const Card = forwardRef(CardComponent);
