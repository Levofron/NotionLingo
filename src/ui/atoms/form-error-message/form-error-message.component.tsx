import { FormErrorMessage as ChakraFormErrorMessage } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IFormErrorMessageProps } from './form-error-message.types';

const FormErrorMessageComponent: ForwardRefRenderFunction<
  HTMLDivElement,
  IFormErrorMessageProps
> = ({ children, ...restProps }, ref): JSX.Element => (
  <ChakraFormErrorMessage ref={ref} {...restProps}>
    {children}
  </ChakraFormErrorMessage>
);

export const FormErrorMessage = forwardRef(FormErrorMessageComponent);
