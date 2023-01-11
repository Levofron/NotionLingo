import { IIconButtonProps, TIconButtonVariants } from './icon-button.types';

export const variantToStylesMapper: Record<TIconButtonVariants, Partial<IIconButtonProps>> = {
  primary: {
    _hover: {
      bg: 'gray.50',
      color: 'gray.900',
    },
    bg: 'gray.900',
    color: 'gray.50',
  },
  secondary: {
    _hover: {
      bg: 'gray.900',
      color: 'gray.50',
    },
    bg: 'gray.50',
    color: 'gray.900',
  },
};
