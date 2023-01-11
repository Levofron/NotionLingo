import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ISpinnerProps } from './spinner.types';

const SpinnerComponent: ForwardRefRenderFunction<HTMLDivElement, ISpinnerProps> = (
  props,
  ref,
): JSX.Element => <ChakraSpinner ref={ref} color="gray.900" size="xl" thickness="1px" {...props} />;

export const Spinner = forwardRef(SpinnerComponent);
