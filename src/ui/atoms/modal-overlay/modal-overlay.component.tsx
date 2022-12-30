import { ModalOverlay as ChakraModalOverlay } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IModalOverlayProps } from './modal-overlay.types';

const ModalOverlayComponent: ForwardRefRenderFunction<HTMLDivElement, IModalOverlayProps> = (
  props,
  ref,
): JSX.Element => <ChakraModalOverlay ref={ref} {...props} />;

export const ModalOverlay = forwardRef(ModalOverlayComponent);
