import { CardBody as ChakraCardBody } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ICardBodyProps } from './card-body.types';

const CardBodyComponent: ForwardRefRenderFunction<HTMLDivElement, ICardBodyProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraCardBody ref={ref} {...restProps}>
    {children}
  </ChakraCardBody>
);

export const CardBody = forwardRef(CardBodyComponent);
