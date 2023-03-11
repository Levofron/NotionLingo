import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { variantToStylesMapper } from './icon-button.defaults';
import { IIconButtonProps } from './icon-button.types';

const IconButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, IIconButtonProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => (
  <ChakraIconButton
    ref={ref}
    borderRadius={0}
    borderWidth="2px"
    {...variantToStylesMapper[mode]}
    {...restProps}
  />
);

export const IconButton = memo(forwardRef(IconButtonComponent));
