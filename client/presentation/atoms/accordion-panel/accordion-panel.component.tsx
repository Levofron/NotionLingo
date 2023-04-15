import { AccordionPanel as ChakraAccordionPanel } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { AccordionPanelProps } from './accordion-panel.types';

const AccordionPanelComponent: ForwardRefRenderFunction<HTMLDivElement, AccordionPanelProps> = (
  props,
  ref,
): JSX.Element => <ChakraAccordionPanel ref={ref} {...props} />;

export const AccordionPanel = memo(forwardRef(AccordionPanelComponent));
