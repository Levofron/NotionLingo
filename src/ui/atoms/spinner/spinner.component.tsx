import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ISpinnerProps } from './spinner.types';

const SpinnerComponent: ForwardRefRenderFunction<HTMLDivElement, ISpinnerProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => (
  <ChakraSpinner
    ref={ref}
    color={mode === 'dark' ? 'gray.900' : 'gray.50'}
    size="xl"
    thickness="2px"
    {...restProps}
  />
);

export const Spinner = forwardRef(SpinnerComponent);
