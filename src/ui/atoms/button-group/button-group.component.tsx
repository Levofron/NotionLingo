import { ButtonGroup as ChakraButtonGroup } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IButtonGroupProps } from './button-group.types';

const ButtonGroupComponent: ForwardRefRenderFunction<HTMLDivElement, IButtonGroupProps> = (
  props,
  ref,
): JSX.Element => <ChakraButtonGroup ref={ref} {...props} />;

export const ButtonGroup = forwardRef(ButtonGroupComponent);
