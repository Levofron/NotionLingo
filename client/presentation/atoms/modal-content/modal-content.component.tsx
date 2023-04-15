import { ModalContent as ChakraModalContent } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ModalContentProps } from './modal-content.types';

const ModalContentComponent: ForwardRefRenderFunction<HTMLElement, ModalContentProps> = (
  props,
  ref,
): JSX.Element => <ChakraModalContent ref={ref} {...props} />;

export const ModalContent = memo(forwardRef(ModalContentComponent));
