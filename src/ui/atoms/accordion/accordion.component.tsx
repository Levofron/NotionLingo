import { Accordion as ChakraAccordion } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IAccordionProps } from './accordion.types';

const AccordionComponent: ForwardRefRenderFunction<HTMLDivElement, IAccordionProps> = (
  props,
  ref,
): JSX.Element => <ChakraAccordion ref={ref} {...props} />;

export const Accordion = forwardRef(AccordionComponent);
