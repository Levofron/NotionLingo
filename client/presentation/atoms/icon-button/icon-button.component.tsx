import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { variantToStylesMapper } from './icon-button.defaults';
import { IconButtonProps } from './icon-button.types';

const IconButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, IconButtonProps> = (
  { mode = 'dark', ...restProps },
  ref,
): JSX.Element => (
  <ChakraIconButton
    ref={ref}
    borderRadius={10}
    borderWidth="1px"
    {...variantToStylesMapper[mode]}
    {...restProps}
  />
);

export const IconButton = memo(forwardRef(IconButtonComponent));
