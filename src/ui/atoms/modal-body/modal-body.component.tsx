import { ModalBody as ChakraModalBody } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IModalBodyProps } from './modal-body.types';

const ModalBodyComponent: ForwardRefRenderFunction<HTMLDivElement, IModalBodyProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraModalBody ref={ref} {...restProps}>
    {children}
  </ChakraModalBody>
);

export const ModalBody = forwardRef(ModalBodyComponent);
