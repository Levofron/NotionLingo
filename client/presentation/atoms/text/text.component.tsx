import { Text as ChakraText } from '@chakra-ui/react';
import { ForwardRefRenderFunction, ReactNode, forwardRef, memo } from 'react';
import Balancer from 'react-wrap-balancer';

import { TextProps } from './text.types';

const renderChildren = (children: ReactNode, withBalancer?: boolean) =>
  withBalancer ? <Balancer>{children}</Balancer> : <>{children}</>;

const TextComponent: ForwardRefRenderFunction<HTMLParagraphElement, TextProps> = (
  { children, withBalancer = false, ...restProps },
  ref,
): JSX.Element => (
  <ChakraText ref={ref} fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} {...restProps}>
    {renderChildren(children, withBalancer)}
  </ChakraText>
);

export const Text = memo(forwardRef(TextComponent));
