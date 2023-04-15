import { Accordion as ChakraAccordion } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { AccordionProps } from './accordion.types';

const AccordionComponent: ForwardRefRenderFunction<HTMLDivElement, AccordionProps> = (
  props,
  ref,
): JSX.Element => <ChakraAccordion ref={ref} {...props} />;

export const Accordion = memo(forwardRef(AccordionComponent));
