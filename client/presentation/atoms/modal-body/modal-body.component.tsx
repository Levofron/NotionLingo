import { ModalBody as ChakraModalBody } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ModalBodyProps } from './modal-body.types';

const ModalBodyComponent: ForwardRefRenderFunction<HTMLDivElement, ModalBodyProps> = (
  props,
  ref,
): JSX.Element => <ChakraModalBody ref={ref} {...props} />;

export const ModalBody = memo(forwardRef(ModalBodyComponent));
