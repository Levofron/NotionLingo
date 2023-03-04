import { ModalHeader as ChakraModalHeader } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IModalHeaderProps } from './modal-header.types';

const ModalHeaderComponent: ForwardRefRenderFunction<HTMLElement, IModalHeaderProps> = (
  props,
  ref,
): JSX.Element => <ChakraModalHeader ref={ref} {...props} />;

export const ModalHeader = memo(forwardRef(ModalHeaderComponent));

export default ModalHeader;
