import { Container as ChakraContainer } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ContainerProps } from './container.types';

const ContainerComponent: ForwardRefRenderFunction<HTMLDivElement, ContainerProps> = (
  props,
  ref,
): JSX.Element => <ChakraContainer ref={ref} {...props} />;

export const Container = memo(forwardRef(ContainerComponent));
