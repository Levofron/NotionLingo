import { CardHeader as ChakraCardHeader } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ICardHeaderProps } from './card-header.types';

const CardHeaderComponent: ForwardRefRenderFunction<HTMLDivElement, ICardHeaderProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraCardHeader ref={ref} {...restProps}>
    {children}
  </ChakraCardHeader>
);

export const CardHeader = forwardRef(CardHeaderComponent);
