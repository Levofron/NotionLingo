import { ModalFooter as ChakraModalFooter } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IModalFooterProps } from './modal-footer.types';

const ModalFooterComponent: ForwardRefRenderFunction<HTMLDivElement, IModalFooterProps> = (
  props,
  ref,
): JSX.Element => <ChakraModalFooter ref={ref} {...props} />;

export const ModalFooter = memo(forwardRef(ModalFooterComponent));
