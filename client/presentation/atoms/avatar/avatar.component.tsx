import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { AvatarProps } from './avatar.types';

const AvatarComponent: ForwardRefRenderFunction<HTMLSpanElement, AvatarProps> = (
  props,
  ref,
): JSX.Element => <ChakraAvatar ref={ref} {...props} />;

export const Avatar = memo(forwardRef(AvatarComponent));
