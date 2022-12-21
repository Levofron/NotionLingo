import { ModalContent as ChakraModalContent } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IModalContentProps } from './modal-content.types';

const ModalContentComponent: ForwardRefRenderFunction<HTMLElement, IModalContentProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraModalContent ref={ref} {...restProps}>
    {children}
  </ChakraModalContent>
);

export const ModalContent = forwardRef(ModalContentComponent);
