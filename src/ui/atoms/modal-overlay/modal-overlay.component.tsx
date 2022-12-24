import { ModalOverlay as ChakraModalOverlay } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IModalOverlayProps } from './modal-overlay.types';

const ModalOverlayComponent: ForwardRefRenderFunction<HTMLDivElement, IModalOverlayProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraModalOverlay ref={ref} {...restProps}>
    {children}
  </ChakraModalOverlay>
);

export const ModalOverlay = forwardRef(ModalOverlayComponent);
