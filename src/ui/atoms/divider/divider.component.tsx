import { Divider as ChakraDivider } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IDividerProps } from './divider.types';

const DividerComponent: ForwardRefRenderFunction<HTMLHRElement, IDividerProps> = (
  props,
  ref,
): JSX.Element => <ChakraDivider ref={ref} {...props} />;

export const Divider = memo(forwardRef(DividerComponent));

export default Divider;
