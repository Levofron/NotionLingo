import { CardBody as ChakraCardBody } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { CardBodyProps } from './card-body.types';

const CardBodyComponent: ForwardRefRenderFunction<HTMLDivElement, CardBodyProps> = (
  props,
  ref,
): JSX.Element => <ChakraCardBody ref={ref} {...props} />;

export const CardBody = memo(forwardRef(CardBodyComponent));
