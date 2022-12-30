import { Button as ChakraButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IButtonProps } from './button.types';

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, IButtonProps> = (
  props,
  ref,
): JSX.Element => <ChakraButton ref={ref} {...props} />;

export const Button = forwardRef(ButtonComponent);
