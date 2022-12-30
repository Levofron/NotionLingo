import { FormLabel as ChakraFormLabel } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IFormLabelProps } from './form-label.types';

const FormLabelComponent: ForwardRefRenderFunction<HTMLLabelElement, IFormLabelProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraFormLabel ref={ref} {...restProps}>
    {children}
  </ChakraFormLabel>
);

export const FormLabel = forwardRef(FormLabelComponent);
