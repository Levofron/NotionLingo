import { AccordionIcon as ChakraAccordionIcon } from '@chakra-ui/react';
import { FC } from 'react';

import { IAccordionIconProps } from './accordion-icon.types';

export const AccordionIcon: FC<IAccordionIconProps> = (props): JSX.Element => (
  <ChakraAccordionIcon {...props} />
);
