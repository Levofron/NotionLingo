import { FormLabel as ChakraFormLabel } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IFormLabelProps } from './form-label.types';

const FormLabelComponent: ForwardRefRenderFunction<HTMLLabelElement, IFormLabelProps> = (
  props,
  ref,
): JSX.Element => <ChakraFormLabel ref={ref} {...props} />;

export const FormLabel = forwardRef(FormLabelComponent);
