import { ModalHeader as ChakraModalHeader } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IModalHeaderProps } from './modal-header.types';

const ModalHeaderComponent: ForwardRefRenderFunction<HTMLElement, IModalHeaderProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraModalHeader ref={ref} {...restProps}>
    {children}
  </ChakraModalHeader>
);

export const ModalHeader = forwardRef(ModalHeaderComponent);
