import { List as ChakraList } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IListProps } from './list.types';

const ListComponent: ForwardRefRenderFunction<HTMLUListElement, IListProps> = (
  props,
  ref,
): JSX.Element => <ChakraList ref={ref} {...props} />;

export const List = memo(forwardRef(ListComponent));
