import { CloseButton as ChakraCloseButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ICloseButtonProps } from './close-button.types';

const CloseButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, ICloseButtonProps> = (
  props,
  ref,
): JSX.Element => <ChakraCloseButton ref={ref} {...props} />;

export const CloseButton = forwardRef(CloseButtonComponent);
