import { FormControl as ChakraFormControl } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { FormControlProps } from './form-control.types';

const FormControlComponent: ForwardRefRenderFunction<HTMLDivElement, FormControlProps> = (
  props,
  ref,
): JSX.Element => <ChakraFormControl ref={ref} {...props} />;

export const FormControl = memo(forwardRef(FormControlComponent));
