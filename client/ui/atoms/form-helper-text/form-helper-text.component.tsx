import { FormHelperText as ChakraFormHelperText } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IFormHelperTextProps } from './form-helper-text.types';

const FormHelperTextComponent: ForwardRefRenderFunction<HTMLDivElement, IFormHelperTextProps> = (
  props,
  ref,
): JSX.Element => <ChakraFormHelperText ref={ref} {...props} />;

export const FormHelperText = memo(forwardRef(FormHelperTextComponent));
