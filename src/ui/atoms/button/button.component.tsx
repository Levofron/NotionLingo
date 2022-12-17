import { Button as ChakraButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IButtonProps } from './button.types';

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, IButtonProps> = (
  { children, ...restProps },
  ref,
): JSX.Element => (
  <ChakraButton ref={ref} {...restProps}>
    {children}
  </ChakraButton>
);

export const Button = forwardRef(ButtonComponent);
