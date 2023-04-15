import { ModalOverlay as ChakraModalOverlay } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ModalOverlayProps } from './modal-overlay.types';

const ModalOverlayComponent: ForwardRefRenderFunction<HTMLDivElement, ModalOverlayProps> = (
  props,
  ref,
): JSX.Element => <ChakraModalOverlay ref={ref} {...props} />;

export const ModalOverlay = memo(forwardRef(ModalOverlayComponent));
