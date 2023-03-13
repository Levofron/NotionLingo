import { AccordionButton as ChakraAccordionButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IAccordionButtonProps } from './accordion-button.types';

const AccordionButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  IAccordionButtonProps
> = (props, ref): JSX.Element => <ChakraAccordionButton ref={ref} {...props} />;

export const AccordionButton = memo(forwardRef(AccordionButtonComponent));
