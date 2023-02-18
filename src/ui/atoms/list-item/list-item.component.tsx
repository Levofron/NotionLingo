import { ListItem as ChakraListItem } from '@chakra-ui/react';
import { ForwardRefRenderFunction, forwardRef, memo } from 'react';

import { IListItemProps } from './list-item.types';

const ListItemComponent: ForwardRefRenderFunction<HTMLLIElement, IListItemProps> = (
  props,
  ref,
): JSX.Element => <ChakraListItem ref={ref} {...props} />;

export const ListItem = memo(forwardRef(ListItemComponent));

export default ListItem;
