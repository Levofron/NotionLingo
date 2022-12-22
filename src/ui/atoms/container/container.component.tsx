import { Container as ChakraContainer } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IContainerProps } from './container.types';

const ContainerComponent: ForwardRefRenderFunction<HTMLDivElement, IContainerProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraContainer ref={ref} {...restProps}>
    {children}
  </ChakraContainer>
);

export const Container = forwardRef(ContainerComponent);
