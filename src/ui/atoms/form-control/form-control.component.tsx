import { FormControl as ChakraFormControl } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IFormControlProps } from './form-control.types';

const FormControlComponent: ForwardRefRenderFunction<HTMLDivElement, IFormControlProps> = (
  props,
  ref,
): JSX.Element => <ChakraFormControl ref={ref} {...props} />;

export const FormControl = memo(forwardRef(FormControlComponent));

export default FormControl;
