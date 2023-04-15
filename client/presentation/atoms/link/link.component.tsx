import { Link as ChakraLink } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { LinkProps } from './link.types';

const LinkComponent: ForwardRefRenderFunction<HTMLAnchorElement, LinkProps> = (
  props,
  ref,
): JSX.Element => <ChakraLink ref={ref} {...props} />;

export const Link = memo(forwardRef(LinkComponent));
