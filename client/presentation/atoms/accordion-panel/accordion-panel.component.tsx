import { AccordionPanel as ChakraAccordionPanel } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IAccordionPanelProps } from './accordion-panel.types';

const AccordionPanelComponent: ForwardRefRenderFunction<HTMLDivElement, IAccordionPanelProps> = (
  props,
  ref,
): JSX.Element => <ChakraAccordionPanel ref={ref} {...props} />;

export const AccordionPanel = memo(forwardRef(AccordionPanelComponent));