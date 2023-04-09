import { Container as ChakraContainer } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IContainerProps } from './container.types';

const ContainerComponent: ForwardRefRenderFunction<HTMLDivElement, IContainerProps> = (
  props,
  ref,
): JSX.Element => <ChakraContainer ref={ref} {...props} />;

export const Container = memo(forwardRef(ContainerComponent));
