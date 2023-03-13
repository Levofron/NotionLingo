import { ModalContent as ChakraModalContent } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IModalContentProps } from './modal-content.types';

const ModalContentComponent: ForwardRefRenderFunction<HTMLElement, IModalContentProps> = (
  props,
  ref,
): JSX.Element => <ChakraModalContent ref={ref} {...props} />;

export const ModalContent = memo(forwardRef(ModalContentComponent));

export default ModalContent;
