import { FormErrorMessage as ChakraFormErrorMessage } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { FormErrorMessageProps } from './form-error-message.types';

const FormErrorMessageComponent: ForwardRefRenderFunction<HTMLDivElement, FormErrorMessageProps> = (
  props,
  ref,
): JSX.Element => <ChakraFormErrorMessage ref={ref} {...props} />;

export const FormErrorMessage = memo(forwardRef(FormErrorMessageComponent));
