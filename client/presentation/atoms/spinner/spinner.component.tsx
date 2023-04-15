import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { SpinnerProps } from './spinner.types';

const SpinnerComponent: ForwardRefRenderFunction<HTMLDivElement, SpinnerProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => (
  <ChakraSpinner
    ref={ref}
    color={mode === 'dark' ? 'gray.900' : 'gray.50'}
    size="xl"
    thickness="1px"
    {...restProps}
  />
);

export const Spinner = memo(forwardRef(SpinnerComponent));
