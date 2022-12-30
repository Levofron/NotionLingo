import { ModalHeader as ChakraModalHeader } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IModalHeaderProps } from './modal-header.types';

const ModalHeaderComponent: ForwardRefRenderFunction<HTMLElement, IModalHeaderProps> = (
  props,
  ref,
): JSX.Element => <ChakraModalHeader ref={ref} {...props} />;

export const ModalHeader = forwardRef(ModalHeaderComponent);
