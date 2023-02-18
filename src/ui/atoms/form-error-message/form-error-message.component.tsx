import { FormErrorMessage as ChakraFormErrorMessage } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IFormErrorMessageProps } from './form-error-message.types';

const FormErrorMessageComponent: ForwardRefRenderFunction<
  HTMLDivElement,
  IFormErrorMessageProps
> = (props, ref): JSX.Element => <ChakraFormErrorMessage ref={ref} {...props} />;

export const FormErrorMessage = memo(forwardRef(FormErrorMessageComponent));

export default FormErrorMessage;
