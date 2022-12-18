import { Heading as ChakraHeading } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IHeadingProps } from './heading.types';

const HeadingComponent: ForwardRefRenderFunction<HTMLParagraphElement, IHeadingProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraHeading ref={ref} {...restProps}>
    {children}
  </ChakraHeading>
);

export const Heading = forwardRef(HeadingComponent);
