import { FormLabel as ChakraFormLabel } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { FormLabelProps } from './form-label.types';

const FormLabelComponent: ForwardRefRenderFunction<HTMLLabelElement, FormLabelProps> = (
  props,
  ref,
): JSX.Element => <ChakraFormLabel ref={ref} {...props} />;

export const FormLabel = memo(forwardRef(FormLabelComponent));
