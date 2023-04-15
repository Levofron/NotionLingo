import { List as ChakraList } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ListProps } from './list.types';

const ListComponent: ForwardRefRenderFunction<HTMLUListElement, ListProps> = (
  props,
  ref,
): JSX.Element => <ChakraList ref={ref} {...props} />;

export const List = memo(forwardRef(ListComponent));
