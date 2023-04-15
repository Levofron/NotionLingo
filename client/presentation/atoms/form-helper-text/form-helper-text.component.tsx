import { FormHelperText as ChakraFormHelperText } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { FormHelperTextProps } from './form-helper-text.types';

const FormHelperTextComponent: ForwardRefRenderFunction<HTMLDivElement, FormHelperTextProps> = (
  props,
  ref,
): JSX.Element => <ChakraFormHelperText ref={ref} {...props} />;

export const FormHelperText = memo(forwardRef(FormHelperTextComponent));
