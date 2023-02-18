import { Card as ChakraCard } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ICardProps } from './card.types';

const CardComponent: ForwardRefRenderFunction<HTMLDivElement, ICardProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => {
  const isDarkMode = mode === 'dark';

  return (
    <ChakraCard
      ref={ref}
      bg={isDarkMode ? 'gray.50' : 'gray.900'}
      border="2px"
      borderColor={isDarkMode ? 'gray.900' : 'gray.50'}
      borderRadius={0}
      boxShadow={`6px 6px 0 var(--chakra-colors-gray-${isDarkMode ? '900' : '50'})`}
      {...restProps}
    />
  );
};

export const Card = forwardRef(CardComponent);
