import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { TChakraNextLinkProps } from './chakra-next-link.types';

const ChakraNextLinkComponent: ForwardRefRenderFunction<HTMLAnchorElement, TChakraNextLinkProps> = (
  { children, href, style, target, ...restProps },
  ref,
): JSX.Element => (
  <NextLink ref={ref} href={href} style={{ textDecoration: 'none', ...style }} target={target}>
    <ChakraLink as="span" style={{ textDecoration: 'none' }} {...restProps}>
      {children}
    </ChakraLink>
  </NextLink>
);

export const ChakraNextLink = memo(forwardRef(ChakraNextLinkComponent));

export default ChakraNextLink;
