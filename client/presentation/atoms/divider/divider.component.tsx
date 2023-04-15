import { Divider as ChakraDivider } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { DividerProps } from './divider.types';

const DividerComponent: ForwardRefRenderFunction<HTMLHRElement, DividerProps> = (
  props,
  ref,
): JSX.Element => <ChakraDivider ref={ref} {...props} />;

export const Divider = memo(forwardRef(DividerComponent));
