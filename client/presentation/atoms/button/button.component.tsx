import { Button as ChakraButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { variantToStylesMapper } from './button.defaults';
import { ButtonProps } from './button.types';

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => (
  <ChakraButton
    ref={ref}
    borderRadius={10}
    borderWidth="1px"
    size={{ base: 'sm', sm: 'md', md: 'lg' }}
    {...variantToStylesMapper[mode]}
    {...restProps}
  />
);

export const Button = memo(forwardRef(ButtonComponent));
