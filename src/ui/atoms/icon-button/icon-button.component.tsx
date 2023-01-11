import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { variantToStylesMapper } from './icon-button.defaults';
import { IIconButtonProps } from './icon-button.types';

const IconButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, IIconButtonProps> = (
  { variant = 'primary', ...restProps },
  ref,
): JSX.Element => (
  <ChakraIconButton
    ref={ref}
    borderColor="gray.900"
    borderRadius={0}
    borderWidth="1px"
    {...variantToStylesMapper[variant]}
    {...restProps}
  />
);

export const IconButton = forwardRef(IconButtonComponent);
