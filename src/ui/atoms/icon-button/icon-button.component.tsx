import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IIconButtonProps } from './icon-button.types';

const IconButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, IIconButtonProps> = (
  props,
  ref,
): JSX.Element => <ChakraIconButton ref={ref} {...props} />;

export const IconButton = forwardRef(IconButtonComponent);
