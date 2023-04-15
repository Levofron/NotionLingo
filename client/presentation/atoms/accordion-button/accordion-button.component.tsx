import { AccordionButton as ChakraAccordionButton } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { AccordionButtonProps } from './accordion-button.types';

const AccordionButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  AccordionButtonProps
> = (props, ref): JSX.Element => <ChakraAccordionButton ref={ref} {...props} />;

export const AccordionButton = memo(forwardRef(AccordionButtonComponent));
