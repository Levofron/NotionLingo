import { Text as ChakraText } from '@chakra-ui/react';
import { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react';
import Balancer from 'react-wrap-balancer';

import { ITextProps } from './text.types';

const renderChildren = (children: ReactNode, withBalancer?: boolean) =>
  withBalancer ? <Balancer>{children}</Balancer> : <>{children}</>;

const TextComponent: ForwardRefRenderFunction<HTMLParagraphElement, ITextProps> = (
  { children, withBalancer = false, ...restProps },
  ref,
): JSX.Element => (
  <ChakraText ref={ref} {...restProps}>
    {renderChildren(children, withBalancer)}
  </ChakraText>
);

export const Text = forwardRef(TextComponent);
