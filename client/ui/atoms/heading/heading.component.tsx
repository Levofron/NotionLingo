import { Heading as ChakraHeading } from '@chakra-ui/react';
import { ForwardRefRenderFunction, ReactNode, forwardRef, memo } from 'react';
import Balancer from 'react-wrap-balancer';

import { IHeadingProps } from './heading.types';

const renderChildren = (children: ReactNode, withBalancer?: boolean) =>
  withBalancer ? <Balancer>{children}</Balancer> : <>{children}</>;

const HeadingComponent: ForwardRefRenderFunction<HTMLParagraphElement, IHeadingProps> = (
  { children, withBalancer = false, ...restProps },
  ref,
): JSX.Element => (
  <ChakraHeading ref={ref} fontFamily="heading" fontSize="xl" {...restProps}>
    {renderChildren(children, withBalancer)}
  </ChakraHeading>
);

export const Heading = memo(forwardRef(HeadingComponent));

export default Heading;
