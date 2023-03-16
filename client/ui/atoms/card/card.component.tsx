import { Card as ChakraCard, useMediaQuery } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ICardProps } from './card.types';

const CardComponent: ForwardRefRenderFunction<HTMLDivElement, ICardProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => {
  const [isSmallerThan400] = useMediaQuery('(max-width: 400px)');

  const isDarkMode = mode === 'dark';
  const boxShadowSize = isSmallerThan400 ? '2px' : '4px';

  return (
    <ChakraCard
      ref={ref}
      bg={isDarkMode ? 'gray.50' : 'gray.900'}
      border="1px"
      borderColor={isDarkMode ? 'gray.900' : 'gray.50'}
      borderRadius={0}
      boxShadow={`${boxShadowSize} ${boxShadowSize} 0 var(--chakra-colors-gray-${
        isDarkMode ? '900' : '50'
      })`}
      {...restProps}
    />
  );
};

export const Card = memo(forwardRef(CardComponent));
