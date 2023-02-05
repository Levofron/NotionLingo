import { AccordionItem as ChakraAccordionItem } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import { IAccordionItemProps } from './accordion-item.types';

const AccordionItemComponent: ForwardRefRenderFunction<HTMLDivElement, IAccordionItemProps> = (
  props,
  ref,
): JSX.Element => <ChakraAccordionItem ref={ref} {...props} />;

export const AccordionItem = forwardRef(AccordionItemComponent);
