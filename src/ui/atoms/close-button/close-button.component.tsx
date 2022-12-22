import { CloseButton as ChakraCloseButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ICloseButtonProps } from './close-button.types';

const CloseButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, ICloseButtonProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraCloseButton ref={ref} {...restProps}>
    {children}
  </ChakraCloseButton>
);

export const CloseButton = forwardRef(CloseButtonComponent);
