import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { TChakraNextLinkProps } from './chakra-next-link.types';

const ChakraNextLinkComponent: ForwardRefRenderFunction<HTMLAnchorElement, TChakraNextLinkProps> = (
  { children, href, ...restProps },
  ref,
): JSX.Element => (
  <NextLink ref={ref} passHref href={href}>
    <ChakraLink {...restProps}>{children}</ChakraLink>
  </NextLink>
);

export const ChakraNextLink = forwardRef(ChakraNextLinkComponent);