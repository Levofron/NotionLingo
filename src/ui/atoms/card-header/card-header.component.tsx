import { CardHeader as ChakraCardHeader } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { ICardHeaderProps } from './card-header.types';

const CardHeaderComponent: ForwardRefRenderFunction<HTMLDivElement, ICardHeaderProps> = (
  props,
  ref,
): JSX.Element => <ChakraCardHeader ref={ref} {...props} />;

export const CardHeader = forwardRef(CardHeaderComponent);
