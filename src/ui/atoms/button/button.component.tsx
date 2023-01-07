import { Button as ChakraButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IButtonProps } from './button.types';

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, IButtonProps> = (
  props,
  ref,
): JSX.Element => (
  <ChakraButton
    ref={ref}
    _hover={{
      bg: 'white',
      color: 'black',
    }}
    bg="black"
    borderColor="black"
    borderRadius={0}
    borderWidth="1px"
    color="white"
    {...props}
  />
);

export const Button = forwardRef(ButtonComponent);
