import { ModalHeader as ChakraModalHeader } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ModalHeaderProps } from './modal-header.types';

const ModalHeaderComponent: ForwardRefRenderFunction<HTMLElement, ModalHeaderProps> = (
  props,
  ref,
): JSX.Element => <ChakraModalHeader ref={ref} {...props} />;

export const ModalHeader = memo(forwardRef(ModalHeaderComponent));
