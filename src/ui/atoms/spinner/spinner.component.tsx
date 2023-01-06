import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ISpinnerProps } from './spinner.types';

const SpinnerComponent: ForwardRefRenderFunction<HTMLDivElement, ISpinnerProps> = (
  props,
  ref,
): JSX.Element => <ChakraSpinner ref={ref} color="black" size="xl" thickness="6px" {...props} />;

export const Spinner = forwardRef(SpinnerComponent);
