import { Heading as ChakraHeading } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IHeadingProps } from './heading.types';

const HeadingComponent: ForwardRefRenderFunction<HTMLParagraphElement, IHeadingProps> = (
  props,
  ref,
): JSX.Element => <ChakraHeading ref={ref} {...props} />;

export const Heading = forwardRef(HeadingComponent);
