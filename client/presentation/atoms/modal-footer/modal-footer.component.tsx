import { ModalFooter as ChakraModalFooter } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ModalFooterProps } from './modal-footer.types';

const ModalFooterComponent: ForwardRefRenderFunction<HTMLDivElement, ModalFooterProps> = (
  props,
  ref,
): JSX.Element => <ChakraModalFooter ref={ref} {...props} />;

export const ModalFooter = memo(forwardRef(ModalFooterComponent));
