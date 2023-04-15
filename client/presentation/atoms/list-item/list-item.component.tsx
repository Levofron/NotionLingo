import { ListItem as ChakraListItem } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { ListItemProps } from './list-item.types';

const ListItemComponent: ForwardRefRenderFunction<HTMLLIElement, ListItemProps> = (
  props,
  ref,
): JSX.Element => <ChakraListItem ref={ref} {...props} />;

export const ListItem = memo(forwardRef(ListItemComponent));
