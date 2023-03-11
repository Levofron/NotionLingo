import { Select as ChakraSelect } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ISelectProps } from './select.types';

const SelectComponent: ForwardRefRenderFunction<HTMLSelectElement, ISelectProps> = (
  props,
  ref,
): JSX.Element => (
  <ChakraSelect
    ref={ref}
    _hover={{ borderColor: 'gray.900' }}
    _placeholder={{ color: 'gray.900' }}
    borderColor="gray.900"
    color="gray.900"
    focusBorderColor="gray.900"
    style={{ boxShadow: 'none', borderRadius: 0 }}
    {...props}
  />
);

export const Select = memo(forwardRef(SelectComponent));
