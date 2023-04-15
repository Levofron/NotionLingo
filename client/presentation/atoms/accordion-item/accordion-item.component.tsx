import { AccordionItem as ChakraAccordionItem } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { AccordionItemProps } from './accordion-item.types';

const AccordionItemComponent: ForwardRefRenderFunction<HTMLDivElement, AccordionItemProps> = (
  props,
  ref,
): JSX.Element => <ChakraAccordionItem ref={ref} {...props} />;

export const AccordionItem = memo(forwardRef(AccordionItemComponent));
