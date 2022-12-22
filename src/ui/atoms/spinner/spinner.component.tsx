import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ISpinnerProps } from './spinner.types';

const SpinnerComponent: ForwardRefRenderFunction<HTMLDivElement, ISpinnerProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraSpinner ref={ref} {...restProps}>
    {children}
  </ChakraSpinner>
);

export const Spinner = forwardRef(SpinnerComponent);
