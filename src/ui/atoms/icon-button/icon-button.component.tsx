import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IIconButtonProps } from './icon-button.types';

const IconButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, IIconButtonProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraIconButton ref={ref} {...restProps}>
    {children}
  </ChakraIconButton>
);

export const IconButton = forwardRef(IconButtonComponent);
