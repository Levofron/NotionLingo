import { Card as ChakraCard } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ICardProps } from './card.types';

const CardComponent: ForwardRefRenderFunction<HTMLDivElement, ICardProps> = (
  props,
  ref,
): JSX.Element => <ChakraCard ref={ref} {...props} />;

export const Card = forwardRef(CardComponent);
