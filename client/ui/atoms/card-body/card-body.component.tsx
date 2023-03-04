import { CardBody as ChakraCardBody } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ICardBodyProps } from './card-body.types';

const CardBodyComponent: ForwardRefRenderFunction<HTMLDivElement, ICardBodyProps> = (
  props,
  ref,
): JSX.Element => <ChakraCardBody ref={ref} {...props} />;

export const CardBody = memo(forwardRef(CardBodyComponent));

export default CardBody;
