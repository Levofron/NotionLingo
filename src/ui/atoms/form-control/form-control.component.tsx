import { FormControl as ChakraFormControl } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IFormControlProps } from './form-control.types';

const FormControlComponent: ForwardRefRenderFunction<HTMLDivElement, IFormControlProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraFormControl ref={ref} {...restProps}>
    {children}
  </ChakraFormControl>
);

export const FormControl = forwardRef(FormControlComponent);
