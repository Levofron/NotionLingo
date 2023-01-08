import { Button as ChakraButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { variantToStylesMapper } from './button.defaults';
import { IButtonProps } from './button.types';

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, IButtonProps> = (
  { variant = 'primary', ...restProps },
  ref,
): JSX.Element => (
  <ChakraButton
    ref={ref}
    borderColor="black"
    borderRadius={0}
    borderWidth="1px"
    {...variantToStylesMapper[variant]}
    {...restProps}
  />
);

export const Button = forwardRef(ButtonComponent);
