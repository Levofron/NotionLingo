import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { TChakraNextLinkProps } from './chakra-next-link.types';

const ChakraNextLinkComponent: ForwardRefRenderFunction<HTMLAnchorElement, TChakraNextLinkProps> = (
  { children, href, style, target, ...restProps },
  ref,
): JSX.Element => (
  <NextLink ref={ref} href={href} style={style} target={target}>
    <ChakraLink as="span" color="red.500" {...restProps}>
      {children}
    </ChakraLink>
  </NextLink>
);

export const ChakraNextLink = forwardRef(ChakraNextLinkComponent);
