import { Link as ChakraLink } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ILinkProps } from './link.types';

const LinkComponent: ForwardRefRenderFunction<HTMLAnchorElement, ILinkProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraLink ref={ref} {...restProps}>
    {children}
  </ChakraLink>
);

export const Link = forwardRef(LinkComponent);
