import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IAvatarProps } from './avatar.types';

const AvatarComponent: ForwardRefRenderFunction<HTMLSpanElement, IAvatarProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraAvatar ref={ref} {...restProps}>
    {children}
  </ChakraAvatar>
);

export const Avatar = forwardRef(AvatarComponent);
